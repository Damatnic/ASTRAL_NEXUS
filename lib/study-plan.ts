/**
 * Study Plan Generator
 * Creates personalized study schedules based on guide content and user goals
 */

import { Guide } from './guides'

export interface StudyPlanDay {
  day: number
  date: Date
  tasks: {
    type: 'read' | 'flashcards' | 'quiz' | 'review'
    title: string
    duration: number // minutes
    section?: string
  }[]
  totalMinutes: number
}

export interface StudyPlan {
  guide: Guide
  totalDays: number
  dailyMinutes: number
  days: StudyPlanDay[]
  goals: string[]
}

export function generateStudyPlan(
  guide: Guide,
  targetDays: number = 7,
  dailyMinutes: number = 30
): StudyPlan {
  const days: StudyPlanDay[] = []
  
  // Calculate sections
  const sections = extractSections(guide.content)
  const sectionsPerDay = Math.ceil(sections.length / targetDays)

  for (let day = 1; day <= targetDays; day++) {
    const date = new Date()
    date.setDate(date.getDate() + (day - 1))

    const dayTasks = []
    const dayMinutes = dailyMinutes

    if (day <= Math.ceil(targetDays * 0.7)) {
      // Reading phase
      const sectionStart = (day - 1) * sectionsPerDay
      const sectionEnd = Math.min(sectionStart + sectionsPerDay, sections.length)
      const todaySections = sections.slice(sectionStart, sectionEnd)

      dayTasks.push({
        type: 'read' as const,
        title: `Read: ${todaySections.join(', ')}`,
        duration: Math.floor(dayMinutes * 0.7),
        section: todaySections.join(', '),
      })

      dayTasks.push({
        type: 'flashcards' as const,
        title: 'Review flashcards for today\'s sections',
        duration: Math.floor(dayMinutes * 0.3),
      })
    } else {
      // Review and testing phase
      if (day % 2 === 0) {
        dayTasks.push({
          type: 'quiz' as const,
          title: 'Take practice quiz',
          duration: Math.floor(dayMinutes * 0.6),
        })
        dayTasks.push({
          type: 'review' as const,
          title: 'Review incorrect answers',
          duration: Math.floor(dayMinutes * 0.4),
        })
      } else {
        dayTasks.push({
          type: 'flashcards' as const,
          title: 'Comprehensive flashcard review',
          duration: dayMinutes,
        })
      }
    }

    days.push({
      day,
      date,
      tasks: dayTasks,
      totalMinutes: dayTasks.reduce((sum, task) => sum + task.duration, 0),
    })
  }

  return {
    guide,
    totalDays: targetDays,
    dailyMinutes,
    days,
    goals: [
      `Complete reading ${guide.title} in ${targetDays} days`,
      `Master key concepts through flashcards`,
      `Achieve 80%+ on final quiz`,
      `Take comprehensive notes`,
    ],
  }
}

function extractSections(content: string): string[] {
  const headingRegex = /^##\s+(.+)$/gm
  const sections: string[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    sections.push(match[1].trim())
  }

  return sections.filter(s => 
    !s.toLowerCase().includes('table of contents') &&
    !s.toLowerCase().includes('conclusion') &&
    s.length < 80
  )
}

