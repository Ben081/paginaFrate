import Reveal from './Reveal'
import AccordionItem from './AccordionItem'

export default function PoliticaPrivacidad() {
  return (
    <section id="politica-privacidad" className="py-20">
      <div className="wrap max-w-[720px]">
        <Reveal>
          <div className="eyebrow">Legal</div>
          <h2 className="text-[28px] mt-2.5 leading-[1.25]">Política de Privacidad</h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-8 flex flex-col gap-3">
            <AccordionItem title="1. Responsable del tratamiento">
              <p>
                El responsable del tratamiento de los datos personales adquiridos a traves de este sirio web y enlazados es <strong className="text-paper">Aland Bravo Vecorena</strong>, identificado con RUC N° <strong className="text-paper">10107356911</strong>.
              </p>
              <p>
                Correo electrónico: <a href="mailto:info@frate.lat" className="text-gold-bright no-underline hover:underline">info@frate.lat</a>
              </p>
            </AccordionItem>

            <AccordionItem title="2. Datos personales que recopilamos">
              <p>En el marco de nuestras actividades, podemos recopilar los siguientes datos personales:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Nombre completo</li>
                <li>Correo electrónico</li>
                <li>Número de teléfono</li>
                <li>Domicilio</li>
                <li>Información de donaciones (monto, proyecto, fecha)</li>
                <li>Datos de reclamaciones (según Libro de Reclamaciones)</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="3. Finalidad del tratamiento">
              <p>Sus datos personales serán utilizados para las siguientes finalidades:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Gestionar y procesar donaciones</li>
                <li>Responder a consultas y mensajes de contacto</li>
                <li>Atender y dar seguimiento a reclamaciones</li>
                <li>Cumplir obligaciones legales y normativas</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="4. Base legal del tratamiento">
              <p>
                El tratamiento de sus datos personales se fundamenta en <strong className="text-paper">su consentimiento</strong>, otorgado al proporcionar sus datos a través de nuestros formularios.
              </p>
            </AccordionItem>

            <AccordionItem title="5. Conservación de datos">
              <p>
                Sus datos personales serán conservados por el tiempo necesario para cumplir con las finalidades para las que fueron recopilados, o durante el plazo que establezca la ley. Los datos del Libro de Reclamaciones se conservan por un mínimo de 2 años conforme a la normativa vigente.
              </p>
            </AccordionItem>

            <AccordionItem title="6. Compartición de datos">
              <p>
                FRATE no compartirá, transferirá ni cederá tus datos personales a terceros sin su consentimiento previo y expreso, salvo cuando dicha comunicación sea exigida por la legislación vigente, por orden judicial o por una autoridad competente.
              </p>
              <p>Podemos compartir datos con:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>El proveedores de servicios de pago externo para procesar donaciones</li>
              </ul>
            </AccordionItem>

            <AccordionItem title="7. Derechos ARCO">
              <p>
                Conforme a la Ley N° 29733, Ley de Protección de Datos Personales, usted tiene derecho a:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li><strong className="text-paper">Acceso:</strong> Conocer qué datos personales tenemos sobre usted</li>
                <li><strong className="text-paper">Rectificación:</strong> Corregir datos inexactos o actualizar los existentes</li>
                <li><strong className="text-paper">Cancelación:</strong> Solicitar la eliminación de sus datos cuando ya no sean necesarios</li>
                <li><strong className="text-paper">Oposición:</strong> Oponerse al tratamiento de sus datos para fines específicos</li>
              </ul>
              <p>
                Para ejercer estos derechos, envía una solicitud a <a href="mailto:info@frate.lat" className="text-gold-bright no-underline hover:underline">info@frate.lat</a> adjuntando copia de su documento de identidad(DNI), solicitarlo es gratuito.
              </p>
            </AccordionItem>

            <AccordionItem title="8. Seguridad de los datos">
              <p>
                FRATE adopta medidas de seguridad administrativas, legales y técnicas para proteger sus datos personales contra acceso no autorizado, pérdida, alteración o uso indebido. Sin embargo, ningún sistema de seguridad es absolutamente inviolable.
              </p>
            </AccordionItem>

            <AccordionItem title="9. Cambios en esta política">
              <p>
                FRATE se reserva el derecho de modificar esta Política de Privacidad para adaptarla a cambios en la normativa vigente o en nuestras prácticas. Le recomendamos revisar periódicamente esta página.
              </p>
            </AccordionItem>

            <AccordionItem title="10. Contacto">
              <p>
                Para consultas sobre esta Política de Privacidad o para ejercer tus derechos ARCO, contáctanos a través de:
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
