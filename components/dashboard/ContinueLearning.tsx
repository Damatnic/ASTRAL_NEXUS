'use client'

import Link from 'next/link'

interface ContinueLearningProps {
  items: { slug: string; title: string; progress: number }[]
  reviewQueue?: number
}

export default function ContinueLearning({ items, reviewQueue = 0 }: ContinueLearningProps) {
  if (!items.length && reviewQueue === 0) return null
  return (
    <div className="glass-card p-6 rounded-lg mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary">Continue Learning</h3>
        {reviewQueue > 0 && (
          <Link href="/study" className="text-sm text-primary hover:text-accent">
            {reviewQueue} flashcards due →
          </Link>
        )}
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {items.slice(0, 4).map((g) => (
          <Link key={g.slug} href={`/guides/${g.slug}`} className="p-4 rounded-lg glass-card-hover">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{g.title}</div>
              <div className="text-sm text-gray-400">{g.progress}%</div>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-accent" style={{ width: `${g.progress}%` }} />
            </div>
          </Link>
        ))}
        {!items.length && (
          <div className="p-4 rounded-lg glass-card">
            <p className="text-sm text-gray-400">Nice work! Explore a new guide to keep learning.</p>
          </div>
        )}
      </div>
    </div>
  )
}


