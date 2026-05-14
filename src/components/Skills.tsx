import { useId } from 'react'
import { motion } from 'framer-motion'
import { site } from '../content'

function SkillRing({
  percent,
  abbr,
  centerClass,
}: {
  percent: number
  abbr: string
  centerClass: string
}) {
  const uid = useId().replace(/:/g, '')
  const r = 38
  const c = 2 * Math.PI * r
  const dash = (percent / 100) * c

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative flex h-32 w-32 items-center justify-center md:h-36 md:w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100" aria-hidden>
          <defs>
            <linearGradient id={`skill-ring-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff8c00" />
              <stop offset="100%" stopColor="#ffb347" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="5"
          />
          <circle
            cx="50"
            cy="50"
            r={r}
            fill="none"
            stroke={`url(#skill-ring-${uid})`}
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${c}`}
          />
        </svg>
        <div
          className={`absolute flex h-[4.25rem] w-[4.25rem] items-center justify-center rounded-full text-sm font-bold tracking-tight shadow-inner ring-1 ring-white/10 md:h-[4.75rem] md:w-[4.75rem] md:text-base ${centerClass}`}
        >
          {abbr}
        </div>
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section
      id="skills"
      className="software-skills-bg scroll-mt-28 px-4 py-20 md:px-8 md:py-28"
    >
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-3xl font-bold md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="text-white">Software </span>
          <span className="text-gradient-accent">Skills</span>
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-400">
          Tools I reach for daily to design, build, test, and ship.
        </p>

        <div className="mt-14 flex flex-wrap justify-center gap-x-10 gap-y-12 md:gap-x-14">
          {site.softwareSkills.map((s) => (
            <div key={s.name} className="flex w-[8.5rem] flex-col items-center md:w-36">
              <SkillRing percent={s.percent} abbr={s.abbr} centerClass={s.centerClass} />
              <p className="mt-1 text-center text-sm font-medium leading-snug text-white">{s.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
