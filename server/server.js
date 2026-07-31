import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import db from './db.js'

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

// ── Helper: porcentaje de comisión ─────────────────────────
const COMISION_PCT = 5 // 5% comisión — ajustar según necesidad

function calcularComision(monto) {
  const comision = Math.round(monto * COMISION_PCT / 100 * 100) / 100
  return {
    comision,
    montoNeto: Math.round((monto - comision) * 100) / 100,
  }
}

// ── Culqui: Configuración (COMENTADO - activar cuando se tengan los tokens) ──
// import Culqi from '@culqi/culqi-js'
// const culqi = new Culqi({
//   public_key: process.env.CULQI_PUBLIC_KEY,
//   secret_key: process.env.CULQI_SECRET_KEY,
// })

// ── Configuración de proyectos (nombre, asunto, footer para correos) ──
const configProyectos = {
  'freestyle-catolico': {
    nombre: 'Freestyle Católico',
    asunto: 'Nueva postulación — Freestyle Católico',
    footer: 'Freestyle Católico 2026 — Programa Itinerante de Coaching Corporativo',
  },
  'cajon-peruano': {
    nombre: 'Cajón Peruano',
    asunto: 'Nueva postulación — Cajón Peruano',
    footer: 'Cajón Peruano 2026 — Junta Vecinal Huánuco',
  },
}

// ── Ruta: Registrar donación ───────────────────────────────
app.post('/api/donaciones', async (req, res) => {
  try {
    const { proyecto, nombre, correo, monto, fee = 0, anonimo = false, fuente = 'desconocida', token_pago } = req.body

    if (!proyecto || !monto || Number(monto) <= 0) {
      return res.status(400).json({ ok: false, error: 'Datos incompletos o monto inválido.' })
    }

    const montoNum = Number(monto)
    const { comision, montoNeto } = calcularComision(montoNum)

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
      INSERT INTO donaciones (proyecto, nombre, correo, monto, comision, monto_neto, fee, anonimo, fuente, estado_pago, pago_id)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)

    const result = stmt.run(
      proyecto,
      anonimo ? 'Donante anónimo' : (nombre || 'Donante anónimo'),
      correo || null,
      montoNum,
      comision,
      montoNeto,
      Number(fee) || 0,
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

    // Obtener configuración del proyecto
    const config = configProyectos[proyecto] || {
      nombre: 'Frate',
      asunto: 'Nueva postulación',
      footer: 'Frate — Plataforma de Proyectos Sociales 2026',
    }

    const html = `
      <div style="font-family: 'DM Sans', sans-serif; max-width: 560px; margin: 0 auto; padding: 32px; background: #0f0f12; border-radius: 12px; border: 1px solid rgba(201,162,39,0.3);">
        <h2 style="color: #e0bc4a; font-size: 13px; letter-spacing: 0.1em; margin: 0;">CONVOCATORIA</h2>
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
      subject: `${config.asunto} — ${nombre}`,
      html,
      replyTo: correo,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('Error al enviar convocatoria:', err)
    res.status(500).json({ ok: false, error: 'Error al enviar el correo.' })
  }
})

// ── Admin: middleware de autenticación ──────────────────────
function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'] || req.query.token
  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: 'No autorizado.' })
  }
  next()
}

// ── Admin: ver donaciones ──────────────────────────────────
app.get('/api/donaciones', requireAdmin, (req, res) => {
  try {
    const { proyecto, desde, hasta, page = 1, limit = 50 } = req.query
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

    const countSql = sql.replace('SELECT *', 'SELECT COUNT(*) as total')
    const { total } = db.prepare(countSql).get(...params)

    sql += ' ORDER BY creado_en DESC LIMIT ? OFFSET ?'
    params.push(Number(limit), (Number(page) - 1) * Number(limit))

    const donaciones = db.prepare(sql).all(...params)

    // Resumen por proyecto
    const resumen = db.prepare(`
      SELECT
        proyecto,
        COUNT(*) as total_donaciones,
        SUM(monto) as total_monto,
        SUM(comision) as total_comision,
        SUM(monto_neto) as total_neto,
        SUM(fee) as total_fee
      FROM donaciones
      GROUP BY proyecto
      ORDER BY total_monto DESC
    `).all()

    res.json({ ok: true, donaciones, total, resumen })
  } catch (err) {
    console.error('Error al listar donaciones:', err)
    res.status(500).json({ ok: false, error: 'Error interno.' })
  }
})

// ── Admin: exportar CSV ────────────────────────────────────
app.get('/api/donaciones/csv', requireAdmin, (req, res) => {
  try {
    const { proyecto, desde, hasta } = req.query
    let sql = 'SELECT * FROM donaciones WHERE 1=1'
    const params = []

    if (proyecto) { sql += ' AND proyecto = ?'; params.push(proyecto) }
    if (desde) { sql += ' AND creado_en >= ?'; params.push(desde) }
    if (hasta) { sql += ' AND creado_en <= ?'; params.push(hasta + ' 23:59:59') }

    sql += ' ORDER BY creado_en DESC'
    const donaciones = db.prepare(sql).all(...params)

    const header = 'ID,Proyecto,Nombre,Correo,Monto,Comisión,Monto Neto,Fee,Anónimo,Fuente,Estado,Fecha'
    const rows = donaciones.map(d =>
      [d.id, d.proyecto, `"${d.nombre}"`, d.correo || '', d.monto, d.comision, d.monto_neto, d.fee, d.anonimo ? 'Sí' : 'No', d.fuente, d.estado_pago, d.creado_en].join(',')
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