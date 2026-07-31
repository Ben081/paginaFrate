import { contacto } from '../data/content'

const NAV_LINKS = [
  { href: '#mision', label: 'Misión' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#quienes-somos', label: 'Quiénes somos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-ink-deep border-t border-line">
      <div className="wrap py-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
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

          {/* <div>
            <h5 className="font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-gold-bright mb-3">
              Síguenos
            </h5>
            <div className="flex gap-2.5">
              {contacto.redes.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  title={r.title}
                  className="w-8 h-8 rounded-full border border-line flex items-center justify-center no-underline font-mono text-[10px] text-paper/60 hover:border-gold-bright hover:text-gold-bright transition-colors"
                >
                  {r.label}
                </a>
              ))}
            </div>
          </div> */}
        </div>

        <div className="border-t border-line mt-8 pt-6 flex justify-between items-center flex-wrap gap-3 text-[11.5px] text-paper/50">
          <div>© 2026 FRATE · Todos los derechos reservados</div>
          <div>Huánuco, Perú</div>
        </div>
      </div>
    </footer>
  )
}
