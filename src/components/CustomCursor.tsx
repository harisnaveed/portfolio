import { useMotionValue, useSpring, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

/** Lagging ring + core dot. Desktop (fine pointer) only — no canvas trail for lower CPU use. */
export function CustomCursor() {
  const [active, setActive] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const ringX = useSpring(mouseX, { stiffness: 520, damping: 38, mass: 0.45 })
  const ringY = useSpring(mouseY, { stiffness: 520, damping: 38, mass: 0.45 })

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

  useEffect(() => {
    if (!active) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [active, mouseX, mouseY])

  if (!active) return null

  return (
    <>
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
