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
  title: 'Astral Nexus - Professional Guide Library for Ambitious Learners',
  description: 'A curated repository of expert-crafted guides spanning communication, finance, productivity, wellness, and beyond. Structured for comprehension and mastery.',
  keywords: ['guide library', 'knowledge base', 'learning platform', 'professional development', 'skill mastery', 'curated guides', 'Astral Nexus'],
  authors: [{ name: 'Astral Nexus' }],
  openGraph: {
    title: 'Astral Nexus Guide Library',
    description: 'Knowledge crafted for ambitious learners',
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
        <div className="flex min-h-screen flex-col bg-background text-[color:var(--text-primary)]">
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

