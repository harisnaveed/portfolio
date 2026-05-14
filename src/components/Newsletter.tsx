import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'

export function Newsletter() {
  const [ok, setOk] = useState(false)

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOk(true)
    window.setTimeout(() => setOk(false), 4000)
  }

  return (
    <section className="px-4 py-16 md:px-8 md:py-20" aria-labelledby="newsletter-heading">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-panel mx-auto max-w-4xl rounded-3xl px-6 py-10 md:px-12 md:py-12"
      >
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 id="newsletter-heading" className="text-2xl font-bold text-white md:text-3xl">
              Subscribe to my <span className="text-gradient-accent">newsletter</span>
            </h2>
            <p className="mt-2 max-w-md text-sm text-zinc-400">
              Occasional notes on front-end craft, design systems, and product engineering. No spam.
            </p>
          </div>
          <form className="flex w-full flex-col gap-3 sm:flex-row md:max-w-md" onSubmit={onSubmit}>
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              placeholder="you@example.com"
              className="min-h-12 flex-1 rounded-xl border border-white/10 bg-black/40 px-4 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
            />
            <button
              type="submit"
              className="min-h-12 shrink-0 rounded-xl bg-accent px-6 text-sm font-semibold text-black hover:bg-amber-400"
            >
              Join
            </button>
          </form>
        </div>
        {ok && (
          <p className="mt-4 text-sm text-accent" role="status">
            You&apos;re in! Connect this form to your email provider or CMS.
          </p>
        )}
      </motion.div>
    </section>
  )
}
