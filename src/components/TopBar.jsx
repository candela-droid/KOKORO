import { useEffect, useState } from 'react';
import { brand } from '../data/content.js';
import { Link, useRouter } from '../router.jsx';
import { Sun, Moon, Projector } from './Icons.jsx';
import useTheme from '../hooks/useTheme.js';
import './TopBar.css';

const NAV = [
  { to: '/', label: 'Kokoro', exact: true },
  { to: '/modelo', label: 'Negocio' },
  { to: '/mvp', label: 'MVP' },
];

/**
 * Top bar global. Logo + acciones a la derecha (pill nav, sun, projector).
 *
 * El componente vive en un wrap fijo arriba del viewport con auto-hide al
 * scrollear hacia abajo (translate -100%) y reaparición al subir. La barra
 * de progreso global ya no vive aquí — está fija al pie del documento y la
 * monta App.jsx como sibling del main.
 */
export default function TopBar({ onPresent }) {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { path } = useRouter();
  const { theme, toggle } = useTheme();

  // Detección de scroll: scrolled (para fondo blur) + dirección (auto-hide).
  useEffect(() => {
    let lastY = window.scrollY || 0;
    let raf = null;

    const update = () => {
      raf = null;
      const y = window.scrollY || 0;
      const delta = y - lastY;

      setScrolled(y > 24);

      if (y < 80) {
        setHidden(false);
      } else if (delta > 4) {
        setHidden(true);
      } else if (delta < -4) {
        setHidden(false);
      }
      lastY = y;
    };

    const onScroll = () => {
      if (raf != null) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (raf != null) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`navbar-wrap ${hidden ? 'is-hidden' : ''}`}>
      <header className={`top-bar ${scrolled ? 'is-scrolled' : ''}`}>
        <Link to="/" className="tb-logo" exact aria-label={`${brand.name} — inicio`}>
          <span className="tb-mark">{brand.name}</span>
        </Link>

        <div className="tb-actions">
          <nav className="tb-nav-pill" aria-label="Navegación principal">
            {NAV.map((item) => {
              const isActive = path === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  exact={item.exact}
                  className={`tb-pill ${isActive ? 'is-active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            })}
            <a
              className="tb-pill"
              href="/dossier.pdf"
              download="KOKORO-dossier.pdf"
              aria-label="Descargar dossier en PDF"
            >
              Documentos
            </a>
          </nav>

          <button
            type="button"
            className="tb-icon-btn"
            aria-label={
              theme === 'dark' ? 'Activar modo claro' : 'Activar modo oscuro'
            }
            onClick={toggle}
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button
            type="button"
            className="tb-icon-btn"
            aria-label="Entrar en modo presentación"
            onClick={onPresent}
          >
            <Projector size={24} />
          </button>
        </div>
      </header>
    </div>
  );
}
