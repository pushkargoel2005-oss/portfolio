import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
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
          {[
            { href: siteConfig.github, label: 'GitHub', Icon: Github, external: true },
            { href: siteConfig.linkedin, label: 'LinkedIn', Icon: Linkedin, external: true },
            { href: `mailto:${siteConfig.email}`, label: 'Email', Icon: Mail, external: false }
          ].map(({ href, label, Icon, external }) => (
            <motion.a
              key={label}
              href={href}
              {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
              aria-label={label}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.94 }}
              className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ color: 'var(--muted)' }}
            >
              <Icon size={16} />
            </motion.a>
          ))}
          <motion.a
            href="#home"
            aria-label="Back to top"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.92 }}
            className="btn-primary ml-1 flex h-9 w-9 items-center justify-center rounded-lg"
          >
            <ArrowUp size={16} />
          </motion.a>
        </div>
      </div>
    </footer>
  )
}
