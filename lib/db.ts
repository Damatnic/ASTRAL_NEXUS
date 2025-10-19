/**
 * Local Database using Dexie (IndexedDB wrapper)
 * Stores user progress, notes, flashcards, and quiz results locally
 */

import Dexie, { Table } from 'dexie'

export interface UserProgress {
  id?: number
  guideSlug: string
  progress: number // 0-100
  lastRead: Date
  completed: boolean
  timeSpent: number // in minutes
}

export interface UserNote {
  id?: number
  guideSlug: string
  content: string
  highlight?: string
  section?: string
  createdAt: Date
  updatedAt: Date
  tags: string[]
}

export interface Flashcard {
  id?: number
  guideSlug: string
  question: string
  answer: string
  section: string
  difficulty: 'easy' | 'medium' | 'hard'
  nextReview: Date
  interval: number // days until next review
  easeFactor: number // spaced repetition factor
  repetitions: number
  lastReviewed?: Date
}

export interface QuizResult {
  id?: number
  guideSlug: string
  score: number
  totalQuestions: number
  completedAt: Date
  timeSpent: number
  answers: {
    question: string
    userAnswer: string
    correctAnswer: string
    isCorrect: boolean
  }[]
}

export interface StudySession {
  id?: number
  guideSlug: string
  startTime: Date
  endTime?: Date
  duration: number // minutes
  sections: string[]
}

export interface Highlight {
  id?: number
  guideSlug: string
  text: string
  color: 'yellow' | 'green' | 'pink'
  headingId?: string
  createdAt: Date
}

export interface ReadingProgressRow {
  id?: number
  guideSlug: string
  lastHeadingId?: string
  lastScrollY?: number
  updatedAt: Date
}

export interface ActivityLogRow {
  id?: number
  type: 'note' | 'quiz' | 'flashcards' | 'highlight' | 'guide'
  guideSlug?: string
  payload?: any
  createdAt: Date
}

export interface AIConversationMessage {
  role: 'user' | 'assistant' | 'system'
  content: string
  createdAt: Date
}

export interface AIConversation {
  id?: number
  guideSlug?: string | null
  title: string
  messages: AIConversationMessage[]
  createdAt: Date
  updatedAt: Date
}

class AstralNexusDB extends Dexie {
  userProgress!: Table<UserProgress>
  userNotes!: Table<UserNote>
  flashcards!: Table<Flashcard>
  quizResults!: Table<QuizResult>
  studySessions!: Table<StudySession>
  highlights!: Table<Highlight>
  readingProgress!: Table<ReadingProgressRow>
  activityLog!: Table<ActivityLogRow>
  aiConversations!: Table<AIConversation>

  constructor() {
    super('AstralNexusDB')
    this.version(1).stores({
      userProgress: '++id, guideSlug, lastRead, completed',
      userNotes: '++id, guideSlug, createdAt, [guideSlug+section]',
      flashcards: '++id, guideSlug, nextReview, [guideSlug+section]',
      quizResults: '++id, guideSlug, completedAt',
      studySessions: '++id, guideSlug, startTime',
    })
    this.version(2).stores({
      userProgress: '++id, guideSlug, lastRead, completed',
      userNotes: '++id, guideSlug, createdAt, [guideSlug+section]',
      flashcards: '++id, guideSlug, nextReview, [guideSlug+section]',
      quizResults: '++id, guideSlug, completedAt',
      studySessions: '++id, guideSlug, startTime',
      highlights: '++id, guideSlug, createdAt, [guideSlug+headingId]',
      readingProgress: '++id, guideSlug, updatedAt',
      activityLog: '++id, type, guideSlug, createdAt',
    })
    this.version(3).stores({
      userProgress: '++id, guideSlug, lastRead, completed',
      userNotes: '++id, guideSlug, createdAt, [guideSlug+section]',
      flashcards: '++id, guideSlug, nextReview, [guideSlug+section]',
      quizResults: '++id, guideSlug, completedAt',
      studySessions: '++id, guideSlug, startTime',
      highlights: '++id, guideSlug, createdAt, [guideSlug+headingId]',
      readingProgress: '++id, guideSlug, updatedAt',
      activityLog: '++id, type, guideSlug, createdAt',
      aiConversations: '++id, guideSlug, updatedAt',
    })
  }
}

export const db = new AstralNexusDB()

// Utility functions
export async function getGuideProgress(guideSlug: string): Promise<UserProgress | undefined> {
  return await db.userProgress.where('guideSlug').equals(guideSlug).first()
}

export async function updateGuideProgress(guideSlug: string, progress: number, timeSpent: number = 0) {
  const existing = await getGuideProgress(guideSlug)
  
  if (existing) {
    await db.userProgress.update(existing.id!, {
      progress,
      lastRead: new Date(),
      timeSpent: existing.timeSpent + timeSpent,
      completed: progress >= 100,
    })
  } else {
    await db.userProgress.add({
      guideSlug,
      progress,
      lastRead: new Date(),
      completed: progress >= 100,
      timeSpent,
    })
  }
}

export async function getGuideNotes(guideSlug: string): Promise<UserNote[]> {
  return await db.userNotes.where('guideSlug').equals(guideSlug).toArray()
}

export async function addNote(note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'>) {
  return await db.userNotes.add({
    ...note,
    createdAt: new Date(),
    updatedAt: new Date(),
  })
}

export async function getFlashcardsForReview(guideSlug?: string): Promise<Flashcard[]> {
  const now = new Date()
  let query = db.flashcards.where('nextReview').belowOrEqual(now)
  
  if (guideSlug) {
    const all = await query.toArray()
    return all.filter(card => card.guideSlug === guideSlug)
  }
  
  return await query.toArray()
}

export async function updateFlashcardReview(
  cardId: number,
  quality: number // 0-5 (0=complete blackout, 5=perfect recall)
) {
  const card = await db.flashcards.get(cardId)
  if (!card) return

  let { interval, easeFactor, repetitions } = card

  // SM-2 Algorithm (Spaced Repetition)
  if (quality >= 3) {
    if (repetitions === 0) {
      interval = 1
    } else if (repetitions === 1) {
      interval = 6
    } else {
      interval = Math.round(interval * easeFactor)
    }
    repetitions += 1
  } else {
    repetitions = 0
    interval = 1
  }

  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  if (easeFactor < 1.3) easeFactor = 1.3

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + interval)

  await db.flashcards.update(cardId, {
    interval,
    easeFactor,
    repetitions,
    nextReview,
    lastReviewed: new Date(),
  })
}

export async function getAllProgress(): Promise<UserProgress[]> {
  return await db.userProgress.toArray()
}

export async function getOverallStats() {
  const allProgress = await getAllProgress()
  const totalGuides = allProgress.length
  const completedGuides = allProgress.filter(p => p.completed).length
  const totalTimeSpent = allProgress.reduce((sum, p) => sum + p.timeSpent, 0)
  
  return {
    totalGuides,
    completedGuides,
    totalTimeSpent,
    completionRate: totalGuides > 0 ? (completedGuides / totalGuides) * 100 : 0,
  }
}

