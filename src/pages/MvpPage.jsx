import {
  InnerHero,
  MvpIntro,
  ParaQue,
  Roadmap,
  ProyeccionFinanciera,
} from '../sections/Sections.jsx';

/* MVP page alineada con Figma node 104:516
   Hero · MVP intro (2-col Mínimo/Producto/Viable) · Para qué (3 glass
   cards centrado, Figma 194:61) · Proyección financiera (3 escenarios) ·
   Roadmap (tabs FASE 1–4, último módulo).

   "Para qué" entra entre el qué (MvpIntro define el formato del local)
   y el cuánto (ProyeccionFinanciera baja a los números) — explica el
   por qué estratégico del formato antes de pasar a las cifras. */
export default function MvpPage() {
  return (
    <div className="section-stack">
      <InnerHero
        id="mvp-hero"
        title="Punto de partida"
        lead="KOKORO arranca como un primer local de specialty coffee de 10–15 m² en Madrid. No es un local más: es la primera versión física de la marca — el sitio donde se valida el modelo, se construye comunidad y se demuestra el estándar KOKORO antes de escalar a retail y B2B."
      />
      <MvpIntro />
      <ParaQue />
      <ProyeccionFinanciera />
      <Roadmap />
    </div>
  );
}
