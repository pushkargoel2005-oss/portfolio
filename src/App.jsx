import { useEffect, useState } from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import About from './components/About.jsx'
import Skills from './components/Skills.jsx'
import Projects from './components/Projects.jsx'
import Experience from './components/Experience.jsx'
import GitHubActivity from './components/GitHubActivity.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark'
  const stored = window.localStorage.getItem('portfolio-theme')
  if (stored === 'light' || stored === 'dark') return stored
  return 'dark'
}

export default function App() {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  // Offset-aware smooth scrolling for fixed header.
  // Scroll to the section's heading (not the section top) so there is
  // no large py-20 / divider whitespace above the title.
  useEffect(() => {
    const GAP = 16
    const getHeaderOffset = () => {
      const header = document.querySelector('header')
      return (header?.offsetHeight ?? 64) + GAP
    }
    const prefersReduced = () =>
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const getTarget = (sectionEl) =>
      sectionEl.querySelector('[data-section-heading]') || sectionEl.querySelector('h2') || sectionEl
    const scrollToId = (id, smooth = true) => {
      document.body.style.overflow = ''
      const behavior = smooth && !prefersReduced() ? 'smooth' : 'auto'
      if (id === 'home') {
        window.scrollTo({ top: 0, behavior })
        return
      }
      const el = document.getElementById(id)
      if (!el) return
      const target = getTarget(el)
      const top = target.getBoundingClientRect().top + window.scrollY - getHeaderOffset()
      window.scrollTo({ top: Math.max(0, top), behavior })
    }

    const onClick = (e) => {
      const anchor = e.target.closest?.('a[href^="#"]')
      if (!anchor) return
      const href = anchor.getAttribute('href')
      if (!href || href === '#') return
      const id = href.slice(1)
      if (!id || !document.getElementById(id)) return
      e.preventDefault()
      // Double rAF lets the mobile menu close + layout settle first.
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          scrollToId(id, true)
          window.history.pushState(null, '', `#${id}`)
        })
      )
    }
    document.addEventListener('click', onClick)

    // Deep-link / refresh with a hash + back-forward navigation.
    const scrollFromHash = () => {
      const id = window.location.hash.slice(1)
      if (!id) return
      if (!document.getElementById(id)) return
      setTimeout(() => scrollToId(id, true), 80)
    }
    scrollFromHash()
    window.addEventListener('hashchange', scrollFromHash)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('hashchange', scrollFromHash)
    }
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <a href="#home" className="skip-link">
        Skip to content
      </a>
      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))} />
      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <GitHubActivity />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  )
}
