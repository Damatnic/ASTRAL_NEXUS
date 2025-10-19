import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Astral Nexus - Interactive Learning Platform',
    short_name: 'Astral Nexus',
    description: 'AI-powered interactive learning with flashcards, quizzes, and progress tracking',
    start_url: '/',
    display: 'standalone',
    background_color: '#0b0e11',
    theme_color: '#00ffcc',
    orientation: 'any',
    scope: '/',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    categories: ['education', 'productivity', 'lifestyle'],
    screenshots: [],
  }
}

