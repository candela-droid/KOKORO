import {
  InnerHero,
  VacioMercado,
  SolucionDisruptiva,
  MotorEscala,
  VentajaCompetitiva,
} from '../sections/Sections.jsx';
import { negocio } from '../data/content.js';

/* Página /modelo — "Sobre el negocio" (Figma 104:425).
   Hero (Business canvas) · El vacio del mercado · La solución disruptiva ·
   El motor de escala · Nuestra ventaja. */
export default function ModeloPage() {
  return (
    <div className="section-stack">
      <InnerHero
        id="modelo-hero"
        eyebrow={negocio.hero.eyebrow}
        title={negocio.hero.title}
        lead={negocio.hero.lead}
      />
      <VacioMercado />
      <SolucionDisruptiva />
      <MotorEscala />
      <VentajaCompetitiva />
    </div>
  );
}
