import {
  InnerHero,
  VacioMercado,
  NegocioResuelto,
  SolucionDisruptiva,
  MotorEscala,
  VentajaCompetitiva,
} from '../sections/Sections.jsx';
import { negocio } from '../data/content.js';

/* Página /modelo — "Sobre el negocio" (Figma 104:425).
   Hero (Business canvas) · El vacio del mercado · Por qué no está resuelto ·
   La solución disruptiva · El motor de escala · Nuestra ventaja.

   "Por qué no está resuelto" (Figma 194:2 / 194:96) entra entre el
   diagnóstico (VacioMercado) y la respuesta (SolucionDisruptiva): cierra
   el problema con las 3 razones por las que el mercado sigue sin
   resolverlo antes de presentar la propuesta. */
export default function ModeloPage() {
  return (
    <div className="section-stack">
      <InnerHero
        id="modelo-hero"
        title={negocio.hero.title}
        lead={negocio.hero.lead}
      />
      <VacioMercado />
      <NegocioResuelto />
      <SolucionDisruptiva />
      <MotorEscala />
      <VentajaCompetitiva />
    </div>
  );
}
