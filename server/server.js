import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import db, { getAllConfig, setConfigValues } from './db.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = process.env.PORT || 3001

// ── Middleware ──────────────────────────────────────────────
app.use(express.json())

const allowedOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean)
app.use(cors({
  origin: (origin, cb) => {
    if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
      cb(null, true)
    } else {
      cb(new Error('Origen no permitido'))
    }
  }
}))

// ── SMTP transporter ───────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.frate.lat',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// ── Helper: cálculo de comisión usando config centralizada ──
function calcularComision(monto) {
  const config = getAllConfig()
  const comisionPct = Number(config.comision_pct) || 0
  const feeFijo = Number(config.fee_fijo) || 0
  const comisionFratePct = Number(config.comision_frate_pct) || 0

  const comisionCulqi = Math.round((monto * comisionPct / 100 + feeFijo) * 100) / 100
  const comisionFrate = Math.round((monto * comisionFratePct / 100) * 100) / 100
  const montoNeto = Math.round((monto - comisionCulqi - comisionFrate) * 100) / 100

  return { comision: comisionCulqi, comisionFrate, montoNeto, feeFijo }
}

// ── Culqui: Configuración (COMENTADO - activar cuando se tengan los tokens) ──
// import Culqi from '@culqi/culqi-js'
// const culqi = new Culqi({
//   public_key: process.env.CULQI_PUBLIC_KEY,
//   secret_key: process.env.CULQI_SECRET_KEY,
// })

// ── Configuración de proyectos (nombre, asunto, footer para correos) ──
// El "asunto" incluye siempre el nombre del proyecto, para identificar
// de qué página web vino el mensaje con solo mirar la bandeja de entrada.
const configProyectos = {
  'freestyle-catolico': {
    nombre: 'Freestyle Católico',
    asuntoConvocatoria: '[Freestyle Católico] Nueva postulación',
    asuntoContacto: '[Freestyle Católico] Nuevo mensaje de contacto',
    footer: 'Freestyle Católico 2026 — Programa Itinerante de Coaching Corporativo',
  },
  'cajon-peruano': {
    nombre: 'Cajón Peruano',
    asuntoConvocatoria: '[Cajón Peruano] Nueva postulación',
    asuntoContacto: '[Cajón Peruano] Nuevo mensaje de contacto',
    footer: 'Cajón Peruano 2026 — Junta Vecinal Huánuco',
  },
  'frate': {
    nombre: 'FRATE',
    asuntoConvocatoria: '[FRATE] Nueva postulación',
    asuntoContacto: '[FRATE] Nuevo mensaje de contacto',
    footer: 'FRATE — Gestores de industria cultural, artística y musical',
  },
  'puente-calicanto': {
    nombre: 'Puente Calicanto',
    asuntoConvocatoria: '[Puente Calicanto] Nueva postulación',
    asuntoContacto: '[Puente Calicanto] Nuevo mensaje de contacto',
    footer: 'Puente Calicanto 2026 — Ecosistema de Crowdfunding para la Producción de Pistas Musicales Litúrgicas',
  },
}

function getConfigProyecto(proyecto) {
  return configProyectos[proyecto] || {
    nombre: 'Frate',
    asuntoConvocatoria: '[Frate] Nueva postulación',
    asuntoContacto: '[Frate] Nuevo mensaje de contacto',
    footer: 'Frate — Plataforma de Proyectos Sociales 2026',
  }
}

// ── Admin: middleware de autenticación (declarado antes de usarse) ──
function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: 'No autorizado.' })
  }
  next()
}

// ── Configuración: lectura pública (la consumen los 3 frontends) ──
app.get('/api/config', (_req, res) => {
  try {
    const config = getAllConfig()
    res.json({
      ok: true,
      comision_pct: Number(config.comision_pct),
      fee_fijo: Number(config.fee_fijo),
      monto_minimo: Number(config.monto_minimo),
      comision_frate_pct: Number(config.comision_frate_pct),
    })
  } catch (err) {
    console.error('Error al leer configuración:', err)
    res.status(500).json({ ok: false, error: 'Error interno.' })
  }
})

// ── Configuración: actualización (solo admin, desde el panel) ──
app.put('/api/config', requireAdmin, (req, res) => {
  try {
    const { comision_pct, fee_fijo, monto_minimo, comision_frate_pct } = req.body
    const cambios = {}

    if (comision_pct !== undefined) {
      const v = Number(comision_pct)
      if (Number.isNaN(v) || v < 0 || v > 100) {
        return res.status(400).json({ ok: false, error: 'comision_pct inválido (0-100).' })
      }
      cambios.comision_pct = v
    }
    if (fee_fijo !== undefined) {
      const v = Number(fee_fijo)
      if (Number.isNaN(v) || v < 0) {
        return res.status(400).json({ ok: false, error: 'fee_fijo inválido.' })
      }
      cambios.fee_fijo = v
    }
    if (monto_minimo !== undefined) {
      const v = Number(monto_minimo)
      if (Number.isNaN(v) || v < 0) {
        return res.status(400).json({ ok: false, error: 'monto_minimo inválido.' })
      }
      cambios.monto_minimo = v
    }
    if (comision_frate_pct !== undefined) {
      const v = Number(comision_frate_pct)
      if (Number.isNaN(v) || v < 0 || v > 100) {
        return res.status(400).json({ ok: false, error: 'comision_frate_pct inválido (0-100).' })
      }
      cambios.comision_frate_pct = v
    }

    if (Object.keys(cambios).length === 0) {
      return res.status(400).json({ ok: false, error: 'No se envió ningún valor para actualizar.' })
    }

    const config = setConfigValues(cambios)
    res.json({
      ok: true,
      comision_pct: Number(config.comision_pct),
      fee_fijo: Number(config.fee_fijo),
      monto_minimo: Number(config.monto_minimo),
      comision_frate_pct: Number(config.comision_frate_pct),
    })
  } catch (err) {
    console.error('Error al actualizar configuración:', err)
    res.status(500).json({ ok: false, error: 'Error interno.' })
  }
})

// ── Ruta: Registrar donación ───────────────────────────────
app.post('/api/donaciones', async (req, res) => {
  try {
    const { proyecto, nombre, correo, monto, anonimo = false, fuente = 'desconocida', token_pago } = req.body

    if (!proyecto || !monto || Number(monto) <= 0) {
      return res.status(400).json({ ok: false, error: 'Datos incompletos o monto inválido.' })
    }

    const montoNum = Number(monto)
    const montoMinimo = Number(getAllConfig().monto_minimo) || 0

    if (montoNum < montoMinimo) {
      return res.status(400).json({
        ok: false,
        error: `El monto mínimo de donación es S/ ${montoMinimo.toFixed(2)}.`,
      })
    }

    const { comision, comisionFrate, montoNeto, feeFijo } = calcularComision(montoNum)

    // ── Culqui: Validar pago (COMENTADO - activar cuando se tengan los tokens) ──
    // let estadoPago = 'simulado'
    // let pagoId = null
    //
    // if (token_pago) {
    //   try {
    //     const cargo = await culqi.charges.create({
    //       amount: Math.round(montoNum * 100), // Culqui usa céntimos
    //       currency_code: 'PEN',
    //       email: correo || 'donante@ejemplo.com',
    //       source_id: token_pago,
    //       description: `Donación ${proyecto}`,
    //       metadata: { proyecto, fuente }
    //     })
    //     estadoPago = 'completado'
    //     pagoId = cargo.id
    //   } catch (error) {
    //     console.error('Error en pago Culqui:', error)
    //     estadoPago = 'fallido'
    //   }
    // }

    // Por ahora, registrar como completado (simulado)
    const estadoPago = 'completado'
    const pagoId = null

    const stmt = db.prepare(`
      INSERT INTO donaciones (proyecto, nombre, correo, monto, comision, comision_frate, monto_neto, fee, anonimo, fuente, estado_pago, pago_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      proyecto,
      anonimo ? 'Donante anónimo' : (nombre || 'Donante anónimo'),
      correo || null,
      montoNum,
      comision,
      comisionFrate,
      montoNeto,
      feeFijo,
      anonimo ? 1 : 0,
      fuente,
      estadoPago,
      pagoId
    )

    res.json({ ok: true, id: result.lastInsertRowid, estado_pago: estadoPago })
  } catch (err) {
    console.error('Error al registrar donación:', err)
    res.status(500).json({ ok: false, error: 'Error interno del servidor.' })
  }
})

// ── Ruta: Enviar postulación (convocatoria) ────────────────
app.post('/api/convocatoria', async (req, res) => {
  try {
    const { nombre, correo, nivelEstudios, interes, habilidad, mensaje, mayorEdad, proyecto } = req.body

    if (!nombre || !correo || !mayorEdad) {
      return res.status(400).json({ ok: false, error: 'Faltan campos obligatorios.' })
    }

    const config = getConfigProyecto(proyecto)

    const html = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0f0f12; border-radius: 12px; border: 1px solid rgba(201,162,39,0.3);">
        <h2 style="color: #e0bc4a; font-size: 13px; letter-spacing: 0.1em; margin: 0;">CONVOCATORIA — ${config.nombre.toUpperCase()}</h2>
        <h3 style="color: #f3ead3; font-size: 20px; margin: 8px 0 20px;">Nueva postulación recibida</h3>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px; width: 130px;">Nombre</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Correo</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${correo}</td>
          </tr>
          ${nivelEstudios ? `<tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Nivel de estudios</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${nivelEstudios}</td>
          </tr>` : ''}
          ${interes ? `<tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Interesado en</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${interes}</td>
          </tr>` : ''}
          ${habilidad ? `<tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Habilidad</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${habilidad}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Mensaje</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${mensaje || 'Sin mensaje'}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Mayor de 18</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${mayorEdad ? 'Sí' : 'No'}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid rgba(201,162,39,0.15); margin: 20px 0;" />
        <p style="color: #948d9e; font-size: 11px; margin: 0;">${config.footer}</p>
      </div>
    `

    await transporter.sendMail({
      from: `"${config.nombre}" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO || 'info@frate.lat',
      subject: `${config.asuntoConvocatoria} — ${nombre}`,
      html,
      replyTo: correo,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('Error al enviar convocatoria:', err)
    res.status(500).json({ ok: false, error: 'Error al enviar el correo.' })
  }
})

// ── Ruta: Enviar mensaje de contacto ───────────────────────
app.post('/api/contacto', async (req, res) => {
  try {
    const { nombre, correo, mensaje, proyecto, asunto } = req.body

    if (!nombre || !correo || !mensaje) {
      return res.status(400).json({ ok: false, error: 'Faltan campos obligatorios.' })
    }

    const config = getConfigProyecto(proyecto)

    const html = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0f0f12; border-radius: 12px; border: 1px solid rgba(201,162,39,0.3);">
        <h2 style="color: #e0bc4a; font-size: 13px; letter-spacing: 0.1em; margin: 0;">CONTACTO — ${config.nombre.toUpperCase()}</h2>
        <h3 style="color: #f3ead3; font-size: 20px; margin: 8px 0 20px;">Nuevo mensaje recibido</h3>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px; width: 130px;">Nombre</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${nombre}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Correo</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${correo}</td>
          </tr>
          ${asunto ? `<tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Asunto</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${asunto}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Mensaje</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${mensaje}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid rgba(201,162,39,0.15); margin: 20px 0;" />
        <p style="color: #948d9e; font-size: 11px; margin: 0;">${config.footer}</p>
      </div>
    `

    await transporter.sendMail({
      from: `"${config.nombre}" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO || 'info@frate.lat',
      subject: `${config.asuntoContacto} (${asunto || 'General'}) — ${nombre}`,
      html,
      replyTo: correo,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('Error al enviar mensaje de contacto:', err)
    res.status(500).json({ ok: false, error: 'Error al enviar el correo.' })
  }
})

// ── Generar código único para reclamaciones ──
function generarCodigoReclamacion() {
  const now = new Date()
  const year = now.getFullYear()
  const stmt = db.prepare("SELECT COUNT(*) as total FROM reclamaciones WHERE strftime('%Y', creado_en) = ?")
  const { total } = stmt.get(String(year))
  const num = String(total + 1).padStart(7, '0')
  return `LR-${num}-${year}`
}

// ── Libro de Reclamaciones: Registrar reclamo ──
app.post('/api/reclamaciones', async (req, res) => {
  try {
    const {
      nombre_consumidor,
      domicilio_consumidor,
      dni_consumidor,
      telefono_consumidor,
      correo_consumidor,
      padre_representante,
      producto_servicio,
      monto,
      detalle_reclamo,
      pedido_concreto,
    } = req.body

    if (!nombre_consumidor || !dni_consumidor || !correo_consumidor || !producto_servicio || !detalle_reclamo) {
      return res.status(400).json({ ok: false, error: 'Faltan campos obligatorios.' })
    }

    const codigo_unico = generarCodigoReclamacion()

    const stmt = db.prepare(`
      INSERT INTO reclamaciones (codigo_unico, nombre_consumidor, domicilio_consumidor, dni_consumidor, telefono_consumidor, correo_consumidor, padre_representante, producto_servicio, monto, detalle_reclamo, pedido_concreto)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    stmt.run(
      codigo_unico,
      nombre_consumidor,
      domicilio_consumidor || '',
      dni_consumidor,
      telefono_consumidor || '',
      correo_consumidor,
      padre_representante || '',
      producto_servicio,
      Number(monto) || 0,
      detalle_reclamo,
      pedido_concreto || ''
    )

    // ── Correo al proveedor (FRATE) ──
    const htmlProveedor = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0f0f12; border-radius: 12px; border: 1px solid rgba(201,162,39,0.3);">
        <h2 style="color: #e0bc4a; font-size: 13px; letter-spacing: 0.1em; margin: 0;">LIBRO DE RECLAMACIONES — FRATE</h2>
        <h3 style="color: #f3ead3; font-size: 20px; margin: 8px 0 20px;">Nuevo reclamo recibido</h3>
        <p style="color: #948d9e; font-size: 12px; margin: 0 0 16px;">Código: <strong style="color: #e0bc4a;">${codigo_unico}</strong></p>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px; width: 140px;">Consumidor</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${nombre_consumidor}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">DNI/CE</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${dni_consumidor}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Correo</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${correo_consumidor}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Teléfono</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${telefono_consumidor || 'No proporcionado'}</td>
          </tr>
          ${padre_representante ? `<tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Padre/Representante</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${padre_representante}</td>
          </tr>` : ''}
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Producto/Servicio</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">${producto_servicio}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #948d9e; font-size: 12px;">Monto</td>
            <td style="padding: 8px 0; color: #f3ead3; font-size: 14px;">S/ ${Number(monto || 0).toFixed(2)}</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid rgba(201,162,39,0.15); margin: 20px 0;" />

        <div style="margin-bottom: 16px;">
          <p style="color: #948d9e; font-size: 12px; margin: 0 0 6px;">Detalle del reclamo:</p>
          <p style="color: #f3ead3; font-size: 14px; margin: 0; line-height: 1.5;">${detalle_reclamo}</p>
        </div>

        ${pedido_concreto ? `<div>
          <p style="color: #948d9e; font-size: 12px; margin: 0 0 6px;">Pedido concreto:</p>
          <p style="color: #f3ead3; font-size: 14px; margin: 0; line-height: 1.5;">${pedido_concreto}</p>
        </div>` : ''}

        <hr style="border: none; border-top: 1px solid rgba(201,162,39,0.15); margin: 20px 0;" />
        <p style="color: #948d9e; font-size: 11px; margin: 0;">FRATE — Libro de Reclamaciones Virtual | Plazo de respuesta: 15 días hábiles</p>
      </div>
    `

    await transporter.sendMail({
      from: `"FRATE - Libro de Reclamaciones" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO || 'info@frate.lat',
      subject: `[Libro de Reclamaciones] ${codigo_unico} — ${nombre_consumidor}`,
      html: htmlProveedor,
      replyTo: correo_consumidor,
    })

    // ── Correo al consumidor (copia) ──
    const htmlConsumidor = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0f0f12; border-radius: 12px; border: 1px solid rgba(201,162,39,0.3);">
        <h2 style="color: #e0bc4a; font-size: 13px; letter-spacing: 0.1em; margin: 0;">LIBRO DE RECLAMACIONES — FRATE</h2>
        <h3 style="color: #f3ead3; font-size: 20px; margin: 8px 0 20px;">Constancia de recepción</h3>

        <p style="color: #f3ead3; font-size: 14px; margin: 0 0 12px;">Estimado/a <strong>${nombre_consumidor}</strong>,</p>
        <p style="color: #f3ead3; font-size: 14px; margin: 0 0 16px; line-height: 1.5;">Hemos recibido tu reclamo y este es el comprobante de registro. Guarda tu código para dar seguimiento.</p>

        <div style="background: rgba(224,188,74,0.1); border: 1px solid rgba(224,188,74,0.3); border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
          <p style="color: #948d9e; font-size: 11px; margin: 0 0 6px;">Tu código de reclamo</p>
          <p style="color: #e0bc4a; font-size: 22px; font-weight: bold; margin: 0; letter-spacing: 0.05em;">${codigo_unico}</p>
        </div>

        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #948d9e; font-size: 12px;">Fecha</td>
            <td style="padding: 6px 0; color: #f3ead3; font-size: 13px;">${new Date().toLocaleDateString('es-PE')}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #948d9e; font-size: 12px;">Producto/Servicio</td>
            <td style="padding: 6px 0; color: #f3ead3; font-size: 13px;">${producto_servicio}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; color: #948d9e; font-size: 12px;">Estado</td>
            <td style="padding: 6px 0; color: #f3ead3; font-size: 13px;">Pendiente de revisión</td>
          </tr>
        </table>

        <hr style="border: none; border-top: 1px solid rgba(201,162,39,0.15); margin: 20px 0;" />

        <p style="color: #948d9e; font-size: 12px; margin: 0; line-height: 1.5;">
          El proveedor tiene un plazo máximo de <strong style="color: #f3ead3;">15 días hábiles</strong> para darte respuesta.
          Si no recibes respuesta, puedes presentar tu reclamo ante INDECOPI.
        </p>

        <hr style="border: none; border-top: 1px solid rgba(201,162,39,0.15); margin: 20px 0;" />
        <p style="color: #948d9e; font-size: 11px; margin: 0;">FRATE — Gestores de industria cultural, artística y musical | Huánuco, Perú</p>
      </div>
    `

    await transporter.sendMail({
      from: `"FRATE - Libro de Reclamaciones" <${process.env.SMTP_USER}>`,
      to: correo_consumidor,
      subject: `[FRATE] Constancia de reclamo ${codigo_unico}`,
      html: htmlConsumidor,
    })

    res.json({ ok: true, codigo_unico })
  } catch (err) {
    console.error('Error al registrar reclamo:', err)
    res.status(500).json({ ok: false, error: 'Error interno del servidor.' })
  }
})

// ── Libro de Reclamaciones: Consultar estado (público) ──
app.get('/api/reclamaciones/:codigo', (req, res) => {
  try {
    const reclamo = db.prepare(
      'SELECT codigo_unico, nombre_consumidor, producto_servicio, estado, creado_en, acciones_proveedor FROM reclamaciones WHERE codigo_unico = ?'
    ).get(req.params.codigo)

    if (!reclamo) {
      return res.status(404).json({ ok: false, error: 'Reclamo no encontrado.' })
    }

    res.json({ ok: true, reclamo })
  } catch (err) {
    console.error('Error al consultar reclamo:', err)
    res.status(500).json({ ok: false, error: 'Error interno.' })
  }
})

// ── Libro de Reclamaciones: Responder (solo admin) ──
app.put('/api/reclamaciones/:codigo', requireAdmin, async (req, res) => {
  try {
    const { acciones_proveedor, estado } = req.body
    const { codigo } = req.params

    const reclamo = db.prepare('SELECT * FROM reclamaciones WHERE codigo_unico = ?').get(codigo)
    if (!reclamo) {
      return res.status(404).json({ ok: false, error: 'Reclamo no encontrado.' })
    }

    const nuevoEstado = estado || 'respondido'
    db.prepare('UPDATE reclamaciones SET acciones_proveedor = ?, estado = ? WHERE codigo_unico = ?')
      .run(acciones_proveedor || '', nuevoEstado, codigo)

    // ── Notificar al consumidor ──
    if (reclamo.correo_consumidor && acciones_proveedor) {
      const htmlRespuesta = `
        <div style="font-family: 'DM Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0f0f12; border-radius: 12px; border: 1px solid rgba(201,162,39,0.3);">
          <h2 style="color: #e0bc4a; font-size: 13px; letter-spacing: 0.1em; margin: 0;">LIBRO DE RECLAMACIONES — FRATE</h2>
          <h3 style="color: #f3ead3; font-size: 20px; margin: 8px 0 20px;">Respuesta a tu reclamo</h3>

          <div style="background: rgba(224,188,74,0.1); border: 1px solid rgba(224,188,74,0.3); border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
            <p style="color: #948d9e; font-size: 11px; margin: 0 0 6px;">Código de reclamo</p>
            <p style="color: #e0bc4a; font-size: 18px; font-weight: bold; margin: 0;">${codigo}</p>
          </div>

          <p style="color: #f3ead3; font-size: 14px; margin: 0 0 12px;">Estimado/a <strong>${reclamo.nombre_consumidor}</strong>,</p>
          <p style="color: #f3ead3; font-size: 14px; margin: 0 0 16px; line-height: 1.5;">Hemos revisado tu reclamo y a continuación te proporcionamos nuestra respuesta:</p>

          <div style="background: rgba(255,255,255,0.03); border-radius: 8px; padding: 16px; margin: 16px 0;">
            <p style="color: #f3ead3; font-size: 14px; margin: 0; line-height: 1.6;">${acciones_proveedor}</p>
          </div>

          <hr style="border: none; border-top: 1px solid rgba(201,162,39,0.15); margin: 20px 0;" />
          <p style="color: #948d9e; font-size: 12px; margin: 0; line-height: 1.5;">
            Si no estás conforme con esta respuesta, puedes presentar tu reclamo ante <strong style="color: #f3ead3;">INDECOPI</strong>.
          </p>
          <p style="color: #948d9e; font-size: 11px; margin: 12px 0 0;">FRATE — Libro de Reclamaciones Virtual</p>
        </div>
      `

      await transporter.sendMail({
        from: `"FRATE - Libro de Reclamaciones" <${process.env.SMTP_USER}>`,
        to: reclamo.correo_consumidor,
        subject: `[FRATE] Respuesta a tu reclamo ${codigo}`,
        html: htmlRespuesta,
      })
    }

    res.json({ ok: true })
  } catch (err) {
    console.error('Error al responder reclamo:', err)
    res.status(500).json({ ok: false, error: 'Error interno.' })
  }
})

// ── Libro de Reclamaciones: Listar (solo admin) ──
app.get('/api/reclamaciones', requireAdmin, (req, res) => {
  try {
    const { estado, page = 1, limit = 50 } = req.query
    let sql = 'SELECT * FROM reclamaciones WHERE 1=1'
    const params = []

    if (estado) {
      sql += ' AND estado = ?'
      params.push(estado)
    }

    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total')
    const { total } = db.prepare(countSql).get(...params)

    sql += ' ORDER BY creado_en DESC LIMIT ? OFFSET ?'
    params.push(Number(limit), (Number(page) - 1) * Number(limit))

    const reclamaciones = db.prepare(sql).all(...params)

    res.json({ ok: true, reclamaciones, total })
  } catch (err) {
    console.error('Error al listar reclamaciones:', err)
    res.status(500).json({ ok: false, error: 'Error interno.' })
  }
})

// ── Admin: ver donaciones (con filtro de búsqueda por nombre/correo) ──
app.get('/api/donaciones', requireAdmin, (req, res) => {
  try {
    const { proyecto, desde, hasta, busqueda, page = 1, limit = 50 } = req.query
    let sql = 'SELECT * FROM donaciones WHERE 1=1'
    const params = []

    if (proyecto) {
      sql += ' AND proyecto = ?'
      params.push(proyecto)
    }
    if (desde) {
      sql += ' AND creado_en >= ?'
      params.push(desde)
    }
    if (hasta) {
      sql += ' AND creado_en <= ?'
      params.push(hasta + ' 23:59:59')
    }
    if (busqueda) {
      sql += ' AND (nombre LIKE ? OR correo LIKE ?)'
      params.push(`%${busqueda}%`, `%${busqueda}%`)
    }

    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total')
    const { total } = db.prepare(countSql).get(...params)

    sql += ' ORDER BY creado_en DESC LIMIT ? OFFSET ?'
    params.push(Number(limit), (Number(page) - 1) * Number(limit))

    const donaciones = db.prepare(sql).all(...params)

    // Resumen por proyecto (respeta los mismos filtros de fecha/búsqueda, sin paginar)
    let resumenSql = `
      SELECT
        proyecto,
        COUNT(*) as total_donaciones,
        SUM(monto) as total_monto,
        SUM(comision) as total_comision,
        SUM(comision_frate) as total_comision_frate,
        SUM(monto_neto) as total_neto,
        SUM(fee) as total_fee
      FROM donaciones WHERE 1=1
    `
    const resumenParams = []
    if (desde) { resumenSql += ' AND creado_en >= ?'; resumenParams.push(desde) }
    if (hasta) { resumenSql += ' AND creado_en <= ?'; resumenParams.push(hasta + ' 23:59:59') }
    if (busqueda) {
      resumenSql += ' AND (nombre LIKE ? OR correo LIKE ?)'
      resumenParams.push(`%${busqueda}%`, `%${busqueda}%`)
    }
    resumenSql += ' GROUP BY proyecto ORDER BY total_monto DESC'

    const resumen = db.prepare(resumenSql).all(...resumenParams)

    res.json({ ok: true, donaciones, total, resumen })
  } catch (err) {
    console.error('Error al listar donaciones:', err)
    res.status(500).json({ ok: false, error: 'Error interno.' })
  }
})

// ── Admin: exportar CSV ────────────────────────────────────
app.get('/api/donaciones/csv', requireAdmin, (req, res) => {
  try {
    const { proyecto, desde, hasta, busqueda } = req.query
    let sql = 'SELECT * FROM donaciones WHERE 1=1'
    const params = []

    if (proyecto) { sql += ' AND proyecto = ?'; params.push(proyecto) }
    if (desde) { sql += ' AND creado_en >= ?'; params.push(desde) }
    if (hasta) { sql += ' AND creado_en <= ?'; params.push(hasta + ' 23:59:59') }
    if (busqueda) {
      sql += ' AND (nombre LIKE ? OR correo LIKE ?)'
      params.push(`%${busqueda}%`, `%${busqueda}%`)
    }

    sql += ' ORDER BY creado_en DESC'
    const donaciones = db.prepare(sql).all(...params)

    const header = 'ID,Proyecto,Nombre,Correo,Monto,Comisión Culqi,Comisión Frate,Monto Neto,Fee,Anónimo,Fuente,Estado,Fecha'
    const rows = donaciones.map(d =>
      [d.id, d.proyecto, `"${d.nombre}"`, d.correo || '', d.monto, d.comision, d.comision_frate, d.monto_neto, d.fee, d.anonimo ? 'Sí' : 'No', d.fuente, d.estado_pago, d.creado_en].join(',')
    )

    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="donaciones-${proyecto || 'todas'}.csv"`)
    res.send('\uFEFF' + header + '\n' + rows.join('\n'))
  } catch (err) {
    console.error('Error al exportar CSV:', err)
    res.status(500).send('Error al exportar.')
  }
})

// ── Admin: listar proyectos ─────────────────────────────────
app.get('/api/proyectos', requireAdmin, (req, res) => {
  try {
    const proyectos = db.prepare('SELECT DISTINCT proyecto FROM donaciones ORDER BY proyecto').all()
    res.json({ ok: true, proyectos: proyectos.map(p => p.proyecto) })
  } catch (err) {
    res.status(500).json({ ok: false, error: 'Error interno.' })
  }
})

// ── Dashboard HTML ─────────────────────────────────────────
app.get('/admin/donaciones/:token', (req, res) => {
  if (req.params.token !== process.env.ADMIN_TOKEN) {
    return res.status(401).send('No autorizado.')
  }
  res.sendFile(join(__dirname, 'dashboard.html'))
})

// ── Health check ───────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, timestamp: new Date().toISOString() })
})

// ── Start ──────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[frate-api] Servidor corriendo en puerto ${PORT}`)
})