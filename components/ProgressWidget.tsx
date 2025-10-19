'use client'

import { useEffect, useState } from 'react'
import { getGuideProgress, updateGuideProgress } from '@/lib/db'
import { motion } from 'framer-motion'

interface ProgressWidgetProps {
  guideSlug: string
  guideTitle: string
}

export default function ProgressWidget({ guideSlug, guideTitle }: ProgressWidgetProps) {
  const [progress, setProgress] = useState(0)
  const [timeSpent, setTimeSpent] = useState(0)
  const [sessionStart, setSessionStart] = useState<Date | null>(null)

  useEffect(() => {
    loadProgress()
    setSessionStart(new Date())

    // Track time spent
    const interval = setInterval(() => {
      if (sessionStart) {
        const minutesSpent = Math.floor((new Date().getTime() - sessionStart.getTime()) / 60000)
        if (minutesSpent > 0) {
          updateGuideProgress(guideSlug, progress, 1)
          setTimeSpent(prev => prev + 1)
        }
      }
    }, 60000) // Every minute

    return () => {
      clearInterval(interval)
      // Save final progress on unmount
      if (sessionStart) {
        const minutesSpent = Math.floor((new Date().getTime() - sessionStart.getTime()) / 60000)
        if (minutesSpent > 0) {
          updateGuideProgress(guideSlug, progress, minutesSpent)
        }
      }
    }
  }, [guideSlug])

  const loadProgress = async () => {
    const data = await getGuideProgress(guideSlug)
    if (data) {
      setProgress(data.progress)
      setTimeSpent(data.timeSpent)
    }
  }

  const handleProgressUpdate = async (newProgress: number) => {
    setProgress(newProgress)
    await updateGuideProgress(guideSlug, newProgress)
  }

  return (
    <div className="glass-card p-6 rounded-lg sticky top-20">
      <h3 className="text-lg font-semibold text-primary mb-4">Your Progress</h3>
      
      {/* Progress Circle */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="url(#progress-gradient)"
              strokeWidth="8"
              fill="none"
              strokeDasharray={`${(progress / 100) * 352} 352`}
              className="transition-all duration-500"
            />
            <defs>
              <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffcc" />
                <stop offset="100%" stopColor="#1affd5" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold neon-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="space-y-3 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Time Spent:</span>
          <span className="font-semibold text-primary">{timeSpent} min</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Status:</span>
          <span className={`font-semibold ${progress >= 100 ? 'text-green-400' : 'text-accent'}`}>
            {progress >= 100 ? '✓ Completed' : 'In Progress'}
          </span>
        </div>
      </div>

      {/* Manual Progress Update */}
      <div className="mb-6">
        <label className="block text-sm text-gray-400 mb-2">Update Progress</label>
        <div className="flex gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleProgressUpdate(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm font-mono text-gray-400 w-12">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <button
          onClick={() => handleProgressUpdate(25)}
          className="w-full text-left px-3 py-2 rounded-lg glass-card-hover text-sm"
        >
          📍 25% - Introduction complete
        </button>
        <button
          onClick={() => handleProgressUpdate(50)}
          className="w-full text-left px-3 py-2 rounded-lg glass-card-hover text-sm"
        >
          📍 50% - Halfway there
        </button>
        <button
          onClick={() => handleProgressUpdate(75)}
          className="w-full text-left px-3 py-2 rounded-lg glass-card-hover text-sm"
        >
          📍 75% - Almost done
        </button>
        <button
          onClick={() => handleProgressUpdate(100)}
          className="w-full text-left px-3 py-2 rounded-lg glass-card-hover text-sm"
        >
          ✓ 100% - Mark complete
        </button>
      </div>
    </div>
  )
}

