import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

/* ---------------------- RESUMEN EJECUTIVO (Figma 104:603) -------- */
/* Patrón: 2 columnas flex-1 items-end gap-64.
   Izq: eyebrow rect + título Host Grotesk 80px line-height 0.8.
   Dcha: body Mona Sans 18px con frase clave en Instrument Serif Italic. */
export function Resumen() {
  return (
    <section id="resumen" className="section" data-slide>
      <div className="kk-row kk-row-end">
        <motion.div
          className="kk-col"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <span className="kk-eyebrow">resumen ejecutivo</span>
          <RevealText as="h2" className="kk-title">
            {`Comida real,\ndiseñada para\nincluir a todos.`}
          </RevealText>
        </motion.div>
        <motion.div
          className="kk-col"
          variants={fade}
          custom={1}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <p className="kk-body">
            {ejecutivo.intro}{' '}
            <span className="kk-body-italic">{ejecutivo.italic}</span>{' '}
            {ejecutivo.closer}
          </p>
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
/* Cilindro 3D real: las 3 caras (mision / vision / valores) viven sobre un
   tubo único que rota como sólido en el eje X. La opacidad y el blur de
   cada cara se calculan a partir del ángulo efectivo entre la cara y la
   cámara (cos del ángulo) — así, al rodar, la cara entrante y la saliente
   se cruzan suavemente con desenfoque de profundidad. */
const MVV_FACES = [
  { id: 'mision', label: 'misión', body: mision },
  { id: 'vision', label: 'visión', body: vision },
  {
    id: 'valores',
    label: 'valores',
    body: 'Honestidad. Inclusión. Excelencia. Confianza.',
  },
];

const MVV_STEP_DEG = 360 / MVV_FACES.length; // 120° entre caras
const MVV_TOTAL_DEG = (MVV_FACES.length - 1) * MVV_STEP_DEG; // 240°

// Mapping del scrollProgress a la rotación del cilindro:
// hay un hold corto en mision (entrada), un hold medio en visión (lectura)
// y un hold LARGO en valores (cierre antes de que la siguiente sección
// cubra). Las dos transiciones son simétricas (~30% cada una).
const MVV_PROGRESS_STOPS = [0, 0.06, 0.36, 0.50, 0.78, 1];
const MVV_ROTATION_STOPS = [0, 0, MVV_STEP_DEG, MVV_STEP_DEG, MVV_TOTAL_DEG, MVV_TOTAL_DEG];

export function MVV() {
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  // Rotación POSITIVA del cilindro (forward roll en scroll-down): la cara
  // de abajo sube hacia el frente, la del frente se va por arriba.
  // Hold zones aseguran tiempo de lectura en cada estación.
  const cylinderRotateX = useTransform(
    scrollYProgress,
    MVV_PROGRESS_STOPS,
    MVV_ROTATION_STOPS,
    { clamp: true },
  );

  return (
    <section id="mvv" className="section mvv-section" data-slide>
      <div ref={trackRef} className="mvv-track">
        <div className="mvv-sticky">
          <div className="mvv-stage">
            <motion.div
              className="mvv-cylinder"
              style={{ rotateX: cylinderRotateX }}
            >
              {MVV_FACES.map((face, index) => (
                <MVVFace
                  key={face.id}
                  face={face}
                  index={index}
                  cylinderRotateX={cylinderRotateX}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MVVFace({ face, index, cylinderRotateX }) {
  // Para que el cilindro rote en sentido natural (positivo = forward roll
  // = next-from-below) y mantengamos el orden mision→visión→valores, los
  // ángulos base de las caras son 0°, -120°, -240°.
  const baseAngle = -index * MVV_STEP_DEG;

  // Ángulo efectivo de la cara respecto a la cámara:
  //   effective = baseAngle + cilindroRot
  // cos(effective): 1 al frente, 0 al canto, -1 a la espalda.
  const opacity = useTransform(cylinderRotateX, (theta) => {
    const effective = ((baseAngle + theta) * Math.PI) / 180;
    return Math.max(0, Math.cos(effective));
  });

  const filter = useTransform(cylinderRotateX, (theta) => {
    const effective = ((baseAngle + theta) * Math.PI) / 180;
    const blur = (1 - Math.max(0, Math.cos(effective))) * 7;
    return `blur(${blur.toFixed(2)}px)`;
  });

  // Micro-zoom: la cara crece de 0.94 a 1.0 al acercarse al frente.
  const scale = useTransform(cylinderRotateX, (theta) => {
    const effective = ((baseAngle + theta) * Math.PI) / 180;
    const cos = Math.max(0, Math.cos(effective));
    return 0.94 + cos * 0.06;
  });

  return (
    <motion.article
      className="mvv-face"
      // El transform (rotateX + translateZ) lo gestiona el CSS vía la
      // variable --mvv-angle. Aquí solo aplicamos opacidad y blur, que no
      // entran en conflicto con el transform.
      style={{
        '--mvv-angle': `${baseAngle}deg`,
        opacity,
        filter,
      }}
    >
      {/* El scale va en un wrapper interno para no pisar el transform 3D
          que coloca a la cara sobre el cilindro. */}
      <motion.div className="mvv-face-inner" style={{ scale }}>
        <span className="mvv-face-eyebrow">{face.label}</span>
        <p className="mvv-face-text">{face.body}</p>
      </motion.div>
    </motion.article>
  );
}

/* ----------------- EQUIPO (Figma 104:1032) ----------------------- */
/* Header centrado · grid de 3 cards glass con foto.
   Cada card: nombre top-left + cargo top-right (mono uppercase 14px) ·
   foto rellenando la card · rounded 24 · bg rgba(255,255,255,0.05).
   Las fotos se cargan desde /public/team/{slug}.jpg. */
export function Equipo() {
  return (
    <section id="equipo" className="section" data-slide>
      <div className="kk-stack kk-stack-64 kk-stack-center">
        <motion.div
          className="kk-header kk-header-center"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <span className="kk-eyebrow">equipo</span>
          <RevealText as="h2" className="kk-title kk-title-center">
            Quiénes estamos detrás
          </RevealText>
        </motion.div>

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

/* El vacio del mercado (104:872) — split-screen full-bleed con pile
   físico. Cada columna ancla arriba su titular gigante; debajo, las
   frases caen como pills con gravedad y se apilan. El usuario puede
   agarrarlas (drag completo, x e y) y al moverlas hay efecto dominó
   con las pills apiladas encima. Mirror linking: el ref de cada pile
   se pasa a la otra como mirrorRef, y las dos piles se mueven en
   espejo al arrastrar (pareadas por índice del array, ver content.js).
   Se resetea al salir/entrar del viewport. */
export function VacioMercado() {
  const { eyebrow, left, right } = negocio.vacio;
  const leftPileRef = useRef(null);
  const rightPileRef = useRef(null);

  return (
    <section id="vacio" className="section section-vacio" data-slide>
      <div
        className="vacio-split"
        aria-label="Comparación visual entre el vacío del mercado y la respuesta KOKORO"
      >
        <div className="vacio-col vacio-col-dark">
          <motion.div
            className="vacio-col-head"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
          >
            <span className="vacio-col-eyebrow mono">{eyebrow}</span>
            <RevealText as="h2" className="vacio-col-title vacio-col-title-dark">
              El vacío
            </RevealText>
          </motion.div>
          <PhysicsPile
            ref={leftPileRef}
            mirrorRef={rightPileRef}
            phrases={left}
            variant="dark"
          />
        </div>

        <div className="vacio-divider" aria-hidden="true">
          <motion.span
            className="vacio-shimmer"
            initial={{ y: '-110%', opacity: 0 }}
            whileInView={{ y: '110%', opacity: [0, 1, 0] }}
            viewport={{ once: true, margin: '-20% 0px' }}
            transition={{ duration: 1.8, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="vacio-vs">vs.</span>
        </div>

        <div className="vacio-col vacio-col-light">
          <motion.div
            className="vacio-col-head"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
          >
            <span className="vacio-col-eyebrow mono">la respuesta KOKORO</span>
            <RevealText as="h2" className="vacio-col-title vacio-col-title-light">
              La respuesta
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

/* El motor de escala (137:100) — grid asimétrico 1 + 2 cards glass.
   Izquierda: card grande "recurrencia" (full height).
   Derecha: dos cards apiladas "venta directa" + "b2b selectivo". */
export function MotorEscala() {
  const { eyebrow, title, main, side } = negocio.revenue;
  return (
    <section id="motor" className="section" data-slide>
      <div className="kk-stack kk-stack-64">
        <motion.div
          className="kk-header kk-header-center"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <span className="kk-eyebrow">{eyebrow}</span>
          <RevealText as="h2" className="kk-title kk-title-center">
            {title}
          </RevealText>
        </motion.div>

        <div className="motor-grid">
          <motion.div
            className="motor-card motor-card-main"
            variants={fade}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-15% 0px' }}
          >
            <span className="kk-eyebrow">{main.eyebrow}</span>
            <p className="kk-body kk-body-center">{main.body}</p>
          </motion.div>

          <div className="motor-stack">
            {side.map((s, i) => (
              <motion.div
                key={s.eyebrow}
                className="motor-card"
                variants={fade}
                custom={i + 1}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: '-15% 0px' }}
              >
                <span className="kk-eyebrow">{s.eyebrow}</span>
                <p className="kk-body kk-body-center">{s.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* Nuestra ventaja (137:132) — header alineado a la izquierda + 3 columnas
   gap-64. Cada columna: icon arrow_outward 18px arriba (gap-8) + título
   Host Medium 24px + body Mona Sans 18px. */
export function VentajaCompetitiva() {
  const { eyebrow, title, items } = negocio.ventaja;
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
          <span className="kk-eyebrow">{eyebrow}</span>
          <RevealText as="h2" className="kk-title">
            {title}
          </RevealText>
        </motion.div>

        <div className="kk-arrow-grid">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              className="kk-arrow-cell kk-arrow-cell-titled"
              variants={fade}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: '-15% 0px' }}
            >
              <div className="kk-arrow-cell-head">
                <span className="kk-arrow" aria-hidden="true">
                  <ArrowOutward size={18} />
                </span>
                <h3 className="kk-arrow-cell-title">{it.title}</h3>
              </div>
              <p className="kk-body">{it.body}</p>
            </motion.div>
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

/* Proyección financiera (Figma 104:742)
   3 escenarios separados por línea vertical con eyebrow · número grande ·
   sub-label · pill de resultado coloreado. */
export function ProyeccionFinanciera() {
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
        <motion.div
          className="kk-header kk-header-center"
          variants={fade}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-15% 0px' }}
        >
          <span className="kk-eyebrow">proyección financiera</span>
          <RevealText as="h2" className="kk-title kk-title-center">
            Caja desde el primer día
          </RevealText>
        </motion.div>

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
