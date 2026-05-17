import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { site } from '../content'

function DateBadge({
  start,
  end,
  current,
}: {
  start: string
  end: string
  current?: boolean
}) {
  return (
    <span
      className={`inline-flex rounded-full px-4 py-1.5 text-xs font-bold tracking-wide shadow-lg shadow-black/30 ${
        current
          ? 'bg-gradient-to-r from-accent to-amber-500 text-black'
          : 'bg-gradient-to-r from-accent/90 to-accent-soft/90 text-black'
      }`}
    >
      {start}
      {' — '}
      {end}
    </span>
  )
}

export function ExperiencePage() {
  const items = site.experienceTimeline

  return (
    <main className="pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <nav className="mb-10 text-sm text-zinc-500">
          <Link to="/" className="transition hover:text-accent">
            ← Home
          </Link>
          <span className="mx-2 text-white/20">/</span>
          <span className="text-zinc-400">Experience</span>
        </nav>

        <header className="mx-auto mb-16 max-w-2xl text-center md:mb-24">
          <motion.p
            className="text-sm font-semibold uppercase tracking-[0.2em] text-accent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Career & education
          </motion.p>
          <motion.h1
            className="mt-3 text-4xl font-bold tracking-tight text-white md:text-5xl"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
          >
            My <span className="text-gradient-accent">journey</span>
          </motion.h1>
          <motion.div
            className="mx-auto mt-6 flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent to-transparent" />
          </motion.div>
          <motion.p
            className="mt-6 text-base leading-relaxed text-zinc-400 md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Roles, responsibilities, and study — newest first through to education at the end.
          </motion.p>
        </header>

        <div className="relative mx-auto max-w-5xl">
          <div
            className="pointer-events-none absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-accent/70 via-white/15 to-transparent md:left-1/2 md:-translate-x-px"
            aria-hidden
          />

          <ul className="space-y-14 md:space-y-24">
            {items.map((entry, i) => {
              const isLeft = i % 2 === 0
              const isEdu = entry.kind === 'education'
              const bullets = isEdu ? entry.courses : entry.responsibilities
              const orgLine = `${entry.organization}${
                entry.location ? ` · ${entry.location}` : ''
              }`

              const card = (
                <motion.article
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_60px_rgba(0,0,0,0.35)] backdrop-blur-sm md:p-8"
                >
                  <div
                    className={`mb-4 flex flex-wrap items-center gap-3 ${isLeft ? 'md:justify-end' : ''}`}
                  >
                    <DateBadge start={entry.start} end={entry.end} current={'current' in entry ? entry.current : false} />
                    <span className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-wider text-accent">
                      {isEdu ? 'Education' : 'Work'}
                    </span>
                  </div>
                  <h2 className={`text-xl font-bold text-white md:text-2xl ${isLeft ? 'md:text-right' : ''}`}>
                    {entry.title}
                  </h2>
                  <p className={`mt-1 text-sm font-medium text-accent-soft ${isLeft ? 'md:text-right' : ''}`}>
                    {orgLine}
                  </p>
                  <p className={`mt-4 text-sm leading-relaxed text-zinc-400 ${isLeft ? 'md:text-right' : ''}`}>
                    {isEdu ? 'Courses & focus areas:' : 'Key responsibilities:'}
                  </p>
                  <ul className={`mt-3 space-y-2 ${isLeft ? 'md:text-right' : ''}`}>
                    {bullets.map((line) => (
                      <li
                        key={line}
                        className={`flex gap-2 text-sm text-zinc-300 ${isLeft ? 'md:flex-row-reverse md:justify-start' : ''}`}
                      >
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent md:mt-2" aria-hidden />
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              )

              return (
                <li
                  key={`${entry.kind}-${entry.organization}-${entry.start}`}
                  className="relative grid md:grid-cols-2 md:gap-x-6"
                >
                  <div
                    className="absolute left-8 top-8 z-[1] flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border-2 border-accent bg-[#14100d] shadow-[0_0_24px_rgba(255,140,0,0.35)] md:left-1/2 md:top-10"
                    aria-hidden
                  >
                    <span className="h-3 w-3 rounded-full bg-accent" />
                  </div>

                  <div
                    className={
                      isLeft
                        ? 'relative pl-14 pt-2 md:col-start-1 md:flex md:justify-end md:pr-10 md:pl-0'
                        : 'relative pl-14 pt-2 md:col-start-2 md:flex md:justify-start md:pl-10 md:pr-0'
                    }
                  >
                    {card}
                  </div>
                </li>
              )
            })}
          </ul>
        </div>

        <p className="mx-auto mt-20 max-w-xl text-center text-sm text-zinc-500">
          Want the highlights reel?{' '}
          <Link to="/case-studies" className="font-semibold text-accent hover:text-amber-400">
            View project case studies →
          </Link>
        </p>
      </div>
    </main>
  )
}
