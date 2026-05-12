import { useEffect, useMemo } from 'react';
import useLenis from './hooks/useLenis.js';
import useStackScroll from './hooks/useStackScroll.js';
import TopBar from './components/TopBar.jsx';
import SectionIndicator from './components/SectionIndicator.jsx';
import {
  SealQuestion,
  Files,
  UsersThree,
  Globe,
  Star,
  Lifebuoy,
  Trophy,
  Receipt,
} from './components/SectionIcons.jsx';
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

/* Items por ruta para el SectionIndicator (Figma 157:223 v3). Excluímos
   el hero porque en el strip se asume que el visitante ya está "dentro"
   del documento. Los ids tienen que existir en los <section> de
   Sections.jsx — coincide con los ids declarados allí. Cada item lleva
   también su icono Phosphor 16px (ver SectionIcons.jsx). En las rutas
   donde aún no hay icono específico (MVP, Roadmap) el item se renderiza
   sólo con texto. */
const SECTION_ITEMS_BY_ROUTE = {
  '/': [
    { id: 'que-es', label: 'Qué es', icon: SealQuestion },
    { id: 'sobre-kokoro', label: 'Sobre Kokoro', icon: Files },
    { id: 'equipo', label: 'Equipo', icon: UsersThree },
  ],
  '/modelo': [
    { id: 'vacio', label: 'Vacío de mercado', icon: Globe },
    { id: 'solucion', label: 'Solución', icon: Star },
    { id: 'motor', label: 'Motor de escala', icon: Lifebuoy },
    { id: 'ventaja', label: 'Ventaja', icon: Trophy },
  ],
  '/mvp': [
    { id: 'mvp-intro', label: 'MVP' },
    { id: 'caja', label: 'Proyección', icon: Receipt },
    { id: 'roadmap', label: 'Roadmap' },
  ],
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
  const sectionItems = SECTION_ITEMS_BY_ROUTE[path] || [];

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

      <SectionIndicator items={sectionItems} />
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
