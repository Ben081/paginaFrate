import { useState } from 'react'
import Reveal from './Reveal'
import { proyectos } from '../data/content'

const TABS = [
  /* { key: '2025', label: '2025', disabled: true }, */
  { key: '2026', label: '2026', disabled: false },
]

const TAG_STYLES = {
  freestyle: {
    top: 'bg-gradient-to-br from-[#1B1730] to-[#241f3d]',
    escudo: 'bg-[#1B1730] text-[#E0BC4A] border border-[#E0BC4A55]',
    link: 'text-[#D6336C]',
  },
  cajon: {
    top: 'bg-gradient-to-br from-[#3B2415] to-[#4a301c]',
    escudo: 'bg-[#3B2415] text-[#D98A54] border border-[#D98A5455]',
    link: 'text-[#E8A33D]',
  },
  catequistas: {
    top: 'bg-gradient-to-br from-[#20221f] to-[#2a2d29]',
    escudo: 'bg-[#20221f] text-[#8fb8b5] border border-dashed border-[#8fb8b555]',
    link: 'text-[#8fb8b5]',
  },
}

function ProjectCard({ proyecto, delay }) {
  const style = TAG_STYLES[proyecto.tag]
  return (
    <Reveal delay={delay}>
      <div
        className={`group rounded-2xl overflow-hidden border border-line flex flex-col bg-ink h-full transition-[box-shadow,transform] duration-200 ease-out hover:shadow-[0_0_30px_rgba(217,164,65,.07)] hover:scale-[1.01]`}
      >
        {/* Header: escudo centrado */}
        <div className={`h-[120px] flex flex-col items-center justify-center gap-2 ${style.top} relative`}>
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center font-serif font-semibold text-[20px] ${style.escudo} transition-transform duration-300 group-hover:scale-110`}>
            {proyecto.escudo}
          </div>
          {proyecto.soon && (
            <span className="font-mono text-[10px] tracking-[0.08em] px-2 py-[3px] rounded-full border border-dashed border-white/30 text-paper/70">
              Próximamente
            </span>
          )}
        </div>

        {/* Body */}
        <div className="px-[22px] pb-[22px] flex flex-col gap-2.5 flex-1">
          {/* Título + logros: SIEMPRE visibles */}
          <h3 className="text-[17px] font-semibold m-0">{proyecto.title}</h3>

          {proyecto.achievements.length > 0 && (
            <div className="flex gap-1.5 flex-wrap">
              {proyecto.achievements.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10.5px] px-[9px] py-1 rounded-full bg-white/[.06] text-paper/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Descripción + link: ocultos en desktop, visibles en mobile */}
          <div className="flex flex-col gap-2.5 mt-1 max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-300 ease-[cubic-bezier(.22,1,.36,1)] group-hover:max-h-40 group-hover:opacity-100 max-sm:!max-h-none max-sm:!opacity-100">
            <p className="text-[13px] leading-[1.55] text-paper/70 m-0">{proyecto.desc}</p>
            <a
              href={proyecto.link}
              className={`no-underline font-mono text-[12px] font-semibold inline-flex items-center gap-1.5 ${style.link}`}
            >
              Ver proyecto →
            </a>
          </div>
        </div>
      </div>
    </Reveal>
  )
}

export default function Proyectos() {
  const [activeTab, setActiveTab] = useState('2026')

  const proyectosFiltrados = proyectos.filter(
    (p) => p.year === activeTab || (activeTab === '2026' && p.soon)
  )

  return (
    <section id="proyectos" className="py-20 bg-ink-deep border-y border-line">
      <div className="wrap">
        <Reveal>
          <div className="max-w-[600px] mb-9">
            <div className="eyebrow"> proyectos</div>
            <h2 className="text-[28px] mt-2.5 leading-[1.25]">Experiencias que transforman</h2>
            <p className="text-[15px] text-paper/70 mt-2.5 leading-[1.6]">
              Cada uno nace con identidad propia, un equipo comprometido y un impacto real en nuestra comunidad.
            </p>
          </div>
        </Reveal>

        {/* Tabs */}
        <Reveal>
          <div className="flex gap-2 mb-8">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => !tab.disabled && setActiveTab(tab.key)}
                disabled={tab.disabled}
                className={`
                  font-mono text-[12.5px] font-semibold px-5 py-2.5 rounded-lg border transition-colors cursor-pointer
                  ${activeTab === tab.key
                    ? 'bg-gold text-ink-deep border-gold'
                    : tab.disabled
                      ? 'bg-transparent text-paper/30 border-line cursor-not-allowed'
                      : 'bg-transparent text-paper/70 border-line hover:border-gold/50 hover:text-paper active:scale-[0.97]'
                  }
                `}
              >
                {tab.label}
                {tab.disabled && (
                  <span className="ml-1.5 text-[10px] opacity-60">Próximamente</span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {proyectosFiltrados.map((p, i) => (
            <ProjectCard key={p.id} proyecto={p} delay={i * 0.08} />
          ))}
        </div>
      </div>
    </section>
  )
}
