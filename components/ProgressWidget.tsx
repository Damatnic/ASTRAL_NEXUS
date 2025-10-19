'use client'

import { useEffect, useState } from 'react'
import { getGuideProgress, updateGuideProgress } from '@/lib/db'

interface ProgressWidgetProps {
  guideSlug: string
  guideTitle: string
}

export default function ProgressWidget({ guideSlug }: ProgressWidgetProps) {
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
    <div className="sticky top-28 rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 shadow-inner-sm">
      <h3 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">Your Progress</h3>
      
      {/* Progress Circle */}
      <div className="mb-6 flex justify-center">
        <div className="relative h-32 w-32">
          <svg className="h-full w-full -rotate-90 transform">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="rgba(148, 163, 184, 0.15)"
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
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="100%" stopColor="#0ea5e9" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-bold text-primary">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-6 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-[color:var(--text-secondary)]">Time Spent:</span>
          <span className="font-semibold text-primary">{timeSpent} min</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-[color:var(--text-secondary)]">Status:</span>
          <span className={`font-semibold ${progress >= 100 ? 'text-green-400' : 'text-accent'}`}>
            {progress >= 100 ? '✓ Completed' : 'In Progress'}
          </span>
        </div>
      </div>

      {/* Manual Progress Update */}
      <div className="mb-6">
        <label className="mb-2 block text-sm text-[color:var(--text-secondary)]">Update Progress</label>
        <div className="flex gap-2">
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={(e) => handleProgressUpdate(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="w-12 font-mono text-sm text-[color:var(--text-muted)]">{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <button
          onClick={() => handleProgressUpdate(25)}
          className="w-full rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-3 py-2 text-left text-sm text-[color:var(--text-primary)] transition-all hover:border-primary/60 hover:bg-surface-muted/60"
        >
          📍 25% - Introduction complete
        </button>
        <button
          onClick={() => handleProgressUpdate(50)}
          className="w-full rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-3 py-2 text-left text-sm text-[color:var(--text-primary)] transition-all hover:border-primary/60 hover:bg-surface-muted/60"
        >
          📍 50% - Halfway there
        </button>
        <button
          onClick={() => handleProgressUpdate(75)}
          className="w-full rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-3 py-2 text-left text-sm text-[color:var(--text-primary)] transition-all hover:border-primary/60 hover:bg-surface-muted/60"
        >
          📍 75% - Almost done
        </button>
        <button
          onClick={() => handleProgressUpdate(100)}
          className="w-full rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-3 py-2 text-left text-sm text-[color:var(--text-primary)] transition-all hover:border-primary/60 hover:bg-surface-muted/60"
        >
          ✓ 100% - Mark complete
        </button>
      </div>
    </div>
  )
}

