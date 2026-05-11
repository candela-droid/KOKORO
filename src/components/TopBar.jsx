import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { brand } from '../data/content.js';
import { Link, useRouter } from '../router.jsx';
import { Sun, Moon, Download, Menu, Close } from './Icons.jsx';
import useTheme from '../hooks/useTheme.js';
import './TopBar.css';

const NAV = [
  { to: '/', label: 'Kokoro', exact: true },
  { to: '/modelo', label: 'Negocio' },
  { to: '/mvp', label: 'MVP' },
];

/**
 * Top bar global. Logo + acciones a la derecha.
 *
 * Desktop (>= 901px): pill nav inline + toggle de tema + botón Descargar
 * dossier.
 *
 * Móvil (<= 900px): logo + toggle de tema + botón hamburguesa a la
 * derecha que abre un overlay negro full-screen (entrando por la
 * derecha) con la navegación grande y la acción de descargar dossier.
 *
 * El componente vive en un wrap fijo arriba del viewport con auto-hide
 * al scrollear hacia abajo (translate -100%) y reaparición al subir.
 * El auto-hide se desactiva mientras el menú móvil está abierto.
 */
export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Bloqueamos el scroll del body mientras el menú móvil está abierto
  // (overflow: hidden + clase para que useStackScroll/Lenis ignoren).
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('is-menu-open');
      // Cerrar con Esc
      const onKey = (e) => {
        if (e.key === 'Escape') setMenuOpen(false);
      };
      window.addEventListener('keydown', onKey);
      return () => {
        document.body.classList.remove('is-menu-open');
        window.removeEventListener('keydown', onKey);
      };
    }
    return undefined;
  }, [menuOpen]);

  // Cerrar el menú al cambiar de ruta.
  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  return (
    <>
      <div className={`navbar-wrap ${hidden && !menuOpen ? 'is-hidden' : ''}`}>
        <header className={`top-bar ${scrolled ? 'is-scrolled' : ''}`}>
          <Link to="/" className="tb-logo" exact aria-label={`${brand.name} — inicio`}>
            <span className="tb-mark">{brand.name}</span>
          </Link>

          <div className="tb-actions">
            {/* Pill nav — sólo desktop */}
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
            </nav>

            {/* Toggle tema — visible siempre */}
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

            {/* Descargar dossier — desktop. En móvil va dentro del drawer. */}
            <a
              className="tb-icon-btn tb-icon-btn-desktop"
              href="/dossier.pdf"
              download="KOKORO-dossier.pdf"
              aria-label="Descargar dossier en PDF"
            >
              <Download size={20} />
            </a>

            {/* Hamburguesa — sólo móvil */}
            <button
              type="button"
              className="tb-icon-btn tb-menu-btn"
              aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <Menu size={22} />
            </button>
          </div>
        </header>
      </div>

      <MobileMenu
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        path={path}
      />
    </>
  );
}

/* Drawer móvil: pantalla negra full-screen entrando desde la derecha
   con la navegación tipográfica grande + toggle tema + descarga del
   dossier. Backdrop a su izquierda para cerrar al tocar fuera. */
function MobileMenu({ open, onClose, path }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="mobile-menu-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.aside
            id="mobile-menu"
            className="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú principal"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-menu-top">
              <span className="mobile-menu-logo">{brand.name}</span>
              <button
                type="button"
                className="tb-icon-btn"
                aria-label="Cerrar menú"
                onClick={onClose}
              >
                <Close size={22} />
              </button>
            </div>

            <nav className="mobile-menu-nav" aria-label="Navegación principal">
              {NAV.map((item, i) => {
                const isActive = path === item.to;
                return (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.45,
                      delay: 0.12 + i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      to={item.to}
                      exact={item.exact}
                      className={`mobile-menu-link ${isActive ? 'is-active' : ''}`}
                      onClick={onClose}
                    >
                      <span className="mobile-menu-link-num">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="mobile-menu-link-label">{item.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              className="mobile-menu-footer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: 0.32,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a
                className="mobile-menu-cta"
                href="/dossier.pdf"
                download="KOKORO-dossier.pdf"
                onClick={onClose}
              >
                <span>Descargar dossier</span>
                <Download size={20} />
              </a>
              <span className="mobile-menu-meta mono">
                KOKORO Foods · {brand.year}
              </span>
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
