'use client'

import { useEffect, useState } from 'react'
import { getFlashcardsForReview } from '@/lib/db'
import { initializeFlashcards } from '@/lib/initialize-flashcards'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Guide } from '@/lib/guides'

interface StudyHomeClientProps {
  guides: Guide[]
}

export default function StudyHomeClient({ guides }: StudyHomeClientProps) {
  const [flashcardsDue, setFlashcardsDue] = useState(0)
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    initializeData()
  }, [])

  const initializeData = async () => {
    await initializeFlashcards()
    const dueCards = await getFlashcardsForReview()
    setFlashcardsDue(dueCards.length)
    setInitialized(true)
  }

  const studyOptions = [
    {
      title: 'Flashcard Review',
      description: initialized ? `${flashcardsDue} cards due for review` : 'Loading...',
      icon: '🎴',
      href: '/study',
      color: 'from-purple-500/20 to-pink-500/20',
    },
    {
      title: 'Take a Quiz',
      description: 'Test your knowledge',
      icon: '✏️',
      href: '/study',
      color: 'from-blue-500/20 to-cyan-500/20',
    },
    {
      title: 'Study Plans',
      description: 'Structured learning paths',
      icon: '📅',
      href: '/study',
      color: 'from-green-500/20 to-teal-500/20',
    },
    {
      title: 'My Progress',
      description: 'Track your learning journey',
      icon: '📊',
      href: '/dashboard',
      color: 'from-primary/20 to-accent/20',
    },
  ]

  return (
    <div className="container mx-auto px-4 pb-24 pt-16">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <span className="mb-6 inline-block rounded-full border border-[color:var(--border-soft)] bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Study Center
          </span>
          <h1 className="mb-6 text-4xl font-semibold text-[color:var(--text-primary)] md:text-5xl lg:text-6xl">
            Interactive learning tools
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[color:var(--text-secondary)]">
            Transform guides into practice sessions. Flashcards, quizzes, and structured plans designed for retention and mastery.
          </p>
        </div>

        {/* Quick Study Options */}
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {studyOptions.map((option, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link
                href={option.href}
                className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-background/70 p-8 text-center transition-all hover:border-primary/60 hover:bg-background/90 hover:shadow-glow-sm"
              >
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="absolute inset-0 rounded-3xl bg-primary/5" />
                </div>
                <div className="relative">
                  <div className="mb-4 text-6xl">{option.icon}</div>
                  <h3 className="mb-2 text-xl font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-primary">{option.title}</h3>
                  <p className="text-sm text-[color:var(--text-secondary)]">{option.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Study by Guide */}
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-[color:var(--text-primary)]">
            Study by guide
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {guides.map((guide) => (
              <div key={guide.slug} className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 shadow-inner-sm">
                <div className="mb-5">
                  <h3 className="mb-2 text-xl font-semibold text-[color:var(--text-primary)]">{guide.title}</h3>
                  <p className="text-sm text-[color:var(--text-muted)]">{guide.category} • {guide.difficulty}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 p-3 text-center text-sm font-medium text-[color:var(--text-secondary)] transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:text-primary"
                  >
                    📖 Read
                  </Link>
                  <Link
                    href={`/study/flashcards/${guide.slug}`}
                    className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 p-3 text-center text-sm font-medium text-[color:var(--text-secondary)] transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:text-primary"
                  >
                    🎴 Cards
                  </Link>
                  <Link
                    href={`/study/quiz/${guide.slug}`}
                    className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 p-3 text-center text-sm font-medium text-[color:var(--text-secondary)] transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:text-primary"
                  >
                    ✏️ Quiz
                  </Link>
                  <Link
                    href={`/study/plan/${guide.slug}`}
                    className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 p-3 text-center text-sm font-medium text-[color:var(--text-secondary)] transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:text-primary"
                  >
                    📅 Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tips */}
        <div className="rounded-3xl border border-primary/20 bg-primary/10 p-10 shadow-inner-sm">
          <h3 className="mb-8 text-center text-2xl font-semibold text-[color:var(--text-primary)]">
            Effective study strategies
          </h3>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="mb-4 text-5xl">🔄</div>
              <h4 className="mb-2 text-base font-semibold text-[color:var(--text-primary)]">Spaced Repetition</h4>
              <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                Review flashcards at optimal intervals for long-term retention
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">📝</div>
              <h4 className="mb-2 text-base font-semibold text-[color:var(--text-primary)]">Active Recall</h4>
              <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                Test yourself with quizzes instead of passive re-reading
              </p>
            </div>
            <div className="text-center">
              <div className="mb-4 text-5xl">🎯</div>
              <h4 className="mb-2 text-base font-semibold text-[color:var(--text-primary)]">Deliberate Practice</h4>
              <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                Focus on challenging areas and track your progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

