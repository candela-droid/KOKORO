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

/**
 * RevealText - aparece palabra a palabra al entrar en viewport.
 * `as` permite renderizar como h1, h2, p…
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
        viewport={{ once: true, margin: '-15% 0px' }}
        transition={{ delayChildren: delay }}
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
