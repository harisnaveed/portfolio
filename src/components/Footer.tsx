import { motion } from 'framer-motion'
import { site } from '../content'

const quick = [
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  return (
    <footer className="border-t border-white/10 px-4 py-12 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 md:flex-row md:items-start md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a href="#home" className="text-xl font-semibold tracking-tight">
            <span className="text-white">{site.brand.dev}</span>
            <span className="text-gradient-accent">{site.brand.portfolio}</span>
          </a>
          <p className="mt-3 max-w-xs text-sm text-zinc-500">
            Built with React, Tailwind CSS, Framer Motion, and a little custom CSS.
          </p>
        </motion.div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-zinc-400">
            {quick.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition hover:text-accent">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex gap-4 text-sm text-zinc-500">
          {site.social.map((s) => (
            <a key={s.href} href={s.href} target="_blank" rel="noreferrer" className="hover:text-accent">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-6xl text-center text-xs text-zinc-600">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  )
}
