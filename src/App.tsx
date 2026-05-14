import { CustomCursor } from './components/CustomCursor'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Testimonials } from './components/Testimonials'
import { Contact } from './components/Contact'
import { Newsletter } from './components/Newsletter'
import { Footer } from './components/Footer'

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <CustomCursor />
      <Header />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Testimonials />
        <Contact />
        <Newsletter />
      </main>
      <Footer />
    </div>
  )
}

export default App
