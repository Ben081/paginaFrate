import Reveal from './Reveal'
import { contacto } from '../data/content'
import ContactForm from './ContactForm'

export default function Contacto() {
  return (
    <section id="contacto" className="pb-[100px] pt-20">
      <div className="wrap grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <Reveal>
          <div className="eyebrow">Hablemos</div>
          <h2 className="text-[26px] mt-2">Contacto</h2>
          <p className="text-[15px] text-paper/70 mt-3 leading-[1.6] max-w-[420px]">
            ¿Tienes un proyecto en mente? ... ¿Quieres colaborar con nosotros? Escríbenos y hablemos
            sobre cómo podemos trabajar juntos.
          </p>
          <a
            href={`mailto:${contacto.email}`}
            className="block mt-5 text-[20px] font-serif text-gold-bright no-underline"
          >
            {contacto.email}
          </a>
          {/* <div className="flex gap-2.5 mt-5">
            {contacto.redes.map((r) => (
              <a
                key={r.label}
                href={r.href}
                title={r.title}
                className="w-9 h-9 rounded-full border border-line flex items-center justify-center no-underline font-mono text-[11px] text-paper/70 @media(hover:hover){hover:border-gold-bright hover:text-gold-bright} transition-colors"
              >
                {r.label}
              </a>
            ))}
          </div> */}
        </Reveal>

        <Reveal delay={0.1}>
          <div className="bg-ink-deep border border-line rounded-2xl p-6">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
