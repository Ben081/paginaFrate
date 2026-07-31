import { motion } from 'framer-motion'
import { stats } from '../data/content'

export default function Hero() {
  return (
    <section className="pt-20" id="top">
      <div className="wrap grid grid-cols-1 md:grid-cols-[1.1fr_.9fr] gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/35 mb-5">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-bright" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.1em] text-gold-bright">
              HUÁNUCO · PERÚ
            </span>
          </div>

          <h1 className="text-[34px] md:text-[46px] leading-[1.1] font-semibold max-w-[600px]">
            Gestores de industria <em className="not-italic italic text-gold-bright">cultural, artística y
            musical.</em>  
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, transform: "translateY(20px)" }}
          animate={{ opacity: 1, transform: "translateY(0px)" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-[16.5px] leading-[1.65] text-paper/70 max-w-[520px]">
            Transformamos comunidades a través del arte, la fe y la música.<br /><br /> Desde coaching corporativo
            con freestyle hasta la producción de álbumes con líderes vecinales cada proyecto es una
            oportunidad para fortalecer el tejido social de Huánuco.
          </p>

          <div className="flex gap-3.5 mt-8 flex-wrap">
            <a
              href="#proyectos"
              className="no-underline bg-gold text-ink-deep px-6 py-[13px] rounded-lg font-semibold text-[14.5px] hover:bg-gold-bright active:scale-[0.97] transition-all duration-150 ease-out">
              Ver nuestros proyectos
            </a>
            
            <a
              href="#quienes-somos"
              className="no-underline border border-paper/25 text-paper px-6 py-[13px] rounded-lg font-semibold text-[14.5px] hover:border-paper/50 active:scale-[0.97] transition-all duration-150 ease-out">
              Cómo nacimos
            </a>
          </div>
        </motion.div>
      </div>

      <div className="wrap !px-0 grid grid-cols-2 md:grid-cols-4 gap-px bg-line border-y border-line mt-14">
        {stats.map((s, i) => (
          <motion.div
            key={s.lbl}
            className="bg-ink px-6 py-6"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="font-serif text-[30px] font-semibold text-gold-bright">{s.num}</div>
            <div className="mt-1 text-[12.5px] text-paper/70 leading-[1.4]">{s.lbl}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}