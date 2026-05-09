import { AnimatePresence, motion } from 'framer-motion';
import { sections } from '../data/content.js';
import './PresentationOverlay.css';

export default function PresentationOverlay({ isPresenting, index, total, onPrev, onNext, onExit }) {
  return (
    <AnimatePresence>
      {isPresenting && (
        <motion.div
          className="present-hud"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="present-progress">
            <div className="present-progress-track">
              <div
                className="present-progress-fill"
                style={{ width: `${((index + 1) / total) * 100}%` }}
              />
            </div>
            <div className="present-progress-text">
              {String(index + 1).padStart(2, '0')} <span>/</span> {String(total).padStart(2, '0')}
              <span className="present-section-name">· {sections[index].label}</span>
            </div>
          </div>

          <div className="present-controls">
            <button onClick={onPrev} aria-label="Anterior" className="present-btn">←</button>
            <button onClick={onNext} aria-label="Siguiente" className="present-btn">→</button>
            <button onClick={onExit} className="present-btn present-exit" aria-label="Salir">
              Esc · Salir
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
