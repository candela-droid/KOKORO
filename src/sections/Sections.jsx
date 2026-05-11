import {
  Fragment,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  motion,
  useMotionValue,
  AnimatePresence,
  useMotionValueEvent,
} from 'framer-motion';
import Matter from 'matter-js';
import {
  brand,
  kokoroMeaning,
  ejecutivo,
  problema,
  gap,
  mision,
  vision,
  valores,
  equipo,
  canvas,
  kiosco,
  fases,
  referencias,
  contacto,
  negocio,
  sobreKokoro,
  roadmap,
} from '../data/content.js';
import RevealText from '../components/RevealText.jsx';
import CountUp from '../components/CountUp.jsx';
import {
  ArrowDownward,
  ArrowOutward,
  ChevronLeft,
  ChevronRight,
  Intersect,
  Repeat,
  Tag,
} from '../components/Icons.jsx';

/* Mapping para resolver el icono por slug en data (Sección "La solución
   disruptiva" — content.solucion.cells[i].icon). */
const SOLUCION_ICONS = { repeat: Repeat, tag: Tag, intersect: Intersect };
import './sections.css';

const fade = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* ----------------------------- HERO (Figma 104:488) -------------- */
/* Patrón Figma: KOKORO Host Grotesk 250px tracking -12.5px line 0.8
   centrado vertical + horizontal. Cue inferior: "más información"
   IBM Plex Mono 16px uppercase + icono arrow_downward 24px debajo. */
export function Hero() {
  return (
    <section id="hero" className="section hero" data-slide>
      <motion.h1
        className="hero-mark"
        initial={{ opacity: 0, letterSpacing: '0.05em' }}
        animate={{ opacity: 1, letterSpacing: '-0.05em' }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        {brand.name}
      </motion.h1>

      <motion.div
        className="hero-cue"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.2 }}
      >
        <span className="hero-cue-label">más información</span>
        <span className="hero-cue-arrow" aria-hidden="true">
          <ArrowDownward size={24} />
        </span>
      </motion.div>
    </section>
  );
}

/* --------------------- POR QUÉ "KOKORO" -------------------------- */
export function KokoroMeaning() {
  return (
    <section id="kokoro" className="section section-meaning" data-slide>
      <div className="section-narrow">
        <div className="meaning-eyebrow-row">
          <span className="mono">01 — El nombre</span>
          <span className="mono muted">Por qué Kokoro</span>
        </div>
        <motion.div
          className="kokoro-jp"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-15% 0px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {kokoroMeaning.jp}
        </motion.div>
        <motion.p
          className="kokoro-meaning"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          {kokoroMeaning.body}{' '}
          <span className="emph">{kokoroMeaning.italic}</span>
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------------- QUÉ ES (Figma 151:215) ----------------------
   Layout a dos columnas (mismo patrón que MvpIntro): título Host 120px
   a la izquierda + body 28px a la derecha. Padding 128 / gap 156.
   Body en dos párrafos Mona Sans con fragmento en Instrument Serif
   italic intercalado en el primero. */
export function Resumen() {
  return (
    <section id="que-es" className="section" data-slide>
      <div className="intro-dual">
        <h2 className="intro-dual-title">
          <RevealText as="span" className="intro-dual-title-line">
            Qué es
          </RevealText>
        </h2>
        <motion.div
          className="intro-dual-body"
          variants={fade}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <p className="intro-dual-para">
            {ejecutivo.intro}{' '}
            <span className="intro-dual-italic">{ejecutivo.italic}</span>
          </p>
          <p className="intro-dual-para">{ejecutivo.closer}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------------------- TABBED REVEAL ------------------------------
   Componente compartido por "Sobre Kokoro" (Figma 151:192) y "Roadmap"
   (Figma 151:201). Layout idéntico — título a dos líneas, fila de tabs,
   body 28px ancho 672px — y misma mecánica de interacción.

   Detalles importantes de la interacción:

   1. Layout estable. Los cuerpos viven todos en la misma celda de un
      CSS Grid 1×1 (`.sobre-body-stack`). El contenedor reserva siempre
      la altura del cuerpo más largo, así que al cambiar de tab el
      título y las pestañas no se mueven; sólo cambia el texto activo.

   2. Revelado palabra a palabra. El cuerpo se parte en tokens (palabra
      regular o palabra italic). Cada palabra es un motion.span que
      entra desde abajo con blur y stagger (~25ms entre palabras) al
      activarse, y sale hacia arriba con blur (sin stagger) al perder
      foco. Da una sensación editorial y premium en lugar del fade plano.

   3. Indicador de tab. La pestaña activa lleva un subrayado de 1px que
      usa `layoutId` de framer-motion: al pulsar otra pestaña, el
      indicador se desliza con un spring entre posiciones (con cambio
      automático de ancho — el tab activo es italic serif y mide
      distinto que los inactivos en sans). */

function TabbedReveal({ id, titleLines, tabs, layoutId, anchor = 'stack' }) {
  const [active, setActive] = useState(0);
  const isSplit = anchor === 'split';

  /* Bloque tabs + cuerpos. Se renderiza tal cual en anchor='stack'
     (Roadmap) o envuelto en .sobre-group cuando anchor='split'
     (Sobre Kokoro) para que el justify-between del stack empuje el
     conjunto hacia abajo y deje el título arriba. */
  const tabsAndBody = (
    <>
      <motion.div
        className="sobre-tabs"
        role="tablist"
        variants={fade}
        custom={1}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-15% 0px' }}
      >
        {tabs.map((t, i) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={`sobre-tab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="sobre-tab-label">{t.label}</span>
            {i === active && (
              <motion.span
                layoutId={layoutId}
                className="sobre-tab-indicator"
                aria-hidden="true"
                transition={{ type: 'spring', stiffness: 380, damping: 32 }}
              />
            )}
          </button>
        ))}
      </motion.div>

      {/* Stack de cuerpos: todos viven en la misma celda del grid (.sobre-
          body-stack). El contenedor toma la altura del cuerpo más largo
          y el resto se mantiene invisible pero ocupando espacio, por lo
          que el título y las pestañas no se mueven al cambiar de tab. */}
      <div className="sobre-body-stack">
        {tabs.map((t, i) => (
          <SobreBody key={t.key} tab={t} isActive={i === active} />
        ))}
      </div>
    </>
  );

  return (
    <section
      id={id}
      className={`section section-sobre${isSplit ? ' is-split' : ''}`}
      data-slide
    >
      <div className={`sobre-stack${isSplit ? ' is-split' : ''}`}>
        {/* Título: cada línea es un RevealText independiente con un pequeño
            delay creciente para que aparezcan en cascada. RevealText anima
            cada palabra deslizándose desde abajo (mask vía overflow:hidden
            en cada palabra), exactamente el mismo lenguaje del resto de
            títulos del site. */}
        <h2 className="sobre-title">
          {titleLines.map((line, i) => (
            <RevealText
              key={i}
              as="span"
              className="sobre-title-line"
              delay={i * 0.08}
            >
              {line}
            </RevealText>
          ))}
        </h2>

        {isSplit ? <div className="sobre-group">{tabsAndBody}</div> : tabsAndBody}
      </div>
    </section>
  );
}

/* Body con revelado palabra-a-palabra. Tokeniza el body regular + el
   tramo italic en arrays de palabras y renderiza cada una como un
   motion.span con stagger. La salida (cuando isActive pasa a false) es
   rápida y simétrica (todas las palabras a la vez); la entrada lleva
   delay i*0.025 para construir la frase de izquierda a derecha. */
function SobreBody({ tab, isActive }) {
  const words = useMemo(() => {
    const split = (str, italic) =>
      String(str || '')
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .map((text) => ({ text, italic }));
    return [...split(tab.body, false), ...split(tab.italic, true)];
  }, [tab]);

  return (
    <p
      className={`sobre-body ${isActive ? 'is-active' : ''}`}
      aria-hidden={!isActive}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          className={`sobre-word${w.italic ? ' is-italic' : ''}`}
          initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
          animate={
            isActive
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: -6, filter: 'blur(6px)' }
          }
          transition={{
            duration: isActive ? 0.55 : 0.28,
            delay: isActive ? i * 0.025 : 0,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {w.text}
        </motion.span>
      ))}
    </p>
  );
}

export function SobreKokoro() {
  return (
    <TabbedReveal
      id="sobre-kokoro"
      titleLines={sobreKokoro.title}
      tabs={sobreKokoro.tabs}
      layoutId="sobre-kokoro-indicator"
      anchor="split"
    />
  );
}

export function Roadmap() {
  return (
    <TabbedReveal
      id="roadmap"
      titleLines={[roadmap.title]}
      tabs={roadmap.tabs}
      layoutId="roadmap-indicator"
    />
  );
}

/* ---------------------- MVP INTRO (Figma 151:212) ----------------
   Mismo layout que "Qué es": 2 columnas Host 120px (izquierda, en
   tres líneas Mínimo / Producto / Viable) + body 28px Mona Sans con
   fragmento en Instrument Serif italic. Reusa las clases compartidas
   .intro-dual-* para no duplicar CSS. */
export function MvpIntro() {
  const titleLines = ['Mínimo', 'Producto', 'Viable'];
  return (
    <section id="mvp-intro" className="section" data-slide>
      <div className="intro-dual">
        <h2 className="intro-dual-title">
          {titleLines.map((line, i) => (
            <RevealText
              key={i}
              as="span"
              className="intro-dual-title-line"
              delay={i * 0.06}
            >
              {line}
            </RevealText>
          ))}
        </h2>
        <motion.div
          className="intro-dual-body"
          variants={fade}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <p className="intro-dual-para">
            {ejecutivo.intro}{' '}
            <span className="intro-dual-italic">{ejecutivo.italic}</span>
          </p>
          <p className="intro-dual-para">{ejecutivo.closer}</p>
        </motion.div>
      </div>
    </section>
  );
}

/* --------------------------- PROBLEMA (Figma 104:617) ------------ */
/* Patrón: header centrado (eyebrow + título Host 80px text-center)
   + bloque border-y #3c3c3c con 3 columnas flex-1 separadas por
   líneas verticales finas, cada una px-32 py-64 gap-24 items-center
   (eyebrow centrado + body Mona Sans 18px text-center). */
export function Problema() {
  const eyebrows = ['No hay seguridad', 'Exclusión', 'Renuncia'];

  return (
    <section id="problema" className="section" data-slide>
      <div className="kk-stack kk-stack-64">
        <motion.div
          className="kk-header kk-header-center"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <span className="kk-eyebrow">problema</span>
          <RevealText as="h2" className="kk-title kk-title-center">
            Problema y dolor real
          </RevealText>
        </motion.div>

        <div className="kk-rule-block">
          {problema.bullets.map((b, i) => (
            <motion.div
              key={i}
              className="kk-rule-cell"
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
            >
              <span className="kk-eyebrow">{eyebrows[i]}</span>
              <p className="kk-body kk-body-center">{b}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- GAP (Figma 104:653) --------------- */
/* Patrón: header alineado a la izquierda (eyebrow + título Host 80px)
   + 3 columnas gap-64 items-start, cada una con un icono arrow_outward
   ↗ 18px arriba y body Mona Sans 18px tracking -0.54px debajo. */
export function Gap() {
  return (
    <section id="gap" className="section" data-slide>
      <div className="kk-stack kk-stack-128">
        <motion.div
          className="kk-header"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <span className="kk-eyebrow">contexto</span>
          <RevealText as="h2" className="kk-title">
            Por qué aún no está resuelto
          </RevealText>
        </motion.div>

        <div className="kk-arrow-grid">
          {gap.map((g, i) => (
            <motion.div
              key={i}
              className="kk-arrow-cell"
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
            >
              <span className="kk-arrow" aria-hidden="true">
                <ArrowOutward size={18} />
              </span>
              <p className="kk-body">{g}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- MVV (Figma 144:13) --------------------------- */
/* Slider tipográfico activado por scroll. La sección mide 200vh en el
   flujo del documento y queda pineada (sticky desde el padre) durante
   todo ese recorrido. El progreso de scroll se mapea a 3 tramos
   discretos — uno por slide (misión / visión / valores) — y al cambiar
   de tramo, el slide actual sale hacia arriba con fade y el siguiente
   entra desde abajo escribiéndose con efecto máquina de escribir
   (carácter a carácter, con cursor "_" parpadeante al final).

   Rail estándar de 100vh entre MVV y la siguiente sección. Sin él, la
   siguiente sección entraría por el borde inferior del viewport durante
   la segunda mitad del pin de MVV y cortaría visualmente el cuerpo. */

/**
 * Custom scroll-progress hook que devuelve un MotionValue con el progreso
 * (0 → 1) del scroll relativo al recorrido natural de la sección.
 *
 * El padre `.section-stack > .section` es `position: sticky`. Eso confunde
 * a useScroll en escenarios sticky-in-sticky: getBoundingClientRect().top
 * se queda en 0 mientras la sección está pineada, y el offset chain a
 * veces no resuelve bien con transform aplicado por useStackScroll. Aquí
 * usamos directamente window.scrollY relativo al offsetTop layout-based
 * de la sección — siempre fiable, ignora el pin.
 */
function useSectionScrollProgress(sectionRef) {
  const progress = useMotionValue(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    let sectionTop = 0;
    let sectionHeight = 0;

    const measure = () => {
      // offsetTop chain → posición natural en el documento, no afectada
      // por position: sticky/fixed de ningún ancestro.
      let top = 0;
      let node = el;
      while (node) {
        top += node.offsetTop || 0;
        node = node.offsetParent;
      }
      sectionTop = top;
      sectionHeight = el.offsetHeight || 1; // evitamos /0 en edge cases
    };

    const update = () => {
      const scrollY = window.scrollY || window.pageYOffset || 0;
      const raw = (scrollY - sectionTop) / sectionHeight;
      progress.set(Math.max(0, Math.min(1, raw)));
    };

    measure();
    update();

    const onScroll = () => update();
    const onResize = () => {
      measure();
      update();
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return progress;
}

const MVV_SLIDES = [
  { id: 'mision', label: 'misión', text: mision },
  { id: 'vision', label: 'visión', text: vision },
  {
    id: 'valores',
    label: 'valores',
    text: 'Honestidad. Inclusión. Excelencia. Confianza.',
  },
];

// Umbrales de scroll que marcan qué slide está activo. La sección mide
// 200vh en el documento; con 3 slides cada tramo es 1/3 ≈ 33%.
const SLIDE_THRESHOLDS = [0, 0.34, 0.67];

/* Layout fiel a Figma 144:13:
     - Padding 128px.
     - Columna izquierda: timeline vertical de 3 dots conectados por
       líneas finas; junto al dot activo aparece el label del slide
       ("MISIÓN" / "VISIÓN" / "VALORES") en mono uppercase 20px.
     - Columna derecha: texto del slide en Host Grotesk Light 48px,
       line-height 0.9, tracking -0.02em. Se escribe con efecto
       máquina de escribir (cursor "_" parpadeante).
     - Al cambiar de slide, el cuerpo saliente sube y se desvanece, el
       entrante entra desde abajo y arranca el typewriter. */
export function MVV() {
  const sectionRef = useRef(null);
  const scrollYProgress = useSectionScrollProgress(sectionRef);
  const [activeIndex, setActiveIndex] = useState(0);
  const [inView, setInView] = useState(false);

  // IntersectionObserver: el typewriter sólo se activa cuando el módulo
  // está realmente en pantalla. Sin esto, el primer slide empezaría a
  // escribirse desde el render inicial.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Cambio de slide según progreso de scroll.
  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    let next = 0;
    for (let i = SLIDE_THRESHOLDS.length - 1; i >= 0; i--) {
      if (p >= SLIDE_THRESHOLDS[i]) {
        next = i;
        break;
      }
    }
    setActiveIndex((prev) => (prev === next ? prev : next));
  });

  const current = MVV_SLIDES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="mvv"
      className="section mvv-section"
      data-slide
    >
      <div className="mvv-frame">
        <div className="mvv-row">
          {/* Timeline vertical: 3 dots con líneas finas. El dot activo
              se ilumina y el label del slide actual aparece a su derecha. */}
          <div className="mvv-rail" aria-hidden="true">
            {MVV_SLIDES.map((slide, i, arr) => (
              <Fragment key={slide.id}>
                <div className="mvv-rail-row">
                  <span
                    className={`mvv-rail-dot ${
                      i === activeIndex ? 'is-active' : ''
                    }`}
                  />
                  {i === activeIndex && (
                    <motion.span
                      key={`label-${slide.id}`}
                      className="mvv-rail-label"
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.35,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {slide.label}
                    </motion.span>
                  )}
                </div>
                {i < arr.length - 1 && (
                  <span className="mvv-rail-line" />
                )}
              </Fragment>
            ))}
          </div>

          {/* Cuerpo del slide — texto largo con typewriter. */}
          <div className="mvv-body-col">
            <AnimatePresence mode="popLayout">
              <MVVBody
                key={current.id}
                text={current.text}
                active={inView}
              />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

/* Cuerpo del slide: typewriter sobre el texto, con cursor parpadeante.
   Al desmontarse (cambio de slide), AnimatePresence dispara el `exit`
   con y: -40 + opacity 0 (sube y desaparece). El entrante hace
   y: 32 → 0 + opacity 0 → 1. Posicionamiento absolute para que el
   saliente y el entrante coexistan sin reflujos durante la transición. */
function MVVBody({ text, active }) {
  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!active) {
      setTyped(0);
      return undefined;
    }
    setTyped(0);
    let i = 0;
    let timer;
    const tick = () => {
      i += 1;
      setTyped(i);
      if (i < text.length) {
        // Velocidad base 14ms + jitter 14ms para sentirse "humano".
        timer = setTimeout(tick, 14 + Math.random() * 14);
      }
    };
    // Delay inicial: dejamos que la animación de entrada (y: 32 → 0)
    // termine antes de arrancar el typewriter.
    timer = setTimeout(tick, 360);
    return () => clearTimeout(timer);
  }, [text, active]);

  return (
    <motion.p
      className="mvv-body"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {text.slice(0, typed)}
      <span className="mvv-body-cursor" aria-hidden="true">_</span>
    </motion.p>
  );
}

/* ----------------- EQUIPO (Figma 104:1032 / 152:220) ------------- */
/* Header a 2 columnas: título "Equipo" Host 120px a la izquierda
   (ancho 361) + intro Mona Sans 24px alineada a la derecha (flex-1).
   Gap 156 entre columnas. Debajo, grid de 3 cards glass con foto
   (cada card: nombre + cargo top-row mono uppercase 14px, foto al
   fondo, bg rgba(255,255,255,0.05), rounded 24). */
export function Equipo() {
  return (
    <section id="equipo" className="section" data-slide>
      <div className="equipo-stack">
        <div className="equipo-header">
          <h2 className="equipo-header-title">
            <RevealText as="span" className="equipo-header-title-line">
              Equipo
            </RevealText>
          </h2>
          <motion.p
            className="equipo-header-intro"
            variants={fade}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
          >
            {equipo.intro}
          </motion.p>
        </div>

        <div className="team-grid">
          {equipo.members.map((m, i) => {
            const initials = m.name
              .split(' ')
              .map((w) => w[0])
              .join('')
              .slice(0, 2)
              .toUpperCase();
            return (
              <motion.div
                key={m.name}
                className="team-card"
                variants={fade}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px' }}
                tabIndex={0}
                aria-label={`${m.name}, ${m.role}`}
              >
                <div className="team-card-header">
                  <span className="team-card-name">{m.name}</span>
                  <span className="team-card-role">{m.role}</span>
                </div>
                <div className="team-card-photo" aria-hidden="true">
                  {/* Placeholder con iniciales si la imagen no carga */}
                  <span className="team-card-fallback">{initials}</span>
                  {m.photo && (
                    <img
                      src={m.photo}
                      alt=""
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                </div>
                {/* Overlay con bio — fade-in al hover/focus */}
                {m.bio && (
                  <div className="team-card-overlay">
                    <p className="team-card-bio">{m.bio}</p>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- VALORES (legacy export, no usado) --- */
export function Valores() { return null; }
export function Mision() { return null; }
export function Vision() { return null; }

/* --------------------------- REFERENCIAS ------------------------- */
export function Referencias() {
  return (
    <section id="referencias" className="section" data-slide>
      <div className="section-wide">
        <div className="section-eyebrow-row">
          <span className="mono">06 — Referencias</span>
          <span className="mono muted">Donde nos miramos</span>
        </div>
        <RevealText as="h2" className="display section-display-title">
          Nuestro mapa de inspiración.
        </RevealText>
        <div className="cells cells-2" style={{ marginTop: 64 }}>
          {referencias.slice(0, 2).map((r, i) => (
            <motion.div
              key={r.name}
              className="cell ref-cell"
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
            >
              <span className="cell-num mono">{r.tag}</span>
              <span className="r-name display">{r.name}</span>
              <span className="r-note">{r.note}</span>
            </motion.div>
          ))}
        </div>
        <div className="cells cells-3">
          {referencias.slice(2).map((r, i) => (
            <motion.div
              key={r.name}
              className="cell ref-cell"
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
            >
              <span className="cell-num mono">{r.tag}</span>
              <span className="r-name display">{r.name}</span>
              <span className="r-note">{r.note}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------- MODELO / CANVAS ----------------------- */
export function Modelo() {
  return (
    <section id="modelo" className="section" data-slide>
      <div className="section-wide">
        <div className="section-eyebrow-row">
          <span className="mono">01 — Modelo de negocio</span>
          <span className="mono muted">Business Canvas</span>
        </div>
        <RevealText as="h2" className="display section-display-title">
          Cómo crece KOKORO.
        </RevealText>

        {/* Propuesta de valor — destacada */}
        <motion.div
          className="canvas-hero"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-10% 0px' }}
        >
          <div className="canvas-hero-eyebrow mono">{canvas.propuesta.label}</div>
          <div className="canvas-hero-blocks">
            {canvas.propuesta.blocks.map((b) => (
              <div className="canvas-block" key={b.head}>
                <h4 className="canvas-block-head mono">{b.head}</h4>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Resto del canvas en cells */}
        <div className="canvas-row">
          <CanvasCell label="Segmento de clientes">
            {canvas.segmentos.blocks.map((b) => (
              <div key={b.head} className="canvas-mini">
                <h5 className="canvas-mini-head">{b.head}</h5>
                <p>{b.body}</p>
              </div>
            ))}
          </CanvasCell>
          <CanvasCell label="Socios clave" items={canvas.socios} />
        </div>

        <div className="canvas-row">
          <CanvasCell label="Actividades clave" items={canvas.actividades} />
          <CanvasCell label="Recursos clave" items={canvas.recursos} />
        </div>

        <div className="canvas-row">
          <CanvasCell label="Relación con clientes" items={canvas.relacion} />
          <CanvasCell label="Canales B2C" items={canvas.canales.b2c} />
        </div>

        <div className="canvas-row">
          <CanvasCell label="Canales B2B" items={canvas.canales.b2b} />
          <CanvasCell label="Estructura de costes" items={canvas.costes} />
        </div>

        <div className="canvas-row">
          <CanvasCell label="Fuentes de ingresos" items={canvas.ingresos} highlight />
          <div className="canvas-cell canvas-cell-empty" />
        </div>
      </div>
    </section>
  );
}

function CanvasCell({ label, items, children, highlight }) {
  return (
    <motion.div
      className={`canvas-cell ${highlight ? 'is-highlight' : ''}`}
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-10% 0px' }}
    >
      <div className="canvas-cell-eyebrow mono">{label}</div>
      {items && (
        <ul className="canvas-list">
          {items.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
      )}
      {children}
    </motion.div>
  );
}

/* ----------------- KIOSCO MVP — Fase 0 (Madrid) ------------------ */
export function Kiosco() {
  return (
    <section id="kiosco" className="section" data-slide>
      <div className="section-wide">
        <div className="section-eyebrow-row">
          <span className="mono">01 — Fase 0 · El kiosco</span>
          <span className="mono muted">Madrid · MVP</span>
        </div>
        <RevealText as="h2" className="display section-display-title">
          Un kiosco en Madrid como punto de partida.
        </RevealText>

        <p className="lead">{kiosco.intro}</p>

        <div className="cells cells-2" style={{ marginTop: 64 }}>
          <motion.div
            className="cell"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <span className="cell-num mono">El concepto</span>
            <ul className="cell-list">
              {kiosco.concepto.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </motion.div>
          <motion.div
            className="cell cell-highlight"
            variants={fade}
            custom={1}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <span className="cell-num mono">Por qué somos un buen inquilino</span>
            <ul className="cell-list">
              {kiosco.inquilino.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="kiosco-block">
          <div className="section-eyebrow-row" style={{ marginBottom: 24 }}>
            <span className="mono">Proyección financiera mensual</span>
            <span className="mono muted">3 escenarios</span>
          </div>
          <div className="escenarios">
            {kiosco.escenarios.map((e, i) => (
              <motion.div
                key={e.name}
                className={`escenario ${e.tone}`}
                variants={fade}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-10% 0px' }}
              >
                <span className="escenario-name mono">{e.name}</span>
                <div className="escenario-num">
                  <CountUp to={e.tx} duration={1.4} />
                </div>
                <div className="escenario-sub mono">{e.sub}</div>
                <div className="escenario-result mono">{e.result}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="kiosco-block">
          <div className="section-eyebrow-row" style={{ marginBottom: 24 }}>
            <span className="mono">Requisitos del local</span>
            <span className="mono muted">Filtros</span>
          </div>
          <motion.div
            className="cell"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-10% 0px' }}
          >
            <ul className="cell-list">
              {kiosco.requisitos.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------- PLAN A 3 AÑOS --------------------------- */
export function Fases() {
  return (
    <section id="fases" className="section" data-slide>
      <div className="section-wide">
        <div className="section-eyebrow-row">
          <span className="mono">02 — Visión a 3 años</span>
          <span className="mono muted">Plan faseado</span>
        </div>
        <RevealText as="h2" className="display section-display-title">
          Del kiosco a la marca completa.
        </RevealText>
        <div className="cells cells-4 fases-grid">
          {fases.map((f, i) => (
            <motion.div
              key={f.num}
              className={`cell fase ${f.active ? 'is-active' : ''}`}
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-10% 0px' }}
            >
              <span className="fase-num mono">{f.num}</span>
              <div className="fase-title">{f.title}</div>
              <span className="fase-time mono">{f.time}</span>
              <p className="fase-desc">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------- CONTACTO ---------------------------- */
export function Contacto({ num = '03' }) {
  return (
    <section id="contacto" className="section section-contacto" data-slide>
      <div className="section-wide">
        <div className="section-eyebrow-row">
          <span className="mono">{num} — Contacto</span>
          <span className="mono muted">Hablemos</span>
        </div>

        <RevealText as="h2" className="display-massive contacto-mark">
          Hablemos.
        </RevealText>

        <div className="contacto-block">
          <RevealText as="p" className="contacto-ask" delay={0.2}>
            {contacto.ask}
          </RevealText>
          <div className="contacto-meta">
            <div className="contacto-meta-row">
              <span className="label mono">Email</span>
              <a className="value" href={`mailto:${contacto.email}`}>
                {contacto.email}
              </a>
            </div>
            <div className="contacto-meta-row">
              <span className="label mono">Ubicación</span>
              <span className="value">{contacto.city}</span>
            </div>
            <div className="contacto-meta-row">
              <span className="label mono">Estado</span>
              <span className="value">{contacto.status}</span>
            </div>
          </div>
        </div>

        <div className="contacto-actions">
          <a className="btn btn-solid" href={`mailto:${contacto.email}`}>
            <span>Escríbenos</span>
            <span>→</span>
          </a>
          <a className="btn" href="/dossier.pdf" download="KOKORO-dossier.pdf">
            <span>Descargar dossier</span>
            <span>↓</span>
          </a>
        </div>

        <div className="footer-strip mono">
          <span>KOKORO Foods · {brand.year} · Documento confidencial</span>
          <span>{brand.subtitle}</span>
        </div>
      </div>
    </section>
  );
}

/* ====================== INNER HERO (Figma 104:570) =============== */

/* Hero compartido por todas las inner pages (/modelo, /mvp).
   Patrón: pill eyebrow blanca bordeada centrada · título Host 120px ·
   lead 20px centrado max 764px line 1.5. */
export function InnerHero({
  eyebrow = 'Mínimo producto viable',
  title = 'Punto de partida',
  lead,
  id = 'inner-hero',
}) {
  return (
    <section
      id={id}
      className="section inner-hero"
      data-slide
    >
      <div className="inner-hero-stack">
        <motion.div
          className="inner-hero-head"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inner-pill">{eyebrow}</span>
          <RevealText as="h1" className="inner-title">
            {title}
          </RevealText>
        </motion.div>
        {lead && (
          <motion.p
            className="inner-lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}

/* Alias mantenido por compatibilidad. */
export const MvpHero = InnerHero;

/* ====================== PÁGINA NEGOCIO (104:425) ================
   Cuatro secciones que componen /modelo: VacioMercado, SolucionDisruptiva,
   MotorEscala, VentajaCompetitiva. Reutilizan las primitivas existentes
   (kk-rule-block, kk-stack, kk-card) ampliadas con los nuevos patrones. */

/* ============================================================
   PhysicsPile — simulación 2D para "vacío vs. respuesta" usando
   matter-js. Cada frase es un cuerpo rígido con forma de pill
   (rectángulo con chamfer = h/2). matter-js usa SAT/OBB para
   colisiones, así que las pills NO se atraviesan aunque estén
   rotadas. La resolución iterativa de penetración (positionIters
   alto) y el torque real generado por contactos descentrados
   evitan las "escaleras imposibles" — una pill apoyada en la
   esquina de otra resbala porque hay momento angular.

   Drag rígido: durante el drag la pill se vuelve estática, así
   sigue empujando a las demás (efecto dominó real con la masa
   infinita del puntero) sin que la física la mueva. Al soltar,
   la pill recibe la velocidad acumulada del cursor.

   Mirror linking: forwardRef + useImperativeHandle exponen
   startMirror / updateMirror / endMirror. La pill espejo también
   se vuelve estática durante el mirror y se posiciona en simetría
   horizontal (W - srcX), de modo que también empuja a sus vecinas
   y el dominó se replica en ambos lados.
   ============================================================ */
const PhysicsPile = forwardRef(function PhysicsPile(
  { phrases, variant, mirrorRef },
  ref
) {
  const containerRef = useRef(null);
  const pillRefs = useRef([]);
  const engineRef = useRef(null);
  const bodiesRef = useRef([]);
  const animRef = useRef(0);
  const dragRef = useRef(null);
  const inViewRef = useRef(false);
  const reducedMotionRef = useRef(false);

  // Construye el mundo de matter-js: engine, paredes estáticas
  // (suelo/laterales) y un cuerpo pill por frase. Cada pill se
  // crea con chamfer = h/2 (rectángulo redondeado en stadium),
  // densidad media y fricción alta para que el apilamiento se
  // estabilice de verdad. Posición inicial de salida fuera del
  // viewport (arriba) con stagger generoso para que entren en
  // cascada y por celdas barajadas para que se repartan en x.
  const buildScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;

    // Engine con iteraciones altas para que la posición se
    // corrija bien y las pills no penetren entre sí ni con
    // las paredes (positionIterations sube de 6 a 10).
    const engine = Matter.Engine.create({
      gravity: { x: 0, y: 1, scale: 0.0014 },
      enableSleeping: false,
    });
    engine.positionIterations = 10;
    engine.velocityIterations = 8;
    engine.constraintIterations = 4;
    engineRef.current = engine;

    // Paredes estáticas — gruesas (60px) para evitar tunneling
    // si una pill llega muy rápido al borde. Ligeramente metidas
    // hacia dentro (4px de margen visual).
    const t = 60;
    const walls = [
      Matter.Bodies.rectangle(W / 2, H + t / 2 - 4, W * 1.5, t, {
        isStatic: true,
        label: 'floor',
        friction: 0.7,
      }),
      Matter.Bodies.rectangle(-t / 2 + 4, H / 2, t, H * 2, {
        isStatic: true,
        label: 'leftWall',
        friction: 0.5,
      }),
      Matter.Bodies.rectangle(W + t / 2 - 4, H / 2, t, H * 2, {
        isStatic: true,
        label: 'rightWall',
        friction: 0.5,
      }),
    ];
    Matter.Composite.add(engine.world, walls);

    // Pills — orden de celdas barajado para que entren desde
    // posiciones x repartidas, no concentradas en una columna.
    const N = phrases.length;
    const cellOrder = Array.from({ length: N }, (_, i) => i);
    for (let i = N - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cellOrder[i], cellOrder[j]] = [cellOrder[j], cellOrder[i]];
    }

    const bodies = [];
    for (let i = 0; i < N; i++) {
      const el = pillRefs.current[i];
      if (!el) continue;
      // Reset transform para medir tamaño natural (offsetWidth
      // ya incluye padding+border porque box-sizing es border-box).
      el.style.transform = 'translate(-9999px, -9999px)';
      const w = el.offsetWidth;
      const h = el.offsetHeight;

      const cellW = W / N;
      const cellCenter = cellW * (cellOrder[i] + 0.5);
      let x = cellCenter + (Math.random() - 0.5) * cellW * 0.5;
      x = Math.max(w / 2 + 12, Math.min(W - w / 2 - 12, x));

      // Stagger vertical para entrada en cascada.
      const y = -180 - i * (h * 2.4);

      const body = Matter.Bodies.rectangle(x, y, w, h, {
        // chamfer = h/2 transforma el rectángulo en stadium.
        chamfer: { radius: Math.min(w, h) / 2 - 1 },
        restitution: 0.18,
        friction: 0.55,
        frictionStatic: 0.8,
        frictionAir: 0.015,
        density: 0.0018,
        slop: 0.4,
      });
      // Adjuntamos metadatos (índice + dimensiones visuales)
      // al cuerpo. matter-js permite extender el objeto.
      body.userIdx = i;
      body.userW = w;
      body.userH = h;
      Matter.Body.setAngle(body, (Math.random() - 0.5) * 0.18);
      Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.025);
      bodies.push(body);
    }
    Matter.Composite.add(engine.world, bodies);
    bodiesRef.current = bodies;
  }, [phrases]);

  // Reduced-motion: posicionamos las pills apoyadas en el suelo
  // en filas, sin física ni animación.
  const placeStatic = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const W = rect.width;
    const H = rect.height;
    const padding = 16;
    let cursorX = padding;
    let cursorY = H - padding;
    let rowH = 0;
    for (let i = 0; i < phrases.length; i++) {
      const el = pillRefs.current[i];
      if (!el) continue;
      el.style.transform = 'translate(-9999px, -9999px)';
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (cursorX + w + padding > W) {
        cursorY -= rowH + 8;
        cursorX = padding;
        rowH = 0;
      }
      el.style.transform = `translate(${cursorX}px, ${cursorY - h}px)`;
      cursorX += w + 8;
      rowH = Math.max(rowH, h);
    }
  }, [phrases]);

  // Loop principal — paso de física fijo + sync DOM. matter-js
  // espera dt en milisegundos; con 1000/60 ≈ 16.67ms el integrador
  // queda estable a 60Hz.
  const tick = useCallback(() => {
    const engine = engineRef.current;
    if (!engine) return;
    Matter.Engine.update(engine, 1000 / 60);

    const bodies = bodiesRef.current;
    for (let i = 0; i < bodies.length; i++) {
      const body = bodies[i];
      const el = pillRefs.current[i];
      if (!el) continue;
      // body.position es el centro; situamos el top-left en
      // (cx - w/2, cy - h/2) y rotamos alrededor del centro.
      el.style.transform =
        `translate(${body.position.x - body.userW / 2}px, ${body.position.y - body.userH / 2}px) ` +
        `rotate(${body.angle}rad)`;
    }

    // Si estamos arrastrando, propagar la posición al espejo.
    const drag = dragRef.current;
    if (drag) {
      const body = bodies[drag.idx];
      if (body) {
        mirrorRef?.current?.updateMirror?.(drag.idx, body.position.x, body.position.y);
      }
    }

    animRef.current = requestAnimationFrame(tick);
  }, [mirrorRef]);

  const start = useCallback(() => {
    if (reducedMotionRef.current) {
      placeStatic();
      return;
    }
    buildScene();
    cancelAnimationFrame(animRef.current);
    animRef.current = requestAnimationFrame(tick);
  }, [buildScene, placeStatic, tick]);

  const stop = useCallback(() => {
    cancelAnimationFrame(animRef.current);
    if (engineRef.current) {
      Matter.World.clear(engineRef.current.world, false);
      Matter.Engine.clear(engineRef.current);
      engineRef.current = null;
    }
    bodiesRef.current = [];
    for (const el of pillRefs.current) {
      if (el) {
        el.style.transform = 'translate(-9999px, -9999px)';
        el.classList.remove('is-active');
      }
    }
  }, []);

  // API imperativa para el linking espejo. La pile de la otra
  // columna llama estos métodos durante el drag. La pill espejo
  // se vuelve estática (masa infinita) y se le setea la posición
  // simétrica horizontal — sigue colisionando con sus vecinas y
  // genera dominó en su lado también. Además marcamos la pill
  // espejo con .is-active para que se ilumine en sintonía con
  // la pill arrastrada en la otra columna.
  useImperativeHandle(
    ref,
    () => ({
      startMirror(idx) {
        const body = bodiesRef.current[idx];
        if (!body) return;
        Matter.Body.setStatic(body, true);
        const el = pillRefs.current[idx];
        if (el) el.classList.add('is-active');
      },
      updateMirror(idx, srcX, srcY) {
        const container = containerRef.current;
        const body = bodiesRef.current[idx];
        if (!container || !body) return;
        const W = container.clientWidth;
        const H = container.clientHeight;
        const mx = W - srcX; // espejo horizontal
        const tx = Math.max(body.userW / 2 + 4, Math.min(W - body.userW / 2 - 4, mx));
        const ty = Math.max(body.userH / 2 + 4, Math.min(H - body.userH / 2 - 4, srcY));
        Matter.Body.setPosition(body, { x: tx, y: ty });
      },
      endMirror(idx, srcVx, srcVy) {
        const body = bodiesRef.current[idx];
        if (!body) return;
        Matter.Body.setStatic(body, false);
        // Velocidad espejo (x invertida) para que la pill mirror
        // salga disparada en simetría con la original.
        Matter.Body.setVelocity(body, { x: -(srcVx || 0), y: srcVy || 0 });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
        const el = pillRefs.current[idx];
        if (el) el.classList.remove('is-active');
      },
    }),
    []
  );

  // IntersectionObserver — arrancar/parar según viewport.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mql.matches;
    const onMqChange = () => {
      reducedMotionRef.current = mql.matches;
    };
    mql.addEventListener?.('change', onMqChange);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inViewRef.current) {
          inViewRef.current = true;
          start();
        } else if (!entry.isIntersecting && inViewRef.current) {
          inViewRef.current = false;
          stop();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
      mql.removeEventListener?.('change', onMqChange);
      cancelAnimationFrame(animRef.current);
      if (engineRef.current) {
        Matter.World.clear(engineRef.current.world, false);
        Matter.Engine.clear(engineRef.current);
        engineRef.current = null;
      }
    };
  }, [start, stop]);

  // Drag global. La pill agarrada pasa a estática (masa infinita)
  // y se posiciona directamente con el cursor; sigue empujando a
  // las demás (efecto dominó real con masa infinita). Al soltar
  // se le devuelve dinamismo y se le aplica la velocidad estimada.
  useEffect(() => {
    const onMove = (e) => {
      const drag = dragRef.current;
      if (!drag) return;
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      const body = bodiesRef.current[drag.idx];
      if (!body) return;
      const W = rect.width;
      const H = rect.height;
      const targetX = Math.max(
        body.userW / 2 + 4,
        Math.min(W - body.userW / 2 - 4, mx - drag.offsetX)
      );
      const targetY = Math.max(
        body.userH / 2 + 4,
        Math.min(H - body.userH / 2 - 4, my - drag.offsetY)
      );
      Matter.Body.setPosition(body, { x: targetX, y: targetY });

      // Velocidad estimada (px / frame ≈ px / 16ms) para soltar
      // con inercia coherente con el último movimiento del cursor.
      const now = performance.now();
      const dt = Math.max(1, now - drag.lastTime);
      drag.vx = ((mx - drag.lastX) / dt) * 16;
      drag.vy = ((my - drag.lastY) / dt) * 16;
      drag.lastX = mx;
      drag.lastY = my;
      drag.lastTime = now;
    };
    const onUp = () => {
      const drag = dragRef.current;
      if (!drag) return;
      const body = bodiesRef.current[drag.idx];
      const releaseVx = drag.vx || 0;
      const releaseVy = drag.vy || 0;
      if (body) {
        Matter.Body.setStatic(body, false);
        Matter.Body.setVelocity(body, { x: releaseVx, y: releaseVy });
        Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.08);
      }
      // Quitamos la iluminación de la pill local (la pareja-espejo
      // se desactiva sola dentro de endMirror).
      const localEl = pillRefs.current[drag.idx];
      if (localEl) localEl.classList.remove('is-active');
      mirrorRef?.current?.endMirror?.(drag.idx, releaseVx, releaseVy);
      dragRef.current = null;
      document.body.classList.remove('is-grabbing');
    };
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [mirrorRef]);

  const onPillPointerDown = (e, idx) => {
    if (reducedMotionRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const mx = e.clientX - rect.left;
    const my = e.clientY - rect.top;
    const body = bodiesRef.current[idx];
    if (!body) return;

    // Pasamos la pill a estática para drag rígido (masa infinita,
    // sigue colisionando con las demás → dominó).
    Matter.Body.setVelocity(body, { x: 0, y: 0 });
    Matter.Body.setAngularVelocity(body, 0);
    Matter.Body.setStatic(body, true);

    dragRef.current = {
      idx,
      offsetX: mx - body.position.x,
      offsetY: my - body.position.y,
      lastX: mx,
      lastY: my,
      lastTime: performance.now(),
      vx: 0,
      vy: 0,
    };
    document.body.classList.add('is-grabbing');
    // Iluminamos la pill local; la pareja-espejo se ilumina vía
    // mirrorRef.startMirror, así las dos se encienden a la vez.
    e.currentTarget.classList.add('is-active');
    e.currentTarget.setPointerCapture?.(e.pointerId);
    e.preventDefault();

    mirrorRef?.current?.startMirror?.(idx);
  };

  return (
    <div ref={containerRef} className={`vacio-pile vacio-pile-${variant}`}>
      {phrases.map((phrase, i) => (
        <div
          key={i}
          ref={(el) => {
            pillRefs.current[i] = el;
          }}
          className="vacio-pill"
          onPointerDown={(e) => onPillPointerDown(e, i)}
          style={{ transform: 'translate(-9999px, -9999px)' }}
        >
          {phrase}
        </div>
      ))}
    </div>
  );
});

/* Pains vs Gains (Figma 104:872) — dos cards glass redondeadas con el
   pile físico dentro. Cada card ancla arriba su titular ("Pains" /
   "Gains" en Host Grotesk 100px); debajo, las frases caen como pills
   con gravedad y se apilan. El usuario puede agarrarlas (drag completo)
   y al moverlas hay efecto dominó con las pills apiladas encima. Mirror
   linking: el ref de cada pile se pasa a la otra como mirrorRef y las
   dos piles se mueven en espejo (pareadas por índice del array, ver
   content.js). Se resetea al salir/entrar del viewport.
   IMPORTANTE: la lógica del PhysicsPile (interacción + animaciones de
   las pills) NO se toca — sólo cambian los contenedores. */
export function VacioMercado() {
  const { left, right } = negocio.vacio;
  const leftPileRef = useRef(null);
  const rightPileRef = useRef(null);

  return (
    <section id="vacio" className="section section-vacio" data-slide>
      <div
        className="vacio-split"
        aria-label="Comparación visual entre puntos de dolor (Pains) y beneficios (Gains)"
      >
        <div className="vacio-card">
          <motion.div
            className="vacio-card-head"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
          >
            <RevealText as="h2" className="vacio-card-title">
              Pains
            </RevealText>
          </motion.div>
          <PhysicsPile
            ref={leftPileRef}
            mirrorRef={rightPileRef}
            phrases={left}
            variant="dark"
          />
        </div>

        <div className="vacio-card">
          <motion.div
            className="vacio-card-head"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
          >
            <RevealText as="h2" className="vacio-card-title">
              Gains
            </RevealText>
          </motion.div>
          <PhysicsPile
            ref={rightPileRef}
            mirrorRef={leftPileRef}
            phrases={right}
            variant="light"
          />
        </div>
      </div>
    </section>
  );
}

/* La solución disruptiva (137:194) — header centrado + 3 cells icon + eyebrow + body.
   Cada celda añade un icono 24px arriba (Repeat, Tag, Intersect). */
export function SolucionDisruptiva() {
  return (
    <section id="solucion" className="section" data-slide>
      <div className="kk-stack kk-stack-64">
        <motion.div
          className="kk-header kk-header-center"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <span className="kk-eyebrow">{negocio.solucion.eyebrow}</span>
          <RevealText as="h2" className="kk-title kk-title-center">
            {negocio.solucion.title}
          </RevealText>
        </motion.div>

        <div className="kk-rule-block">
          {negocio.solucion.cells.map((c, i) => {
            const Icon = SOLUCION_ICONS[c.icon];
            return (
              <motion.div
                key={c.eyebrow}
                className="kk-rule-cell kk-rule-cell-icon"
                variants={fade}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-15% 0px' }}
              >
                {Icon && (
                  <span className="kk-rule-cell-glyph" aria-hidden="true">
                    <Icon size={24} />
                  </span>
                )}
                <span className="kk-eyebrow">{c.eyebrow}</span>
                <p className="kk-body kk-body-center">{c.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* Modelo de negocio (Figma 137:117) — header centrado + 3 cards glass
   iguales en una fila. Cada card: eyebrow mono uppercase + body Mona
   Sans 18px centrado. Sin asimetrías: las tres comparten misma altura. */
export function MotorEscala() {
  const { title, main, side } = negocio.revenue;
  const cards = [main, ...side];
  return (
    <section id="motor" className="section" data-slide>
      <div className="kk-stack kk-stack-128 kk-stack-center">
        <motion.div
          className="kk-header kk-header-center"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <RevealText as="h2" className="kk-title-xl kk-title-center">
            {title}
          </RevealText>
        </motion.div>

        <div className="motor-grid-3">
          {cards.map((c, i) => (
            <motion.div
              key={c.eyebrow}
              className="motor-card-3"
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
            >
              <span className="kk-eyebrow">{c.eyebrow}</span>
              <p className="kk-body kk-body-center">{c.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Nuestra ventaja (Figma 137:132 / 151:131) — título grande a la izquierda
   (Host 120px tracking -4.8px, ancho 672) + filas con divider horizontal.
   Cada fila: título-izquierda (Host Medium 24px) · body-derecha alineado
   a la derecha (Mona Sans 20px tracking -0.6px, ancho 400). HR finos
   entre cada par de filas. */
export function VentajaCompetitiva() {
  const { title, items } = negocio.ventaja;
  return (
    <section id="ventaja" className="section" data-slide>
      <div className="kk-stack kk-stack-128">
        <motion.div
          className="kk-header"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <RevealText as="h2" className="kk-title-xl ventaja-title">
            {title}
          </RevealText>
        </motion.div>

        <div className="ventaja-rows">
          {items.map((it, i) => (
            <Fragment key={it.title}>
              {i > 0 && <span className="ventaja-rule" aria-hidden="true" />}
              <motion.div
                className="ventaja-row"
                variants={fade}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-15% 0px' }}
              >
                <h3 className="ventaja-row-title">{it.title}</h3>
                <p className="ventaja-row-body">{it.body}</p>
              </motion.div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Plan faseado (Figma 104:824) — versión carrusel
   Header centrado · carrusel horizontal de tarjetas h-500 (image izq +
   content dcha con eyebrow + título Host 40px + body Host 18px) ·
   indicador de paginación inferior tipo "pill" (40×10 activo, dots 10×10
   inactivos) dentro de un contenedor glass rounded-52. */
export function PlanFaseado() {
  const phases = [
    {
      key: 'local-mvp',
      step: 'fase 1',
      title: 'Primer local',
      image: '/plan/fase-1.jpg',
      body:
        'Business Model Canvas. Una mirada estructurada a propuesta de valor, segmentos, canales, costes e ingresos — con la dirección estratégica que guía cada decisión de KOKORO.',
    },
    {
      key: 'consolidacion',
      step: 'fase 2',
      title: 'Operación estable',
      image: '/plan/fase-2.jpg',
      body:
        'Cash flow positivo y refinamiento de operaciones. Construimos identidad de marca y cultura interna en este punto.',
    },
    {
      key: 'escala',
      step: 'fase 3',
      title: 'Segundo punto',
      image: '/plan/fase-3.jpg',
      body:
        'Apertura del segundo local y desarrollo del blend KOKORO. Primeras ventas B2B y arranque del ecommerce de marca.',
    },
    {
      key: 'marca',
      step: 'fase 4',
      title: 'KOKORO Foods consolidada',
      image: '/plan/fase-4.jpg',
      body:
        'Tostador propio, línea retail y proveedor B2B consolidado. La marca opera de forma autosuficiente y escalable.',
    },
  ];

  const [active, setActive] = useState(0);
  const [imgFailed, setImgFailed] = useState({});

  return (
    <section id="plan" className="section section-plan" data-slide>
      <div className="kk-stack kk-stack-64 kk-stack-center">
        <motion.div
          className="kk-header kk-header-center"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <span className="kk-eyebrow">plan faseado</span>
          <RevealText as="h2" className="kk-title kk-title-center">
            Del kiosko a la marca completa
          </RevealText>
        </motion.div>

        {/* Pista del carrusel: traslada un múltiplo del ancho de la tarjeta
            (+ gap) según la fase activa. Las tarjetas no activas se ven a
            opacidad reducida asomando por la derecha. */}
        <div
          className="plan-carousel"
          role="region"
          aria-roledescription="carrusel"
          aria-label="Plan faseado"
        >
          <div
            className="plan-carousel-track"
            style={{
              transform: `translateX(calc(${-active * 100}% - ${active * 24}px))`,
            }}
          >
            {phases.map((p, i) => {
              const showImage = p.image && !imgFailed[p.key];
              return (
                <article
                  key={p.key}
                  className={`plan-card ${i === active ? 'is-active' : ''}`}
                  aria-hidden={i !== active}
                  aria-label={`${p.step} — ${p.title}`}
                >
                  <div className="plan-card-media">
                    <div className="plan-card-img">
                      {showImage && (
                        <img
                          src={p.image}
                          alt=""
                          loading="lazy"
                          onError={() =>
                            setImgFailed((m) => ({ ...m, [p.key]: true }))
                          }
                        />
                      )}
                      {!showImage && (
                        <span className="plan-card-img-label mono">
                          imagen pendiente
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="plan-card-body">
                    <div className="plan-card-head">
                      <span className="plan-card-eyebrow">{p.step}</span>
                      <h3 className="plan-card-title">{p.title}</h3>
                    </div>
                    <p className="plan-card-text">{p.body}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* Paginación tipo "pill" (Figma 136:46 / 136:48 — variantes
            Frame 43 sin flechas y Frame 44 con flechas). Por defecto el
            pill sólo muestra los pips; al hover/focus dentro se expande
            con gap-8 y aparecen las flechas a izquierda y derecha. */}
        <div className="plan-pagination" role="tablist" aria-label="Cambiar de fase">
          <button
            type="button"
            className="plan-nav plan-nav-prev"
            aria-label="Fase anterior"
            tabIndex={-1}
            onClick={() => setActive((a) => Math.max(0, a - 1))}
            disabled={active === 0}
          >
            <ChevronLeft size={16} />
          </button>

          <div className="plan-pagination-pips">
            {phases.map((p, i) => (
              <button
                key={p.key}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`${p.step} — ${p.title}`}
                className={`plan-pip ${i === active ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              />
            ))}
          </div>

          <button
            type="button"
            className="plan-nav plan-nav-next"
            aria-label="Fase siguiente"
            tabIndex={-1}
            onClick={() =>
              setActive((a) => Math.min(phases.length - 1, a + 1))
            }
            disabled={active === phases.length - 1}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

/* Proyección financiera (Figma 104:742 / 151:218)
   Título grande "Proyección / financiera" 120px Host a 2 líneas
   alineado a la izquierda (sin eyebrow). Debajo, rule-block con 3
   escenarios separados por líneas verticales: eyebrow · número
   grande · sub-label · pill de resultado coloreado. */
export function ProyeccionFinanciera() {
  const titleLines = ['Proyección', 'financiera'];
  const escenarios = [
    {
      key: 'cons',
      label: 'Conservador',
      number: 90,
      sub: 'transacciónes / día',
      result: 'Break even',
      tone: 'cons',
    },
    {
      key: 'real',
      label: 'Realista',
      number: 130,
      sub: 'transacciónes / día',
      result: '+ 2.500€ / mes',
      tone: 'real',
    },
    {
      key: 'agres',
      label: 'Óptimo',
      number: 180,
      sub: 'transacciónes / día',
      result: '+ 7.000€ / mes',
      tone: 'agres',
    },
  ];

  return (
    <section id="caja" className="section" data-slide>
      <div className="kk-stack kk-stack-64">
        <h2 className="caja-title">
          {titleLines.map((line, i) => (
            <RevealText
              key={i}
              as="span"
              className="caja-title-line"
              delay={i * 0.08}
            >
              {line}
            </RevealText>
          ))}
        </h2>

        <div className="kk-rule-block kk-rule-block-num">
          {escenarios.map((e, i) => (
            <motion.div
              key={e.key}
              className="kk-rule-cell caja-cell"
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
            >
              <span className="kk-eyebrow">{e.label}</span>
              <div className="caja-num-block">
                <span className="caja-num">
                  <CountUp to={e.number} duration={1.4} />
                </span>
                <span className="caja-sub mono">{e.sub}</span>
              </div>
              <span className={`caja-pill caja-pill-${e.tone}`}>{e.result}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------- HERO COMPACTO PARA SUB-PÁGINAS ---------------- */
export function PageHero({ eyebrow, title, lead }) {
  return (
    <section className="section page-hero" data-slide>
      <div className="section-wide">
        <motion.div
          className="page-hero-eyebrow mono"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {eyebrow}
        </motion.div>
        <RevealText as="h1" className="display page-hero-title">
          {title}
        </RevealText>
        {lead && (
          <motion.p
            className="page-hero-lead"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {lead}
          </motion.p>
        )}
      </div>
    </section>
  );
}
