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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Study <span className="neon-text">Center</span>
          </h1>
          <p className="text-xl text-gray-400">
            Interactive learning tools to master every guide
          </p>
        </div>

        {/* Quick Study Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {studyOptions.map((option, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <div className={`glass-card-hover p-8 text-center h-full bg-gradient-to-br ${option.color}`}>
                <div className="text-6xl mb-4">{option.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-white">{option.title}</h3>
                <p className="text-sm text-gray-400">{option.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Study by Guide */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold mb-6">
            Study by <span className="text-primary">Guide</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {guides.map((guide) => (
              <div key={guide.slug} className="glass-card p-6">
                <div className="mb-4">
                  <h3 className="text-xl font-bold mb-2">{guide.title}</h3>
                  <p className="text-sm text-gray-400">{guide.category} • {guide.difficulty}</p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="glass-card-hover p-3 text-center text-sm"
                  >
                    📖 Read
                  </Link>
                  <Link
                    href={`/study/flashcards/${guide.slug}`}
                    className="glass-card-hover p-3 text-center text-sm"
                  >
                    🎴 Cards
                  </Link>
                  <Link
                    href={`/study/quiz/${guide.slug}`}
                    className="glass-card-hover p-3 text-center text-sm"
                  >
                    ✏️ Quiz
                  </Link>
                  <Link
                    href={`/study/plan/${guide.slug}`}
                    className="glass-card-hover p-3 text-center text-sm"
                  >
                    📅 Plan
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Study Tips */}
        <div className="glass-card p-8 border border-primary/20">
          <h3 className="text-2xl font-bold mb-6 text-center">
            Effective <span className="text-primary">Study Strategies</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔄</div>
              <h4 className="font-semibold mb-2">Spaced Repetition</h4>
              <p className="text-sm text-gray-400">
                Review flashcards at optimal intervals for long-term retention
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📝</div>
              <h4 className="font-semibold mb-2">Active Recall</h4>
              <p className="text-sm text-gray-400">
                Test yourself with quizzes instead of passive re-reading
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h4 className="font-semibold mb-2">Deliberate Practice</h4>
              <p className="text-sm text-gray-400">
                Focus on challenging areas and track your progress
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

