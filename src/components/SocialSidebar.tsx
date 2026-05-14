import { useEffect, useState, type CSSProperties } from 'react'
import { createPortal } from 'react-dom'
import { site } from '../content'

function SocialIcon({ icon }: { icon: string }) {
  const common = 'h-5 w-5'
  switch (icon) {
    case 'github':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    case 'x':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    case 'dribbble':
      return (
        <svg className={common} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
          <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.125-.078-.891-.424-2.532-.195-.433 1.242-1.005 2.403-1.738 3.486 1.732 1.075 2.435 1.102 2.579 1.102.015 0 .021 0 .027-.008.004-.007.004-.019.004-.031 0-.004-.88-2.571-2.34-4.354zm-5.001-3.688c.15 0 .31.008.48.011-2.076-5.761-4.301-8.351-4.623-8.74a12.16 12.16 0 00-.67 9.01c.566-.041 1.096-.061 1.586-.061 1.416 0 2.303.178 3.227.78zm-7.79-13.2h-.031c-.003 0 .006.001.031.001zm-1.518.073c.225.255 2.021 2.357 4.061 7.634a54.65 54.65 0 014.475-1.229C12.311 4.527 10.33 1.59 9.403.99zm-5.292 7.424c.43 1.129.91 2.248 1.438 3.333 1.432-.33 2.938-.514 4.554-.514.748 0 1.449.034 2.125.093C12.174 4.798 10.203 1.2 10.148 1.151c-1.637.914-3.126 2.284-4.555 3.935zm6.559 6.727c-2.59-.521-4.065-2.055-4.065-2.055s1.005 2.171 2.755 3.679c1.37-1.041 2.425-2.166 3.31-3.624-.9-.036-1.78-.1-2-.001zm1.789 5.023c-.043-.029-.335-.22-.787-.516-.548.352-1.05.728-1.499 1.122 1.294 1.014 2.554 1.561 2.619 1.561.014 0 .021 0 .027-.008h.004c.107-.147 1.215-1.561 1.636-3.159z" />
        </svg>
      )
    default:
      return null
  }
}

function GearIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 15.5A3.5 3.5 0 018.5 12a3.5 3.5 0 013.5-3.5 3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0014 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65z" />
    </svg>
  )
}

/** Rail width. When open: rail flush to screen right; gear sits to its left (see screenshot). */
const RAIL_W = '3.25rem'
/** Gap between gear (right edge) and rail (left edge) when open */
const RAIL_GEAR_GAP = '6px'

export function SocialSidebar() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = ''
      return
    }
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const toggle = () => setOpen((v) => !v)

  const railStyle: CSSProperties = {
    position: 'fixed',
    top: '50%',
    right: open ? '0' : 'calc(-3.25rem - 16px)',
    width: RAIL_W,
    maxHeight: 'min(72dvh, 22rem)',
    transform: 'translateY(-50%)',
    transition: 'right 280ms cubic-bezier(0.22, 1, 0.36, 1)',
    zIndex: 75,
    pointerEvents: open ? 'auto' : 'none',
  }

  const gearStyle: CSSProperties = {
    position: 'fixed',
    top: '50%',
    right: open ? `calc(${RAIL_W} + ${RAIL_GEAR_GAP})` : 0,
    transform: 'translateY(-50%)',
    transition: 'right 280ms cubic-bezier(0.22, 1, 0.36, 1)',
    zIndex: 92,
    paddingRight: 'max(2px, env(safe-area-inset-right, 0px))',
  }

  const dock = (
    <>
      <div
        role="presentation"
        aria-hidden={!open}
        className={`fixed inset-0 z-[74] bg-black/50 transition-opacity duration-300 ease-out ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setOpen(false)}
      />

      <aside
        id="social-slide-panel"
        role="dialog"
        aria-modal={open}
        aria-label="Social links"
        aria-hidden={!open}
        style={railStyle}
        className="rounded-2xl border-y border-l border-white/15 bg-[#0a0a0a]/95 py-2 shadow-[12px_0_24px_rgba(0,0,0,0.35)] motion-reduce:transition-none"
      >
        <nav
          aria-label="Social media"
          className="flex max-h-[min(68dvh,20rem)] flex-col overflow-y-auto overflow-x-hidden px-1.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          <ul className="flex flex-col items-center gap-3 py-1">
  {site.social.map((s) => (
    <li key={s.href} className="shrink-0">
      <a
        href={s.href}
        target="_blank"
        rel="noopener noreferrer"
        title={s.label}
        onClick={() => setOpen(false)}
        className="
          group
          flex h-11 w-11 items-center justify-center
          rounded-full
          bg-[#111111]
          text-zinc-300
          transition-all duration-300

          shadow-[5px_5px_12px_#050505,-5px_-5px_12px_#1f1f1f]

          hover:text-orange-400
          hover:shadow-[inset_4px_4px_8px_#050505,inset_-4px_-4px_8px_#1f1f1f]

          active:scale-95
        "
      >
        <span className="sr-only">{s.label}</span>

        <div className="scale-90 transition duration-300 group-hover:scale-100">
          <SocialIcon icon={s.icon} />
        </div>
      </a>
    </li>
  ))}
</ul>
        </nav>
      </aside>

      <button
        type="button"
        aria-expanded={open}
        aria-controls="social-slide-panel"
        aria-label={open ? 'Close social links' : 'Open social links'}
        style={gearStyle}
        onClick={(e) => {
          e.stopPropagation()
          toggle()
        }}
        className={`flex h-11 w-12 items-center justify-center border border-accent/50 bg-[#1a1614] text-accent shadow-lg shadow-black/35 ring-1 ring-black/25 transition-[right,box-shadow,background-color,border-radius] duration-200 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#221c18] hover:shadow-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none max-md:h-10 max-md:w-11 ${
          open ? 'rounded-full' : 'rounded-l-full border-r-0'
        }`}
      >
        <span
          className={`inline-flex will-change-transform ${
            open
              ? 'rotate-90 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:rotate-0 motion-reduce:transition-none'
              : 'social-gear-spin motion-reduce:animate-none'
          }`}
        >
          <GearIcon className="h-5 w-5 max-md:h-[1.15rem] max-md:w-[1.15rem]" />
        </span>
      </button>
    </>
  )

  if (!mounted) return null
  return createPortal(dock, document.body)
}
