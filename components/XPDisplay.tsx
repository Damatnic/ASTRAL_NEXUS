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
        <div className="flex items-center gap-2 glass-card px-3 py-2 rounded-full">
          <div className="text-sm font-bold text-primary">
            Lv {userLevel.level}
          </div>
          <div className="w-24 h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-accent"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="text-xs text-gray-400">
            {userLevel.currentXP}/{userLevel.xpToNextLevel}
          </div>
        </div>
        
        {/* XP Gained Animation */}
        {xpGained > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 0 }}
            animate={{ opacity: [0, 1, 1, 0], y: -30 }}
            transition={{ duration: 2 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-primary font-bold"
          >
            +{xpGained} XP
          </motion.div>
        )}
      </div>
    )
  }

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="text-3xl font-bold text-primary">Level {userLevel.level}</div>
          <div className="text-sm text-gray-400">{userLevel.title}</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold neon-text">{userLevel.totalXP.toLocaleString()}</div>
          <div className="text-xs text-gray-400">Total XP</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-400 mb-2">
          <span>{userLevel.currentXP} XP</span>
          <span>{userLevel.xpToNextLevel} XP needed</span>
        </div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_100%] animate-shimmer"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        </div>
        <div className="text-center text-xs text-gray-400 mt-1">
          {progress}% to level {userLevel.level + 1}
        </div>
      </div>

      {/* Perks */}
      {userLevel.perks.length > 0 && (
        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <div className="text-xs text-gray-400 mb-2">Unlocked Perks:</div>
          {userLevel.perks.map((perk, idx) => (
            <div key={idx} className="text-sm text-primary mb-1">
              ✓ {perk}
            </div>
          ))}
        </div>
      )}

      {/* Next Milestone */}
      <div className="mt-4 text-center">
        <div className="text-xs text-gray-400">
          {getXPToNextMilestone(userLevel.totalXP)} XP until next perk
        </div>
      </div>

      {/* Level Up Animation */}
      {showLevelUp && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          className="absolute inset-0 flex items-center justify-center bg-black/80 rounded-lg"
        >
          <div className="text-center">
            <div className="text-6xl mb-4">🎉</div>
            <div className="text-4xl font-bold neon-text mb-2">LEVEL UP!</div>
            <div className="text-2xl text-primary">Level {userLevel.level}</div>
            <div className="text-xl text-gray-300 mt-2">{userLevel.title}</div>
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

