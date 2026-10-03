import Reveal from './Reveal.jsx'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignCls = align === 'center' ? 'text-center mx-auto items-center' : 'text-left items-start'
  return (
    <Reveal className={`flex max-w-2xl flex-col gap-3 ${alignCls}`}>
      <span className="inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted" style={{ borderColor: 'var(--line)', color: 'var(--muted)' }}>
        <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: 'var(--text)' }}>
        {title}
      </h2>
      {description ? (
        <p className="text-[15px] leading-relaxed sm:text-base" style={{ color: 'var(--muted)' }}>
          {description}
        </p>
      ) : null}
    </Reveal>
  )
}
