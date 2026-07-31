import Reveal from './Reveal'

export default function Mision() {
  return (
    <section id="mision" className="py-20">
      <div className="wrap">
        <Reveal>
          <div className="max-w-[640px]">
            <div className="eyebrow">Propósito</div>
            <h2 className="text-[28px] mt-2.5 leading-[1.25]">Lo que nos impulsan a mejorar</h2>
            <p className="text-[15px] text-paper/70 mt-2.5 leading-[1.6]">
              Crear experiencias artísticas que unan a las personas, fortalezcan lazos comunitarios y generen impacto real en nuestra region de Huánuco
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
          <Reveal delay={0.05}>
            <div className="bg-ink-deep border border-line rounded-xl p-[22px] h-full">
              <h3 className="text-[16px] mb-2 font-semibold">MISIÓN</h3>
              <p className="text-[13.5px] leading-[1.6] text-paper/70 m-0">
                Gestionar proyectos culturales, artísticos y musicales que fortalezcan la identidad, fe y
                la union social en la region de Huánuco. Conectamos instituciones educativas, comunidades religiosas 
                y la sociedad en general alrededor del arte como herramienta de transformación.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="bg-ink-deep border border-line rounded-xl p-[22px] h-full">
              <h3 className="text-[16px] mb-2 font-semibold">VISIÓN</h3>
              <p className="text-[13.5px] leading-[1.6] text-paper/70 m-0">
                Ser el referente regional en gestión cultural que conecta tradición y tecnología, llevando
                proyectos de impacto social más allá de Huánuco. Queremos demostrar que el arte y la fe
                pueden ser motor de desarrollo comunitario en el Perú.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}