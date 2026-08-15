import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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

function ScrollToHash() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return

    const id = location.hash.slice(1)
    const timer = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 50)

    return () => clearTimeout(timer)
  }, [location])

  return null
}

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
  const [contactoOpen, setContactoOpen] = useState(false)

  return (
    <>
      <Header onContacto={() => setContactoOpen(true)} />
      {children}
      <Footer legal />
      <ContactModal open={contactoOpen} onClose={() => setContactoOpen(false)} />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomeContent />} />
        <Route path="/reclamaciones" element={<LegalLayout><LibroReclamaciones /></LegalLayout>} />
        <Route path="/privacidad" element={<LegalLayout><PoliticaPrivacidad /></LegalLayout>} />
        <Route path="/terminos" element={<LegalLayout><TerminosCondiciones /></LegalLayout>} />
      </Routes>
    </BrowserRouter>
  )
}