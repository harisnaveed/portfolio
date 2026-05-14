import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { site } from '../content'

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M9.05 2.636a1 1 0 011.9 0l1.114 3.43a1 1 0 00.95.69h3.605a1 1 0 01.588 1.81l-2.918 2.12a1 1 0 00-.364 1.118l1.115 3.43a1 1 0 01-1.538 1.118l-2.918-2.12a1 1 0 00-1.176 0l-2.918 2.12a1 1 0 01-1.538-1.118l1.115-3.43a1 1 0 00-.364-1.118L2.803 8.566a1 1 0 01.588-1.81h3.605a1 1 0 00.95-.69l1.114-3.43z" />
    </svg>
  )
}

function initialsFromCompany(name: string) {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }
  return name.slice(0, 2).toUpperCase()
}

const totalTestimonials = site.testimonials.length

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const dragScroll = useRef<{ startX: number; startScroll: number } | null>(null)
  const syncRafRef = useRef<number | null>(null)

  const syncActiveFromScroll = useCallback(() => {
    if (syncRafRef.current != null) return
    syncRafRef.current = requestAnimationFrame(() => {
      syncRafRef.current = null
      const root = scrollerRef.current
      if (!root) return
      const first = root.querySelector<HTMLElement>('[data-testimonial-card]')
      if (!first) return
      const gap = 24
      const step = first.offsetWidth + gap
      if (step <= 0) return
      const idx = Math.round(root.scrollLeft / step)
      setActive(Math.min(totalTestimonials - 1, Math.max(0, idx)))
    })
  }, [])

  useEffect(() => {
    const root = scrollerRef.current
    if (!root) return
    syncActiveFromScroll()
    root.addEventListener('scroll', syncActiveFromScroll, { passive: true })
    const ro = new ResizeObserver(syncActiveFromScroll)
    ro.observe(root)
    return () => {
      root.removeEventListener('scroll', syncActiveFromScroll)
      ro.disconnect()
    }
  }, [syncActiveFromScroll])

  const scrollToIndex = useCallback((idx: number) => {
    const root = scrollerRef.current
    if (!root) return
    const first = root.querySelector<HTMLElement>('[data-testimonial-card]')
    const gap = 24
    const step = first ? first.offsetWidth + gap : 400
    const m = ((idx % totalTestimonials) + totalTestimonials) % totalTestimonials
    root.scrollTo({ left: m * step, behavior: 'auto' })
  }, [])

  const goPrev = () => {
    const root = scrollerRef.current
    if (!root) return
    const first = root.querySelector<HTMLElement>('[data-testimonial-card]')
    const gap = 24
    const step = first ? first.offsetWidth + gap : 400
    const cur = Math.round(root.scrollLeft / step)
    scrollToIndex(cur - 1)
  }

  const goNext = () => {
    const root = scrollerRef.current
    if (!root) return
    const first = root.querySelector<HTMLElement>('[data-testimonial-card]')
    const gap = 24
    const step = first ? first.offsetWidth + gap : 400
    const cur = Math.round(root.scrollLeft / step)
    scrollToIndex(cur + 1)
  }

  const onTrackPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    const root = scrollerRef.current
    if (!root) return
    dragScroll.current = { startX: e.clientX, startScroll: root.scrollLeft }
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const onTrackPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragScroll.current || !scrollerRef.current) return
    const { startX, startScroll } = dragScroll.current
    scrollerRef.current.scrollLeft = startScroll - (e.clientX - startX)
  }

  const onTrackPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    dragScroll.current = null
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* already released */
    }
    syncActiveFromScroll()
  }

  return (
    <section id="testimonials" className="scroll-mt-28 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Client <span className="text-gradient-accent">Testimonials</span>
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-400">
          Kind words from people I&apos;ve built products with.
        </p>

        <div className="relative mt-14">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent md:w-14" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent md:w-14" />

          <div
            ref={scrollerRef}
            className="testimonials-track relative z-0 -mx-2 flex cursor-grab snap-x snap-mandatory gap-6 overflow-x-auto px-2 py-8 touch-pan-x active:cursor-grabbing md:mx-0 md:px-12"
            style={{ scrollPaddingInline: 'max(1rem, calc(50% - 14rem))' }}
            aria-label="Testimonials"
            onPointerDown={onTrackPointerDown}
            onPointerMove={onTrackPointerMove}
            onPointerUp={onTrackPointerUp}
            onPointerCancel={onTrackPointerUp}
          >
            {site.testimonials.map((t, i) => (
              <motion.blockquote
                key={t.name}
                data-testimonial-card
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ scale: 1.04, zIndex: 30 }}
                className="relative z-0 glass-panel flex min-h-[320px] w-[min(100%,28rem)] shrink-0 snap-center flex-col rounded-[2.5rem] border border-[var(--color-border-glass)] bg-gradient-to-b from-white/[0.04] to-transparent p-8 shadow-[0_24px_70px_rgba(0,0,0,0.35)] md:min-h-[340px] md:p-10"
                style={{ transformOrigin: 'center center' }}
              >
                <header className="flex items-center justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-xs font-bold tracking-wide text-accent ring-1 ring-accent/25"
                      aria-hidden
                    >
                      {initialsFromCompany(t.company)}
                    </div>
                    <span className="truncate text-lg font-semibold text-white">{t.company}</span>
                  </div>
                  <div className="flex shrink-0 items-center gap-1.5 text-zinc-400">
                    <StarIcon className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium tabular-nums text-white">{t.rating}</span>
                  </div>
                </header>

                <p className="mt-8 flex-1 text-[0.95rem] leading-relaxed text-zinc-400 md:text-base">
                  {t.quote}
                </p>

                <footer className="mt-10">
                  <cite className="not-italic">
                    <span className="block text-lg font-bold text-white md:text-xl">{t.name}</span>
                    <span className="mt-1 block text-sm text-zinc-500">{t.role}</span>
                  </cite>
                </footer>
              </motion.blockquote>
            ))}
          </div>

          <div
            className="pointer-events-none absolute inset-y-8 left-0 right-0 z-50 flex items-center justify-between px-1 md:px-2"
          >
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goPrev()
              }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Previous testimonial"
              className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-lg text-white shadow-lg backdrop-blur-sm transition hover:border-accent/50 hover:bg-accent/15 hover:text-accent"
            >
              ←
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation()
                goNext()
              }}
              onPointerDown={(e) => e.stopPropagation()}
              aria-label="Next testimonial"
              className="pointer-events-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/15 bg-black/70 text-lg text-white shadow-lg backdrop-blur-sm transition hover:border-accent/50 hover:bg-accent/15 hover:text-accent"
            >
              →
            </button>
          </div>

          <div
            className="mt-4 flex justify-center gap-2"
            role="tablist"
            aria-label="Testimonial slides"
          >
            {site.testimonials.map((t, i) => (
              <button
                key={t.name}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to testimonial ${i + 1}: ${t.company}`}
                className={`rounded-full transition-[width,background-color] duration-150 ${
                  i === active ? 'h-2.5 w-8 bg-accent' : 'h-2.5 w-2.5 bg-white/25 hover:bg-white/45'
                }`}
                onClick={() => scrollToIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
