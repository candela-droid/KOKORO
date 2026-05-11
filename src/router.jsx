import { createContext, useContext, useEffect, useState, useCallback } from 'react';

/**
 * Mini-router client-side, sin dependencias.
 * Suficiente para 3 páginas estáticas con history.pushState.
 *
 * Uso:
 *   const { path, navigate } = useRouter();
 *   <Link to="/modelo">Modelo</Link>
 */

const RouterContext = createContext(null);

export function RouterProvider({ children }) {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname || '/'
  );

  // Sync con back/forward del navegador
  useEffect(() => {
    const onPop = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const navigate = useCallback((to, { replace = false } = {}) => {
    if (typeof window === 'undefined') return;
    if (window.location.pathname === to) return;
    if (replace) {
      window.history.replaceState({}, '', to);
    } else {
      window.history.pushState({}, '', to);
    }
    setPath(to);
    // Reset duro de scroll. Llamamos por triplicado para pisar cualquier
    // estado en curso: Lenis con immediate+force ignora el lerp activo,
    // window.scrollTo bypassa el smooth-scroll del navegador, y los
    // scrollTop directos cubren navegadores que en ocasiones pintan
    // el árbol nuevo en la posición vieja del documentElement/body.
    if (window.__lenis?.scrollTo) {
      window.__lenis.scrollTo(0, { immediate: true, force: true });
    }
    try {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    } catch {
      window.scrollTo(0, 0);
    }
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;
    // Doble RAF: vuelve a forzar el reset una vez React ha commit-eado
    // el árbol nuevo y el browser ha hecho layout. Sin esto, a veces el
    // scroll del nuevo árbol queda en la misma Y que tenía el viejo.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (window.__lenis?.scrollTo) {
          window.__lenis.scrollTo(0, { immediate: true, force: true });
        }
        window.scrollTo(0, 0);
      });
    });
  }, []);

  return (
    <RouterContext.Provider value={{ path, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error('useRouter debe usarse dentro de <RouterProvider>');
  return ctx;
}

export function Link({ to, children, className, activeClassName, exact = false, onClick, ...rest }) {
  const { path, navigate } = useRouter();
  const isActive = exact ? path === to : path === to || path.startsWith(to + '/');
  const handleClick = (e) => {
    // Permite cmd/ctrl-click para abrir en nueva pestaña
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    onClick?.(e);
    navigate(to);
  };
  return (
    <a
      href={to}
      onClick={handleClick}
      className={[className, isActive && activeClassName].filter(Boolean).join(' ')}
      data-active={isActive ? 'true' : undefined}
      {...rest}
    >
      {children}
    </a>
  );
}
