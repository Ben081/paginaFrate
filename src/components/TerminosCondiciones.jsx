import Reveal from './Reveal'
import AccordionItem from './AccordionItem'

export default function TerminosCondiciones() {
  return (
    <section id="terminos-condiciones" className="py-20 bg-ink-deep border-y border-line">
      <div className="wrap max-w-[720px]">
        <Reveal>
          <div className="eyebrow">Legal</div>
          <h2 className="text-[28px] mt-2.5 leading-[1.25]">Términos y Condiciones</h2>
          <p className="text-[13px] text-paper/50 mt-2">Conoce nuestros términos y condiciones</p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-col gap-3">
            <AccordionItem title="1. Información del proveedor">
              <p>
                El presente sitio web es operado por <strong className="text-paper">Aland Bravo Vecorena</strong>, identificado con RUC N° <strong className="text-paper">10107356911</strong>, domiciliado en Huánuco, Perú.
              </p>
              <p>
                Correo electrónico: <a href="mailto:info@frate.lat" className="text-gold-bright no-underline hover:underline">info@frate.lat</a>
              </p>
            </AccordionItem>

            <AccordionItem title="2. Aceptación de los términos">
              <p>
                Al acceder y utilizar este sitio web, el usuario acepta y se compromete a cumplir con los presentes Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, le solicitamos no utilizar este sitio.
              </p>
            </AccordionItem>

            <AccordionItem title="3. Objeto del sitio">
              <p>
                FRATE es una plataforma de gestión de industria cultural, artística y musical dedicada a la promoción y ejecución de proyectos culturales, artísticos y musicales en la región de Huánuco, Perú. Este sitio web tiene carácter institucional e informativo.
              </p>
            </AccordionItem>

            <AccordionItem title="4. Donaciones">
              <p>
                Las donaciones realizadas a través de este sitio son de carácter <strong className="text-paper">voluntario y altruista</strong>.Las donaciones se procesan a través de una pasarela de pago de terceros que están sujetas a sus propios términos y condiciones.
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Las donaciones son voluntarias y no reembolsables</li>
                <li>Se aplicará una comisión por el uso de la pasarela de pago (intermediario), la cual será descontada del monto donado</li>
                <li>Al momento de donar, el usuario puede elegir si su nombre aparecerá públicamente en el sitio web o si prefiere realizar la donación de forma anónima</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="5. Propiedad intelectual">
              <p>
                Todo el contenido de este sitio web, incluyendo pero no limitado a textos, imágenes, gráficos, logotipos, iconos, software y código fuente, es propiedad de FRATE o de sus proveedores de contenido y está protegido por las leyes de propiedad intelectual peruanas e internacionales.
              </p>
              <p>
                Está prohibida la reproducción, distribución, modificación o cualquier otro uso del contenido sin la autorización previa y por escrito de FRATE.
              </p>
            </AccordionItem>

            <AccordionItem title="6. Enlaces a sitios de terceros">
              <p>
                Este sitio web puede contener enlaces a otros sitios; y que forman parte de los proyectos en las FRATE esta participando. Estos sitios son operados por FRATE y comparte las mismas políticas de privacidad, al igual que los terminos y condiciones.
              </p>
            </AccordionItem>

            <AccordionItem title="7. Limitación de responsabilidad">
              <p>
                FRATE se esfuerza por mantener la información de este sitio web actualizada y precisa. El uso de la información de este sitio es bajo su propio riesgo.
              </p>
              <p>
                En ningún caso FRATE será responsable por daños directos, indirectos, incidentales o consecuentes que puedan surgir del uso de este sitio web.
              </p>
            </AccordionItem>

            <AccordionItem title="8. Protección de datos personales">
              <p>
                El tratamiento de sus datos personales se rige por nuestra{' '}
                <a href="#politica-privacidad" className="text-gold-bright no-underline hover:underline">
                  Política de Privacidad
                </a>
                , que forma parte integrante de estos Términos y Condiciones.
              </p>
            </AccordionItem>

            <AccordionItem title="9. Libro de Reclamaciones">
              <p>
                Conforme al Código de Protección y Defensa del Consumidor (Ley N° 29571), FRATE cuenta con un Libro de Reclamaciones virtual. Para registrar un reclamo, visite la sección correspondiente en este sitio.
              </p>
              <p>
                El proveedor se compromete a responder los reclamos en un plazo máximo de <strong className="text-paper">15 días hábiles</strong>.
              </p>
            </AccordionItem>

            <AccordionItem title="10. Ley aplicable y jurisdicción">
              <p>
                Los presentes Términos y Condiciones se rigen por la legislación peruana. Para la resolución de cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad .
              </p>
            </AccordionItem>

            <AccordionItem title="11. Modificaciones">
              <p>
                FRATE se reserva el derecho de modificar estos Términos y Condiciones en cualquier momento. Las modificaciones entrarán en vigencia desde su publicación en este sitio. El uso continuado del sitio después de las modificaciones constituye la aceptación de los nuevos términos.
              </p>
            </AccordionItem>

            <AccordionItem title="12. Contacto">
              <p>
                Para consultas sobre estos Términos y Condiciones, contáctanos a través de:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Correo: <a href="mailto:info@frate.lat" className="text-gold-bright no-underline hover:underline">info@frate.lat</a></li>
                <li>Ubicación: Huánuco, Perú</li>
              </ul>
            </AccordionItem>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
