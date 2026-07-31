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
`)

export default db