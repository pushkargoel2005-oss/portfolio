import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, ExternalLink, ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import ProjectModal from './ProjectModal.jsx'
import { projects, projectFilters } from '../data/portfolio.js'

function Preview({ pattern, title }) {
  if (pattern === 'grid') {
    return (
      <div className="relative h-52 overflow-hidden sm:h-56" style={{ background: '#0c0f16' }} aria-hidden="true">
        <div className="bg-grid absolute inset-0 opacity-50" />
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(91,140,255,0.25), transparent 70%)' }} />
        <div className="absolute left-5 right-5 top-5 overflow-hidden rounded-xl border border-white/10 bg-black/50 backdrop-blur">
          <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="h-2 w-2 rounded-full bg-white/20" />
            <span className="ml-2 font-mono text-[10px] text-white/40">rooms · admin</span>
          </div>
          <div className="grid grid-cols-4 gap-2 p-3">
            {['A-101', 'A-102', 'B-201', 'B-202'].map((r, i) => (
              <div key={r} className="rounded-md border px-2 py-2 text-center font-mono text-[10px]" style={{ borderColor: i === 0 ? 'rgba(52,211,153,0.4)' : 'rgba(255,255,255,0.1)', color: i === 0 ? '#6ee7b7' : 'rgba(255,255,255,0.55)', background: i === 0 ? 'rgba(52,211,153,0.08)' : 'rgba(255,255,255,0.03)' }}>
                {r}
              </div>
            ))}
          </div>
        </div>
        <span className="absolute bottom-4 left-5 rounded-md bg-white/5 px-2 py-1 font-mono text-[10px] text-white/50">MERN · allocation flow</span>
      </div>
    )
  }
  if (pattern === 'waves') {
    return (
      <div className="relative h-52 overflow-hidden sm:h-56" style={{ background: 'linear-gradient(135deg,#0d1420,#0a0d14)' }} aria-hidden="true">
        <div className="absolute -left-16 -top-16 h-56 w-56 rounded-full blur-3xl" style={{ background: 'rgba(45,212,191,0.22)' }} />
        <div className="absolute -bottom-20 -right-10 h-64 w-64 rounded-full blur-3xl" style={{ background: 'rgba(139,124,255,0.25)' }} />
        <div className="absolute left-5 right-5 top-6 rounded-xl border border-white/10 bg-black/40 p-3 backdrop-blur">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-white/40">customers</span>
            <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 font-mono text-[10px] text-emerald-300">+12 this week</span>
          </div>
          <div className="mt-3 flex items-end gap-1.5">
            {[34, 52, 40, 66, 58, 82, 74].map((h, i) => (
              <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}px`, background: i === 5 ? '#8b7cff' : 'rgba(255,255,255,0.14)' }} />
            ))}
          </div>
        </div>
        <span className="absolute bottom-4 left-5 font-mono text-[10px] text-white/50">CRM · retail ops concept</span>
      </div>
    )
  }
  return (
    <div className="relative h-52 overflow-hidden sm:h-56" style={{ background: '#0d0b18' }} aria-hidden="true">
      <div className="absolute -left-10 top-0 h-48 w-48 rounded-full blur-3xl" style={{ background: 'rgba(139,124,255,0.35)' }} />
      <div className="absolute -right-12 bottom-0 h-52 w-52 rounded-full blur-3xl" style={{ background: 'rgba(91,140,255,0.3)' }} />
      <div className="bg-grid absolute inset-0 opacity-30" />
      <div className="absolute left-5 right-5 top-6 rounded-xl border border-white/10 bg-black/50 p-3 backdrop-blur">
        <p className="font-mono text-[11px] leading-relaxed text-white/70">
          <span className="text-violet-300">prompt:</span> “Summarise this return policy in 3 bullets, tone: friendly…”
        </p>
        <div className="mt-2.5 flex flex-wrap gap-1.5">
          {['{{tone}}', '{{audience}}', 'v3'].map((t) => (
            <span key={t} className="rounded-md bg-violet-400/15 px-2 py-0.5 font-mono text-[10px] text-violet-200">{t}</span>
          ))}
        </div>
      </div>
      <span className="absolute bottom-4 left-5 font-mono text-[10px] text-white/50">AI · prompt workspace</span>
    </div>
  )
}

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const [selected, setSelected] = useState(null)

  const visible = projects.filter((p) => filter === 'All' || p.category === filter)

  return (
    <section id="projects" aria-label="Featured projects" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto px-5 sm:px-8" style={{ maxWidth: '1280px' }}>
        <div className="section-divider mb-14" aria-hidden="true" />
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Projects"
            title="Featured work"
            description="A focused selection of my work."
          />
          <Reveal delay={0.1}>
            <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter projects by category">
              {projectFilters.map((f) => {
                const selectedFilter = filter === f
                return (
                  <motion.button
                    key={f}
                    role="tab"
                    aria-selected={selectedFilter}
                    onClick={() => setFilter(f)}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative rounded-full border px-4 py-2 text-[13px] font-medium transition-all"
                    style={{
                      borderColor: selectedFilter ? 'var(--accent)' : 'var(--line)',
                      color: selectedFilter ? 'var(--text)' : 'var(--muted)'
                    }}
                  >
                    {selectedFilter && (
                      <motion.span
                        layoutId="project-filter-pill"
                        className="absolute inset-0 rounded-full"
                        style={{ background: 'rgba(139,124,255,0.14)' }}
                        transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                      />
                    )}
                    <span className="relative">{f}</span>
                  </motion.button>
                )
              })}
            </div>
          </Reveal>
        </div>

        <motion.div layout className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((p, idx) => (
              <motion.article
                layout
                key={p.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6 }}
                exit={{ opacity: 0, scale: 0.97 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.55, delay: (idx % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="glow-card hover-lift group flex flex-col overflow-hidden rounded-2xl"
                style={{ background: 'var(--surface)', border: '1px solid var(--line)' }}
              >
                <button type="button" onClick={() => setSelected(p)} className="block text-left" aria-label={`View details for ${p.title}`}>
                  <div className="overflow-hidden">
                    <div className="transition-transform duration-500 group-hover:scale-[1.03]">
                      <Preview pattern={p.pattern} title={p.title} />
                    </div>
                  </div>
                </button>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full border px-2.5 py-1 font-mono text-[11px]" style={{ borderColor: 'var(--line)', color: 'var(--accent)' }}>
                      {p.category}
                    </span>
                    <span className="flex gap-2">
                      {p.github !== '#' ? (
                        <a href={p.github} target="_blank" rel="noreferrer" aria-label={`${p.title} GitHub`} onClick={(e) => e.stopPropagation()} className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
                          <Github size={15} />
                        </a>
                      ) : null}
                      {p.live !== '#' ? (
                        <a href={p.live} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`} onClick={(e) => e.stopPropagation()} className="flex h-8 w-8 items-center justify-center rounded-lg border transition-colors hover:bg-white/5" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
                          <ExternalLink size={15} />
                        </a>
                      ) : null}
                    </span>
                  </div>

                  <h3 className="mt-4 text-[19px] font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                    {p.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                    {p.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.stack.map((t) => (
                      <span key={t} className="rounded-md px-2 py-1 font-mono text-[11px]" style={{ background: 'var(--surface-2)', color: 'var(--muted)', border: '1px solid var(--line)' }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelected(p)}
                    className="mt-5 inline-flex w-fit items-center gap-1.5 text-[14px] font-semibold transition-colors"
                    style={{ color: 'var(--text)' }}
                  >
                    <span className="u-link">View Project</span> <ArrowUpRight size={15} />
                  </button>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence>
    </section>
  )
}
