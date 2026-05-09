import {
  InnerHero,
  PlanFaseado,
  ProyeccionFinanciera,
} from '../sections/Sections.jsx';

/* MVP page alineada con Figma node 104:516
   Hero · Plan faseado · Proyección financiera */
export default function MvpPage() {
  return (
    <div className="section-stack">
      <InnerHero
        id="mvp-hero"
        eyebrow="Mínimo producto viable"
        title="Punto de partida"
        lead="KOKORO arranca como un kiosco de specialty coffee de 10–15 m² en Madrid. Es el punto físico donde la marca se vive por primera vez, se valida el modelo y se construye comunidad antes de escalar a retail y B2B."
      />
      <PlanFaseado />
      <ProyeccionFinanciera />
    </div>
  );
}
