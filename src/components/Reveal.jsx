import { motion, useReducedMotion } from 'framer-motion'

/**
 * Envuelve cualquier contenido y lo revela suavemente cuando entra
 * en el viewport durante el scroll. Reemplaza el efecto de reveal
 * por sección definido en la especificación visual.
 */
export default function Reveal({ children, delay = 0, y = 24, className = '' }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={shouldReduceMotion ? false : { opacity: 0, transform: `translateY(${y}px)` }}
      whileInView={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, transform: "translateY(0px)" }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.5, delay: shouldReduceMotion ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
