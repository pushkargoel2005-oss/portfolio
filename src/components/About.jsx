import { MapPin, GraduationCap, Focus, Heart, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { aboutConfig, siteConfig } from '../data/portfolio.js'

const icons = [Focus, GraduationCap, MapPin, Heart]

export default function About() {
  const [copied, setCopied] = useState(false)

  const copySnippet = async () => {
    try {
      await navigator.clipboard.writeText(aboutConfig.codeSnippet)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <section id="about" aria-label="About me" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto px-5 sm:px-8" style={{ maxWidth: '1280px' }}>
        <SectionHeading eyebrow="About" title="A developer who cares about clarity" description="I enjoy full-stack work — thoughtful interfaces, solid APIs, and the small details that make software feel reliable." />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
          <Reveal delay={0.05}>
            <div
              className="rounded-2xl border p-7 sm:p-8"
              style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
            >
              <p className="font-mono text-[12px] uppercase tracking-[0.16em]" style={{ color: 'var(--accent)' }}>
                {'// hello'}
              </p>
              {aboutConfig.intro.map((p) => (
                <p key={p.slice(0, 24)} className="mt-4 text-[15px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {p}
                </p>
              ))}
              <p className="mt-5 border-l-2 pl-4 text-[15px] italic leading-relaxed" style={{ borderColor: 'var(--accent)', color: 'var(--text)' }}>
                “{siteConfig.tagline}”
              </p>
              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {aboutConfig.cards.map((c, i) => {
                  const Icon = icons[i % icons.length]
                  return (
                    <motion.div
                      key={c.title}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.45, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ y: -4 }}
                      className="card-border hover-lift rounded-xl p-4"
                      style={{ background: 'var(--bg)' }}
                    >
                      <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted-2)' }}>
                        <Icon size={14} /> {c.title}
                      </div>
                      <div className="mt-2 text-[14px] font-semibold leading-snug" style={{ color: 'var(--text)' }}>
                        {c.value}
                      </div>
                      <div className="mt-1 font-mono text-[11.5px]" style={{ color: 'var(--muted-2)' }}>
                        {c.hint}
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border" style={{ background: '#0b0d12', borderColor: 'var(--line)' }}>
              <div className="flex items-center justify-between border-b px-5 py-3.5" style={{ borderColor: 'var(--line)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  <span className="ml-2 font-mono text-[12px] text-gray-400">now.ts</span>
                </div>
                <motion.button
                  type="button"
                  onClick={copySnippet}
                  whileTap={{ scale: 0.94 }}
                  className="flex items-center gap-1.5 rounded-md border border-white/10 px-2.5 py-1.5 font-mono text-[11px] text-gray-300 transition-colors hover:bg-white/5"
                  aria-label="Copy code snippet"
                >
                  {copied ? <Check size={13} /> : <Copy size={13} />} {copied ? 'Copied' : 'Copy'}
                </motion.button>
              </div>
              <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed text-gray-200">
                <code>{aboutConfig.codeSnippet}</code>
              </pre>
            </div>

            <div className="rounded-2xl border p-6" style={{ background: 'linear-gradient(135deg, rgba(139,124,255,0.14), rgba(91,140,255,0.08))', borderColor: 'var(--line)' }}>
              <h3 className="text-[15px] font-semibold" style={{ color: 'var(--text)' }}>
                How I work
              </h3>
              <ul className="mt-3 space-y-2.5 text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                {[
                  'Start from the user flow, not the tech stack.',
                  'Build responsive UI first, then wire reliable APIs.',
                  'Keep code readable, commits small, and README honest.'
                ].map((t, i) => (
                  <motion.li
                    key={t}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                    className="flex gap-2.5"
                  >
                    <motion.span
                      style={{ color: 'var(--accent)' }}
                      animate={{ x: [0, 4, 0] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}
                    >
                      →
                    </motion.span>
                    {t}
                  </motion.li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
