import { useState } from 'react'
import { Link } from 'react-router-dom'

const NAV_LINKS = [
  { href: '/#mision', label: 'Proposito' },
  { href: '/#proyectos', label: 'Proyectos' },
  { href: '/#quienes-somos', label: 'Historia' },
  { href: '/#aliados', label: 'Aliados' },
]

export default function Header({ onContacto }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-ink-deep/90 backdrop-blur-sm border-b border-line">
      <div className="wrap flex items-center justify-between gap-6 py-3.5">
        <Link to="/" className="flex items-center shrink-0">
          <img
            src="/FRATE4.svg"
            alt="FRATE"
            className="h-9 w-auto object-contain"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-5 font-mono text-[12.5px] font-medium">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="no-underline text-paper/75 transition-colors hover:text-gold-bright"
            >
              {link.label}
            </Link>
          ))}
          <button
            onClick={onContacto}
            className="no-underline text-paper/75 transition-all duration-150 ease-out hover:text-gold-bright active:scale-[0.97] cursor-pointer bg-transparent border-none font-mono text-[12.5px] font-medium"
          >
            Contacto
          </button>
        </nav>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 bg-transparent border-none cursor-pointer active:scale-[0.97] transition-transform duration-150"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
        >
          <span className={`block w-5 h-[1.5px] bg-paper/75 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-[4.5px]' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-paper/75 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-[1.5px] bg-paper/75 transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="md:hidden border-t border-line bg-ink-deep/95 backdrop-blur-sm">
          <div className="wrap flex flex-col gap-1 py-3 font-mono text-[12.5px] font-medium">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMenuOpen(false)}
                className="no-underline text-paper/75 py-2.5 px-2 rounded-lg transition-colors hover:text-gold-bright hover:bg-white/[0.03]"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { onContacto(); setMenuOpen(false) }}
              className="no-underline text-left text-paper/75 py-2.5 px-2 rounded-lg transition-colors hover:text-gold-bright hover:bg-white/[0.03] cursor-pointer bg-transparent border-none font-mono text-[12.5px] font-medium"
            >
              Contacto
            </button>
          </div>
        </nav>
      )}
    </header>
  )
}