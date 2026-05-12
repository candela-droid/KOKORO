import { useEffect } from 'react';

/* Breakpoint compartido con useLenis y los overrides CSS de móvil.
   Por debajo de 1024px desactivamos el stack-scroll y dejamos que las
   secciones fluyan en scroll nativo, una debajo de otra. */
const MOBILE_QUERY = '(max-width: 1024px)';

/**
 * Stack-scroll: anima cada sección dentro de `.section-stack` mientras la
 * SIGUIENTE sección sube y la cubre.
 *
 * Cada sección está pinned (sticky) al top del viewport. Entre secciones
 * hay un "rail" (margin-top vh) que crea un STOP donde la sección está
 * sola en pantalla. Cuando empieza a aparecer la siguiente desde abajo,
 * arrancamos un sutil scale + brightness sobre la actual para reforzar la
 * sensación de que está siendo "empujada hacia atrás".
 *
 * Progreso (0..1) de "leave" para cada sección = cuánto ha entrado la
 * siguiente sección al viewport. 0 = la siguiente aún está fuera (o tocando
 * el borde inferior); 1 = la siguiente ha alcanzado el top:0.
 *
 * En móvil (≤ 1024px) el hook no se engancha al scroll: el CSS responsive
 * neutraliza sticky + rail y las secciones se apilan en flujo normal sin
 * scale/brightness aplicado.
 */
export default function useStackScroll() {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia && window.matchMedia(MOBILE_QUERY).matches) {
      // Móvil: nos aseguramos de limpiar cualquier var que se hubiera
      // colado por un cambio de breakpoint y salimos sin engancharnos.
      const sections = document.querySelectorAll('.section-stack > .section');
      sections.forEach((s) => {
        s.style.removeProperty('--ss-scale');
        s.style.removeProperty('--ss-brightness');
      });
      return;
    }

    let raf = null;
    let lastY = -1;

    const update = () => {
      raf = null;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      if (scrollY === lastY) return;
      lastY = scrollY;

      const sections = Array.from(
        document.querySelectorAll('.section-stack > .section'),
      );
      const vh = window.innerHeight;

      sections.forEach((section, i) => {
        // Próximo elemento que cubrirá esta sección. Para las intermedias
        // es la siguiente sección. Para la ÚLTIMA, es el primer hermano de
        // .section-stack que tenga altura (típicamente el page-footer).
        let nextEl = sections[i + 1];
        if (!nextEl) {
          const stack = section.parentElement;
          let sibling = stack ? stack.nextElementSibling : null;
          while (sibling && sibling.offsetHeight === 0) {
            sibling = sibling.nextElementSibling;
          }
          nextEl = sibling;
        }

        if (!nextEl) {
          section.style.setProperty('--ss-scale', '1');
          section.style.setProperty('--ss-brightness', '1');
          return;
        }

        // Top del elemento que cubre, en coordenadas de viewport.
        // > vh: está fuera de pantalla por debajo (no ha empezado).
        // = vh: justo asomando por el borde inferior.
        // = 0: pegado al top (cubre la actual del todo).
        // < 0: ya pasó (sección actual fuera, deja de animar).
        const nextTop = nextEl.getBoundingClientRect().top;
        const progress = Math.max(0, Math.min(1, (vh - nextTop) / vh));

        const scale = 1 - progress * 0.04;
        const brightness = 1 - progress * 0.18;
        section.style.setProperty('--ss-scale', scale.toFixed(3));
        section.style.setProperty('--ss-brightness', brightness.toFixed(3));
      });
    };

    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
      const sections = document.querySelectorAll('.section-stack > .section');
      sections.forEach((s) => {
        s.style.removeProperty('--ss-scale');
        s.style.removeProperty('--ss-brightness');
      });
    };
  }, []);
}
