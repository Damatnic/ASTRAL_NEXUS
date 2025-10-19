'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { db, getFlashcardsForReview } from '@/lib/db'

interface ReviewsQueueProps {
  onSummary?: (summary: { due: number; nextDue?: Date | null }) => void
}

export default function ReviewsQueue({ onSummary }: ReviewsQueueProps) {
  const [due, setDue] = useState(0)
  const [nextDue, setNextDue] = useState<Date | null>(null)

  useEffect(() => {
    refresh()
  }, [])

  async function refresh() {
    const cards = await getFlashcardsForReview()
    setDue(cards.length)
    const next = await db.flashcards.orderBy('nextReview').first()
    setNextDue(next?.nextReview || null)
    onSummary?.({ due: cards.length, nextDue: next?.nextReview || null })
  }

  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-primary mb-2">Review Queue</h3>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold neon-text">{due}</div>
          <div className="text-xs text-gray-500 mt-1">Flashcards waiting</div>
        </div>
        <Link href="/study" className="btn-primary">Review Now</Link>
      </div>
      <div className="text-sm text-gray-400 mt-3">
        {nextDue ? `Next session: ${new Date(nextDue).toLocaleString()}` : 'No cards scheduled. Great job!'}
      </div>
    </div>
  )
}


