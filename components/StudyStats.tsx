'use client'

import { useEffect, useState } from 'react'
import { getOverallStats, getFlashcardsForReview } from '@/lib/db'
import { initializeFlashcards } from '@/lib/initialize-flashcards'
import Link from 'next/link'

export default function StudyStats() {
  const [stats, setStats] = useState({
    completedGuides: 0,
    totalTimeSpent: 0,
    flashcardsDue: 0,
  })
  const [initialized, setInitialized] = useState(false)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    await initializeFlashcards()
    const overall = await getOverallStats()
    const dueCards = await getFlashcardsForReview()

    setStats({
      completedGuides: overall.completedGuides,
      totalTimeSpent: overall.totalTimeSpent,
      flashcardsDue: dueCards.length,
    })
    setInitialized(true)
  }

  if (!initialized) return null

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto glass-card p-8 md:p-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Your Learning <span className="text-primary">Journey</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Link href="/dashboard" className="text-center group">
            <div className="text-5xl font-bold neon-text mb-2 group-hover:scale-110 transition-transform">
              {stats.completedGuides}
            </div>
            <div className="text-gray-400">Guides Completed</div>
          </Link>
          <Link href="/study" className="text-center group">
            <div className="text-5xl font-bold neon-text mb-2 group-hover:scale-110 transition-transform">
              {stats.flashcardsDue}
            </div>
            <div className="text-gray-400">Cards Due Today</div>
          </Link>
          <Link href="/dashboard" className="text-center group">
            <div className="text-5xl font-bold neon-text mb-2 group-hover:scale-110 transition-transform">
              {Math.round(stats.totalTimeSpent)}
            </div>
            <div className="text-gray-400">Minutes Studied</div>
          </Link>
        </div>

        {stats.flashcardsDue > 0 && (
          <div className="mt-8 text-center">
            <Link href="/study" className="btn-primary px-8 py-3">
              Review {stats.flashcardsDue} Flashcards →
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

