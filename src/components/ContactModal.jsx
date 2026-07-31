import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ContactForm from './ContactForm'

export default function ContactModal({ open, onClose }) {
  const [instanceKey, setInstanceKey] = useState(0)

  useEffect(() => {
    if (open) setInstanceKey((k) => k + 1)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep/80 p-4 backdrop-blur-sm"
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, transform: "scale(0.97) translateY(12px)" }}
            animate={{ opacity: 1, transform: "scale(1) translateY(0px)" }}
            exit={{ opacity: 0, transform: "scale(0.97) translateY(12px)" }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-lg rounded-2xl border border-gold/20 bg-ink-deep p-7"
          >
            <button
              onClick={onClose}
              className="absolute right-5 top-5 text-paper/50 transition hover:text-paper"
              aria-label="Cerrar"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <div className="eyebrow">Contacto</div>
            <h3 className="mt-2 font-serif text-xl font-semibold text-paper">
              Escríbenos
            </h3>
            <p className="mt-2 text-[13.5px] text-paper/55">
              Cuéntanos en qué podemos trabajar juntos.
            </p>

            <div className="mt-5">
              <ContactForm key={instanceKey} onSuccess={onClose} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
