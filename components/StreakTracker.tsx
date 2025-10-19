'use client'

import { useState, useEffect } from 'react'
import { getStreakStatus, updateStreak } from '@/lib/streaks'
import { motion } from 'framer-motion'

export default function StreakTracker() {
  const [streak, setStreak] = useState({ current: 0, longest: 0, isToday: false, message: '' })

  useEffect(() => {
    loadStreak()
  }, [])

  const loadStreak = () => {
    const status = getStreakStatus()
    setStreak(status)
  }

  const handleStudyToday = () => {
    updateStreak()
    loadStreak()
  }

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-primary">Study Streak</h3>
        <div className="text-3xl">
          {streak.current >= 30 ? '👑' : streak.current >= 7 ? '🔥' : '📅'}
        </div>
      </div>

      {/* Current Streak */}
      <div className="text-center mb-6">
        <motion.div
          key={streak.current}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="text-6xl font-bold neon-text mb-2"
        >
          {streak.current}
        </motion.div>
        <div className="text-gray-400">Day{streak.current !== 1 ? 's' : ''} in a Row</div>
      </div>

      {/* Longest Streak */}
      {streak.longest > streak.current && (
        <div className="text-center mb-4 p-3 rounded-lg glass-card">
          <div className="text-sm text-gray-400">Personal Best</div>
          <div className="text-2xl font-bold text-accent">{streak.longest} days</div>
        </div>
      )}

      {/* Message */}
      <div className="text-center p-4 rounded-lg bg-white/5 border border-white/10 mb-4">
        <p className="text-sm text-gray-300">{streak.message}</p>
      </div>

      {/* Today's Status */}
      {!streak.isToday && (
        <button
          onClick={handleStudyToday}
          className="w-full btn-primary"
        >
          Mark Today&apos;s Study Complete
        </button>
      )}

      {streak.isToday && (
        <div className="text-center p-3 rounded-lg bg-green-500/20 border border-green-500/30">
          <span className="text-green-400 font-semibold">✓ Studied Today!</span>
        </div>
      )}

      {/* Milestone Indicators */}
      <div className="mt-6 space-y-2">
        <div className="text-xs text-gray-500 mb-2">Milestone Progress:</div>
        {[7, 30, 100].map(milestone => (
          <div key={milestone} className="flex items-center justify-between text-sm">
            <span className={streak.current >= milestone ? 'text-green-400' : 'text-gray-500'}>
              {milestone} days {streak.current >= milestone && '✓'}
            </span>
            <div className="flex-1 mx-3 h-1 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${Math.min((streak.current / milestone) * 100, 100)}%` }}
              />
            </div>
            <span className="text-gray-500">{Math.round((streak.current / milestone) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

