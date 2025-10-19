'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { getUserLevel, getProgressToNextLevel, UserLevel, checkDailyLogin } from '@/lib/xp-system'

interface XPDisplayProps {
  compact?: boolean
}

export default function XPDisplay({ compact = false }: XPDisplayProps) {
  const [userLevel, setUserLevel] = useState<UserLevel | null>(null)
  const [xpGained, setXPGained] = useState(0)
  const [showLevelUp] = useState(false)

  useEffect(() => {
    loadLevel()
    checkDaily()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadLevel = async () => {
    const level = await getUserLevel()
    setUserLevel(level)
  }

  const checkDaily = async () => {
    const dailyXP = await checkDailyLogin()
    if (dailyXP > 0) {
      setXPGained(dailyXP)
      setTimeout(() => setXPGained(0), 3000)
      loadLevel() // Refresh level after daily XP
    }
  }

  if (!userLevel) return null

  const progress = getProgressToNextLevel(userLevel)

  if (compact) {
    return (
      <div className="relative">
        <div className="flex items-center gap-2 rounded-full border border-[color:var(--border-soft)] bg-surface/60 px-3 py-2">
          <div className="text-sm font-bold text-primary">
            Lv {userLevel.level}
          </div>
          <div className="h-2 w-24 overflow-hidden rounded-full bg-surface-muted/70">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-[color:var(--text-muted)]">
            {userLevel.currentXP}/{userLevel.xpToNextLevel}
          </div>
        </div>
        
        {/* XP Gained Animation */}
        {xpGained > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -30 }}
            transition={{ duration: 2 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 transform font-bold text-primary"
          >
            +{xpGained} XP
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 shadow-inner-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-primary">Level {userLevel.level}</div>
          <div className="text-sm text-[color:var(--text-muted)]">{userLevel.title}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{userLevel.totalXP.toLocaleString()}</div>
          <div className="text-xs text-[color:var(--text-muted)]">Total XP</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="mb-2 flex justify-between text-xs text-[color:var(--text-muted)]">
          <span>{userLevel.currentXP} XP</span>
          <span>{userLevel.xpToNextLevel} XP needed</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-surface-muted/70">
          <motion.div
            className="h-full animate-shimmer bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="mt-1 text-center text-xs text-[color:var(--text-muted)]">
          {progress}% to level {userLevel.level + 1}
        </div>
      </div>

      {/* Perks */}
      {userLevel.perks.length > 0 && (
        <div className="mt-4 rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-3">
          <div className="mb-2 text-xs text-[color:var(--text-muted)]">Unlocked Perks:</div>
          {userLevel.perks.map((perk, idx) => (
            <div key={idx} className="mb-1 text-sm text-primary">
              ✓ {perk}
            </div>
          ))}
        </div>
      )}

      {/* Next Milestone */}
      <div className="mt-4 text-center">
        <div className="text-xs text-[color:var(--text-muted)]">
          {getXPToNextMilestone(userLevel.totalXP)} XP until next perk
        </div>
      </div>

      {/* Level Up Animation */}
      {showLevelUp && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/80"
        >
          <div className="text-center">
            <div className="mb-4 text-6xl">🎉</div>
            <div className="mb-2 text-4xl font-bold text-primary">LEVEL UP!</div>
            <div className="text-2xl text-primary">Level {userLevel.level}</div>
            <div className="mt-2 text-xl text-[color:var(--text-secondary)]">{userLevel.title}</div>
          </div>
        </motion.div>
      )}
    </div>
  )
}

function getXPToNextMilestone(totalXP: number): number {
  const milestones = [500, 1000, 2000, 5000, 10000, 25000, 50000, 100000]
  const nextMilestone = milestones.find(m => m > totalXP)
  return nextMilestone ? nextMilestone - totalXP : 0
}

// Add shimmer animation to globals.css:
// @keyframes shimmer {
//   0% { background-position: 200% 0; }
//   100% { background-position: -200% 0; }
// }
// .animate-shimmer {
//   animation: shimmer 3s ease-in-out infinite;
// }

