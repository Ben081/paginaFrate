import { useState, useEffect } from 'react'

export default function AvisoLibroReclamaciones() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const cerrado = sessionStorage.getItem('aviso_lr_cerrado')
    if (!cerrado) setVisible(true)
  }, [])

  function cerrar() {
    setVisible(false)
    sessionStorage.setItem('aviso_lr_cerrado', '1')
  }

  if (!visible) return null

  return (
    <div className="bg-ink-deep border-y border-gold/20">
      <div className="wrap py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center flex-none">
            <svg className="w-4 h-4 text-gold-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
            </svg>
          </div>
          <p className="text-[12px] text-paper/70 leading-[1.4] min-w-0">
            Conforme a Código de Protección y Defensa del Consumidor, este establecimiento cuenta con un{' '}
            <a
              href="/reclamaciones"
              className="text-gold-bright font-semibold no-underline hover:underline"
            >
              Libro de Reclamaciones
            </a>
            {' '}a tu disposición. Solicítalo para registrar la queja o reclamo que tengas.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-none">
          <a
            href="/reclamaciones"
            className="no-underline bg-gold text-ink-deep px-4 py-1.5 rounded-lg font-mono text-[11px] font-semibold hover:bg-gold-bright active:scale-[0.97] transition-all duration-150"
          >
            Registrar reclamo
          </a>
          <button
            onClick={cerrar}
            className="font-mono text-[11px] text-paper/50 hover:text-paper transition-colors cursor-pointer bg-transparent border-none"
            aria-label="Cerrar aviso"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  )
}
