import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(226,232,240,0.92)',
            maxWidth: 'none',
            h1: { color: '#38bdf8' },
            h2: { color: '#38bdf8' },
            h3: { color: '#f8fafc' },
            a: {
              color: '#38bdf8',
              textDecoration: 'none',
              fontWeight: '500',
            },
            code: {
              color: '#f8fafc',
              backgroundColor: 'rgba(148,163,184,0.16)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.375rem',
            },
            pre: { backgroundColor: 'rgba(15,23,42,0.85)', color: '#e2e8f0' },
            blockquote: { borderLeftColor: '#38bdf8', color: '#cbd5f5' },
            th: { color: '#38bdf8' },
          },
        },
      },
      colors: {
        primary: '#38bdf8',
        accent: '#f8fafc',
        secondary: '#94a3b8',
        background: '#020617',
        'astral-teal': '#38bdf8',
        'astral-dark': '#0f172a',
        'astral-darker': '#020617',
        'astral-accent': '#38bdf8',
        surface: '#111827',
        'surface-muted': '#1e293b',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 20px 40px rgba(56, 189, 248, 0.12)',
        'glow-md': '0 30px 60px rgba(56, 189, 248, 0.16)',
        'glow-lg': '0 40px 80px rgba(56, 189, 248, 0.22)',
        'inner-sm': 'inset 0 1px 0 rgba(255,255,255,0.04)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 rgba(56, 189, 248, 0.25)' },
          '50%': { boxShadow: '0 0 20px rgba(56, 189, 248, 0.35)' },
        },
        'slide-in': {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

export default config

