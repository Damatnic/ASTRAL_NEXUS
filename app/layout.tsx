import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import KeyboardShortcuts from '@/components/KeyboardShortcuts'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Astral Nexus - Where Knowledge Aligns with the Stars',
  description: 'The official knowledge hub for the Astral ecosystem. Explore guides, tutorials, and resources across tech, wellness, finance, and creativity.',
  keywords: ['Astral', 'knowledge hub', 'guides', 'tutorials', 'learning'],
  authors: [{ name: 'Astral Productions' }],
  openGraph: {
    title: 'Astral Nexus',
    description: 'Where Knowledge Aligns with the Stars',
    type: 'website',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <KeyboardShortcuts />
        </div>
      </body>
    </html>
  )
}

