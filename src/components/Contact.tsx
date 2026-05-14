import { motion } from 'framer-motion'
import { useState, type FormEvent } from 'react'
import { site } from '../content'
import emailjs from "@emailjs/browser";

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

export function Contact() {
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')  
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [messageNotification, setmessageNotification] = useState("")
  const [sending, setSending] = useState(false)

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)
    try {
      await emailjs.send(
        'service_eo5a73f',
        'template_8iwgtmj',
        { 
          name: name,
          email: email,
          phone: phone,
          message: message, 
        },
        'dxzQrVy9PMPO4Td6D'
      )
      setmessageNotification(`Thank you ${name} for your message. I will get back to you soon.`)
      setName('')
      setEmail('')
      setPhone('')
      setMessage('')
      window.setTimeout(() => setmessageNotification(""), 4000)
      } catch (error) {
      console.error('Error sending email:', error)
      setmessageNotification("Message not sent")
      window.setTimeout(() => setmessageNotification(""), 4000)
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="scroll-mt-28 px-4 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="text-center text-3xl font-bold text-white md:text-4xl"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Get In <span className="text-gradient-accent">Touch</span>
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-zinc-400">
          Have a project in mind? Send a message — I typically reply within one business day.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass-panel rounded-2xl p-8"
          >
            <h3 className="text-lg font-semibold text-white">Contact form</h3>
            <form className="mt-6 space-y-4" onSubmit={onSubmit}>
              <div>
                <label htmlFor="name" className="text-sm text-zinc-400">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none ring-accent/0 transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-zinc-400">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="phone" className="text-sm text-zinc-400">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 w-full rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"
                  placeholder="Your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-zinc-400">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="mt-1 w-full resize-none rounded-xl border border-white/10 bg-black/40 px-4 py-3 text-white outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/40"  
                  placeholder="Tell me about your project…"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-accent py-3 text-sm font-semibold text-black transition hover:bg-amber-400 md:w-auto md:px-10"
              >
                {sending ? 'Sending...' : 'Send message'}
              </button>
              {messageNotification && (
                <p className="text-sm text-accent mt-2" role="status">
                  {messageNotification}
                </p>
              )}
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center"
          >
            <h3 className="text-lg font-semibold text-white">Social media</h3>
            <p className="mt-2 text-sm text-zinc-400">
              Prefer DMs? Find me on these platforms — always happy to connect.
            </p>
            <ul className="mt-8 space-y-3">
              {site.social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="glass-panel flex items-center gap-4 rounded-xl px-4 py-3 transition hover:border-accent/40 hover:bg-white/5"
                  >
                    <span className="text-accent">
                      <SocialIcon icon={s.icon} />
                    </span>
                    <span className="font-medium text-white">{s.label}</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-zinc-500">
              Email:{' '}
              <a href={`mailto:${site.email}`} className="text-accent hover:underline">
                {site.email}
              </a>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
