import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { site } from '../content'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#contact', label: 'Contact' },
]

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <motion.nav
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-panel mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-2xl px-5 py-3 md:px-8"
      >
        <a href="#home" className="flex shrink-0 items-baseline gap-0.5 text-lg font-semibold tracking-tight">
          <span className="text-white">{site.brand.dev}</span>
          <span className="text-gradient-accent">{site.brand.portfolio}</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm font-medium text-zinc-300 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="transition-colors hover:text-accent"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href="#contact"
            className="hidden rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black shadow-lg shadow-orange-500/25 transition hover:bg-amber-400 md:inline-flex"
          >
            Let&apos;s Talk
          </a>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white md:hidden"
            aria-expanded={open}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass-panel mx-auto mt-2 max-w-6xl rounded-2xl p-4 md:hidden"
          >
            <ul className="flex flex-col gap-2 text-sm font-medium">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="block rounded-lg px-3 py-2 text-zinc-200 hover:bg-white/5 hover:text-accent"
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contact"
                  className="mt-2 block rounded-full bg-accent py-2.5 text-center text-sm font-semibold text-black"
                  onClick={() => setOpen(false)}
                >
                  Let&apos;s Talk
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
