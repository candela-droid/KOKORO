import { useEffect, useMemo } from 'react';
import useLenis from './hooks/useLenis.js';
import useStackScroll from './hooks/useStackScroll.js';
import TopBar from './components/TopBar.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import Cursor from './components/Cursor.jsx';
import { RouterProvider, useRouter } from './router.jsx';
import HomePage from './pages/HomePage.jsx';
import ModeloPage from './pages/ModeloPage.jsx';
import MvpPage from './pages/MvpPage.jsx';

const ROUTES = {
  '/': HomePage,
  '/modelo': ModeloPage,
  '/mvp': MvpPage,
};

function NotFound() {
  return (
    <section className="section" style={{ paddingTop: '20vh', textAlign: 'center' }}>
      <h1 className="display" style={{ fontSize: 'clamp(64px, 10vw, 160px)' }}>404</h1>
      <p style={{ marginTop: 24, color: 'var(--muted)' }}>
        Esta página no existe. Vuelve al inicio.
      </p>
      <a className="btn" href="/" style={{ marginTop: 32, display: 'inline-flex' }}>
        ← Volver
      </a>
    </section>
  );
}

function AppShell() {
  useLenis();
  useStackScroll();
  const { path } = useRouter();

  const Page = useMemo(() => ROUTES[path] || NotFound, [path]);

  // Smooth scroll a un hash si llega directo (#contacto, #valores...).
  // Sólo aplica en first-load con hash; la navegación entre rutas usa el
  // reset duro del router (window + Lenis + body/documentElement).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth' }), 400);
      }
    }
  }, [path]);

  return (
    <>
      <Cursor />
      <TopBar />

      <main>
        <Page />
      </main>

      <ScrollProgress />
    </>
  );
}

export default function App() {
  return (
    <RouterProvider>
      <AppShell />
    </RouterProvider>
  );
}
