import { useEffect, useRef, useState } from 'react';
import './SectionIndicator.css';

/**
 * SectionIndicator — strip horizontal anclada al pie del viewport con las
 * secciones de la página actual y un separador entre cada item (Figma
 * 157:223). El item activo se resalta en `--ink` y los demás van al
 * 30% de tinta. Pinchar un item hace smooth-scroll a esa sección (usa
 * Lenis si está disponible, fallback nativo si no).
 *
 * Pensado para mitigar la fricción de UX del stack-scroll: el visitante
 * ve dónde está dentro del documento y tiene un atajo de navegación
 * tangible además de la barra de progreso.
 *
 * Props:
 *   items: [{ id: string, label: string }] — secciones de la página
 *          actual, en orden de scroll. El `id` debe coincidir con el
 *          atributo `id` del <section> destino.
 *
 * Detección del activo:
 *   en cada evento de scroll consultamos `getBoundingClientRect()` de
 *   los elementos por id y elegimos el ÚLTIMO cuyo `top` ya ha cruzado
 *   un threshold cerca del centro del viewport. Funciona bien con el
 *   stack-scroll de secciones sticky porque sus rects siguen reportando
 *   posiciones consistentes mientras están pinned.
 */
export default function SectionIndicator({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? null);
  /* Estado inicial heurístico: si el documento ya está scrolled más allá
     de medio viewport, asumimos que estamos dentro de la primera sección
     (no en el hero) y arrancamos visible. Evita el "flash slide" al
     recargar la página a mitad del documento. En navegación interna el
     router resetea scrollY a 0, así que esto vuelve a false. */
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    return (window.scrollY || 0) > window.innerHeight * 0.55;
  });
  const rafRef = useRef(null);

  /* La altura del strip se calcula 100% en CSS via `--section-indicator-h`
     (ver SectionIndicator.css). Antes lo hacíamos con JS + ResizeObserver,
     pero eso causaba un flash en el primer paint donde la barra de progreso
     aparecía superpuesta al strip antes de que el efecto se ejecutara. La
     fórmula CSS es determinista para este diseño (texto en una sola línea
     con padding simétrico y border-top de 1px).

     Visibilidad: el strip permanece deslizado abajo (translateY 100%) mientras
     el visitante está "en el hero" (la primera sección de contenido aún no
     ha cruzado la parte superior del viewport). En cuanto la primera sección
     se aproxima, sube. Se publica también un flag en `body` para que la barra
     de progreso baje en sincronía (ver --section-indicator-h-current en CSS).*/

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (!items || items.length === 0) return undefined;

    const update = () => {
      rafRef.current = null;
      const vh = window.innerHeight;
      const ref = vh * 0.45;
      /* Threshold de aparición: la primera sección debe estar a menos de
         media pantalla por debajo del top para que el strip suba. Usar el
         mismo umbral que el de "activo" haría que el item se marque
         activo justo en el momento que aparece el strip — limpio. */
      const showAt = ref;

      let nextId = items[0].id;
      let firstTop = Infinity;

      for (let i = 0; i < items.length; i++) {
        const el = document.getElementById(items[i].id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (i === 0) firstTop = rect.top;
        if (rect.top <= ref) {
          nextId = items[i].id;
        } else {
          break;
        }
      }

      const nextVisible = firstTop <= showAt;

      setActiveId((prev) => (prev === nextId ? prev : nextId));
      setIsVisible((prev) => (prev === nextVisible ? prev : nextVisible));
    };

    const onScroll = () => {
      if (rafRef.current != null) return;
      rafRef.current = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
    };
  }, [items]);

  /* Publica el estado de visibilidad en <body> para que ScrollProgress
     pueda anular su offset (--section-indicator-h → 0) y bajar también
     cuando el strip está oculto, manteniendo ambos pegados en todo
     momento. Se usa una clase en lugar de inline style para que la
     transición CSS sea exactamente la misma en los dos elementos.

     `isStripActive` toma en cuenta también si hay items en la ruta
     actual: en /404 (sin items) tratamos la barra como oculta para
     que el progress bar quede pegado al borde inferior. */
  const isStripActive = items.length > 0 && isVisible;
  useEffect(() => {
    if (typeof document === 'undefined') return undefined;
    document.body.classList.toggle('section-indicator-hidden', !isStripActive);
    return () => {
      document.body.classList.remove('section-indicator-hidden');
    };
  }, [isStripActive]);

  if (!items || items.length === 0) return null;

  /* Click → scroll-to-section. Dos retos a la vez:

     1) CALCULAR LA Y DESTINO con sticky. Todas las `.section` son
        `position: sticky; top: 0` dentro de `.section-stack`. Cuando
        intentas ir HACIA ATRÁS, la sección anterior está pineada en
        top:0 — y eso significa que tanto `getBoundingClientRect().top`
        como (en algunos navegadores) `offsetTop` reportan su posición
        PINEADA, no la de layout. Resultado: rect.top + scrollY ≈
        scrollY ACTUAL → el scroll no se mueve.

        Truco: anclamos al wrapper `.section-stack`, que es `position:
        relative` y NUNCA se pinea, así que su rect.top + scrollY sí
        es fiable. Luego sumamos `target.offsetTop` (relativo al
        wrapper) y obtenemos la y absoluta de layout del target.

     2) HACER EL SCROLL sin pelearnos con Lenis. lenis.scrollTo con
        smoothWheel activo a veces ignora la petición o la corta a
        medias si el usuario sigue tocando el wheel. Para tener
        scroll determinista en ambas direcciones pausamos el bucle
        de Lenis, animamos con RAF manual, y al terminar volcamos la
        posición final en Lenis con `immediate:true` para que no
        snape de vuelta cuando lo reanudamos. */
  const handleClick = (id) => {
    const target = document.getElementById(id);
    if (!target) return;

    /* (1) Y absoluta del target en coordenadas de documento.
       --------------------------------------------------------------
       Como TODAS las `.section` son sticky, ni `getBoundingClientRect`
       ni `offsetTop` del target son fiables. La técnica más robusta
       es iterar los hermanos anteriores del target dentro de
       `.section-stack` y sumar sus alturas + márgenes-top declarados,
       que SÍ reflejan la geometría de layout. */
    const wrapper = target.closest('.section-stack');
    let top = 0;
    if (wrapper) {
      const wrapperY =
        wrapper.getBoundingClientRect().top + (window.scrollY || 0);
      let acc = 0;
      const sections = Array.from(wrapper.children);
      for (let i = 0; i < sections.length; i++) {
        const sec = sections[i];
        if (sec === target) break;
        // Altura del bloque + el rail (margin-top) que aplica al SIGUIENTE
        // hermano. Usamos getComputedStyle por si el rail cambia (responsive).
        acc += sec.offsetHeight || 0;
        const next = sections[i + 1];
        if (next) {
          const mt = parseFloat(getComputedStyle(next).marginTop) || 0;
          acc += mt;
        }
      }
      top = wrapperY + acc;
    } else {
      // Fallback genérico para rutas sin section-stack.
      let node = target;
      while (node) {
        top += node.offsetTop || 0;
        node = node.offsetParent;
      }
    }

    // Diagnóstico — pega esto en consola si el scroll sigue mal y
    // así sabemos si el problema es la Y, Lenis, o algo más.
    if (typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.info('[SectionIndicator] scrollTo', {
        id,
        targetY: top,
        currentY: window.scrollY,
        delta: top - (window.scrollY || 0),
      });
    }

    /* (2) Animación RAF manual, con Lenis pausado. */
    const pauseFn =
      typeof window !== 'undefined' ? window.__lenisPause : null;
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    if (typeof pauseFn === 'function') pauseFn(true);

    const start = window.scrollY || 0;
    const distance = top - start;
    if (Math.abs(distance) < 2) {
      if (typeof pauseFn === 'function') pauseFn(false);
      return;
    }

    const duration = 1100;
    const startTime = performance.now();
    const easing = (t) => 1 - Math.pow(1 - t, 3);

    const animate = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const y = start + distance * easing(t);
      // Forzar el scroll en ambos posibles roots para cubrir el caso
      // de body como scroll container (overflow-x:hidden lo convierte
      // en uno en algunos navegadores).
      window.scrollTo(0, y);
      if (document.documentElement) document.documentElement.scrollTop = y;
      if (document.body) document.body.scrollTop = y;

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        if (lenis && typeof lenis.scrollTo === 'function') {
          lenis.scrollTo(top, { immediate: true });
        }
        if (typeof pauseFn === 'function') pauseFn(false);
      }
    };
    requestAnimationFrame(animate);
  };

  return (
    <nav
      className={`section-indicator${isVisible ? ' is-visible' : ''}`}
      aria-label="Secciones de la página"
      aria-hidden={!isVisible}
    >
      {/* Items en flex con gap 48px (Figma 157:223 v3). Sin separadores
          ni inner container — el padding lateral del nav reserva el aire
          a izquierda/derecha y los items se agrupan a la izquierda con
          align-items: start. Si un item lleva `icon`, se renderiza junto
          al label con gap 8px (matching los grupos del Figma 158:238 / 239
          / 247). */}
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          isActive={item.id === activeId}
          onClick={() => handleClick(item.id)}
        />
      ))}
    </nav>
  );
}

/* Item del indicador. Estructura icon + label con gap 8 (Figma 158:238).
   El icono es opcional — algunas secciones (Roadmap, MVP intro) no
   llevan pictograma específico. El label es siempre Mona Sans 16px; la
   única diferencia entre activo e inactivo es el color (white vs 20%
   white) — sin saltos de fuente que descoloquen al usuario al cambiar
   de tab. */
function Item({ item, isActive, onClick }) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      className={`section-indicator-item${isActive ? ' is-active' : ''}`}
      aria-current={isActive ? 'true' : undefined}
      onClick={onClick}
    >
      {Icon ? <Icon size={16} className="section-indicator-icon" /> : null}
      <span className="section-indicator-label">{item.label}</span>
    </button>
  );
}
