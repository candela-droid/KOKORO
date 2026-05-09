import { motion } from 'framer-motion';

const fade = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

/**
 * Eyebrow + numeración de sección. Reutilizable.
 */
export default function SectionLabel({ num, children }) {
  return (
    <motion.div
      variants={fade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-15% 0px' }}
      className="eyebrow"
      style={{ display: 'flex', gap: 16, alignItems: 'baseline', marginBottom: 32 }}
    >
      {num && <span style={{ fontFeatureSettings: '"tnum" on' }}>{num}</span>}
      <span>{children}</span>
    </motion.div>
  );
}
