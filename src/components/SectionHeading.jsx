import { motion, useReducedMotion } from 'framer-motion'
import Reveal, { EASE } from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  const reduce = useReducedMotion()
  const item = (d) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 18, filter: 'blur(5px)' },
          whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
          viewport: { once: true, margin: '-80px' },
          transition: { duration: 0.55, delay: d, ease: EASE }
        }
  return (
    <Reveal className={`flex max-w-2xl scroll-mt-24 flex-col gap-3 ${alignCls}`} data-section-heading y={0}>
      <motion.span
        {...item(0)}
        className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted"
        style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}
      >
        <motion.span
          className="h-1.5 w-1.5 rounded-full"
          style={{ background: 'var(--accent)' }}
          aria-hidden="true"
          animate={reduce ? {} : { scale: [1, 1.5, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        />
        {eyebrow}
      </motion.span>
      <motion.h2 {...item(0.08)} className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--text)' }}>
        {title}
      </motion.h2>
      {description ? (
        <motion.p {...item(0.16)} className="text-[15px] leading-relaxed sm:text-base" style={{ color: 'var(--muted)' }}>
          {description}
        </motion.p>
      ) : null}
    </Reveal>
  )
}
