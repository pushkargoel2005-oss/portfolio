# Premium Developer Portfolio

Dark, minimal, production-quality portfolio built with **React + Vite + Tailwind CSS v3 + Framer Motion + Lucide**.

## Run it

```bash
npm install
npm run dev     # http://localhost:5173
npm run build   # production build -> dist/
npm run preview # preview the build
```

Windows (PowerShell execution-policy blocked) — use:

```cmd
cmd /c "npm.cmd install && npm.cmd run dev"
```

## Personalize — one file

Edit **`src/data/portfolio.js`** — everything lives there:

| Field | Where |
|---|---|
| `siteConfig.name`, `role`, `location`, `tagline`, `email`, `github`, `linkedin`, `resumeUrl`, `availability` | Hero, nav, footer, contact |
| `navLinks` | Navbar + footer |
| `aboutConfig` | About copy, info cards, code snippet |
| `skillCategories` | Skills grid (no percentages by design) |
| `projects` + `projectFilters` | Projects grid, filters, modal |
| `experience` | Timeline (placeholders clearly marked) |
| `repoHighlights` | GitHub section static cards |

Placeholders to replace (search for `TODO`):
- `you@example.com` → your email
- `https://github.com/yourusername` → your GitHub
- `https://linkedin.com/in/yourusername` → your LinkedIn
- `/resume.pdf` → drop your PDF at `public/resume.pdf` or paste a Drive URL
- `[Your University]`, `[Start Year]` → real education
- Project `github: '#'` / `live: '#'` → real URLs (cards render an honest “add link” state until you do)

## Resume

Put your file at `public/resume.pdf`. The Hero “Download Resume” button points to `siteConfig.resumeUrl` (`/resume.pdf` by default).

## Contact form

- **Default (no setup):** validates, then opens the visitor’s email app via `mailto:` with subject/body pre-filled.
- **One-click sending:** create a free [Formspree](https://formspree.io/) form and set `formEndpoint: 'https://formspree.io/f/xxxxxxx'` in `portfolio.js`. No other code changes needed.

## Optional: live GitHub

The GitHub section is intentionally static (no fake stars/commits). To go live later, fetch `https://api.github.com/users/<you>/repos?sort=updated` in `GitHubActivity.jsx` — no API key needed for public repos.

## Design notes

- Tokens in `src/index.css` (`--bg`, `--surface`, `--line`, `--text`, `--muted`, `--accent`). Light theme via `[data-theme='light']`.
- Max width 1280px, Inter + JetBrains Mono, 12–16px radii, ambient glows + faint grid only.
- Animations respect `prefers-reduced-motion` (`MotionConfig reducedMotion="user"` + CSS guard).
