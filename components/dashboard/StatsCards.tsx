'use client'

import { motion } from 'framer-motion'

export interface StatsCardsProps {
  completedGuides: number
  completionRate: number
  totalMinutes: number
  quizzesTaken: number
  streakDays: number
  longestStreak: number
  reviewQueue: number
  averageMinutes: number
}

export default function StatsCards({
  completedGuides,
  completionRate,
  totalMinutes,
  quizzesTaken,
  streakDays,
  longestStreak,
  reviewQueue,
  averageMinutes,
}: StatsCardsProps) {
  const cards = [
    {
      label: 'Guides Completed',
      value: completedGuides,
      description: 'Keep building mastery across categories',
      color: 'text-primary',
      delay: 0.05,
    },
    {
      label: 'Completion Rate',
      value: `${Math.round(completionRate)}%`,
      description: completionRate >= 80 ? 'Excellent progress—time to review' : 'Aim for 80% completion',
      color: 'text-accent',
      delay: 0.1,
    },
    {
      label: 'Minutes Studied',
      value: Math.round(totalMinutes),
      description: `Avg ${Math.max(1, Math.round(averageMinutes))} min per active day`,
      color: 'text-primary',
      delay: 0.15,
    },
    {
      label: 'Quizzes Taken',
      value: quizzesTaken,
      description: quizzesTaken > 0 ? 'Check your weakest topics below' : 'Take your first quiz today',
      color: 'text-accent',
      delay: 0.2,
    },
    {
      label: 'Current Streak',
      value: `${streakDays} days`,
      description: `Longest streak: ${longestStreak} days`,
      color: 'text-primary',
      delay: 0.25,
    },
    {
      label: 'Reviews Due',
      value: reviewQueue,
      description: reviewQueue > 0 ? 'Flashcards waiting in queue' : 'You are up to date!',
      color: 'text-accent',
      delay: 0.3,
    },
  ]

  return (
    <div className="grid xl:grid-cols-3 sm:grid-cols-2 gap-6 mb-12">
      {cards.map((card, index) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: card.delay }}
          className="glass-card p-6"
        >
          <div className={`text-4xl font-bold mb-2 ${card.color}`}>{card.value}</div>
          <div className="text-gray-200 font-semibold mb-1">{card.label}</div>
          <p className="text-sm text-gray-400 leading-relaxed">{card.description}</p>
        </motion.div>
      ))}
    </div>
  )
}


