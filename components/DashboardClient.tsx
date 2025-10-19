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
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12">
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
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">
            Guide <span className="text-primary">Progress</span>
          </h2>
          <Link href="/achievements" className="text-primary hover:text-accent transition-colors text-sm">
            View Achievements →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {guidesWithProgress.map((guide) => (
            <div key={guide.slug} className="glass-card p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg mb-1">{guide.title}</h3>
                  <p className="text-sm text-gray-400">{guide.category}</p>
                </div>
                {guide.completed && (
                  <div className="text-2xl">✓</div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>{guide.progress}% complete</span>
                  <span>{guide.timeSpent} min</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
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
                  className="flex-1 text-center px-4 py-2 rounded-lg glass-card-hover text-sm"
                >
                  {guide.progress > 0 ? 'Continue' : 'Start'} Reading
                </Link>
                <Link
                  href={`/study/flashcards/${guide.slug}`}
                  className="px-4 py-2 rounded-lg glass-card-hover text-sm"
                >
                  📚 Flashcards
                </Link>
                <Link
                  href={`/study/quiz/${guide.slug}`}
                  className="px-4 py-2 rounded-lg glass-card-hover text-sm"
                >
                  ✏️ Quiz
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Quiz Results */}
      {recentQuizzes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">
            Recent <span className="text-primary">Quiz Results</span>
          </h2>
          <div className="glass-card p-6">
            <div className="space-y-4">
              {recentQuizzes.map((quiz, idx) => {
                const guide = allGuides.find(g => g.slug === quiz.guideSlug)
                const percentage = Math.round((quiz.score / quiz.totalQuestions) * 100)
                
                return (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-lg glass-card-hover">
                    <div>
                      <h4 className="font-semibold">{guide?.title || quiz.guideSlug}</h4>
                      <p className="text-sm text-gray-400">
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
                      <p className="text-sm text-gray-400">
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

