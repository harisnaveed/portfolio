import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { site } from '../content'

export function CaseStudiesPage() {
  const projects = site.projectShowcase

  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <nav className="mb-10 text-sm text-zinc-500">
          <Link to="/" className="transition hover:text-accent">
            ← Home
          </Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-zinc-400">Case studies</span>
        </nav>

        <header className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Selected work
          </motion.p>
          <motion.h1
            className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            Project <span className="text-gradient-accent">case studies</span>
          </motion.h1>
          <motion.div
            className="mx-auto mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.12 }}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
              <svg className="h-4 w-4 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M12 5v14M8 15l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
          <motion.p
            className="mt-6 text-base leading-relaxed text-zinc-400 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.18 }}
          >
            Deep dives into problems, what I shipped, and the stack — styled to match your portfolio’s warm
            orange palette.
          </motion.p>
        </header>

        <div className="relative mx-auto max-w-5xl">
          <div
            className="pointer-events-none absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/60 via-white/12 to-transparent md:left-1/2 md:-translate-x-px"
            aria-hidden
          />

          <ul className="space-y-20 md:space-y-28">
            {projects.map((p, i) => {
              const isLeft = i % 2 === 0
              return (
                <li key={p.title} className="relative">
                  <div
                    className="absolute left-8 top-[4.5rem] z-[1] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-[#14100d] shadow-[0_0_24px_rgba(255,140,0,0.35)] md:left-1/2 md:top-[5.5rem]"
                    aria-hidden
                  >
                    <span className="text-xs font-bold text-accent">{i + 1}</span>
                  </div>

                  <div
                    className={
                      isLeft
                        ? 'grid gap-10 pl-14 md:grid-cols-2 md:items-center md:gap-12 md:pl-0'
                        : 'grid gap-10 pl-14 md:grid-cols-2 md:items-center md:gap-12 md:pl-0'
                    }
                  >
                    <motion.div
                      className={`overflow-hidden rounded-2xl border border-white/10 bg-black/30 shadow-[0_28px_80px_rgba(0,0,0,0.45)] ${isLeft ? 'md:order-1' : 'md:order-2'}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <img
                          src={p.img}
                          alt=""
                          className="h-full w-full object-cover"
                          width={900}
                          height={560}
                          loading="lazy"
                        />
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />
                      </div>
                    </motion.div>

                    <motion.div
                      className={isLeft ? 'md:order-2 md:pl-4' : 'md:order-1 md:pr-4 md:text-right'}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-80px' }}
                      transition={{ duration: 0.5, delay: 0.06 }}
                    >
                      <span className="inline-flex rounded-full bg-gradient-to-r from-accent/90 to-amber-500/90 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wider text-black shadow-md">
                        {p.period}
                      </span>
                      <h2 className="mt-4 text-2xl font-bold text-white md:text-3xl">{p.title}</h2>
                      <p className="mt-1 text-sm font-medium text-accent-soft">{p.tagline}</p>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">{p.role}</p>
                      <p className="mt-4 text-sm leading-relaxed text-zinc-400">{p.summary}</p>

                      <div className={`mt-5 flex flex-wrap gap-2 ${isLeft ? '' : 'md:justify-end'}`}>
                        {p.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>

                      <p className={`mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-500 ${isLeft ? '' : 'md:text-right'}`}>
                        What I did
                      </p>
                      <ul className={`mt-3 space-y-2 ${isLeft ? '' : 'md:ml-auto md:max-w-md'}`}>
                        {p.responsibilities.map((line) => (
                          <li
                            key={line}
                            className={`flex gap-2 text-sm text-zinc-300 ${isLeft ? '' : 'md:flex-row-reverse md:text-right'}`}
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                            <span>{line}</span>
                          </li>
                        ))}
                      </ul>

                      <p className={`mt-6 text-xs font-semibold uppercase tracking-wider text-zinc-500 ${isLeft ? '' : 'md:text-right'}`}>
                        Outcomes
                      </p>
                      <ul className={`mt-2 space-y-1 ${isLeft ? '' : 'md:ml-auto md:max-w-md'}`}>
                        {p.outcomes.map((line) => (
                          <li key={line} className={`text-sm text-accent-soft/95 ${isLeft ? '' : 'md:text-right'}`}>
                            ✓ {line}
                          </li>
                        ))}
                      </ul>

                      {p.href && (
                        <a
                          href={p.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`mt-8 inline-flex items-center gap-1 text-sm font-semibold text-accent transition hover:text-amber-400 ${isLeft ? '' : 'md:ml-auto md:flex md:w-max md:flex-row-reverse'}`}
                        >
                          Visit link
                          <span aria-hidden>→</span>
                        </a>
                      )}
                    </motion.div>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <p className="mx-auto mt-20 max-w-xl text-center text-sm text-zinc-500">
          Full career path?{' '}
          <Link to="/experience" className="font-semibold text-accent hover:text-amber-400">
            See experience timeline →
          </Link>
        </p>
      </div>
    </main>
  )
}
