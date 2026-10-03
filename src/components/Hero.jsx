import { motion, AnimatePresence, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Github, Linkedin, Mail, ArrowDown, FileText, ChevronDown } from 'lucide-react'
import { siteConfig } from '../data/portfolio.js'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] } })
}

function RoleRotator({ roles }) {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  useEffect(() => {
    if (reduce || roles.length < 2) return
    const t = setInterval(() => setIndex((i) => (i + 1) % roles.length), 2600)
    return () => clearInterval(t)
  }, [reduce, roles.length])
  if (reduce || roles.length < 2) {
    return <span>{roles.join('  ·  ')}</span>
  }
  return (
    <span className="inline-flex flex-wrap items-center gap-2">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="text-gradient font-semibold"
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function HeroVisual() {
  const reduce = useReducedMotion()
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[440px] select-none" aria-hidden="true">
      {/* ambient orbs */}
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[28px] border"
        style={{ background: 'var(--surface)', borderColor: 'var(--line)' }}
        whileHover={reduce ? {} : { scale: 1.01 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="bg-grid bg-grid-fade absolute inset-0 opacity-60" />
        {!reduce && (
          <>
            <motion.div
              className="absolute -left-10 top-8 h-44 w-44 rounded-full blur-3xl"
              style={{ background: 'rgba(139,124,255,0.35)' }}
              animate={{ x: [0, 24, 0], y: [0, -18, 0] }}
              transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -right-8 bottom-10 h-52 w-52 rounded-full blur-3xl"
              style={{ background: 'rgba(91,140,255,0.28)' }}
              animate={{ x: [0, -20, 0], y: [0, 16, 0] }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
            />
          </>
        )}
        {/* terminal card */}
        <div className="absolute left-1/2 top-1/2 w-[86%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-2xl border shadow-soft" style={{ background: 'color-mix(in srgb, var(--bg) 88%, transparent)', borderColor: 'var(--line)' }}>
          <div className="flex items-center gap-1.5 border-b px-4 py-3" style={{ borderColor: 'var(--line)' }}>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-[11px]" style={{ color: 'var(--muted)' }}>
              developer.js
            </span>
          </div>
          <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed">
            <code>
              <span style={{ color: '#8b7cff' }}>const</span> <span style={{ color: 'var(--text)' }}>profile</span>{' '}
              <span style={{ color: 'var(--muted)' }}>=</span> <span style={{ color: 'var(--text)' }}>{'{'}</span>
              {'\n  '}stack: <span style={{ color: '#7ee2a8' }}>[&apos;React&apos;, &apos;Node&apos;]</span>,
              {'\n  '}craft: <span style={{ color: '#7ee2a8' }}>&apos;clean UI + APIs&apos;</span>,
              {'\n  '}focus: <span style={{ color: '#7ee2a8' }}>&apos;real problems&apos;</span>
              {'\n'}
              <span style={{ color: 'var(--text)' }}>{'}'}</span>
              {'\n'}
              <span style={{ color: '#8b7cff' }}>export default</span> <span style={{ color: 'var(--text)' }}>profile</span>
              {!reduce && <span className="animate-blink ml-1 inline-block h-[13px] w-[7px] translate-y-[2px] rounded-[1px]" style={{ background: '#8b7cff' }} />}
            </code>
          </pre>
        </div>

        {/* floating chips */}
        {!reduce && (
          <>
            <motion.div
              className="absolute left-4 top-6 rounded-xl border px-3 py-2 font-mono text-[11px] shadow-soft"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--line)', color: 'var(--muted)' }}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              {'<Component />'}
            </motion.div>
            <motion.div
              className="absolute bottom-6 right-4 rounded-xl border px-3 py-2 font-mono text-[11px] shadow-soft"
              style={{ background: 'var(--surface-2)', borderColor: 'var(--line)', color: 'var(--muted)' }}
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
            >
              GET /api/v1 ✓ 200
            </motion.div>
          </>
        )}
      </motion.div>
    </div>
  )
}

export default function Hero() {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [spot, setSpot] = useState({ x: 50, y: 30 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 70])
  const glowOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2])

  const onMouseMove = (e) => {
    if (reduce || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    setSpot({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100
    })
  }

  const socials = [
    { href: siteConfig.github, label: 'GitHub profile', Icon: Github, external: true },
    { href: siteConfig.linkedin, label: 'LinkedIn profile', Icon: Linkedin, external: true },
    { href: `mailto:${siteConfig.email}`, label: 'Send email', Icon: Mail, external: false }
  ]

  return (
    <section ref={ref} onMouseMove={onMouseMove} id="home" aria-label="Introduction" className="relative overflow-hidden pb-16 pt-28 sm:pt-36">
      <div className="bg-grid bg-grid-fade pointer-events-none absolute inset-0 opacity-70" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: 'var(--glow)', opacity: glowOpacity }}
        aria-hidden="true"
      />
      {!reduce && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-500"
          style={{ background: `radial-gradient(480px circle at ${spot.x}% ${spot.y}%, rgba(139,124,255,0.12), transparent 65%)` }}
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto grid max-w-content items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr]" style={{ maxWidth: '1280px' }}>
        <div>
          {siteConfig.availability && (
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0} className="mb-5 inline-flex">
              <span
                className="inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium"
                style={{ borderColor: 'var(--line)', background: 'var(--surface)', color: 'var(--muted)' }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: '#34d399' }} />
                  <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#34d399' }} />
                </span>
                {siteConfig.availabilityText}
              </span>
            </motion.div>
          )}

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
            <h1 className="text-[40px] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[64px]" style={{ color: 'var(--text)' }}>
              {siteConfig.heroHeadlineA} <span className="text-gradient">{siteConfig.heroHeadlineName}</span>
              <br />
              {siteConfig.heroHeadlineB}
            </h1>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
            <p className="mt-5 max-w-xl text-[15.5px] leading-relaxed sm:text-lg" style={{ color: 'var(--muted)' }}>
              {siteConfig.heroDescription}
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 font-mono text-[12.5px]" style={{ color: 'var(--muted-2)' }}>
              <RoleRotator roles={siteConfig.roles} />
              <span aria-hidden="true">—</span>
              <span>{siteConfig.location}</span>
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-8 flex flex-wrap items-center gap-3">
            <motion.a
              href="#projects"
              whileHover={reduce ? {} : { y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[14.5px] font-semibold"
            >
              Explore My Work <ArrowDown size={16} />
            </motion.a>
            <motion.a
              href={siteConfig.resumeUrl}
              target={siteConfig.resumeUrl.startsWith('/') ? '_self' : '_blank'}
              rel="noreferrer"
              whileHover={reduce ? {} : { y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="btn-ghost inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-[14.5px] font-semibold"
              style={{ color: 'var(--text)' }}
            >
              <FileText size={16} /> Download Resume
            </motion.a>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-8 flex items-center gap-3">
            <span className="text-[12px] font-medium uppercase tracking-[0.14em]" style={{ color: 'var(--muted-2)' }}>
              Connect
            </span>
            <span className="h-px w-8" style={{ background: 'var(--line-strong)' }} />
            {socials.map(({ href, label, Icon, external }, i) => (
              <motion.a
                key={label}
                href={href}
                {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                aria-label={label}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                whileHover={reduce ? {} : { y: -3, scale: 1.05 }}
                whileTap={{ scale: 0.94 }}
                className="btn-ghost flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ color: 'var(--muted)' }}
              >
                <Icon size={18} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2} style={reduce ? {} : { y: visualY }}>
          <HeroVisual />
        </motion.div>
      </div>

      <div className="relative mx-auto mt-14 flex justify-center" style={{ maxWidth: '1280px' }}>
        <a href="#about" className="flex flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: 'var(--muted-2)' }} aria-label="Scroll to about section">
          Scroll
          <span className="flex h-9 w-6 items-start justify-center rounded-full border p-1.5" style={{ borderColor: 'var(--line-strong)' }}>
            {!reduce ? (
              <motion.span animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }} transition={{ duration: 1.8, repeat: Infinity }} className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            ) : (
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            )}
          </span>
          <ChevronDown size={14} />
        </a>
      </div>
    </section>
  )
}
