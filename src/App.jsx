import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Mision from './components/Mision'
import Proyectos from './components/Proyectos'
import QuienesSomos from './components/QuienesSomos'
import Aliados from './components/Aliados'
import Crowdfunding from './components/Crowdfunding'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import ContactModal from './components/ContactModal'

export default function App() {
  const [contactoOpen, setContactoOpen] = useState(false)

  return (
    <>
      <Header onContacto={() => setContactoOpen(true)} />
      <Hero />
      <Mision />
      <Proyectos />
      <QuienesSomos />
      <Aliados />
      <Crowdfunding />
      <Contacto />
      <Footer />
      <ContactModal open={contactoOpen} onClose={() => setContactoOpen(false)} />
    </>
  )
}
