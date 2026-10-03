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
