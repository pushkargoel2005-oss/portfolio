import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { X, Github, ExternalLink, Check } from 'lucide-react'

function isPlaceholderLink(href) {
  return !href || href === '#'
}

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  if (!project) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border sm:rounded-3xl"
        style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
      >
        <div className="sticky top-0 flex items-center justify-between border-b px-6 py-4 backdrop-blur" style={{ background: 'color-mix(in srgb, var(--surface) 88%, transparent)', borderColor: 'var(--line)' }}>
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: 'var(--accent)' }}>
              {project.category}
            </p>
            <h3 className="text-xl font-bold" style={{ color: 'var(--text)' }}>
              {project.title}
            </h3>
          </div>
          <button type="button" onClick={onClose} aria-label="Close project details" className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg" style={{ color: 'var(--text)' }}>
            <X size={17} />
          </button>
        </div>

        <div className="space-y-6 px-6 py-6">
          <p className="inline-flex rounded-full border px-3 py-1 font-mono text-[11px]" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
            {project.tag}
          </p>

          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted-2)' }}>
              Overview
            </h4>
            <p className="mt-2 text-[14.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>
              {project.description}
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border p-4" style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}>
                <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: 'var(--accent)' }}>Problem</span>
                <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>{project.problem}</p>
              </div>
              <div className="rounded-xl border p-4" style={{ borderColor: 'var(--line)', background: 'var(--bg)' }}>
                <span className="text-[12px] font-semibold uppercase tracking-wider" style={{ color: '#34d399' }}>Solution</span>
                <p className="mt-1.5 text-[13.5px] leading-relaxed" style={{ color: 'var(--muted)' }}>{project.solution}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted-2)' }}>
              Key features
            </h4>
            <ul className="mt-3 space-y-2">
              {project.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[14px]" style={{ color: 'var(--muted)' }}>
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399' }}>
                    <Check size={12} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em]" style={{ color: 'var(--muted-2)' }}>
              Technologies
            </h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((t) => (
                <span key={t} className="rounded-full border px-3 py-1.5 text-[12.5px] font-medium" style={{ borderColor: 'var(--line)', background: 'var(--bg)', color: 'var(--text)' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 border-t pt-5" style={{ borderColor: 'var(--line)' }}>
            {!isPlaceholderLink(project.github) && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold" style={{ color: 'var(--text)' }}>
                <Github size={16} /> View Code
              </a>
            )}
            {!isPlaceholderLink(project.live) && (
              <a href={project.live} target="_blank" rel="noreferrer" className="btn-primary inline-flex items-center gap-2 rounded-xl px-5 py-3 text-[14px] font-semibold">
                <ExternalLink size={16} /> Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
