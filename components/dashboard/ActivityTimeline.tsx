'use client'

import { InsightActivity } from '@/lib/study-insights'
import Link from 'next/link'

interface ActivityTimelineProps {
  activity: InsightActivity[]
  guides: { slug: string; title: string }[]
}

export default function ActivityTimeline({ activity, guides }: ActivityTimelineProps) {
  if (!activity.length) return null

  const getGuideTitle = (slug: string) => guides.find((guide) => guide.slug === slug)?.title || slug

  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-primary mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activity.slice(0, 8).map((item, index) => (
          <div key={index} className="flex gap-3 items-start">
            <div className="pt-1 text-xl">
              {item.type === 'flashcards' && '🎴'}
              {item.type === 'quiz' && '✏️'}
              {item.type === 'guide' && '📖'}
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div className="font-semibold text-white text-sm">
                  {item.type === 'flashcards' && (
                    <>
                      Reviewed {item.count} flashcards in{' '}
                      <Link href={`/guides/${item.guideSlug}`} className="text-primary hover:text-accent">
                        {getGuideTitle(item.guideSlug)}
                      </Link>
                    </>
                  )}
                  {item.type === 'quiz' && (
                    <>
                      Scored {item.score}/{item.total} on a quiz in{' '}
                      <Link href={`/guides/${item.guideSlug}`} className="text-primary hover:text-accent">
                        {getGuideTitle(item.guideSlug)}
                      </Link>
                    </>
                  )}
                  {item.type === 'guide' && (
                    <>
                      {Math.round(item.progress)}% completed in{' '}
                      <Link href={`/guides/${item.guideSlug}`} className="text-primary hover:text-accent">
                        {getGuideTitle(item.guideSlug)}
                      </Link>
                    </>
                  )}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(item.timestamp).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


