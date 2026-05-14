import { motion } from 'framer-motion'
import { site } from '../content'

function SmallIcon({ kind }: { kind: string }) {
  return (
    <span
      className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-xs font-bold text-accent"
      aria-hidden
    >
      {kind.slice(0, 2).toUpperCase()}
    </span>
  )
}

export function About() {
  return (
    <section id="about" className="scroll-mt-28 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          About <span className="text-gradient-accent">Me</span>
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-400">
          Full-stack developer &amp; UI/UX designer — shipping products end to end.
        </p>

        <div className="mt-14 grid gap-10 sm:gap-12 lg:grid-cols-2 lg:items-start">
          <motion.div
            className="relative mx-auto w-full max-w-lg lg:mx-0"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {site.aboutImages.map((src) => (
                <div
                  key={src}
                  className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-lg sm:rounded-2xl"
                >
                  <img
                    src={src}
                    alt=""
                    className="aspect-square h-full w-full object-cover"
                    width={400}
                    height={400}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
            <div className="absolute -bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-black shadow-lg shadow-orange-500/40">
              {site.stats[1].value} Years Experience
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-white md:text-2xl">{site.role}</h3>
            <p className="mt-4 leading-relaxed text-zinc-400">{site.aboutBio}</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {site.skillGroups.map((g) => (
                <div key={g.title} className="glass-panel rounded-2xl p-4">
                  <div className="flex items-start gap-3">
                    <SmallIcon kind={g.icon} />
                    <div>
                      <h4 className="font-semibold text-white">{g.title}</h4>
                      <ul className="mt-2 space-y-1 text-sm text-zinc-400">
                        {g.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="inline-flex rounded-full bg-accent px-6 py-2.5 text-sm font-semibold text-black hover:bg-amber-400"
              >
                View Portfolio
              </a>
              <a
                href="#contact"
                className="inline-flex rounded-full border border-accent/60 px-6 py-2.5 text-sm font-semibold text-accent hover:bg-accent/10"
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
