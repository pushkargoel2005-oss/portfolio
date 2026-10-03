import { LayoutGrid, Server, Database, Wrench, Code2 } from 'lucide-react'
import SectionHeading from './SectionHeading.jsx'
import Reveal from './Reveal.jsx'
import { skillCategories } from '../data/portfolio.js'

const categoryIcons = {
  layout: LayoutGrid,
  server: Server,
  database: Database,
  tools: Wrench,
  code: Code2
}

function SkillBadge({ name }) {
  return (
    <span
      className="card-border inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[13px] font-medium"
      style={{ background: 'var(--bg)', color: 'var(--text)' }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} aria-hidden="true" />
      {name}
    </span>
  )
}

export default function Skills() {
  return (
    <section id="skills" aria-label="Technical skills" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto px-5 sm:px-8" style={{ maxWidth: '1280px' }}>
        <div className="section-divider mb-14" aria-hidden="true" />
        <SectionHeading
          eyebrow="Skills"
          title="A practical, honest toolbox"
          description="Only tools I actually use. No percentages, no inflated bars — just grouped skills you can verify in my projects and code."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((cat, idx) => {
            const Icon = categoryIcons[cat.icon] || Code2
            const isWide = idx === 0 || idx === 3
            return (
              <Reveal key={cat.title} delay={(idx % 3) * 0.08} className={isWide ? 'sm:col-span-1 lg:col-span-1' : ''}>
                <article
                  className="card-border group h-full rounded-2xl p-6"
                  style={{ background: 'var(--surface)' }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="flex h-10 w-10 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
                      style={{ background: 'var(--surface-2)', color: 'var(--accent)', border: '1px solid var(--line)' }}
                    >
                      <Icon size={18} />
                    </span>
                    <div>
                      <h3 className="text-[15.5px] font-semibold" style={{ color: 'var(--text)' }}>
                        {cat.title}
                      </h3>
                      <p className="text-[12.5px]" style={{ color: 'var(--muted-2)' }}>
                        {cat.description}
                      </p>
                    </div>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.skills.map((s) => (
                      <SkillBadge key={s.name} name={s.name} />
                    ))}
                  </div>
                </article>
              </Reveal>
            )
          })}

          <Reveal delay={0.1}>
            <div
              className="flex h-full flex-col justify-between rounded-2xl border p-6"
              style={{ background: 'linear-gradient(135deg, rgba(139,124,255,0.16), rgba(91,140,255,0.07))', borderColor: 'var(--line)' }}
            >
              <div>
                <h3 className="text-[15.5px] font-semibold" style={{ color: 'var(--text)' }}>
                  Currently learning
                </h3>
                <p className="mt-2 text-[14px] leading-relaxed" style={{ color: 'var(--muted)' }}>
                  Deepening REST design, auth flows, and deployment basics. Next: testing and system-design fundamentals.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
