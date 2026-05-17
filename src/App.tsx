import { Routes, Route } from 'react-router-dom'
import { SiteLayout } from './layouts/SiteLayout'
import { Home } from './pages/Home'
import { CaseStudiesPage } from './pages/CaseStudiesPage'
import { ExperiencePage } from './pages/ExperiencePage'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route index element={<Home />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="case-studies" element={<CaseStudiesPage />} />
      </Route>
    </Routes>
  )
}
