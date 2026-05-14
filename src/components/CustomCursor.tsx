import { useMotionValue, useSpring, motion } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'

type TrailPoint = { x: number; y: number; born: number }

/** Full-screen smoke trail + lagging ring + core dot. Desktop (fine pointer) only. */
export function CustomCursor() {
  const [active, setActive] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const trailRef = useRef<TrailPoint[]>([])
  const rafRef = useRef<number>(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const ringX = useSpring(mouseX, { stiffness: 120, damping: 18, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 120, damping: 18, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)')
    const apply = () => {
      const on = mq.matches
      setActive(on)
      document.body.classList.toggle('custom-cursor-active', on)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => {
      mq.removeEventListener('change', apply)
      document.body.classList.remove('custom-cursor-active')
    }
  }, [])

  const pushTrail = useCallback((x: number, y: number) => {
    const now = performance.now()
    trailRef.current.push({ x, y, born: now })
    const max = 48
    if (trailRef.current.length > max) trailRef.current.splice(0, trailRef.current.length - max)
  }, [])

  useEffect(() => {
    if (!active) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      pushTrail(e.clientX, e.clientY)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [active, mouseX, mouseY, pushTrail])

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth * window.devicePixelRatio
      canvas.height = window.innerHeight * window.devicePixelRatio
      ctx.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (now: number) => {
      const w = window.innerWidth
      const h = window.innerHeight
      ctx.clearRect(0, 0, w, h)

      trailRef.current = trailRef.current.filter((p) => now - p.born < 900)

      for (let i = 0; i < trailRef.current.length; i++) {
        const p = trailRef.current[i]
        const age = now - p.born
        const t = 1 - age / 900
        const alpha = t * t * 0.22
        const r = 8 + (1 - t) * 36
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r)
        g.addColorStop(0, `rgba(255, 160, 60, ${alpha})`)
        g.addColorStop(0.35, `rgba(255, 120, 20, ${alpha * 0.45})`)
        g.addColorStop(0.7, `rgba(80, 40, 20, ${alpha * 0.12})`)
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(draw)
    }
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [active])

  if (!active) return null

  return (
    <>
      <canvas className="smoke-canvas" ref={canvasRef} aria-hidden />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-11 w-11 rounded-full border-2 border-accent/80 mix-blend-screen"
        style={{
          x: ringX,
          y: ringY,
          marginLeft: -22,
          marginTop: -22,
          boxShadow: '0 0 24px rgba(255,140,0,0.35)',
        }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full bg-accent"
        style={{ x: mouseX, y: mouseY, marginLeft: -4, marginTop: -4 }}
      />
    </>
  )
}
