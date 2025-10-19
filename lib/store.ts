/**
 * Zustand Store for Global State Management
 * Manages UI state, study mode, and real-time updates
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface StudySettings {
  flashcardsPerSession: number
  quizQuestionsPerSession: number
  studyGoalMinutes: number
  reminderEnabled: boolean
  soundEnabled: boolean
}

interface AstralStore {
  // Study Mode
  studyMode: 'read' | 'flashcards' | 'quiz' | 'notes'
  setStudyMode: (mode: 'read' | 'flashcards' | 'quiz' | 'notes') => void

  // Settings
  settings: StudySettings
  updateSettings: (settings: Partial<StudySettings>) => void

  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  helperOpen: boolean
  setHelperOpen: (open: boolean) => void

  // Current Study Session
  currentSessionStart: Date | null
  startSession: (guideSlug: string) => void
  endSession: () => void
  
  // Daily Goal
  dailyGoalMinutes: number
  minutesStudiedToday: number
  addStudyTime: (minutes: number) => void
  resetDailyProgress: () => void
}

export const useAstralStore = create<AstralStore>()(
  persist(
    (set) => ({
      // Study Mode
      studyMode: 'read',
      setStudyMode: (mode) => set({ studyMode: mode }),

      // Settings
      settings: {
        flashcardsPerSession: 20,
        quizQuestionsPerSession: 10,
        studyGoalMinutes: 30,
        reminderEnabled: true,
        soundEnabled: true,
      },
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),

      // UI State
      sidebarOpen: true,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      helperOpen: false,
      setHelperOpen: (open) => set({ helperOpen: open }),

      // Study Session
      currentSessionStart: null,
      startSession: () => set({ currentSessionStart: new Date() }),
      endSession: () => set({ currentSessionStart: null }),

      // Daily Goal
      dailyGoalMinutes: 30,
      minutesStudiedToday: 0,
      addStudyTime: (minutes) =>
        set((state) => ({
          minutesStudiedToday: state.minutesStudiedToday + minutes,
        })),
      resetDailyProgress: () => set({ minutesStudiedToday: 0 }),
    }),
    {
      name: 'astral-nexus-store',
      partialize: (state) => ({
        settings: state.settings,
        dailyGoalMinutes: state.dailyGoalMinutes,
        minutesStudiedToday: state.minutesStudiedToday,
      }),
    }
  )
)

