/**
 * Study Streak Tracking
 * Encourages consistent daily study
 */

export interface StreakData {
  current: number
  longest: number
  lastStudyDate: string // ISO date
  studyDates: string[] // Array of ISO dates
}

export function getToday(): string {
  return new Date().toISOString().split('T')[0]
}

export function getStreakData(): StreakData {
  const stored = localStorage.getItem('study-streak')
  if (stored) {
    return JSON.parse(stored)
  }
  return {
    current: 0,
    longest: 0,
    lastStudyDate: '',
    studyDates: [],
  }
}

export function updateStreak(): StreakData {
  const data = getStreakData()
  const today = getToday()

  // Already studied today
  if (data.lastStudyDate === today) {
    return data
  }

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = yesterday.toISOString().split('T')[0]

  // Continuing streak
  if (data.lastStudyDate === yesterdayStr) {
    data.current += 1
    data.longest = Math.max(data.longest, data.current)
  }
  // Starting new streak
  else {
    data.current = 1
  }

  data.lastStudyDate = today
  data.studyDates.push(today)

  localStorage.setItem('study-streak', JSON.stringify(data))
  return data
}

export function getStreakStatus(): {
  current: number
  longest: number
  isToday: boolean
  message: string
} {
  const data = getStreakData()
  const today = getToday()
  const isToday = data.lastStudyDate === today

  let message = ''
  if (isToday) {
    if (data.current === 1) {
      message = 'Great start! Come back tomorrow to build a streak!'
    } else if (data.current < 7) {
      message = `${data.current} days strong! Keep it up!`
    } else if (data.current < 30) {
      message = `Amazing ${data.current}-day streak! You're crushing it!`
    } else {
      message = `Incredible ${data.current}-day streak! You're a learning machine!`
    }
  } else {
    message = "Haven't studied today yet. Start now to maintain your streak!"
  }

  return {
    current: data.current,
    longest: data.longest,
    isToday,
    message,
  }
}

