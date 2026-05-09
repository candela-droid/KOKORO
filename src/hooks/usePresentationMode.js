import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Modo presentación tipo deck.
 * - Tecla "P" o botón → entra
 * - Flechas / Espacio → siguiente
 * - Backspace / Shift+Espacio → anterior
 * - Esc → salir
 *
 * Detecta automáticamente las "slides" de la página actual mirando
 * los nodos con [data-slide] (cada <section data-slide>).
 * Esto hace que funcione igual con / o con /modelo o /mvp.
 */
export default function usePresentationMode() {
  const [isPresenting, setIsPresenting] = useState(false);
  const [index, setIndex] = useState(0);
  const [slides, setSlides] = useState([]);

  // Recolecta los nodos cada vez que entramos en presentación
  // (para reflejar la página actual sin lógica de routing extra)
  const refreshSlides = useCallback(() => {
    const nodes = Array.from(document.querySelectorAll('[data-slide]'));
    setSlides(nodes);
    return nodes;
  }, []);

  const enter = useCallback(() => {
    refreshSlides();
    setIndex(0);
    setIsPresenting(true);
  }, [refreshSlides]);

  const exit = useCallback(() => {
    setIsPresenting(false);
  }, []);

  const next = useCallback(() => {
    setIndex((i) => Math.min(slides.length - 1, i + 1));
  }, [slides.length]);

  const prev = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  // Toggle body class for global CSS hooks
  useEffect(() => {
    if (isPresenting) {
      document.body.classList.add('is-presenting');
    } else {
      document.body.classList.remove('is-presenting');
    }
  }, [isPresenting]);

  // Scroll a la sección activa cuando cambia el índice
  useEffect(() => {
    if (!isPresenting) return;
    const target = slides[index];
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [index, isPresenting, slides]);

  // Keyboard listener
  useEffect(() => {
    const onKey = (e) => {
      // Toggle global con "P" (no en input)
      if (e.key === 'p' || e.key === 'P') {
        const tag = (e.target?.tagName || '').toLowerCase();
        if (tag === 'input' || tag === 'textarea') return;
        e.preventDefault();
        if (!isPresenting) {
          refreshSlides();
          setIndex(0);
        }
        setIsPresenting((v) => !v);
        return;
      }

      if (!isPresenting) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        exit();
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !e.shiftKey)) {
        e.preventDefault();
        next();
        return;
      }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp' || (e.key === ' ' && e.shiftKey) || e.key === 'Backspace') {
        e.preventDefault();
        prev();
        return;
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isPresenting, next, prev, exit, refreshSlides]);

  const total = useMemo(() => slides.length, [slides]);

  return { isPresenting, index, total, enter, exit, next, prev };
}
