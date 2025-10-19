/**
 * Achievement and Badge System
 * Gamification to encourage learning
 */

export interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  category: 'learning' | 'mastery' | 'consistency' | 'social'
  requirement: {
    type: 'guides_completed' | 'quiz_score' | 'flashcards_reviewed' | 'notes_created' | 'study_streak' | 'total_time'
    value: number
  }
  unlocked: boolean
  unlockedDate?: Date
  rarity: 'common' | 'rare' | 'epic' | 'legendary'
}

export const allAchievements: Omit<Achievement, 'unlocked' | 'unlockedDate'>[] = [
  // Learning Achievements
  {
    id: 'first-guide',
    title: 'First Steps',
    description: 'Complete your first guide',
    icon: '📖',
    category: 'learning',
    requirement: { type: 'guides_completed', value: 1 },
    rarity: 'common',
  },
  {
    id: 'guide-master',
    title: 'Knowledge Seeker',
    description: 'Complete all guides',
    icon: '🎓',
    category: 'learning',
    requirement: { type: 'guides_completed', value: 5 },
    rarity: 'legendary',
  },
  
  // Mastery Achievements
  {
    id: 'quiz-ace',
    title: 'Quiz Ace',
    description: 'Score 100% on any quiz',
    icon: '💯',
    category: 'mastery',
    requirement: { type: 'quiz_score', value: 100 },
    rarity: 'rare',
  },
  {
    id: 'quiz-master',
    title: 'Quiz Master',
    description: 'Score 90%+ on 10 quizzes',
    icon: '🏆',
    category: 'mastery',
    requirement: { type: 'quiz_score', value: 90 },
    rarity: 'epic',
  },
  
  // Consistency Achievements
  {
    id: 'week-streak',
    title: 'Week Warrior',
    description: 'Study 7 days in a row',
    icon: '🔥',
    category: 'consistency',
    requirement: { type: 'study_streak', value: 7 },
    rarity: 'common',
  },
  {
    id: 'month-streak',
    title: 'Monthly Master',
    description: 'Study 30 days in a row',
    icon: '⚡',
    category: 'consistency',
    requirement: { type: 'study_streak', value: 30 },
    rarity: 'epic',
  },
  {
    id: 'hundred-days',
    title: 'Centurion',
    description: 'Study 100 days in a row',
    icon: '👑',
    category: 'consistency',
    requirement: { type: 'study_streak', value: 100 },
    rarity: 'legendary',
  },
  
  // Flashcard Achievements
  {
    id: 'flashcard-novice',
    title: 'Card Collector',
    description: 'Review 50 flashcards',
    icon: '🎴',
    category: 'learning',
    requirement: { type: 'flashcards_reviewed', value: 50 },
    rarity: 'common',
  },
  {
    id: 'flashcard-expert',
    title: 'Memory Master',
    description: 'Review 500 flashcards',
    icon: '🧠',
    category: 'mastery',
    requirement: { type: 'flashcards_reviewed', value: 500 },
    rarity: 'epic',
  },
  
  // Note Taking
  {
    id: 'note-taker',
    title: 'Note Taker',
    description: 'Create 25 notes',
    icon: '📝',
    category: 'learning',
    requirement: { type: 'notes_created', value: 25 },
    rarity: 'common',
  },
  {
    id: 'prolific-writer',
    title: 'Prolific Scholar',
    description: 'Create 100 notes',
    icon: '✍️',
    category: 'mastery',
    requirement: { type: 'notes_created', value: 100 },
    rarity: 'rare',
  },
  
  // Time Achievements
  {
    id: 'ten-hours',
    title: 'Dedicated Learner',
    description: 'Study for 10 hours total',
    icon: '⏰',
    category: 'learning',
    requirement: { type: 'total_time', value: 600 }, // minutes
    rarity: 'common',
  },
  {
    id: 'hundred-hours',
    title: 'Time Investment',
    description: 'Study for 100 hours total',
    icon: '⌛',
    category: 'mastery',
    requirement: { type: 'total_time', value: 6000 },
    rarity: 'legendary',
  },
]

export async function checkAndUnlockAchievements(userStats: {
  guidesCompleted: number
  highestQuizScore: number
  quizScoresOver90: number
  flashcardsReviewed: number
  notesCreated: number
  studyStreak: number
  totalTimeMinutes: number
}): Promise<Achievement[]> {
  const unlockedAchievements: Achievement[] = []

  for (const achievement of allAchievements) {
    let isUnlocked = false

    switch (achievement.requirement.type) {
      case 'guides_completed':
        isUnlocked = userStats.guidesCompleted >= achievement.requirement.value
        break
      case 'quiz_score':
        if (achievement.id === 'quiz-master') {
          isUnlocked = userStats.quizScoresOver90 >= 10
        } else {
          isUnlocked = userStats.highestQuizScore >= achievement.requirement.value
        }
        break
      case 'flashcards_reviewed':
        isUnlocked = userStats.flashcardsReviewed >= achievement.requirement.value
        break
      case 'notes_created':
        isUnlocked = userStats.notesCreated >= achievement.requirement.value
        break
      case 'study_streak':
        isUnlocked = userStats.studyStreak >= achievement.requirement.value
        break
      case 'total_time':
        isUnlocked = userStats.totalTimeMinutes >= achievement.requirement.value
        break
    }

    if (isUnlocked) {
      unlockedAchievements.push({
        ...achievement,
        unlocked: true,
        unlockedDate: new Date(),
      })
    }
  }

  return unlockedAchievements
}

export function getRarityColor(rarity: string): string {
  switch (rarity) {
    case 'common': return 'text-gray-400'
    case 'rare': return 'text-blue-400'
    case 'epic': return 'text-purple-400'
    case 'legendary': return 'text-yellow-400'
    default: return 'text-gray-400'
  }
}

export function getRarityGlow(rarity: string): string {
  switch (rarity) {
    case 'common': return 'shadow-glow-sm'
    case 'rare': return 'shadow-[0_0_20px_rgba(59,130,246,0.5)]'
    case 'epic': return 'shadow-[0_0_20px_rgba(168,85,247,0.5)]'
    case 'legendary': return 'shadow-[0_0_30px_rgba(234,179,8,0.6)]'
    default: return ''
  }
}

