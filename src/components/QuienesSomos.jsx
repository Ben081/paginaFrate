import Reveal from './Reveal'
import { equipo } from '../data/content'

export default function QuienesSomos() {
  return (
    <section id="quienes-somos" className="py-20">
      <div className="wrap grid grid-cols-1 gap-12">
        <Reveal>
          <div className="eyebrow">Nuestra historia</div>
          <h2 className="text-[28px] mt-2.5 leading-[1.25]">Cómo nacimos</h2>
        </Reveal>

        <div className="flex flex-col gap-[22px]">
          <Reveal delay={0.05}>
            <p className="text-[15px] text-paper/70 mt-2.5 leading-[1.6]">
              FRATE nació de una conviction simple: el arte tiene el poder de unir personas y Huánuco
              tiene un gran potencial cultural por explorar.<br /><br />Somos tres personas con habilidades complementarias
              en gestión, creatividad y tecnología que nos juntamos para construir una plataforma que haga
              posible que proyectos culturales, artísticos y musicales tengan un impacto real en las
              comunidades y en la region de Huánuco.
            </p>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="text-[15.5px] leading-[1.7] text-paper/70">
              Desde 2025 trabajamos de la mano con instituciones de educación superior, artistas, 
              líderes vecinales y la Diócesis de Huánuco. Cada proyecto nace con su propia identidad, 
              su propio equipo y una meta compartida; el de unir a las personas y fortalecer la comunidad a 
              través del arte, la fe y la música.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-2">
            {equipo.map((m, i) => (
              <Reveal key={m.name} delay={0.1 + i * 0.08}>
                <div className="flex flex-col gap-3 p-[18px] border border-line rounded-xl h-full">
                  <div className="flex gap-3.5 items-center">
                    <div className="w-10 h-10 rounded-full bg-gold text-ink-deep flex items-center justify-center font-serif font-semibold text-[14px] flex-none">
                      {m.initials}
                    </div>
                    <div>
                      <h4 className="text-[14px] font-semibold m-0">{m.name}</h4>
                      <p className="text-[12px] text-gold-bright mt-[2px] mb-0 font-mono">{m.role}</p>
                    </div>
                  </div>
                  <p className="text-[12.5px] leading-[1.55] text-paper/70 m-0">{m.bio}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.25}>
            <div className="mt-4 p-5 border border-gold/25 rounded-xl bg-gold/[.04]">
              <p className="text-[14px] leading-[1.6] text-paper/80 m-0">
                <strong className="text-gold-bright">¿Compartes nuestra visión?</strong> Si trabajas en
                gestión cultural, arte, música o educación y quieres sumarte a un proyecto con impacto real
                en Huánuco, nos encantaría escucharte.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
