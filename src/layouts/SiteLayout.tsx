import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { CustomCursor } from '../components/CustomCursor'
import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { SocialSidebar } from '../components/SocialSidebar'
import { WhatsAppFloat } from '../components/WhatsAppFloat'

/** Scroll to top on real route changes; on `/` with `#section`, scroll that element into view (SPA-safe). */
function ScrollManager() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    const onHomeWithHash = pathname === '/' && hash.length > 1
    const id = onHomeWithHash ? decodeURIComponent(hash.slice(1)) : ''

    if (onHomeWithHash) {
      let cancelled = false
      let attempts = 0
      const maxAttempts = 40

      const tick = () => {
        if (cancelled) return
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return
        }
        attempts += 1
        if (attempts < maxAttempts) requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
      return () => {
        cancelled = true
      }
    }

    window.scrollTo(0, 0)
  }, [pathname, hash])

  return null
}

export function SiteLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <ScrollManager />
      <CustomCursor />
      <WhatsAppFloat />
      <SocialSidebar />
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}
