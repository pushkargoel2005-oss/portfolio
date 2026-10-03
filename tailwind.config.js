/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: 'var(--bg)',
        surface: 'var(--surface)',
        surface2: 'var(--surface-2)',
        line: 'var(--line)',
        muted: 'var(--muted)',
        accent: '#8b7cff',
        accent2: '#5b8cff'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace']
      },
      maxWidth: {
        content: '80rem'
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.35)',
        glow: '0 0 40px rgba(139,124,255,0.25)'
      }
    }
  },
  plugins: []
}
