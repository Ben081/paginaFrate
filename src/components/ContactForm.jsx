import { useState } from 'react'

const ASUNTOS = ['Colaboración', 'Proyecto', 'Prensa', 'Otro']

export default function ContactForm({ onSuccess }) {
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [asunto, setAsunto] = useState(ASUNTOS[0])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setEnviando(true)

    const form = e.target
    const nombre = form.nombre?.value || ''
    const correo = form.correo?.value || ''
    const mensaje = form.mensaje?.value || ''

    try {
      const res = await fetch('/api/contacto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, correo, asunto, mensaje }),
      })

      const data = await res.json()

      if (!data.ok) {
        setError(data.error || 'Hubo un error al enviar. Intenta de nuevo.')
        setEnviando(false)
        return
      }

      setEnviado(true)
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <div className="flex flex-col items-center py-6 text-center">
        <div className="w-12 h-12 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-gold-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3 className="mt-4 font-serif text-xl font-semibold text-paper">
          ¡Mensaje enviado!
        </h3>
        <p className="mt-2 text-[13.5px] text-paper/60">
          Te responderemos a tu correo lo antes posible.
        </p>
        {onSuccess && (
          <button
            onClick={onSuccess}
            className="mt-6 rounded-lg border border-gold/40 px-6 py-2.5 font-mono text-[13px] font-semibold text-paper transition hover:bg-gold/10"
          >
            Cerrar
          </button>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block font-mono text-[12px] font-semibold text-paper/70">
            Nombre
          </label>
          <input
            required
            name="nombre"
            placeholder="Tu nombre"
            className="mt-1.5 w-full rounded-lg border border-line bg-ink px-4 py-2.5 text-paper outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block font-mono text-[12px] font-semibold text-paper/70">
            Correo
          </label>
          <input
            required
            type="email"
            name="correo"
            placeholder="tuemail@ejemplo.com"
            className="mt-1.5 w-full rounded-lg border border-line bg-ink px-4 py-2.5 text-paper outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-mono text-[12px] font-semibold text-paper/70">
          Asunto
        </label>
        <div className="mt-2 flex flex-wrap gap-2">
          {ASUNTOS.map((a) => (
            <button
              type="button"
              key={a}
              onClick={() => setAsunto(a)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-[12.5px] transition ${
                asunto === a
                  ? 'bg-gold text-ink-deep'
                  : 'border border-line text-paper/70 hover:border-gold/50'
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <label className="block font-mono text-[12px] font-semibold text-paper/70">
          Mensaje
        </label>
        <textarea
          required
          rows={4}
          name="mensaje"
          placeholder="Cuéntanos en qué podemos trabajar juntos…"
          className="mt-1.5 w-full resize-none rounded-lg border border-line bg-ink px-4 py-2.5 text-paper outline-none focus:border-gold"
        />
      </div>

      {error && <p className="mt-3 text-[13px] text-[#D6336C]">{error}</p>}

      <button
        type="submit"
        disabled={enviando}
        className="mt-6 w-full rounded-lg bg-gold py-3.5 font-mono text-[13px] font-semibold text-ink-deep transition-colors duration-160 ease-out hover:bg-gold-bright active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {enviando ? 'Enviando…' : 'Enviar mensaje'}
      </button>
    </form>
  )
}
