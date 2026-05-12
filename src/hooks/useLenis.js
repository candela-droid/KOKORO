import { useEffect } from 'react';
import Lenis from 'lenis';

/* Breakpoint compartido con useStackScroll y los overrides CSS de móvil.
   Por debajo de 1024px tratamos el dispositivo como táctil/portátil
   pequeño y devolvemos al navegador el control del scroll (nativo). */
const MOBILE_QUERY = '(max-width: 1024px)';

/**
 * Inicializa smooth-scroll global tipo AG1 / Nomad.
 *
 * En móvil (≤ 1024px) NO se inicializa Lenis: queremos scroll nativo del
 * navegador para que no haya momentum extra ni interferencias con el
 * scroll del navegador. Si el viewport cambia de tamaño (rotación,
 * desktop a tablet emulada) reinicia el efecto.
 */
export default function useLenis() {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    if (window.matchMedia && window.matchMedia(MOBILE_QUERY).matches) {
      // Móvil: scroll nativo, sin Lenis.
      return undefined;
    }
    /* Configuración mayo 2026 (segunda iteración):
       - smoothWheel: true  → vuelve el suavizado de Lenis para acompañar
         el stack-scroll "presentación". Sin esto, la rueda discreta hacía
         que las transiciones pinned→rail→siguiente se vieran stepped.
       - lerp: 0.14 (más alto que el 0.08 original) → reduce el momentum
         que el usuario notaba antes ("la página se sigue moviendo después
         de soltar"). Mayor lerp = el target alcanza al input más rápido.
       - duration: 1.0 (más corto que el 1.4 original) → scrollTo
         programáticos (hero cue, SectionIndicator) más reactivos sin
         perder el carácter suave. */
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.14,
    });

    let rafId;
    let paused = false;
    function raf(time) {
      // Si está pausado, NO llamamos lenis.raf — así Lenis no toca el scroll
      // y un scroll programático externo (window.scrollTo, scrollTop=) no
      // se ve sobreescrito. Útil para que SectionAnchors anime él solo.
      if (!paused) lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    // Exponer la instancia + el control real de pausa al window. La pausa
    // del loop RAF es la única forma fiable de que Lenis no interfiera con
    // un scroll programático: lenis.stop() solo cambia un flag interno y
    // dependiendo de la versión sigue tocando el scroll en cada frame.
    if (typeof window !== 'undefined') {
      window.__lenis = lenis;
      window.__lenisPause = (p) => {
        paused = !!p;
      };
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (typeof window !== 'undefined' && window.__lenis === lenis) {
        delete window.__lenis;
        delete window.__lenisPause;
      }
    };
  }, []);
}
