import Reveal from './Reveal'

export default function Crowdfunding() {
  return (
    <section id="crowdfunding" className="py-20 bg-ink-deep border-y border-line">
      <div className="wrap">
        <Reveal>
          <div className="max-w-[600px] mb-9">
            <div className="eyebrow">Campañas</div>
            <h2 className="text-[28px] mt-2.5 leading-[1.25]">Crowdfunding</h2>
            <p className="text-[15px] text-paper/70 mt-2.5 leading-[1.6]">
              Nuestras campañas de recaudación viven dentro de nuestra plataforma.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            {
              title: 'Vista al ingresar',
              status: 'Bienvenida',
              desc: 'Coaching corporativo con freestyle en 11 instituciones de educación superior.',
              foto: '/cap/cap1.svg',
            },
            {
              title: 'Vista de crowdfunding',
              status: 'vista del Crowdfunding',
              desc: 'Producción musical colaborativa con líderes vecinales de Huánuco.',
              foto: '/cap/cap2.svg',
            },
            {
              title: 'Vista de crowdfunding',
              status: 'vista',
              desc: 'Programa de formación para catequistas de la Diócesis de Huánuco.',
              foto: '/cap/cap3.svg',
            },
          ].map((campana, i) => (
            <Reveal key={campana.title} delay={i * 0.06}>
              <div className="rounded-xl border border-line bg-ink flex flex-col h-full overflow-hidden">
                <div className="aspect-[16/10] bg-ink-deep border-b border-line overflow-hidden">
                  <img
                    src={campana.foto}
                    alt={campana.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[14.5px] font-semibold m-0">{campana.title}</h4>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}