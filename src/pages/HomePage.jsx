import {
  Hero,
  Resumen,
  SobreKokoro,
  Equipo,
} from '../sections/Sections.jsx';

/* Home alineada con Figma node 104:487
   Hero · Qué es · Sobre Kokoro (tabs) · Equipo
   Cuatro módulos verticales que cuentan la marca: la palabra, la idea,
   los principios y el equipo detrás. */
export default function HomePage() {
  return (
    <div className="section-stack">
      <Hero />
      <Resumen />
      <SobreKokoro />
      <Equipo />
    </div>
  );
}
