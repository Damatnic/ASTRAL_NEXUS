import { db, UserProgress, QuizResult } from './db'

export interface StudyInsightSummary {
  streakDays: number
  longestStreak: number
  totalMinutes: number
  averageMinutesPerDay: number
  categoryMastery: { category: string; completion: number }[]
  recommendedGuides: { slug: string; title: string; reason: string }[]
  reviewQueueCount: number
  recentActivity: InsightActivity[]
}

export type InsightActivity =
  | { type: 'flashcards'; guideSlug: string; count: number; timestamp: Date }
  | { type: 'quiz'; guideSlug: string; score: number; total: number; timestamp: Date }
  | { type: 'guide'; guideSlug: string; progress: number; timestamp: Date }

export async function getStudyInsights(allGuides: { slug: string; title: string; category: string }[]): Promise<StudyInsightSummary> {
  const [progress, quizzes, flashcardsDue] = await Promise.all([
    db.userProgress.toArray(),
    db.quizResults.orderBy('completedAt').reverse().limit(20).toArray(),
    db.flashcards.where('nextReview').belowOrEqual(new Date()).toArray(),
  ])

  const streakInfo = await getStreakInfo()
  const totalMinutes = progress.reduce((sum, record) => sum + record.timeSpent, 0)

  const categoryMastery = calculateCategoryMastery(progress, allGuides)
  const recommendedGuides = computeRecommendations(progress, allGuides)
  const recentActivity = buildRecentActivity(progress, quizzes)

  return {
    streakDays: streakInfo.currentStreak,
    longestStreak: streakInfo.longestStreak,
    totalMinutes,
    averageMinutesPerDay: streakInfo.uniqueDays > 0 ? Math.round(totalMinutes / streakInfo.uniqueDays) : totalMinutes,
    categoryMastery,
    recommendedGuides,
    reviewQueueCount: flashcardsDue.length,
    recentActivity,
  }
}

async function getStreakInfo(): Promise<{ currentStreak: number; longestStreak: number; uniqueDays: number }> {
  const sessions = await db.studySessions.orderBy('startTime').reverse().limit(120).toArray()
  if (sessions.length === 0) {
    return { currentStreak: 0, longestStreak: 0, uniqueDays: 0 }
  }

  const uniqueDates = Array.from(new Set(sessions.map((session) => toDateString(session.startTime))))
  uniqueDates.sort()

  let currentStreak = 0
  let longestStreak = 0
  let previousDate: Date | null = null

  uniqueDates.forEach((dateStr) => {
    const date = new Date(dateStr)
    if (!previousDate) {
      currentStreak = 1
      longestStreak = 1
      previousDate = date
      return
    }

    const diff = (date.getTime() - previousDate.getTime()) / (1000 * 60 * 60 * 24)
    if (diff === 1) {
      currentStreak += 1
    } else if (diff > 1) {
      currentStreak = 1
    }
    longestStreak = Math.max(longestStreak, currentStreak)
    previousDate = date
  })

  return { currentStreak, longestStreak, uniqueDays: uniqueDates.length }
}

function calculateCategoryMastery(progress: UserProgress[], guides: { slug: string; title: string; category: string }[]) {
  const byCategory: Record<string, { total: number; count: number }> = {}
  progress.forEach((record) => {
    const guide = guides.find((g) => g.slug === record.guideSlug)
    if (!guide) return
    if (!byCategory[guide.category]) {
      byCategory[guide.category] = { total: 0, count: 0 }
    }
    byCategory[guide.category].total += record.progress
    byCategory[guide.category].count += 1
  })

  return Object.entries(byCategory)
    .map(([category, data]) => ({
      category,
      completion: Math.round(data.total / data.count || 0),
    }))
    .sort((a, b) => b.completion - a.completion)
}

function computeRecommendations(progress: UserProgress[], guides: { slug: string; title: string; category: string }[]) {
  const inProgress = guides
    .map((guide) => ({
      guide,
      status: progress.find((p) => p.guideSlug === guide.slug),
    }))
    .filter(({ status }) => status && status.progress > 0 && status.progress < 80)
    .sort((a, b) => a.status!.progress - b.status!.progress)

  const untouched = guides
    .filter((guide) => !progress.find((p) => p.guideSlug === guide.slug))
    .slice(0, 3)

  const recommendations = []
  if (inProgress.length > 0) {
    recommendations.push({
      slug: inProgress[0].guide.slug,
      title: inProgress[0].guide.title,
      reason: `Pick up where you left off (${Math.round(inProgress[0].status!.progress)}% complete)`
    })
  }
  untouched.forEach((guide) => {
    recommendations.push({
      slug: guide.slug,
      title: guide.title,
      reason: `New topic: explore ${guide.category}`,
    })
  })

  return recommendations.slice(0, 3)
}

function buildRecentActivity(progress: UserProgress[], quizzes: QuizResult[]): InsightActivity[] {
  const activity: InsightActivity[] = []

  progress.forEach((record) => {
    if (!record.lastRead) return
    activity.push({
      type: 'guide',
      guideSlug: record.guideSlug,
      progress: record.progress,
      timestamp: record.lastRead,
    })
  })

  quizzes.forEach((quiz) => {
    activity.push({
      type: 'quiz',
      guideSlug: quiz.guideSlug,
      score: quiz.score,
      total: quiz.totalQuestions,
      timestamp: quiz.completedAt,
    })
  })

  activity.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
  return activity.slice(0, 12)
}

function toDateString(date: Date | string) {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toISOString().split('T')[0]
}


