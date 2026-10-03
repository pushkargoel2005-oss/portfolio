import { useState } from 'react'
import { Mail, Copy, Check, Github, Linkedin, Send, Loader2, Info } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { siteConfig } from '../data/portfolio.js'

const initial = { name: '', email: '', subject: '', message: '' }

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
    // No endpoint configured → functional mailto fallback
    if (!siteConfig.formEndpoint) {
      const subject = encodeURIComponent(form.subject || `Hello from ${form.name}`)
      const body = encodeURIComponent(`Hi,\n\n${form.message}\n\n— ${form.name} (${form.email})`)
      window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`
      setStatus('success')
      setNote('Your email app was opened with this message pre-filled.')
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
    `w-full rounded-xl border bg-transparent px-4 py-3 text-[14.5px] placeholder:text-[var(--muted-2)] transition-colors`

  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-20 py-20 sm:py-28">
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
              <a href={`mailto:${siteConfig.email}`} className="btn-primary mt-2.5 flex h-11 items-center justify-center gap-2 rounded-xl text-[14px] font-semibold">
                <Mail size={16} /> Write an email
              </a>
            </div>

            {!siteConfig.formEndpoint && (
              <p className="flex gap-2.5 rounded-xl border border-dashed p-4 text-[13px] leading-relaxed" style={{ borderColor: 'var(--line)', color: 'var(--muted-2)', background: 'var(--surface)' }}>
                <Info size={15} className="mt-0.5 shrink-0" />
                Direct sending is off — the form opens your email app.
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
                  <input
                    id="c-name"
                    type="text"
                    autoComplete="name"
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={set('name')}
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
                  <input
                    id="c-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={set('email')}
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
                <input
                  id="c-subject"
                  type="text"
                  placeholder="Project inquiry, opportunity, hello…"
                  value={form.subject}
                  onChange={set('subject')}
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
                <textarea
                  id="c-message"
                  rows={5}
                  placeholder="Tell me about your idea, timeline, and what success looks like…"
                  value={form.message}
                  onChange={set('message')}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? 'c-message-err' : undefined}
                  className={`${inputCls()} resize-y`}
                  style={{ borderColor: errors.message ? '#f87171' : 'var(--line)', color: 'var(--text)' }}
                />
                {errors.message && <p id="c-message-err" role="alert" className="mt-1.5 text-[12.5px] text-red-400">{errors.message}</p>}
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
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
              </button>

              {note && (
                <p
                  role={status === 'error' ? 'alert' : 'status'}
                  className="mt-4 rounded-xl border p-3.5 text-[13.5px] leading-relaxed"
                  style={{
                    borderColor: status === 'error' ? 'rgba(248,113,113,0.4)' : 'rgba(52,211,153,0.35)',
                    background: status === 'error' ? 'rgba(248,113,113,0.08)' : 'rgba(52,211,153,0.08)',
                    color: 'var(--text)'
                  }}
                >
                  {note}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
