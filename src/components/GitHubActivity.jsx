import { Github, ArrowUpRight, BookMarked } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { siteConfig, repoHighlights } from '../data/portfolio.js'

export default function GitHubActivity() {
  return (
    <section id="github" aria-label="GitHub and activity" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto px-5 sm:px-8" style={{ maxWidth: '1280px' }}>
        <div className="section-divider mb-14" aria-hidden="true" />
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Activity"
              title="Code, in the open"
              description="A few repositories I'm working on."
            />
            <Reveal delay={0.1} className="mt-6">
              <motion.a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-ghost inline-flex items-center gap-2.5 rounded-xl px-5 py-3.5 text-[14.5px] font-semibold"
                style={{ color: 'var(--text)' }}
              >
                <Github size={18} /> @{siteConfig.githubUsername} <ArrowUpRight size={15} />
              </motion.a>
            </Reveal>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
            {repoHighlights.map((r, i) => (
              <Reveal key={r.name} delay={i * 0.07}>
                <motion.a
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="card-border hover-lift group flex h-full flex-col rounded-2xl p-5"
                  style={{ background: 'var(--surface)' }}
                  aria-label={`${r.name} — open live demo`}
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: 'var(--surface-2)', border: '1px solid var(--line)', color: 'var(--muted)' }}>
                      <BookMarked size={16} />
                    </span>
                    <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" style={{ color: 'var(--muted-2)' }} />
                  </div>
                  <h3 className="mt-4 font-mono text-[14.5px] font-semibold" style={{ color: 'var(--text)' }}>
                    {r.name}
                  </h3>
                  <p className="mt-1.5 flex-1 text-[13.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {r.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t pt-3.5" style={{ borderColor: 'var(--line)' }}>
                    <span className="flex items-center gap-2 font-mono text-[12px]" style={{ color: 'var(--muted)' }}>
                      <span className="h-2.5 w-2.5 rounded-full bg-[#f1e05a]" aria-hidden="true" /> {r.language}
                    </span>
                    <span className="flex gap-1.5">
                      {r.tech.map((t) => (
                        <span key={t} className="rounded-md px-2 py-0.5 font-mono text-[11px]" style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
                          {t}
                        </span>
                      ))}
                    </span>
                  </div>
                </motion.a>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
