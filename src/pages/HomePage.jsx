import {
  Hero,
  Resumen,
  Problema,
  Gap,
  MVV,
  Equipo,
} from '../sections/Sections.jsx';

/* Home alineada con Figma node 104:487
   Hero · Resumen ejecutivo · Problema · Gap · MVV · Equipo
   La línea legal (KOKORO Foods · 2026 · Documento confidencial) vive
   dentro del último módulo (Equipo) — sin footer aparte. */
export default function HomePage() {
  return (
    <div className="section-stack">
      <Hero />
      <Resumen />
      <Problema />
      <Gap />
      <MVV />
      <Equipo />
    </div>
  );
}
