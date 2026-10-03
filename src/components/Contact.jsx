import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, Copy, Check, Github, Linkedin, Send, Loader2, Info } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { siteConfig } from '../data/portfolio.js'

const initial = { name: '', email: '', subject: '', message: '' }

const gmailCompose = (to, subject, body) =>
  `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(to)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

export default function Contact() {
  const [form, setForm] = useState(initial)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | error
  const [copied, setCopied] = useState(false)
  const [note, setNote] = useState('')

  const set = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setErrors((er) => ({ ...er, [k]: '' }))
  }

  function validate() {
    const er = {}
    if (form.name.trim().length < 2) er.name = 'Please enter your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = 'Enter a valid email address.'
    if (form.subject.trim().length < 3) er.subject = 'Add a short subject.'
    if (form.message.trim().length < 10) er.message = 'Tell me a little more (10+ characters).'
    setErrors(er)
    return Object.keys(er).length === 0
  }

  async function onSubmit(e) {
    e.preventDefault()
    setNote('')
    if (!validate()) {
      setStatus('idle')
      return
    }
    // Direct send via Web3Forms — delivers to your inbox, no redirect
    if (siteConfig.web3formsKey) {
      try {
        setStatus('sending')
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: siteConfig.web3formsKey,
            name: form.name,
            email: form.email,
            subject: form.subject || `Portfolio message from ${form.name}`,
            message: form.message,
            from_name: `${form.name} (portfolio contact form)`,
            reply_to: form.email
          })
        })
        const data = await res.json()
        if (!data.success) throw new Error(data.message || 'Request failed')
        setStatus('success')
        setNote('Message sent — thank you. I’ll get back to you soon.')
        setForm(initial)
      } catch {
        setStatus('error')
        setNote('Sending failed. Please try the Write an email button instead.')
      }
      return
    }
    // No endpoint configured → open Gmail compose addressed to you
    if (!siteConfig.formEndpoint) {
      const subject = form.subject || `Hello from ${form.name}`
      const body = `Hi,\n\n${form.message}\n\n— ${form.name} (${form.email})`
      window.open(gmailCompose(siteConfig.email, subject, body), '_blank', 'noopener')
      setStatus('success')
      setNote('Gmail compose was opened with your message pre-filled — just hit Send there.')
      setForm(initial)
      return
    }
    try {
      setStatus('sending')
      const res = await fetch(siteConfig.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...form, _replyTo: form.email })
      })
      if (!res.ok) throw new Error('Request failed')
      setStatus('success')
      setNote('Message sent — thank you. I’ll get back to you soon.')
      setForm(initial)
    } catch {
      setStatus('error')
      setNote('Sending failed. Please try the email button below instead.')
    }
  }

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const inputCls = (bad) =>
    `field-input w-full rounded-xl border bg-transparent px-4 py-3 text-[14.5px] placeholder:text-[var(--muted-2)] transition-colors`

  const shake = (bad) => (bad ? { x: [0, -7, 7, -4, 4, 0] } : { x: 0 })

  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto px-5 sm:px-8" style={{ maxWidth: '1280px' }}>
        <div className="section-divider mb-14" aria-hidden="true" />
        <SectionHeading
          align="center"
          eyebrow="Contact"
          title="Have an idea? Let’s build something great."
          description="Tell me about your project, an opportunity, or just say hello. I read every message."
        />

        <div className="mx-auto mt-10 grid max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal className="flex flex-col gap-4">
            <div className="rounded-2xl border p-6 sm:p-7" style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}>
              {siteConfig.availability && (
                <span className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12.5px] font-medium" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
                  <span className="h-2 w-2 rounded-full" style={{ background: '#34d399' }} /> {siteConfig.availabilityText}
                </span>
              )}
              <h3 className="mt-4 text-[18px] font-bold" style={{ color: 'var(--text)' }}>
                Prefer email?
              </h3>
              <p className="mt-1.5 text-[14px]" style={{ color: 'var(--muted)' }}>
                The fastest way to reach me.
              </p>
              <div className="mt-4 flex items-center gap-2 rounded-xl border p-2 pl-4" style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}>
                <Mail size={16} style={{ color: 'var(--muted)' }} />
                <span className="flex-1 truncate font-mono text-[13px]" style={{ color: 'var(--text)' }}>
                  {siteConfig.email}
                </span>
                <button type="button" onClick={copyEmail} aria-label="Copy email address" className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg" style={{ color: 'var(--muted)' }}>
                  {copied ? <Check size={15} /> : <Copy size={15} />}
                </button>
              </div>
              <div className="mt-4 flex gap-2.5">
                <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn-ghost flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-[14px] font-semibold" style={{ color: 'var(--text)' }}>
                  <Github size={17} /> GitHub
                </a>
                <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn-ghost flex h-11 flex-1 items-center justify-center gap-2 rounded-xl text-[14px] font-semibold" style={{ color: 'var(--text)' }}>
                  <Linkedin size={17} /> LinkedIn
                </a>
              </div>
              <a
                href={gmailCompose(siteConfig.email, 'Hello', '')}
                target="_blank"
                rel="noreferrer"
                className="btn-primary mt-2.5 flex h-11 items-center justify-center gap-2 rounded-xl text-[14px] font-semibold"
              >
                <Mail size={16} /> Write an email
              </a>
            </div>

            {!siteConfig.formEndpoint && !siteConfig.web3formsKey && (
              <p className="flex gap-2.5 rounded-xl border border-dashed p-4 text-[13px] leading-relaxed" style={{ borderColor: 'var(--line)', color: 'var(--muted-2)', background: 'var(--surface)' }}>
                <Info size={15} className="mt-0.5 shrink-0" />
                Direct sending is off — the form opens Gmail compose.
              </p>
            )}
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-2xl border p-6 sm:p-7"
              style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
              aria-label="Contact form"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="mb-1.5 block text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
                    Name
                  </label>
                  <motion.input
                    id="c-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={set('name')}
                    animate={shake(errors.name)}
                    transition={{ duration: 0.4 }}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? 'c-name-err' : undefined}
                    className={inputCls()}
                    style={{ borderColor: errors.name ? '#f87171' : 'var(--line)', color: 'var(--text)' }}
                  />
                  {errors.name && <p id="c-name-err" role="alert" className="mt-1.5 text-[12.5px] text-red-400">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="mb-1.5 block text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
                    Email
                  </label>
                  <motion.input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={set('email')}
                    animate={shake(errors.email)}
                    transition={{ duration: 0.4 }}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'c-email-err' : undefined}
                    className={inputCls()}
                    style={{ borderColor: errors.email ? '#f87171' : 'var(--line)', color: 'var(--text)' }}
                  />
                  {errors.email && <p id="c-email-err" role="alert" className="mt-1.5 text-[12.5px] text-red-400">{errors.email}</p>}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="c-subject" className="mb-1.5 block text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
                  Subject
                </label>
                <motion.input
                  id="c-subject"
                  type="text"
                  placeholder="Project inquiry, opportunity, hello…"
                  value={form.subject}
                  onChange={set('subject')}
                  animate={shake(errors.subject)}
                  transition={{ duration: 0.4 }}
                  aria-invalid={!!errors.subject}
                  aria-describedby={errors.subject ? 'c-subject-err' : undefined}
                  className={inputCls()}
                  style={{ borderColor: errors.subject ? '#f87171' : 'var(--line)', color: 'var(--text)' }}
                />
                {errors.subject && <p id="c-subject-err" role="alert" className="mt-1.5 text-[12.5px] text-red-400">{errors.subject}</p>}
              </div>

              <div className="mt-4">
                <label htmlFor="c-message" className="mb-1.5 block text-[13px] font-semibold" style={{ color: 'var(--text)' }}>
                  Message
                </label>
                <motion.textarea
                  id="c-message"
                  rows={5}
                  placeholder="Tell me about your idea, timeline, and what success looks like…"
                  value={form.message}
                  onChange={set('message')}
                  animate={shake(errors.message)}
                  transition={{ duration: 0.4 }}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'c-message-err' : undefined}
                  className={`${inputCls()} resize-y`}
                  style={{ borderColor: errors.message ? '#f87171' : 'var(--line)', color: 'var(--text)' }}
                />
                {errors.message && <p id="c-message-err" role="alert" className="mt-1.5 text-[12.5px] text-red-400">{errors.message}</p>}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'sending'}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14.5px] font-semibold disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 size={17} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    <Send size={16} /> Send Message
                  </>
                )}
              </motion.button>

              <AnimatePresence>
                {note && (
                  <motion.p
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    role={status === 'error' ? 'alert' : 'status'}
                    className="mt-4 rounded-xl border p-3.5 text-[13.5px] leading-relaxed"
                    style={{
                      borderColor: status === 'error' ? 'rgba(248,113,113,0.4)' : 'rgba(52,211,153,0.35)',
                      background: status === 'error' ? 'rgba(248,113,113,0.08)' : 'rgba(52,211,153,0.08)',
                      color: 'var(--text)'
                    }}
                  >
                    {note}
                  </motion.p>
                )}
              </AnimatePresence>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
