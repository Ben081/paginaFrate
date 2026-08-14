import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import AvisoLibroReclamaciones from './components/AvisoLibroReclamaciones'
import LibroReclamaciones from './components/LibroReclamaciones'
import PoliticaPrivacidad from './components/PoliticaPrivacidad'
import TerminosCondiciones from './components/TerminosCondiciones'

function HomeContent() {
  const [contactoOpen, setContactoOpen] = useState(false)

  return (
    <>
      <Header onContacto={() => setContactoOpen(true)} />
      <AvisoLibroReclamaciones />
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

function LegalLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer legal />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/reclamaciones" element={<LegalLayout><LibroReclamaciones /></LegalLayout>} />
        <Route path="/privacidad" element={<LegalLayout><PoliticaPrivacidad /></LegalLayout>} />
        <Route path="/terminos" element={<LegalLayout><TerminosCondiciones /></LegalLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
