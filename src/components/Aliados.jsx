import Reveal from './Reveal'
import { aliados } from '../data/content'

export default function Aliados() {
  return (
    <section id="aliados" className="py-20">
      <div className="wrap">
        <Reveal>
          <div className="max-w-[600px] mb-9">
            <div className="eyebrow">Colaboradores</div>
            <h2 className="text-[28px] mt-2.5 leading-[1.25]">Aliados</h2>
            <p className="text-[15px] text-paper/70 mt-2.5 leading-[1.6]">
              Organizaciones e instituciones que colaboran con nosotros.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {aliados.map((a, i) => (
            <Reveal key={a.name} delay={i * 0.06}>
              <div className="bg-ink-deep border border-line rounded-xl p-5 h-full">
                <h4 className="text-[14.5px] font-semibold mb-1.5">{a.name}</h4>
                <p className="text-[12.5px] leading-[1.55] text-paper/70 m-0">{a.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
