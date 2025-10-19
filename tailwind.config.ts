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
            color: 'rgba(255,255,255,0.9)',
            maxWidth: 'none',
            h1: { color: '#00ffcc' },
            h2: { color: '#00ffcc' },
            h3: { color: '#1affd5' },
            a: { color: '#00ffcc', textDecoration: 'underline' },
            code: { color: '#1affd5', backgroundColor: 'rgba(255,255,255,0.06)', padding: '0.2rem 0.4rem', borderRadius: '0.25rem' },
            pre: { backgroundColor: 'rgba(255,255,255,0.06)' },
            blockquote: { borderLeftColor: '#00ffcc' },
            th: { color: '#00ffcc' },
          },
        },
      },
      colors: {
        primary: '#00ffcc',
        accent: '#1affd5',
        background: '#0b0e11',
        'astral-teal': '#00ffcc',
        'astral-dark': '#0b0e11',
        'astral-darker': '#070a0c',
        'astral-accent': '#1affd5',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(0, 255, 204, 0.3)',
        'glow-md': '0 0 20px rgba(0, 255, 204, 0.4)',
        'glow-lg': '0 0 30px rgba(0, 255, 204, 0.5)',
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'slide-in': 'slide-in 0.3s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 204, 0.4)' },
          '50%': { boxShadow: '0 0 30px rgba(0, 255, 204, 0.6)' },
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

