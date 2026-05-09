import { motion } from 'framer-motion';
import './FloatingActions.css';

export default function FloatingActions({ onPresent }) {
  return (
    <motion.div
      className="floating-actions"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <button className="fa-btn" onClick={onPresent} aria-label="Modo presentación">
        <span className="fa-glyph">▷</span>
        <span>Presentar</span>
        <kbd>P</kbd>
      </button>
      <a className="fa-btn" href="/dossier.pdf" download="KOKORO-dossier.pdf">
        <span className="fa-glyph">↓</span>
        <span>Dossier PDF</span>
      </a>
    </motion.div>
  );
}
