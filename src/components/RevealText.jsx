import { motion } from 'framer-motion';

const word = {
  hidden: { y: '100%', opacity: 0 },
  show: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: i * 0.04, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

/* El wrapper con overflow:hidden enmascara la animación slide-up de cada
   palabra. Pero con line-height tight (0.8) recorta descenders (p,g,q,y,j)
   y ascenders/tildes (d,b,h,Ó,Á...). Damos aire vertical y compensamos con
   margin negativo para que el layout visual no cambie. */
const lineWrap = {
  display: 'inline-block',
  overflow: 'hidden',
  verticalAlign: 'top',
  marginRight: '0.25em',
  paddingTop: '0.15em',
  paddingBottom: '0.22em',
  marginTop: '-0.15em',
  marginBottom: '-0.22em',
};

/* Trigger por defecto del whileInView. El sistema de stack-scroll usa
   sticky + rail de 100vh, así que un margin negativo en bottom dispara
   la animación demasiado pronto (el elemento entra por abajo del
   viewport mucho antes de que el usuario "llegue" a él visualmente).
   Disparamos cuando el elemento ya ha entrado al menos un 40% en el
   viewport por arriba — es decir, su borde superior está en el 60%
   del viewport. Combinado con el delay base de abajo, la animación
   se reproduce mientras el módulo termina de subir hasta su posición
   sticky en lugar de haber acabado antes de llegar. */
const REVEAL_VIEWPORT = { once: true, margin: '0px 0px -40% 0px' };
/* Delay base — pequeño retraso adicional desde el trigger para que la
   animación no se sienta atropellada con el scroll. */
const REVEAL_BASE_DELAY = 0.2;

/**
 * RevealText - aparece palabra a palabra al entrar en viewport.
 * `as` permite renderizar como h1, h2, p…
 * `delay` se suma al delay base; útil cuando varios bloques deben
 * encadenarse (ej. título a varias líneas).
 */
export default function RevealText({
  children,
  as: Tag = 'div',
  className = '',
  delay = 0,
  style = {},
}) {
  if (typeof children !== 'string') {
    return (
      <Tag className={className} style={style}>
        {children}
      </Tag>
    );
  }

  const words = children.split(' ');

  return (
    <Tag className={className} style={style}>
      <motion.span
        initial="hidden"
        whileInView="show"
        viewport={REVEAL_VIEWPORT}
        transition={{ delayChildren: REVEAL_BASE_DELAY + delay }}
        style={{ display: 'inline' }}
      >
        {words.map((w, i) => (
          <span key={i} style={lineWrap}>
            <motion.span style={{ display: 'inline-block' }} variants={word} custom={i}>
              {w}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
}
