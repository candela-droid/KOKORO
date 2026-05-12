import {
  InnerHero,
  MvpIntro,
  Roadmap,
  ProyeccionFinanciera,
} from '../sections/Sections.jsx';

/* MVP page alineada con Figma node 104:516
   Hero · MVP intro (2-col Mínimo/Producto/Viable) · Proyección
   financiera (3 escenarios) · Roadmap (tabs FASE 1–4, último módulo). */
export default function MvpPage() {
  return (
    <div className="section-stack">
      <InnerHero
        id="mvp-hero"
        title="Punto de partida"
        lead="KOKORO arranca como un kiosco de specialty coffee de 10–15 m² en Madrid. Es el punto físico donde la marca se vive por primera vez, se valida el modelo y se construye comunidad antes de escalar a retail y B2B."
      />
      <MvpIntro />
      <ProyeccionFinanciera />
      <Roadmap />
    </div>
  );
}
