import { useCallback, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../content'

function TargetLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="1.5" opacity="0.35" />
      <circle cx="20" cy="20" r="9" stroke="currentColor" strokeWidth="1.5" opacity="0.55" />
      <circle cx="20" cy="20" r="3.5" fill="currentColor" />
      <path
        d="M26 14l4-4M30 10h-3.5M30 10v3.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function wrapDistance(i: number, active: number, n: number) {
  let d = i - active
  if (d > n / 2) d -= n
  if (d < -n / 2) d += n
  return d
}

export function Projects() {
  const [active, setActive] = useState(0)
  const n = site.projects.length
  const dragRef = useRef<{ startX: number } | null>(null)
  const dragMovedRef = useRef(false)

  const goPrev = useCallback(() => {
    setActive((a) => (a - 1 + n) % n)
  }, [n])

  const goNext = useCallback(() => {
    setActive((a) => (a + 1) % n)
  }, [n])

  const onStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    if ((e.target as HTMLElement).closest('a, button')) return
    dragRef.current = { startX: e.clientX }
    dragMovedRef.current = false
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    if (Math.abs(e.clientX - dragRef.current.startX) > 12) {
      dragMovedRef.current = true
    }
  }

  const onStagePointerEnd = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return
    const startX = dragRef.current.startX
    dragRef.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* noop */
    }
    if (e.type === 'pointerup' && Math.abs(e.clientX - startX) >= 50) {
      if (e.clientX - startX < 0) goNext()
      else goPrev()
    }
  }

  const onCardClick = (i: number) => {
    if (dragMovedRef.current) {
      dragMovedRef.current = false
      return
    }
    setActive(i)
  }

  return (
    <section id="projects" className="scroll-mt-28 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Selected <span className="text-gradient-accent">Projects</span>
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-400">
          Case studies and builds — performance, accessibility, and craft in every detail.
        </p>

        <div className="relative mx-auto mt-14 h-[min(78vh,560px)] max-w-5xl">
          <div
            className="relative h-full w-full select-none touch-pan-y"
            style={{ perspective: '1300px' }}
            onPointerDown={onStagePointerDown}
            onPointerMove={onStagePointerMove}
            onPointerUp={onStagePointerEnd}
            onPointerCancel={onStagePointerEnd}
          >
            <div
              className="relative h-full w-full [transform-style:preserve-3d]"
              aria-roledescription="carousel"
            >
            {site.projects.map((p, i) => {
              const d = wrapDistance(i, active, n)
              const abs = Math.abs(d)

              return (
                <motion.article
                  key={p.title}
                  className="absolute left-1/2 top-1/2 w-[min(85vw,280px)] cursor-pointer"
                  style={{
                    transformStyle: 'preserve-3d',
                    zIndex: 20 - abs,
                  }}
                  initial={false}
                  animate={{
                    x: `calc(-50% + ${d * 230}px)`,
                    y: '-50%',
                    rotateY: -d * 42,
                    z: -abs * 120,
                    scale: d === 0 ? 1 : 0.82,
                    opacity: abs > 1 ? 0.42 : d === 0 ? 1 : 0.78,
                    filter: d === 0 ? 'blur(0px)' : 'blur(0.8px)',
                  }}
                  transition={{ type: 'spring', stiffness: 280, damping: 32 }}
                  onClick={() => onCardClick(i)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      onCardClick(i)
                    }
                  }}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${p.title}, slide ${i + 1} of ${n}`}
                  tabIndex={0}
                >
                  <motion.div
                    className="origin-center overflow-hidden rounded-[1.35rem] border border-white/12 bg-[#141218] shadow-[0_30px_80px_rgba(0,0,0,0.55)]"
                    whileHover={{ scale: 1.07 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <div className="relative aspect-[4/5] max-h-[320px] min-h-[260px] w-full overflow-hidden md:max-h-[340px]">
                      <img
                        src={p.img}
                        alt=""
                        className="h-full w-full object-cover object-top"
                        width={560}
                        height={700}
                        loading="lazy"
                        draggable={false}
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />
                      <a
                        href={p.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        onPointerDown={(e) => e.stopPropagation()}
                        className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-black/55 text-white shadow-lg backdrop-blur-sm transition hover:border-accent/50 hover:bg-black/70 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        aria-label={`Open live site: ${p.title}`}
                      >
                        <TargetLinkIcon className="h-6 w-6" />
                      </a>
                    </div>

                    <div className="border-t border-white/8 bg-gradient-to-b from-[#1a161f] to-[#121016] px-4 py-5 text-center">
                      <h3 className="text-base font-semibold tracking-tight text-white md:text-lg">{p.title}</h3>
                      <p className="mt-1 line-clamp-2 text-xs text-zinc-500 md:text-sm">{p.tags[0]}</p>
                      <p className="mt-2 line-clamp-2 text-[0.7rem] leading-relaxed text-zinc-500 md:text-xs">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                </motion.article>
              )
            })}
            </div>
          </div>

          <div className="pointer-events-none absolute inset-y-12 left-0 right-0 z-50 flex items-center justify-between px-0 md:px-1">
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              aria-label="Previous project"
              className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-lg text-white shadow-lg backdrop-blur-sm transition hover:border-accent/50 hover:bg-accent/15 hover:text-accent"
            >
              ←
            </button>
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()}
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              aria-label="Next project"
              className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-lg text-white shadow-lg backdrop-blur-sm transition hover:border-accent/50 hover:bg-accent/15 hover:text-accent"
            >
              →
            </button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2.5" role="tablist" aria-label="Project slides">
          {site.projects.map((p, i) => (
            <button
              key={p.title}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show project ${i + 1}: ${p.title}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === active ? 'w-8 bg-accent' : 'w-2.5 bg-white/25 hover:bg-white/45'
              }`}
              onClick={() => setActive(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
