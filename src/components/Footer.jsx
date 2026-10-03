import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { siteConfig, navLinks } from '../data/portfolio.js'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t py-10" style={{ borderColor: 'var(--line)', background: 'var(--surface)' }}>
      <div className="mx-auto flex flex-col items-center gap-6 px-5 sm:px-8 md:flex-row md:justify-between" style={{ maxWidth: '1280px' }}>
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold" style={{ background: 'linear-gradient(135deg,#8b7cff,#5b8cff)', color: '#fff' }}>
            {siteConfig.monogram}
          </span>
          <div>
            <p className="text-[14.5px] font-semibold" style={{ color: 'var(--text)' }}>
              {siteConfig.name} <span style={{ color: 'var(--muted-2)' }}>© {year}</span>
            </p>
            <p className="text-[12.5px]" style={{ color: 'var(--muted-2)' }}>
              {siteConfig.footerNote}
            </p>
          </div>
        </div>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="u-link text-[13.5px] font-medium" style={{ color: 'var(--muted)' }}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={siteConfig.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg" style={{ color: 'var(--muted)' }}>
            <Github size={16} />
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg" style={{ color: 'var(--muted)' }}>
            <Linkedin size={16} />
          </a>
          <a href={`mailto:${siteConfig.email}`} aria-label="Email" className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg" style={{ color: 'var(--muted)' }}>
            <Mail size={16} />
          </a>
          <a href="#home" aria-label="Back to top" className="btn-primary ml-1 flex h-9 w-9 items-center justify-center rounded-lg">
            <ArrowUp size={16} />
          </a>
        </div>
      </div>
    </footer>
  )
}
