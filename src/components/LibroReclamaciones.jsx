import { useState } from 'react'
import Reveal from './Reveal'

const PRODUCTOS_SERVICIOS = [
  'Donación - Puente Calicanto',
  'Donación - Cajón Peruano',
  'Donación - Formación de Catequistas',
  'Donación - General',
  'Contacto / Colaboración',
  'Información del sitio web',
  'Otro',
]

const PROVEEDOR = {
  nombre: 'Aland Bravo Vecorena',
  ruc: '10107356911',
  direccion: 'Huánuco, Perú',
  telefono: '998007262',
  correo: 'info@frate.lat',
}

const PASOS = ['Datos personales', 'Detalle del reclamo', 'Confirmar']

function PasoUno({ datos, setDatos, errores }) {
  function actualizar(campo, valor) {
    setDatos((prev) => ({ ...prev, [campo]: valor }))
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[12px] font-semibold text-paper/70">
            Nombre completo <span className="text-[#D6336C]">*</span>
          </label>
          <input
            required
            value={datos.nombre_consumidor}
            onChange={(e) => actualizar('nombre_consumidor', e.target.value)}
            placeholder="Su nombre completo"
            className={`mt-1.5 w-full rounded-lg border bg-ink px-4 py-2.5 text-paper text-[14px] outline-none transition-colors ${
              errores.nombre ? 'border-[#D6336C]' : 'border-line focus:border-gold'
            }`}
          />
          {errores.nombre && <p className="mt-1 text-[11px] text-[#D6336C]">{errores.nombre}</p>}
        </div>
        <div>
          <label className="block font-mono text-[12px] font-semibold text-paper/70">
            DNI / CE <span className="text-[#D6336C]">*</span>
          </label>
          <input
            required
            value={datos.dni_consumidor}
            onChange={(e) => actualizar('dni_consumidor', e.target.value)}
            placeholder="Número de documento"
            className={`mt-1.5 w-full rounded-lg border bg-ink px-4 py-2.5 text-paper text-[14px] outline-none transition-colors ${
              errores.dni ? 'border-[#D6336C]' : 'border-line focus:border-gold'
            }`}
          />
          {errores.dni && <p className="mt-1 text-[11px] text-[#D6336C]">{errores.dni}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block font-mono text-[12px] font-semibold text-paper/70">Domicilio</label>
          <input
            value={datos.domicilio_consumidor}
            onChange={(e) => actualizar('domicilio_consumidor', e.target.value)}
            placeholder="Ciudad, distrito"
            className="mt-1.5 w-full rounded-lg border border-line bg-ink px-4 py-2.5 text-paper text-[14px] outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="block font-mono text-[12px] font-semibold text-paper/70">Teléfono</label>
          <input
            value={datos.telefono_consumidor}
            onChange={(e) => actualizar('telefono_consumidor', e.target.value)}
            placeholder="Celular o teléfono"
            className="mt-1.5 w-full rounded-lg border border-line bg-ink px-4 py-2.5 text-paper text-[14px] outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="block font-mono text-[12px] font-semibold text-paper/70">
          Correo electrónico <span className="text-[#D6336C]">*</span>
        </label>
        <input
          required
          type="email"
          value={datos.correo_consumidor}
          onChange={(e) => actualizar('correo_consumidor', e.target.value)}
          placeholder="suemail@ejemplo.com"
          className={`mt-1.5 w-full rounded-lg border bg-ink px-4 py-2.5 text-paper text-[14px] outline-none transition-colors ${
            errores.correo ? 'border-[#D6336C]' : 'border-line focus:border-gold'
          }`}
        />
        {errores.correo && <p className="mt-1 text-[11px] text-[#D6336C]">{errores.correo}</p>}
      </div>

      <div>
        <label className="block font-mono text-[12px] font-semibold text-paper/70">
          Padre o representante (si eres menor de edad)
        </label>
        <input
          value={datos.padre_representante}
          onChange={(e) => actualizar('padre_representante', e.target.value)}
          placeholder="Nombre del padre o representante"
          className="mt-1.5 w-full rounded-lg border border-line bg-ink px-4 py-2.5 text-paper text-[14px] outline-none focus:border-gold"
        />
      </div>
    </div>
  )
}

function PasoDos({ datos, setDatos, errores }) {
  function actualizar(campo, valor) {
    setDatos((prev) => ({ ...prev, [campo]: valor }))
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block font-mono text-[12px] font-semibold text-paper/70">
          Producto / Servicio <span className="text-[#D6336C]">*</span>
        </label>
        <div className="flex flex-wrap gap-2 mt-2">
          {PRODUCTOS_SERVICIOS.map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => actualizar('producto_servicio', p)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-[12px] transition ${
                datos.producto_servicio === p
                  ? 'bg-gold text-ink-deep'
                  : 'border border-line text-paper/70 hover:border-gold/50'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block font-mono text-[12px] font-semibold text-paper/70">Monto (S/)</label>
        <input
          type="number"
          min="0"
          step="0.01"
          value={datos.monto}
          onChange={(e) => actualizar('monto', e.target.value)}
          placeholder="0.00"
          className="mt-1.5 w-full rounded-lg border border-line bg-ink px-4 py-2.5 text-paper text-[14px] outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="block font-mono text-[12px] font-semibold text-paper/70">
          Descripción detallada del reclamo <span className="text-[#D6336C]">*</span>
        </label>
        <p className="text-[12px] text-paper/50 mt-1 mb-2">Describe con precisión el problema o inconformidad</p>
        <textarea
          required
          rows={5}
          value={datos.detalle_reclamo}
          onChange={(e) => actualizar('detalle_reclamo', e.target.value)}
          placeholder="Describe el motivo de su reclamo..."
          className={`w-full resize-none rounded-lg border bg-ink px-4 py-2.5 text-paper text-[14px] outline-none transition-colors ${
            errores.detalle ? 'border-[#D6336C]' : 'border-line focus:border-gold'
          }`}
        />
        {errores.detalle && <p className="mt-1 text-[11px] text-[#D6336C]">{errores.detalle}</p>}
      </div>

      <div>
        <label className="block font-mono text-[12px] font-semibold text-paper/70">Pedido concreto</label>
        <p className="text-[12px] text-paper/50 mt-1 mb-2">¿Qué solución esperas?</p>
        <textarea
          rows={3}
          value={datos.pedido_concreto}
          onChange={(e) => actualizar('pedido_concreto', e.target.value)}
          placeholder="Ejemplo: Solicito que se realice el reembolso del monto donado..."
          className="w-full resize-none rounded-lg border border-line bg-ink px-4 py-2.5 text-paper text-[14px] outline-none focus:border-gold"
        />
      </div>
    </div>
  )
}

function PasoTres({ datos, conforme, setConforme }) {
  return (
    <div className="space-y-5">
      <div className="bg-ink-deep border border-line rounded-xl p-5 space-y-3">
        <h4 className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-gold-bright">Datos personales</h4>
        <div className="grid grid-cols-2 gap-2 text-[13px]">
          <div><span className="text-paper/50">Nombre: </span><span className="text-paper">{datos.nombre_consumidor || '—'}</span></div>
          <div><span className="text-paper/50">DNI/CE: </span><span className="text-paper">{datos.dni_consumidor || '—'}</span></div>
          <div><span className="text-paper/50">Correo: </span><span className="text-paper">{datos.correo_consumidor || '—'}</span></div>
          <div><span className="text-paper/50">Teléfono: </span><span className="text-paper">{datos.telefono_consumidor || '—'}</span></div>
          {datos.domicilio_consumidor && <div className="col-span-2"><span className="text-paper/50">Domicilio: </span><span className="text-paper">{datos.domicilio_consumidor}</span></div>}
          {datos.padre_representante && <div className="col-span-2"><span className="text-paper/50">Representante: </span><span className="text-paper">{datos.padre_representante}</span></div>}
        </div>
      </div>

      <div className="bg-ink-deep border border-line rounded-xl p-5 space-y-3">
        <h4 className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-gold-bright">Detalle del reclamo</h4>
        <div className="grid grid-cols-2 gap-2 text-[13px]">
          <div className="col-span-2"><span className="text-paper/50">Producto/Servicio: </span><span className="text-paper">{datos.producto_servicio}</span></div>
          {datos.monto && <div><span className="text-paper/50">Monto: </span><span className="text-paper">S/ {Number(datos.monto).toFixed(2)}</span></div>}
        </div>
        <div className="text-[13px]">
          <p className="text-paper/50 mb-1">Reclamo:</p>
          <p className="text-paper/80 leading-[1.5]">{datos.detalle_reclamo || '—'}</p>
        </div>
        {datos.pedido_concreto && (
          <div className="text-[13px]">
            <p className="text-paper/50 mb-1">Pedido concreto:</p>
            <p className="text-paper/80 leading-[1.5]">{datos.pedido_concreto}</p>
          </div>
        )}
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={conforme}
          onChange={(e) => setConforme(e.target.checked)}
          className="mt-0.5 w-4 h-4 rounded border-line bg-ink accent-gold cursor-pointer"
        />
        <span className="text-[13px] text-paper/70 leading-[1.5]">
          Confirmo que los datos proporcionados son verdaderos y estoy conforme con los términos de este reclamo, conforme al Reglamento del Libro de Reclamaciones (D.S. 011-2011-PCM).
        </span>
      </label>
    </div>
  )
}

export default function LibroReclamaciones() {
  const [paso, setPaso] = useState(1)
  const [enviado, setEnviado] = useState(false)
  const [codigo, setCodigo] = useState('')
  const [error, setError] = useState('')
  const [enviando, setEnviando] = useState(false)
  const [conforme, setConforme] = useState(false)
  const [errores, setErrores] = useState({})
  const [datos, setDatos] = useState({
    nombre_consumidor: '',
    domicilio_consumidor: '',
    dni_consumidor: '',
    telefono_consumidor: '',
    correo_consumidor: '',
    padre_representante: '',
    producto_servicio: PRODUCTOS_SERVICIOS[0],
    monto: '',
    detalle_reclamo: '',
    pedido_concreto: '',
  })

  function validarPaso(pasoActual) {
    const nuevosErrores = {}
    if (pasoActual === 1) {
      if (!datos.nombre_consumidor.trim()) nuevosErrores.nombre = 'Requerido'
      if (!datos.dni_consumidor.trim()) nuevosErrores.dni = 'Requerido'
      if (!datos.correo_consumidor.trim()) nuevosErrores.correo = 'Requerido'
    }
    if (pasoActual === 2) {
      if (!datos.detalle_reclamo.trim()) nuevosErrores.detalle = 'Requerido'
    }
    setErrores(nuevosErrores)
    return Object.keys(nuevosErrores).length === 0
  }

  function siguiente() {
    if (validarPaso(paso)) {
      setPaso((p) => Math.min(p + 1, 3))
      setErrores({})
    }
  }

  function anterior() {
    setPaso((p) => Math.max(p - 1, 1))
    setErrores({})
  }

  async function enviar() {
    if (!conforme) return
    setError('')
    setEnviando(true)

    try {
      const res = await fetch('/api/reclamaciones', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre_consumidor: datos.nombre_consumidor,
          domicilio_consumidor: datos.domicilio_consumidor,
          dni_consumidor: datos.dni_consumidor,
          telefono_consumidor: datos.telefono_consumidor,
          correo_consumidor: datos.correo_consumidor,
          padre_representante: datos.padre_representante,
          producto_servicio: datos.producto_servicio,
          monto: datos.monto,
          detalle_reclamo: datos.detalle_reclamo,
          pedido_concreto: datos.pedido_concreto,
        }),
      })

      const data = await res.json()

      if (!data.ok) {
        setError(data.error || 'Hubo un error al enviar. Intenta de nuevo.')
        setEnviando(false)
        return
      }

      setCodigo(data.codigo_unico)
      setEnviado(true)
    } catch {
      setError('Error de conexión. Verifica tu internet e intenta de nuevo.')
      setEnviando(false)
    }
  }

  if (enviado) {
    return (
      <section className="py-20">
        <div className="wrap">
          <Reveal>
            <div className="max-w-[640px] mx-auto text-center">
              <div className="w-16 h-16 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gold-bright" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h2 className="text-[26px] font-serif font-semibold mb-3">Reclamo registrado</h2>
              <p className="text-[15px] text-paper/70 leading-[1.6] mb-6">
                Tu reclamo ha sido registrado exitosamente. Guarda tu código para dar seguimiento.
              </p>

              <div className="bg-ink-deep border border-gold/30 rounded-xl p-6 mb-6">
                <p className="font-mono text-[11px] text-paper/60 mb-1">Tu código de reclamo</p>
                <p className="font-mono text-[24px] font-bold text-gold-bright tracking-wider">{codigo}</p>
              </div>

              <p className="text-[13px] text-paper/60 leading-[1.5] mb-6">
                Se ha enviado una copia a tu correo electrónico con todos los detalles.
                El proveedor tiene un plazo máximo de <strong className="text-paper">15 días hábiles</strong> para darte respuesta.
              </p>

              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => window.print()}
                  className="px-5 py-2.5 rounded-lg border border-line font-mono text-[12.5px] font-semibold text-paper/70 hover:border-gold/50 hover:text-paper active:scale-[0.97] transition-all duration-150 cursor-pointer bg-transparent"
                >
                  Imprimir constancia
                </button>
                <a
                  href="/"
                  className="no-underline px-5 py-2.5 rounded-lg bg-gold text-ink-deep font-mono text-[12.5px] font-semibold hover:bg-gold-bright active:scale-[0.97] transition-all duration-150"
                >
                  Volver al inicio
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20">
      <div className="wrap max-w-[720px]">
        <Reveal>
          <div className="eyebrow">Libro de Reclamaciones</div>
          <h2 className="text-[28px] mt-2.5 leading-[1.25]">Hoja de Reclamación</h2>
          <p className="text-[15px] text-paper/70 mt-2.5 leading-[1.6] max-w-[580px]">
            Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571), este establecimiento cuenta con un Libro de Reclamaciones a tu disposición.
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="bg-ink-deep border border-line rounded-xl p-5 mt-8 mb-6">
            <div className="grid grid-cols-2 gap-2 text-[13px]">
              <div><span className="text-paper/50">Proveedor: </span><span className="text-paper">{PROVEEDOR.nombre}</span></div>
              <div><span className="text-paper/50">RUC: </span><span className="text-paper">{PROVEEDOR.ruc}</span></div>
              <div><span className="text-paper/50">Dirección: </span><span className="text-paper">{PROVEEDOR.direccion}</span></div>
              <div><span className="text-paper/50">Correo: </span><span className="text-paper">{PROVEEDOR.correo}</span></div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6">
            {/* Indicador de progreso */}
            <div className="flex items-center gap-2 mb-8">
              {PASOS.map((nombre, i) => {
                const num = i + 1
                const activo = num === paso
                const completado = num < paso
                return (
                  <div key={num} className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-[12px] font-semibold flex-none transition-colors ${
                      completado ? 'bg-gold text-ink-deep' : activo ? 'bg-gold/20 text-gold-bright border border-gold/50' : 'bg-white/[0.04] text-paper/30 border border-line'
                    }`}>
                      {completado ? (
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : num}
                    </div>
                    <span className={`text-[12px] font-mono hidden sm:block ${activo ? 'text-paper' : 'text-paper/40'}`}>
                      {nombre}
                    </span>
                    {i < PASOS.length - 1 && (
                      <div className={`flex-1 h-px ${completado ? 'bg-gold' : 'bg-line'}`} />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Contenido del paso */}
            <div className="bg-ink-deep border border-line rounded-xl p-6">
              <h3 className="text-[16px] font-semibold mb-4">
                {paso === 1 && '1. Identificación del consumidor reclamante'}
                {paso === 2 && '2. Detalle de la reclamación'}
                {paso === 3 && '3. Confirmación'}
              </h3>

              {paso === 1 && <PasoUno datos={datos} setDatos={setDatos} errores={errores} />}
              {paso === 2 && <PasoDos datos={datos} setDatos={setDatos} errores={errores} />}
              {paso === 3 && <PasoTres datos={datos} conforme={conforme} setConforme={setConforme} />}
            </div>

            {error && <p className="mt-4 text-[13px] text-[#D6336C]">{error}</p>}

            {/* Botones de navegación */}
            <div className="flex justify-between items-center mt-6 gap-3">
              {paso > 1 ? (
                <button
                  onClick={anterior}
                  className="px-6 py-2.5 rounded-lg border border-line font-mono text-[12.5px] font-semibold text-paper/70 hover:border-gold/50 hover:text-paper active:scale-[0.97] transition-all duration-150 cursor-pointer bg-transparent"
                >
                  ← Anterior
                </button>
              ) : <div />}

              {paso < 3 ? (
                <button
                  onClick={siguiente}
                  className="px-6 py-2.5 rounded-lg bg-gold font-mono text-[12.5px] font-semibold text-ink-deep hover:bg-gold-bright active:scale-[0.97] transition-all duration-150 cursor-pointer"
                >
                  Siguiente →
                </button>
              ) : (
                <button
                  onClick={enviar}
                  disabled={!conforme || enviando}
                  className="px-6 py-2.5 rounded-lg bg-gold font-mono text-[12.5px] font-semibold text-ink-deep hover:bg-gold-bright active:scale-[0.97] transition-all duration-150 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {enviando ? 'Enviando...' : 'Registrar reclamo'}
                </button>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
