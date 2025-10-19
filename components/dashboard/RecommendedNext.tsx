'use client'

import Link from 'next/link'

interface RecommendedNextProps {
  recommendations: { slug: string; title: string; reason: string }[]
}

export default function RecommendedNext({ recommendations }: RecommendedNextProps) {
  if (!recommendations.length) return null
  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-primary mb-4">Recommended Next</h3>
      <div className="space-y-3">
        {recommendations.map((rec) => (
          <Link key={rec.slug} href={`/guides/${rec.slug}`} className="block p-4 rounded-lg glass-card-hover">
            <div className="font-semibold text-white">{rec.title}</div>
            <div className="text-xs text-gray-400 mt-1">{rec.reason}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}


