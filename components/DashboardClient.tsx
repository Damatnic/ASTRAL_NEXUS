'use client'

import { useEffect, useState } from 'react'
import { getAllProgress, getOverallStats, UserProgress, QuizResult, db } from '@/lib/db'
import { getStudyInsights } from '@/lib/study-insights'
import { Guide } from '@/lib/guides'
import Link from 'next/link'
import StreakTracker from './StreakTracker'
import DashboardHeader from './dashboard/DashboardHeader'
import StatsCards from './dashboard/StatsCards'
import ReviewsQueue from './dashboard/ReviewsQueue'
import AchievementsPreview from './dashboard/AchievementsPreview'
import ContinueLearning from './dashboard/ContinueLearning'
import ActivityTimeline from './dashboard/ActivityTimeline'
import FocusAreas from './dashboard/FocusAreas'
import RecommendedNext from './dashboard/RecommendedNext'
import SummaryStrip from './dashboard/SummaryStrip'
import XPDisplay from './XPDisplay'

interface DashboardClientProps {
  allGuides: Guide[]
}

export default function DashboardClient({ allGuides }: DashboardClientProps) {
  const [stats, setStats] = useState({ totalGuides: 0, completedGuides: 0, totalTimeSpent: 0, completionRate: 0 })
  const [progress, setProgress] = useState<UserProgress[]>([])
  const [recentQuizzes, setRecentQuizzes] = useState<QuizResult[]>([])
  const [insights, setInsights] = useState<Awaited<ReturnType<typeof getStudyInsights>> | null>(null)
  const [reviewSummary, setReviewSummary] = useState<{ due: number; nextDue?: Date | null }>({ due: 0 })
  const [achievementSummary, setAchievementSummary] = useState<{ unlocked: number; total: number }>({ unlocked: 0, total: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboardData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const loadDashboardData = async () => {
    const [overallStats, userProgress, quizzes, insightSummary] = await Promise.all([
      getOverallStats(),
      getAllProgress(),
      db.quizResults.orderBy('completedAt').reverse().limit(5).toArray(),
      getStudyInsights(allGuides.map(({ slug, title, category }) => ({ slug, title, category }))),
    ])

    setStats(overallStats)
    setProgress(userProgress)
    setRecentQuizzes(quizzes)
    setInsights(insightSummary)
    setLoading(false)
  }

  const guidesWithProgress = allGuides.map(guide => {
    const record = progress.find(p => p.guideSlug === guide.slug)
    return {
      ...guide,
      progress: record?.progress || 0,
      timeSpent: record?.timeSpent || 0,
      completed: record?.completed || false,
      lastRead: record?.lastRead,
    }
  })

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20">
        <div className="flex items-center justify-center">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 pb-24 pt-12">
      <DashboardHeader
        nextGuide={guidesWithProgress
          .filter((g) => g.progress > 0)
          .sort((a, b) => (b.lastRead?.getTime() || 0) - (a.lastRead?.getTime() || 0))[0]}
        reviewQueue={reviewSummary.due}
        streakDays={insights?.streakDays || 0}
      />

      {insights && (
        <SummaryStrip
          completionRate={stats.completionRate}
          streakDays={insights.streakDays}
          reviewQueue={reviewSummary.due}
          unlockedAchievements={achievementSummary.unlocked}
          totalAchievements={achievementSummary.total}
          averageMinutes={insights.averageMinutesPerDay}
        />
      )}

      <StatsCards
        completedGuides={stats.completedGuides}
        completionRate={stats.completionRate}
        totalMinutes={stats.totalTimeSpent}
        quizzesTaken={recentQuizzes.length}
        streakDays={insights?.streakDays || 0}
        longestStreak={insights?.longestStreak || 0}
        reviewQueue={reviewSummary.due}
        averageMinutes={insights?.averageMinutesPerDay || 0}
      />

      {/* XP + Streak + Reviews + Achievements */}
      <div className="mb-8 sm:mb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div><XPDisplay /></div>
        <div><StreakTracker /></div>
        <div><ReviewsQueue onSummary={setReviewSummary} /></div>
        <div><AchievementsPreview onSummary={setAchievementSummary} /></div>
      </div>

      {/* Continue & Guide Progress */}
      <ContinueLearning items={guidesWithProgress.filter(g => g.progress > 0)} reviewQueue={reviewSummary.due} />
      <div className="mb-16">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-semibold text-[color:var(--text-primary)]">
            Guide progress
          </h2>
          <Link href="/achievements" className="text-sm font-medium text-primary transition-colors hover:text-accent">
            View Achievements →
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {guidesWithProgress.map((guide) => (
            <div key={guide.slug} className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 shadow-inner-sm">
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-[color:var(--text-primary)]">{guide.title}</h3>
                  <p className="text-sm text-[color:var(--text-muted)]">{guide.category}</p>
                </div>
                {guide.completed && (
                  <div className="text-2xl">✓</div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-5">
                <div className="mb-2 flex justify-between text-sm text-[color:var(--text-muted)]">
                  <span>{guide.progress}% complete</span>
                  <span>{guide.timeSpent} min</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-surface-muted/70">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
                    style={{ width: `${guide.progress}%` }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Link
                  href={`/guides/${guide.slug}`}
                  className="flex-1 rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-4 py-2 text-center text-sm font-medium text-[color:var(--text-primary)] transition-all hover:border-primary/60 hover:bg-surface-muted/60"
                >
                  {guide.progress > 0 ? 'Continue' : 'Start'} Reading
                </Link>
                <Link
                  href={`/study/flashcards/${guide.slug}`}
                  className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-4 py-2 text-sm transition-all hover:border-primary/60 hover:bg-surface-muted/60"
                >
                  📚
                </Link>
                <Link
                  href={`/study/quiz/${guide.slug}`}
                  className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-4 py-2 text-sm transition-all hover:border-primary/60 hover:bg-surface-muted/60"
                >
                  ✏️
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quiz Results */}
      {recentQuizzes.length > 0 && (
        <div className="mb-16">
          <h2 className="mb-8 text-3xl font-semibold text-[color:var(--text-primary)]">
            Recent quiz results
          </h2>
          <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 shadow-inner-sm">
            <div className="space-y-3">
              {recentQuizzes.map((quiz, idx) => {
                const guide = allGuides.find(g => g.slug === quiz.guideSlug)
                const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100)
                
                return (
                  <div key={idx} className="flex items-center justify-between rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-4 transition-all hover:bg-surface-muted/60">
                    <div>
                      <h4 className="font-semibold text-[color:var(--text-primary)]">{guide?.title || quiz.guideSlug}</h4>
                      <p className="text-sm text-[color:var(--text-muted)]">
                        {new Date(quiz.completedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${
                        percentage >= 90 ? 'text-green-400' :
                        percentage >= 70 ? 'text-primary' :
                        percentage >= 50 ? 'text-orange-400' : 'text-red-400'
                      }`}>
                        {percentage}%
                      </div>
                      <p className="text-sm text-[color:var(--text-muted)]">
                        {quiz.score}/{quiz.totalQuestions}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {insights && (
        <div className="grid lg:grid-cols-2 gap-6">
          <FocusAreas mastery={insights.categoryMastery} />
          <RecommendedNext recommendations={insights.recommendedGuides} />
        </div>
      )}

      {insights && (
        <div className="mt-12">
          <ActivityTimeline activity={insights.recentActivity} guides={allGuides.map(({ slug, title }) => ({ slug, title }))} />
        </div>
      )}
    </div>
  )
}

