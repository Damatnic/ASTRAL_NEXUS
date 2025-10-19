/**
 * Experience Points (XP) and Leveling System
 * Gamifies learning progress with levels, rewards, and milestones
 */

import { db } from './db'

export interface XPEvent {
  id?: number
  type: 'guide_complete' | 'quiz_ace' | 'flashcard_streak' | 'note_created' | 'highlight_made' | 'daily_login' | 'achievement_unlocked'
  points: number
  guideSlug?: string
  description: string
  timestamp: Date
}

export interface UserLevel {
  level: number
  currentXP: number
  xpToNextLevel: number
  totalXP: number
  title: string
  perks: string[]
}

// XP required for each level (exponential curve)
function getXPRequiredForLevel(level: number): number {
  return Math.floor(100 * Math.pow(level, 1.5))
}

// Calculate level from total XP
export function calculateLevel(totalXP: number): UserLevel {
  let level = 1
  let xpRemaining = totalXP
  
  while (xpRemaining >= getXPRequiredForLevel(level)) {
    xpRemaining -= getXPRequiredForLevel(level)
    level++
  }
  
  return {
    level,
    currentXP: xpRemaining,
    xpToNextLevel: getXPRequiredForLevel(level),
    totalXP,
    title: getLevelTitle(level),
    perks: getLevelPerks(level)
  }
}

// Level titles for motivation
function getLevelTitle(level: number): string {
  if (level >= 50) return '🌟 Cosmic Master'
  if (level >= 40) return '⭐ Stellar Sage'
  if (level >= 30) return '💫 Galactic Scholar'
  if (level >= 25) return '🔮 Astral Expert'
  if (level >= 20) return '✨ Knowledge Seeker'
  if (level >= 15) return '🎓 Dedicated Student'
  if (level >= 10) return '📚 Avid Learner'
  if (level >= 5) return '🌱 Growing Mind'
  return '🌟 Novice Explorer'
}

// Perks unlocked at each level
function getLevelPerks(level: number): string[] {
  const perks: string[] = []
  
  if (level >= 5) perks.push('Daily note templates unlocked')
  if (level >= 10) perks.push('Advanced statistics dashboard')
  if (level >= 15) perks.push('Custom study plans')
  if (level >= 20) perks.push('Knowledge graph insights')
  if (level >= 25) perks.push('Export and sharing features')
  if (level >= 30) perks.push('AI chat history unlimited')
  if (level >= 40) perks.push('Master certification available')
  if (level >= 50) perks.push('Legendary status achieved')
  
  return perks
}

// XP rewards for different actions
export const XP_REWARDS = {
  GUIDE_STARTED: 5,
  GUIDE_50_PERCENT: 25,
  GUIDE_COMPLETED: 100,
  QUIZ_TAKEN: 10,
  QUIZ_80_PERCENT: 30,
  QUIZ_PERFECT: 50,
  FLASHCARD_REVIEWED: 2,
  FLASHCARD_STREAK_7: 50,
  FLASHCARD_STREAK_30: 200,
  NOTE_CREATED: 5,
  HIGHLIGHT_MADE: 2,
  DAILY_LOGIN: 5,
  WEEKLY_STREAK: 35,
  MONTHLY_STREAK: 150,
  ACHIEVEMENT_UNLOCKED: 25,
  FIRST_GUIDE: 50,
  ALL_GUIDES_STARTED: 200,
  ALL_GUIDES_COMPLETED: 1000,
} as const

// Award XP for action
export async function awardXP(
  type: XPEvent['type'],
  points: number,
  description: string,
  guideSlug?: string
): Promise<number> {
  // Save XP event
  await db.activityLog.add({
    type: 'guide', // Generic for now, could expand
    guideSlug,
    payload: {
      xpEvent: true,
      xpType: type,
      points,
      description
    },
    createdAt: new Date()
  })
  
  return points
}

interface XPPayload {
  xpEvent?: boolean
  xpType?: string
  points?: number
  description?: string
}

// Get user's current level and XP
export async function getUserLevel(): Promise<UserLevel> {
  const events = await db.activityLog
    .filter(log => log.payload && (log.payload as XPPayload).xpEvent === true)
    .toArray()
  
  const totalXP = events.reduce((sum, event) => {
    const payload = event.payload as XPPayload
    return sum + (payload.points || 0)
  }, 0)
  
  return calculateLevel(totalXP)
}

// Get recent XP events
export async function getRecentXPEvents(limit: number = 10): Promise<XPEvent[]> {
  const events = await db.activityLog
    .filter(log => log.payload && (log.payload as XPPayload).xpEvent === true)
    .reverse()
    .limit(limit)
    .toArray()
  
  return events.map(event => {
    const payload = event.payload as XPPayload
    return {
      type: payload.xpType as XPEvent['type'],
      points: payload.points || 0,
      description: payload.description || '',
      guideSlug: event.guideSlug,
      timestamp: event.createdAt
    }
  })
}

// Calculate progress to next level as percentage
export function getProgressToNextLevel(userLevel: UserLevel): number {
  return Math.floor((userLevel.currentXP / userLevel.xpToNextLevel) * 100)
}

// Get XP multipliers based on streaks
export function getXPMultiplier(streakDays: number): number {
  if (streakDays >= 30) return 2.0 // 100% bonus
  if (streakDays >= 14) return 1.5 // 50% bonus
  if (streakDays >= 7) return 1.25 // 25% bonus
  return 1.0 // No bonus
}

// Calculate XP for quiz based on performance
export function calculateQuizXP(score: number, total: number): number {
  const percentage = (score / total) * 100
  const baseXP = XP_REWARDS.QUIZ_TAKEN
  
  if (percentage === 100) return XP_REWARDS.QUIZ_PERFECT
  if (percentage >= 80) return XP_REWARDS.QUIZ_80_PERCENT
  return baseXP
}

// Check and award milestone XP
export async function checkMilestones(): Promise<XPEvent[]> {
  const awarded: XPEvent[] = []
  const progress = await db.userProgress.toArray()
  const completed = progress.filter(p => p.completed).length
  const started = progress.length
  
  // First guide milestone
  if (completed === 1) {
    await awardXP('guide_complete', XP_REWARDS.FIRST_GUIDE, 'Completed your first guide!')
    awarded.push({
      type: 'guide_complete',
      points: XP_REWARDS.FIRST_GUIDE,
      description: 'First Guide Completed',
      timestamp: new Date()
    })
  }
  
  // All guides started
  if (started >= 15) {
    await awardXP('guide_complete', XP_REWARDS.ALL_GUIDES_STARTED, 'Started all guides!')
    awarded.push({
      type: 'guide_complete',
      points: XP_REWARDS.ALL_GUIDES_STARTED,
      description: 'All Guides Started',
      timestamp: new Date()
    })
  }
  
  // All guides completed
  if (completed >= 15) {
    await awardXP('guide_complete', XP_REWARDS.ALL_GUIDES_COMPLETED, 'Completed all guides! Legendary!')
    awarded.push({
      type: 'guide_complete',
      points: XP_REWARDS.ALL_GUIDES_COMPLETED,
      description: 'All Guides Mastered',
      timestamp: new Date()
    })
  }
  
  return awarded
}

// Get leaderboard position (for self-tracking over time)
export async function getPersonalLeaderboard(): Promise<{
  allTime: XPEvent[]
  thisWeek: XPEvent[]
  thisMonth: XPEvent[]
}> {
  const now = new Date()
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
  
  const allEvents = await db.activityLog
    .filter(log => log.payload && (log.payload as XPPayload).xpEvent === true)
    .toArray()
  
  const thisWeek = allEvents.filter(e => e.createdAt >= weekAgo)
  const thisMonth = allEvents.filter(e => e.createdAt >= monthAgo)
  
  const toXPEvent = (event: typeof allEvents[0]): XPEvent => {
    const payload = event.payload as XPPayload
    return {
      type: payload.xpType as XPEvent['type'],
      points: payload.points || 0,
      description: payload.description || '',
      guideSlug: event.guideSlug,
      timestamp: event.createdAt
    }
  }
  
  return {
    allTime: allEvents.map(toXPEvent),
    thisWeek: thisWeek.map(toXPEvent),
    thisMonth: thisMonth.map(toXPEvent)
  }
}

// Daily login bonus
export async function checkDailyLogin(): Promise<number> {
  const today = new Date().toDateString()
  const lastLogin = localStorage.getItem('lastLoginDate')
  
  if (lastLogin !== today) {
    localStorage.setItem('lastLoginDate', today)
    await awardXP('daily_login', XP_REWARDS.DAILY_LOGIN, 'Daily login bonus')
    return XP_REWARDS.DAILY_LOGIN
  }
  
  return 0
}
