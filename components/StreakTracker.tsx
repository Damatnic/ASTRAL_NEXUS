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
    <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 shadow-inner-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-primary">Study Streak</h3>
        <div className="text-3xl">
          {streak.current >= 30 ? '👑' : streak.current >= 7 ? '🔥' : '📅'}
        </div>
      </div>

      {/* Current Streak */}
      <div className="mb-6 text-center">
        <motion.div
          key={streak.current}
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.5 }}
          className="mb-2 text-6xl font-bold text-primary"
        >
          {streak.current}
        </motion.div>
        <div className="text-[color:var(--text-secondary)]">Day{streak.current !== 1 ? 's' : ''} in a Row</div>
      </div>

      {/* Longest Streak */}
      {streak.longest > streak.current && (
        <div className="mb-4 rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-3 text-center">
          <div className="text-sm text-[color:var(--text-muted)]">Personal Best</div>
          <div className="text-2xl font-bold text-accent">{streak.longest} days</div>
        </div>
      )}

      {/* Message */}
      <div className="mb-4 rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-4 text-center">
        <p className="text-sm text-[color:var(--text-secondary)]">{streak.message}</p>
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
        <div className="rounded-2xl border border-green-500/30 bg-green-500/20 p-3 text-center">
          <span className="font-semibold text-green-400">✓ Studied Today!</span>
        </div>
      )}

      {/* Milestone Indicators */}
      <div className="mt-6 space-y-2">
        <div className="mb-2 text-xs text-[color:var(--text-muted)]">Milestone Progress:</div>
        {[7, 30, 100].map(milestone => (
          <div key={milestone} className="flex items-center justify-between text-sm">
            <span className={streak.current >= milestone ? 'text-green-400' : 'text-[color:var(--text-muted)]'}>
              {milestone} days {streak.current >= milestone && '✓'}
            </span>
            <div className="mx-3 h-1 flex-1 overflow-hidden rounded-full bg-surface-muted/70">
              <div
                className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                style={{ width: `${Math.min((streak.current / milestone) * 100, 100)}%` }}
              />
            </div>
            <span className="text-[color:var(--text-muted)]">{Math.round((streak.current / milestone) * 100)}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

