import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { Menu, X, Moon, Sun, ArrowUpRight } from 'lucide-react'
import { siteConfig, navLinks } from '../data/portfolio.js'

export default function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('home')
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open ])

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'color-mix(in srgb, var(--bg) 78%, transparent)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent'
      }}
    >
      <motion.div className="h-[2px] origin-left" style={{ scaleX: progress, background: 'linear-gradient(90deg,#8b7cff,#5b8cff)' }} />
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-8" style={{ maxWidth: '1280px' }}>
        <a href="#home" className="group flex items-center gap-3" aria-label={`${siteConfig.name} — home`}>
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl text-sm font-extrabold tracking-tight"
            style={{ background: 'linear-gradient(135deg,#8b7cff,#5b8cff)', color: '#fff' }}
          >
            {siteConfig.monogram}
          </span>
          <span className="hidden text-[15px] font-semibold tracking-tight sm:block" style={{ color: 'var(--text)' }}>
            {siteConfig.name}
            <span className="block text-[11px] font-medium" style={{ color: 'var(--muted)' }}>
              {siteConfig.role}
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => {
            const id = l.href.slice(1)
            const isActive = active === id
            return (
              <li key={l.href}>
                <a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`u-link rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors ${isActive ? 'active' : ''}`}
                  style={{ color: isActive ? 'var(--text)' : 'var(--muted)' }}
                >
                  {l.label}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ color: 'var(--muted)' }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <a
            href="#contact"
            className="btn-primary hidden items-center gap-1.5 rounded-lg px-4 py-2 text-[13.5px] font-semibold sm:inline-flex"
          >
            Let&apos;s Talk <ArrowUpRight size={15} />
          </a>
          <button
            type="button"
            className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg lg:hidden"
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
            style={{ color: 'var(--text)' }}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22 }}
            className="border-t lg:hidden"
            style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
          >
            <ul className="space-y-1 px-5 py-4">
              {navLinks.map((l) => {
                const id = l.href.slice(1)
                const isActive = active === id
                return (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium"
                      style={{
                        color: isActive ? 'var(--text)' : 'var(--muted)',
                        background: isActive ? 'var(--surface-2)' : 'transparent'
                      }}
                    >
                      {l.label}
                      {isActive && <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />}
                    </a>
                  </li>
                )
              })}
              <li className="pt-2">
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary flex items-center justify-center gap-1.5 rounded-lg px-4 py-3 text-[15px] font-semibold"
                >
                  Let&apos;s Talk <ArrowUpRight size={16} />
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
