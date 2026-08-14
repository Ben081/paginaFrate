import Database from 'better-sqlite3'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { mkdirSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
const DB_DIR = join(__dirname, 'data')
mkdirSync(DB_DIR, { recursive: true })

const db = new Database(join(DB_DIR, 'donaciones.db'))

db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

db.exec(`
  CREATE TABLE IF NOT EXISTS donaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    proyecto TEXT NOT NULL,
    nombre TEXT NOT NULL DEFAULT 'Donante anónimo',
    correo TEXT,
    monto REAL NOT NULL,
    comision REAL NOT NULL DEFAULT 0,
    monto_neto REAL NOT NULL,
    fee REAL NOT NULL DEFAULT 0,
    anonimo INTEGER NOT NULL DEFAULT 0,
    fuente TEXT NOT NULL DEFAULT 'desconocida',
    estado_pago TEXT NOT NULL DEFAULT 'pendiente',
    pago_id TEXT,
    creado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_donaciones_proyecto ON donaciones(proyecto);
  CREATE INDEX IF NOT EXISTS idx_donaciones_fecha ON donaciones(creado_en);
  CREATE INDEX IF NOT EXISTS idx_donaciones_estado ON donaciones(estado_pago);

  CREATE TABLE IF NOT EXISTS configuracion (
    clave TEXT PRIMARY KEY,
    valor TEXT NOT NULL,
    actualizado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );
`)

// ── Tabla de Libro de Reclamaciones ──
db.exec(`
  CREATE TABLE IF NOT EXISTS reclamaciones (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    codigo_unico TEXT NOT NULL UNIQUE,
    nombre_proveedor TEXT NOT NULL DEFAULT 'Aland Bravo Vecorena',
    ruc_proveedor TEXT NOT NULL DEFAULT '10107356911',
    direccion_proveedor TEXT NOT NULL DEFAULT 'Huánuco, Perú',
    nombre_consumidor TEXT NOT NULL,
    domicilio_consumidor TEXT,
    dni_consumidor TEXT,
    telefono_consumidor TEXT,
    correo_consumidor TEXT,
    padre_representante TEXT,
    producto_servicio TEXT NOT NULL,
    monto REAL DEFAULT 0,
    detalle_reclamo TEXT NOT NULL,
    pedido_concreto TEXT,
    acciones_proveedor TEXT,
    estado TEXT NOT NULL DEFAULT 'pendiente',
    creado_en TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE INDEX IF NOT EXISTS idx_reclamaciones_codigo ON reclamaciones(codigo_unico);
  CREATE INDEX IF NOT EXISTS idx_reclamaciones_estado ON reclamaciones(estado);
  CREATE INDEX IF NOT EXISTS idx_reclamaciones_fecha ON reclamaciones(creado_en);
`)

// ── Migración: columna comision_frate en donaciones (se agrega si no existe) ──
try {
  db.exec(`ALTER TABLE donaciones ADD COLUMN comision_frate REAL NOT NULL DEFAULT 0`)
} catch (e) {
  // La columna ya existe, no hacer nada
}

// ── Valores por defecto (solo se insertan si no existen) ──
const defaults = {
  comision_pct: '5',         // % de comisión sobre el monto donado (proveedor de pagos)
  fee_fijo: '0.74',          // fee fijo en soles por transacción (referencia de tercero)
  monto_minimo: '15',        // monto mínimo permitido para donar (soles)
  comision_frate_pct: '0',   // % que se queda FRATE como comisión propia
}

const insertDefault = db.prepare(
  `INSERT OR IGNORE INTO configuracion (clave, valor) VALUES (?, ?)`
)
for (const [clave, valor] of Object.entries(defaults)) {
  insertDefault.run(clave, valor)
}

// ── Helpers de configuración ────────────────────────────────
export function getAllConfig() {
  const rows = db.prepare('SELECT clave, valor FROM configuracion').all()
  const config = {}
  for (const row of rows) config[row.clave] = row.valor
  return config
}

export function getConfigValue(clave, fallback = null) {
  const row = db.prepare('SELECT valor FROM configuracion WHERE clave = ?').get(clave)
  return row ? row.valor : fallback
}

export function setConfigValues(cambios) {
  const stmt = db.prepare(`
    INSERT INTO configuracion (clave, valor, actualizado_en)
    VALUES (?, ?, datetime('now'))
    ON CONFLICT(clave) DO UPDATE SET valor = excluded.valor, actualizado_en = datetime('now')
  `)
  const tx = db.transaction((entries) => {
    for (const [clave, valor] of entries) stmt.run(clave, String(valor))
  })
  tx(Object.entries(cambios))
  return getAllConfig()
}

export default db