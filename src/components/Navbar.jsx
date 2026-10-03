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
    const pickClosest = (entries) => {
      const visible = entries.filter((e) => e.isIntersecting)
      if (!visible.length) return
      visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
      // Prefer the section whose heading sits closest below the header band.
      const inBand = visible.find((e) => e.boundingClientRect.top >= -window.innerHeight * 0.4)
      setActive((inBand || visible[0]).target.id)
    }
    const observer = new IntersectionObserver(pickClosest, {
      rootMargin: '-35% 0px -55% 0px',
      threshold: 0
    })
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
                <motion.a
                  href={l.href}
                  aria-current={isActive ? 'true' : undefined}
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.96 }}
                  className={`relative rounded-md px-3 py-2 text-[13.5px] font-medium transition-colors ${isActive ? 'active' : ''}`}
                  style={{ color: isActive ? 'var(--text)' : 'var(--muted)' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md"
                      style={{ background: 'var(--surface-2)', border: '1px solid var(--line)' }}
                      transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="u-link relative">{l.label}</span>
                </motion.a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <motion.button
            type="button"
            onClick={onToggleTheme}
            whileHover={{ scale: 1.06, rotate: 6 }}
            whileTap={{ scale: 0.92 }}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            className="btn-ghost flex h-9 w-9 items-center justify-center rounded-lg"
            style={{ color: 'var(--muted)' }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </motion.button>
          <motion.a
            href="#contact"
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary hidden items-center gap-1.5 rounded-lg px-4 py-2 text-[13.5px] font-semibold sm:inline-flex"
          >
            Let&apos;s Talk <ArrowUpRight size={15} />
          </motion.a>
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
              {navLinks.map((l, i) => {
                const id = l.href.slice(1)
                const isActive = active === id
                return (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.28, delay: 0.04 * i, ease: [0.22, 1, 0.36, 1] }}
                  >
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
                  </motion.li>
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
