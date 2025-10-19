'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Achievement, allAchievements, checkAndUnlockAchievements, getRarityColor, getRarityGlow } from '@/lib/achievements'
import { db } from '@/lib/db'

export default function AchievementsPanel() {
  const [achievements, setAchievements] = useState<Achievement[]>([])
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all')

  useEffect(() => {
    loadAchievements()
  }, [])

  const loadAchievements = async () => {
    // Get user stats
    const progress = await db.userProgress.toArray()
    const notes = await db.userNotes.toArray()
    const quizzes = await db.quizResults.toArray()

    const guidesCompleted = progress.filter(p => p.completed).length
    const quizScores = quizzes.map(q => (q.score / q.totalQuestions) * 100)
    const highestQuizScore = Math.max(...quizScores, 0)
    const quizScoresOver90 = quizScores.filter(s => s >= 90).length
    const flashcardsCount = await db.flashcards.where('repetitions').above(0).count()
    const totalTime = progress.reduce((sum, p) => sum + p.timeSpent, 0)

    // TODO: Get actual streak data
    const studyStreak = 0 // Placeholder

    const unlocked = await checkAndUnlockAchievements({
      guidesCompleted,
      highestQuizScore,
      quizScoresOver90,
      flashcardsReviewed: flashcardsCount,
      notesCreated: notes.length,
      studyStreak,
      totalTimeMinutes: totalTime,
    })

    // Merge with all achievements
    const achievementList = allAchievements.map(achievement => {
      const found = unlocked.find(u => u.id === achievement.id)
      return found || { ...achievement, unlocked: false }
    })

    setAchievements(achievementList)
  }

  const filteredAchievements = achievements.filter(a => {
    if (filter === 'unlocked') return a.unlocked
    if (filter === 'locked') return !a.unlocked
    return true
  })

  const unlockedCount = achievements.filter(a => a.unlocked).length
  const totalCount = achievements.length

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-3xl font-bold">
            <span className="neon-text">Achievements</span>
          </h2>
          <p className="text-gray-400 mt-1">
            {unlockedCount} / {totalCount} unlocked ({Math.round((unlockedCount / totalCount) * 100)}%)
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'all' ? 'bg-primary text-astral-dark' : 'glass-card-hover'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'unlocked' ? 'bg-primary text-astral-dark' : 'glass-card-hover'
            }`}
          >
            Unlocked
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'locked' ? 'bg-primary text-astral-dark' : 'glass-card-hover'
            }`}
          >
            Locked
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAchievements.map((achievement, idx) => (
          <motion.div
            key={achievement.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className={`glass-card p-6 relative overflow-hidden ${
              achievement.unlocked ? `border-2 ${getRarityGlow(achievement.rarity)}` : 'opacity-60'
            }`}
          >
            {/* Rarity Indicator */}
            <div className="absolute top-2 right-2">
              <span className={`text-xs px-2 py-1 rounded-full glass-card ${getRarityColor(achievement.rarity)}`}>
                {achievement.rarity}
              </span>
            </div>

            {/* Icon */}
            <div className={`text-5xl mb-3 ${achievement.unlocked ? '' : 'grayscale opacity-50'}`}>
              {achievement.icon}
            </div>

            {/* Title */}
            <h3 className={`font-bold text-lg mb-2 ${achievement.unlocked ? 'text-primary' : 'text-gray-400'}`}>
              {achievement.title}
            </h3>

            {/* Description */}
            <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>

            {/* Status */}
            {achievement.unlocked ? (
              <div className="text-xs text-green-400">
                ✓ Unlocked {achievement.unlockedDate && new Date(achievement.unlockedDate).toLocaleDateString()}
              </div>
            ) : (
              <div className="text-xs text-gray-500">
                {achievement.requirement.type.replace(/_/g, ' ')}: {achievement.requirement.value}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

