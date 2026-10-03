// ─────────────────────────────────────────────────────────────
// CENTRAL PORTFOLIO CONFIG — Edit everything personal here.
// Placeholders are clearly marked with [BRACKETS] or TODO.
// No fake achievements, employers, metrics, or testimonials.
// ─────────────────────────────────────────────────────────────

export const siteConfig = {
  // TODO: Replace with your real details
  name: 'Pushakr Goel',
  monogram: 'PG',
  firstName: 'Pushkar',
  role: 'Full-Stack Developer',
  roles: ['Full-Stack Developer', 'React Developer', 'Computer Science Student'],
  location: 'India',
  tagline: 'Building digital experiences that are functional, intuitive, and beautifully crafted.',
  heroHeadlineA: "Hi, I'm",
  heroHeadlineName: 'Pushkar.',
  heroHeadlineB: 'I build for the web.',
  heroDescription:
    'I’m a developer focused on building clean, responsive, and user-friendly digital experiences — from thoughtful interfaces in React to reliable APIs and databases behind them.',
  email: 'pushakrgoel2005@example.com', // TODO: your real email
  github: 'https://github.com/pushkargoel2005-oss', // TODO: your GitHub URL
  githubUsername: 'pushkargoel2005-oss',
  linkedin: 'https://linkedin.com/in/pushkar-goel-198427422', // TODO: your LinkedIn URL
  resumeUrl: '/resume.pdf', // TODO: place your PDF at public/resume.pdf or paste a Drive URL
  availability: true,
  availabilityText: 'Available for opportunities',
  // Optional: paste a Formspree / Web3Forms / custom endpoint to activate the form.
  // Leave empty to use the mailto fallback (no credentials needed).
  // Example: 'https://formspree.io/f/xxxxxxx'
  formEndpoint: '',
  footerNote: 'Designed & built with care.'
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' }
]

export const aboutConfig = {
  intro: [
    'I’m a Computer Science student and full-stack developer who enjoys turning ideas into working products. I care about clarity — clean code, honest interfaces, and software that actually helps people.',
    'My interests span frontend craft, UI/UX thinking, backend problem-solving, and continuous learning. I like building end-to-end: sketching a flow, shipping a React interface, wiring it to an API, and persisting data sensibly.'
  ],
  cards: [
    {
      title: 'Current focus',
      value: 'React, MERN stack & UI fundamentals',
      hint: 'Learning by building'
    },
    { title: 'Education', value: 'B.Tech, Computer Science', hint: 'Undergraduate studies' },
    { title: 'Location', value: 'India · Open to remote', hint: 'Based in India' },
    { title: 'Interests', value: 'Web dev, UI/UX, problem-solving', hint: 'Side projects & DSA' }
  ],
  codeSnippet: `// what I'm exploring
const developer = {
  stack: ['React', 'Node.js', 'MongoDB'],
  focus: 'clean UX + reliable APIs',
  learning: 'system design basics',
  principle: 'ship, learn, refine'
};`
}

// Only list skills you actually use. No percentages anywhere.
export const skillCategories = [
  {
    title: 'Frontend',
    icon: 'layout',
    description: 'Interfaces I build with',
    skills: [
      { name: 'HTML5', icon: 'html' },
      { name: 'CSS3', icon: 'css' },
      { name: 'JavaScript', icon: 'js' },
      { name: 'React', icon: 'react' },
      { name: 'Tailwind CSS', icon: 'tailwind' }
    ]
  },
  {
    title: 'Backend',
    icon: 'server',
    description: 'APIs & server logic',
    skills: [
      { name: 'Node.js', icon: 'node' },
      { name: 'Express.js', icon: 'express' },
      { name: 'REST APIs', icon: 'api' }
    ]
  },
  {
    title: 'Database',
    icon: 'database',
    description: 'Where data lives',
    skills: [{ name: 'MongoDB', icon: 'mongo' }, { name: 'SQL', icon: 'sql' }]
  },
  {
    title: 'Tools',
    icon: 'tools',
    description: 'Daily workflow',
    skills: [
      { name: 'Git', icon: 'git' },
      { name: 'GitHub', icon: 'github' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'npm', icon: 'npm' },
      { name: 'Vite', icon: 'vite' }
    ]
  },
  {
    title: 'Languages',
    icon: 'code',
    description: 'Beyond the web',
    skills: [{ name: 'Java', icon: 'java' }, { name: 'Python', icon: 'python' }, { name: 'C', icon: 'c' }]
  }
]

export const projectFilters = ['All', 'AI']

// Sample entries — clearly marked editable placeholders.
// TODO: Replace description, stack, and links with your real projects.
export const projects = [
  {
    id: 'promptforge',
    title: 'PromptForge',
    category: 'AI',
    tag: 'Featured Project',
    problem:
      'Scattered prompts and inconsistent results make working with LLMs messy for builders and learners.',
    solution:
      'A prompt-building workspace to draft, organise, and refine reusable prompts with variables, tagging, and clean previewing.',
    description:
      'PromptForge is a concept workspace for creating, organising, and reusing AI prompts. Draft with variables, tag by use-case, and keep a personal library of high-quality prompts.',
    stack: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
    features: [
      'Prompt library with search and tags',
      'Variable-based prompt templates',
      'Copy-ready preview and versioning concept',
      'Clean, keyboard-friendly editor UI'
    ],
    github: '#', // TODO: your repo URL
    live: 'https://promptforge-ai-bice.vercel.app/',
    accent: 'violet',
    pattern: 'orbs'
  }
]

// Never invent employers or dates. Placeholders are explicit.
export const experience = [
  {
    type: 'education',
    title: 'B.Tech — Computer Science',
    org: 'Undergraduate Studies',
    period: 'Pursuing',
    points: [
      'Coursework: Data Structures, DBMS, Operating Systems, Web Technologies.',
      'Building fundamentals through coursework and self-driven MERN projects.'
    ]
  },
  {
    type: 'project',
    title: 'Personal Projects & Self Learning',
    org: 'Independent',
    period: 'Ongoing',
    points: [
      'Shipping full-stack practice apps with React, Express, and MongoDB.',
      'Learning Git workflows, REST design, and responsive UI craft.'
    ]
  }
]

// Static repo highlights. No fake stars / commits / followers.
export const repoHighlights = [
  {
    name: 'promptforge',
    description: 'Workspace for creating, organising, and reusing AI prompts.',
    language: 'JavaScript',
    tech: ['React', 'Node.js'],
    url: 'https://github.com/pushkargoel2005-oss'
  }
]
