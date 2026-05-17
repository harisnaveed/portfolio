import { About } from '../components/About'
import { Contact } from '../components/Contact'
import { Hero } from '../components/Hero'
import { Newsletter } from '../components/Newsletter'
import { Projects } from '../components/Projects'
import { Skills } from '../components/Skills'
import { Testimonials } from '../components/Testimonials'
import { SkillGrid } from '../components/SkillGrid'

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Skills />
      <SkillGrid />
      <Testimonials />
      <Contact />
      <Newsletter />
    </main>
  )
}
