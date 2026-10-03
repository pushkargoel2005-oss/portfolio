import { GraduationCap, FolderGit2, Briefcase } from 'lucide-react'
import { motion } from 'framer-motion'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { experience } from '../data/portfolio.js'

const typeStyle = {
  education: { icon: GraduationCap, label: 'Education', color: '#8b7cff', bg: 'rgba(139,124,255,0.12)' },
  project: { icon: FolderGit2, label: 'Independent', color: '#34d399', bg: 'rgba(52,211,153,0.12)' },
  work: { icon: Briefcase, label: 'Experience', color: '#5b8cff', bg: 'rgba(91,140,255,0.12)' }
}

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience and education" className="scroll-mt-24 py-20 sm:py-28">
      <div className="mx-auto px-5 sm:px-8" style={{ maxWidth: '1280px' }}>
        <div className="section-divider mb-14" aria-hidden="true" />
        <SectionHeading
          eyebrow="Journey"
          title="Experience & education"
          description="My education, self-driven work, and focus areas."
        />

        <div className="relative mx-auto mt-12 max-w-3xl">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-2 left-[19px] top-2 w-px origin-top sm:left-[23px]"
            style={{ background: 'linear-gradient(to bottom, var(--accent), var(--accent-2), var(--line-strong))' }}
            aria-hidden="true"
          />
          <ol className="space-y-6">
            {experience.map((item, idx) => {
              const s = typeStyle[item.type] || typeStyle.project
              const Icon = s.icon
              return (
                <Reveal key={item.title + idx} delay={idx * 0.06}>
                  <motion.li
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="hover-lift relative rounded-2xl border p-6 pl-14 sm:p-7 sm:pl-16"
                    style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
                  >
                    <motion.span
                      initial={{ scale: 0.6, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ type: 'spring', stiffness: 320, damping: 20, delay: idx * 0.06 }}
                      className="absolute left-4 top-6 flex h-10 w-10 items-center justify-center rounded-xl border sm:left-4"
                      style={{ background: s.bg, color: s.color, borderColor: 'var(--line)' }}
                    >
                      <Icon size={18} />
                    </motion.span>
                    {item.placeholder && (
                      <span className="mb-3 inline-flex rounded-full border border-dashed px-3 py-1 font-mono text-[11px]" style={{ borderColor: 'var(--line-strong)', color: 'var(--muted-2)' }}>
                        PLACEHOLDER — replace when you have real experience
                      </span>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em]" style={{ background: s.bg, color: s.color }}>
                        {s.label}
                      </span>
                      <span className="font-mono text-[12px]" style={{ color: 'var(--muted-2)' }}>
                        {item.period}
                      </span>
                    </div>
                    <h3 className="mt-2.5 text-[18px] font-bold tracking-tight" style={{ color: 'var(--text)' }}>
                      {item.title}
                    </h3>
                    <p className="mt-0.5 text-[14px] font-medium" style={{ color: 'var(--muted)' }}>
                      {item.org}
                    </p>
                    <ul className="mt-4 space-y-2">
                      {item.points.map((pt) => (
                        <li key={pt.slice(0, 32)} className="flex gap-2.5 text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: s.color }} aria-hidden="true" />
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </motion.li>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
