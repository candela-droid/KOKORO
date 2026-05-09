import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

/**
 * CountUp - número que cuenta de 0 al valor cuando entra en viewport.
 */
export default function CountUp({ to, duration = 1.4, className = '', style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-20% 0px' });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const ease = (t) => 1 - Math.pow(1 - t, 3);
    let raf;
    function tick(now) {
      const t = Math.min(1, (now - start) / (duration * 1000));
      setVal(Math.round(ease(t) * to));
      if (t < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration]);

  return (
    <motion.span ref={ref} className={className} style={style}>
      {val}
    </motion.span>
  );
}
