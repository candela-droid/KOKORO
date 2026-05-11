import { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * Inicializa smooth-scroll global tipo AG1 / Nomad.
 */
export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      lerp: 0.08,
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
