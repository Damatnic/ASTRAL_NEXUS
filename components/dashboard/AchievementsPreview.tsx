'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Achievement, allAchievements, checkAndUnlockAchievements } from '@/lib/achievements'
import { db } from '@/lib/db'

interface AchievementsPreviewProps {
  onSummary?: (summary: { unlocked: number; total: number }) => void
}

export default function AchievementsPreview({ onSummary }: AchievementsPreviewProps) {
  const [unlocked, setUnlocked] = useState<Achievement[]>([])

  useEffect(() => {
    refresh()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function refresh() {
    const progress = await db.userProgress.toArray()
    const notes = await db.userNotes.toArray()
    const quizzes = await db.quizResults.toArray()

    const guidesCompleted = progress.filter(p => p.completed).length
    const quizScores = quizzes.map(q => (q.score / q.totalQuestions) * 100)
    const highestQuizScore = Math.max(...quizScores, 0)
    const quizScoresOver90 = quizScores.filter(s => s >= 90).length
    const flashcardsCount = await db.flashcards.where('repetitions').above(0).count()
    const totalTime = progress.reduce((sum, p) => sum + p.timeSpent, 0)
    const studyStreak = 0

    const unlockedList = await checkAndUnlockAchievements({
      guidesCompleted,
      highestQuizScore,
      quizScoresOver90,
      flashcardsReviewed: flashcardsCount,
      notesCreated: notes.length,
      studyStreak,
      totalTimeMinutes: totalTime,
    })
    setUnlocked(unlockedList)
    onSummary?.({ unlocked: unlockedList.length, total: allAchievements.length })
  }

  const lockedCount = allAchievements.length - unlocked.length

  return (
    <div className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-primary">Achievements</h3>
        <Link href="/achievements" className="text-sm text-primary hover:text-accent">View all →</Link>
      </div>
      <div className="text-sm text-gray-400 mb-3">Unlocked {unlocked.length} / {allAchievements.length}</div>
      <div className="flex gap-2 flex-wrap">
        {unlocked.slice(0, 4).map((a) => (
          <div key={a.id} className="px-3 py-2 rounded-lg bg-primary/10 text-sm border border-primary/30">
            <span className="mr-2">{a.icon}</span>{a.title}
          </div>
        ))}
        {lockedCount > 0 && (
          <div className="px-3 py-2 rounded-lg bg-white/5 text-sm text-gray-400 border border-white/10">
            +{lockedCount} more to unlock
          </div>
        )}
      </div>
    </div>
  )
}


