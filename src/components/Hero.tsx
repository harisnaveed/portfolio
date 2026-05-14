import { motion } from 'framer-motion'
import { site } from '../content'

export function Hero() {
  return (
    <section id="home" className="relative scroll-mt-28 px-4 pb-24 pt-32 md:px-8 md:pb-32 md:pt-36">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
        <motion.div
          initial={{ opacity: 0, x: -28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-lg text-zinc-400">
            Hi, I&apos;m{' '}
            <span className="font-semibold text-gradient-accent">{site.name}</span>{' '}
            <span aria-hidden>👋</span>
          </p>
          <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-[3.25rem]">
            {site.role}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {site.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-black shadow-lg shadow-orange-500/30 transition hover:bg-amber-400"
            >
              Contact Me
              <span aria-hidden>→</span>
            </a>
            <a
              href={`${site.resume}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center rounded-full border border-accent/60 bg-transparent px-7 py-3 text-sm font-semibold text-accent transition hover:border-accent hover:bg-accent/10"
            >
              Download CV
            </a>
          </div>
          <dl className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-10">
            {site.stats.map((s) => (
              <div key={s.label}>
                <dt className="text-xs font-medium uppercase tracking-wider text-accent">{s.label}</dt>
                <dd className="mt-1 text-2xl font-bold text-white md:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          className="relative mx-auto flex max-w-md justify-center lg:mx-0 lg:max-w-none lg:justify-end"
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-square w-full max-w-[22rem] md:max-w-[26rem]">
            <div
              className="hero-blob absolute inset-0 bg-gradient-to-br from-accent via-amber-500 to-orange-700 opacity-90"
              aria-hidden
            />
            <div className="absolute inset-[10%] overflow-hidden rounded-full border-4 border-black/20 shadow-2xl shadow-black/50">
              <img
                src={site.heroImage}
                alt=""
                className="h-full w-full object-cover"
                width={640}
                height={640}
                decoding="async"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
