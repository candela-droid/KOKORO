import { useEffect, useRef } from 'react';
import './Cursor.css';

/**
 * Cursor custom — una bola blanca que sigue al puntero con lerp suave.
 * Usa `mix-blend-mode: difference` para invertir el color del fondo: sobre
 * texto blanco aparece negro (efecto "agujero" que deja leer el texto en
 * negativo), sobre el bg dark aparece casi blanco.
 *
 * Crece sutilmente al hover de elementos interactivos (a, button, [role=button]).
 *
 * Se desactiva en touch devices (pointer:coarse) — ahí no hay cursor.
 * Se oculta también en modo presentación.
 */
export default function Cursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // En dispositivos touch puros, no mostrar cursor custom.
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    const cursor = cursorRef.current;
    if (!cursor) return;

    let raf = null;
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let curX = mouseX;
    let curY = mouseY;
    let visible = false;

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        cursor.classList.add('is-visible');
      }
    };

    const onLeave = () => {
      visible = false;
      cursor.classList.remove('is-visible');
    };

    const onDown = () => cursor.classList.add('is-pressed');
    const onUp = () => cursor.classList.remove('is-pressed');

    // Hover sobre interactivos: bola más grande
    const onOver = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      // Pills del módulo "vacío vs respuesta": la bola se esconde
      // para dejar que el cursor nativo de "grab" aparezca como
      // afordancia clara de drag.
      if (t.closest('.vacio-pill')) {
        cursor.classList.add('is-grab');
      }
      if (t.closest('a, button, [role="button"], .anchor-btn, .kk-tab, .plan-dot')) {
        cursor.classList.add('is-hover');
      }
    };
    const onOut = (e) => {
      const t = e.target;
      if (!t || !t.closest) return;
      if (t.closest('.vacio-pill')) {
        cursor.classList.remove('is-grab');
      }
      if (t.closest('a, button, [role="button"], .anchor-btn, .kk-tab, .plan-dot')) {
        cursor.classList.remove('is-hover');
      }
    };

    const tick = () => {
      // Lerp suave para el follow
      curX += (mouseX - curX) * 0.22;
      curY += (mouseY - curY) * 0.22;
      cursor.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    document.documentElement.classList.add('has-custom-cursor');
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver, { passive: true });
    document.addEventListener('mouseout', onOut, { passive: true });
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={cursorRef} className="cursor" aria-hidden="true" />;
}
