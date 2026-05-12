import { useEffect, useRef } from 'react';
import './ScrollProgress.css';

/**
 * Barra horizontal que indica el progreso de scroll del documento.
 * Vive PEGADA al pie del viewport (bottom: 0, height 4px) — versión v2:
 * antes estaba apilada sobre la SectionIndicator, ahora la indicator se
 * desplaza para quedar JUSTO ENCIMA usando `--scroll-progress-h`.
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
