import { useEffect, useState, useCallback } from 'react';

/**
 * Hook de gestión de tema (dark / light).
 *
 * Estrategia:
 * 1. Lee preferencia guardada en localStorage ('kokoro-theme').
 * 2. Si no hay guardada, sigue `prefers-color-scheme` del sistema.
 * 3. Aplica el tema con `data-theme="dark|light"` en <html>, lo que activa
 *    los tokens de :root[data-theme='light'] definidos en global.css.
 * 4. Persiste cualquier cambio del usuario.
 *
 * Devuelve { theme, toggle, setTheme } para que cualquier componente pueda
 * leer y cambiar.
 */

const STORAGE_KEY = 'kokoro-theme';

const getInitialTheme = () => {
  if (typeof window === 'undefined') return 'dark';
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
  } catch (_) {
    /* ignore */
  }
  // Si no hay preferencia guardada, miramos la del sistema.
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
    return 'light';
  }
  return 'dark';
};

export default function useTheme() {
  const [theme, setThemeState] = useState(getInitialTheme);

  // Aplicar el tema al <html> cada vez que cambia.
  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-theme', theme);
    // Sincronizar el meta theme-color para la barra del navegador móvil.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
      meta.setAttribute('content', theme === 'light' ? '#f5f3ee' : '#0a0a0a');
    }
  }, [theme]);

  const setTheme = useCallback((next) => {
    setThemeState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch (_) {
      /* ignore (modo privado, etc.) */
    }
  }, []);

  const toggle = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch (_) {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggle, setTheme };
}
