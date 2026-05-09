import { useEffect, useRef } from 'react';
import './ScrollProgress.css';

/**
 * Barra horizontal que indica el progreso de scroll del documento.
 * Vive justo debajo del TopBar dentro del mismo wrap fijo. Cuando el wrap
 * se traslada hacia arriba para ocultar el navbar, la barra de progreso se
 * queda visible al borde superior del viewport (porque el wrap se mueve
 * exactamente la altura del navbar — la altura de esta barra queda dentro
 * del viewport).
 *
 * El relleno se anima vía transform: scaleX para evitar reflows.
 */
export default function ScrollProgress() {
  const fillRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const update = () => {
      rafRef.current = null;
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const y = window.scrollY || window.pageYOffset || 0;
      const progress = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      if (fillRef.current) {
        fillRef.current.style.transform = `scaleX(${progress.toFixed(4)})`;
      }
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
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div className="scroll-progress-fill" ref={fillRef} />
    </div>
  );
}
