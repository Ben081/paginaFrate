import { Link } from 'react-router-dom'
import { contacto } from '../data/content'

const NAV_LINKS = [
  { href: '#mision', label: 'Misión' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#quienes-somos', label: 'Quiénes somos' },
  { href: '#contacto', label: 'Contacto' },
]

const LEGAL_LINKS = [
  { to: '/reclamaciones', label: 'Libro de Reclamaciones' },
  { to: '/privacidad', label: 'Política de Privacidad' },
  { to: '/terminos', label: 'Términos y Condiciones' },
]

export default function Footer({ legal = false }) {
  if (legal) {
    return (
      <footer className="bg-ink-deep border-t border-line">
        <div className="wrap py-8 flex flex-col items-center gap-4 text-center">
          <Link
            to="/"
            className="no-underline text-[13px] text-paper/60 hover:text-gold-bright transition-colors"
          >
            ← Volver al sitio principal
          </Link>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-[12px] text-paper/50 no-underline hover:text-gold-bright transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="text-[11px] text-paper/40 mt-2">
            © 2026 FRATE · Huánuco, Perú
          </div>
        </div>
      </footer>
    )
  }

  return (
    <footer className="bg-ink-deep border-t border-line">
      <div className="wrap py-10">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-8">
          <div>
            <p className="text-[12.5px] text-paper/60 leading-[1.5] max-w-[260px]">
              Gestores de industria cultural, artística y musical. Huánuco, Perú.
            </p>
          </div>

          <div>
            <h5 className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-3">
              Navegación
            </h5>
            <div className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-[12.5px] text-paper/60 no-underline hover:text-gold-bright transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-3">
              Legal
            </h5>
            <div className="flex flex-col gap-2">
              {LEGAL_LINKS.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-[12.5px] text-paper/60 no-underline hover:text-gold-bright transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-3">
              Contacto
            </h5>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:info@frate.lat"
                className="text-[12.5px] text-paper/60 no-underline hover:text-gold-bright transition-colors"
              >
                info@frate.lat
              </a>
              <span className="text-[12.5px] text-paper/60">
                998007262
              </span>
              <span className="text-[12.5px] text-paper/60">
                Huánuco, Perú
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-line mt-8 pt-6 flex justify-between items-center flex-wrap gap-3 text-[11.5px] text-paper/50">
          <div>© 2026 FRATE · Todos los derechos reservados</div>
          <div>Huánuco, Perú</div>
        </div>
      </div>
    </footer>
  )
}
