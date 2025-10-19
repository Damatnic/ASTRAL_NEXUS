'use client'

import { useState } from 'react'
import { useAstralStore } from '@/lib/store'
import { db } from '@/lib/db'

export default function SettingsPage() {
  const { settings, updateSettings } = useAstralStore()
  const [showReset, setShowReset] = useState(false)

  const handleResetProgress = async () => {
    if (confirm('Are you sure you want to reset ALL progress? This cannot be undone.')) {
      await db.userProgress.clear()
      await db.userNotes.clear()
      await db.flashcards.clear()
      await db.quizResults.clear()
      await db.studySessions.clear()
      alert('All progress has been reset.')
      window.location.href = '/'
    }
  }

  const handleResetFlashcards = async () => {
    if (confirm('Reset all flashcard progress? You\'ll need to review them again.')) {
      await db.flashcards.clear()
      alert('Flashcards have been reset.')
      window.location.reload()
    }
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">
          <span className="neon-text">Settings</span>
        </h1>

        {/* Study Settings */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-primary">Study Preferences</h2>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Flashcards Per Session
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={settings.flashcardsPerSession}
                onChange={(e) => updateSettings({ flashcardsPerSession: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg glass-card text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Number of flashcards to review in each session
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Quiz Questions Per Session
              </label>
              <input
                type="number"
                min="5"
                max="30"
                value={settings.quizQuestionsPerSession}
                onChange={(e) => updateSettings({ quizQuestionsPerSession: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg glass-card text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Number of questions in each quiz
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Daily Study Goal (minutes)
              </label>
              <input
                type="number"
                min="10"
                max="180"
                step="5"
                value={settings.studyGoalMinutes}
                onChange={(e) => updateSettings({ studyGoalMinutes: Number(e.target.value) })}
                className="w-full px-4 py-2 rounded-lg glass-card text-white focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <p className="text-xs text-gray-500 mt-1">
                Your daily study time target
              </p>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Study Reminders</div>
                <p className="text-xs text-gray-500">Get notified about due flashcards</p>
              </div>
              <button
                onClick={() => updateSettings({ reminderEnabled: !settings.reminderEnabled })}
                className={`px-4 py-2 rounded-lg transition-all ${
                  settings.reminderEnabled
                    ? 'bg-primary text-astral-dark'
                    : 'glass-card text-gray-400'
                }`}
              >
                {settings.reminderEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">Sound Effects</div>
                <p className="text-xs text-gray-500">Play sounds for correct answers</p>
              </div>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`px-4 py-2 rounded-lg transition-all ${
                  settings.soundEnabled
                    ? 'bg-primary text-astral-dark'
                    : 'glass-card text-gray-400'
                }`}
              >
                {settings.soundEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="glass-card p-8 mb-6">
          <h2 className="text-2xl font-bold mb-6 text-primary">Data Management</h2>

          <div className="space-y-4">
            <div className="p-4 rounded-lg glass-card">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold">Export Study Data</div>
                  <p className="text-xs text-gray-500">Download your notes and progress</p>
                </div>
                <button
                  onClick={async () => {
                    const notes = await db.userNotes.toArray()
                    const progress = await db.userProgress.toArray()
                    const data = { notes, progress, exportedAt: new Date() }
                    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
                    const url = URL.createObjectURL(blob)
                    const a = document.createElement('a')
                    a.href = url
                    a.download = `astral-nexus-backup-${new Date().toISOString().split('T')[0]}.json`
                    a.click()
                  }}
                  className="btn-secondary"
                >
                  Export
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg glass-card border-2 border-red-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-red-400">Reset Flashcards</div>
                  <p className="text-xs text-gray-500">Clear all flashcard progress</p>
                </div>
                <button
                  onClick={handleResetFlashcards}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="p-4 rounded-lg glass-card border-2 border-red-500/30">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-red-400">Reset All Data</div>
                  <p className="text-xs text-gray-500">Clear all progress, notes, and quiz results</p>
                </div>
                <button
                  onClick={() => setShowReset(true)}
                  className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30 transition-all"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>

          {showReset && (
            <div className="mt-6 p-4 bg-red-500/10 border-2 border-red-500 rounded-lg">
              <p className="text-red-400 font-semibold mb-4">
                ⚠️ This will permanently delete ALL your data. Are you absolutely sure?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleResetProgress}
                  className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Yes, Delete Everything
                </button>
                <button
                  onClick={() => setShowReset(false)}
                  className="px-6 py-2 glass-card rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* About Astral Nexus */}
        <div className="glass-card p-8">
          <h2 className="text-2xl font-bold mb-4 text-primary">About Astral Nexus</h2>
          <p className="text-gray-300 mb-4">
            Your comprehensive interactive learning platform with AI-powered study tools,
            spaced repetition flashcards, progress tracking, and more.
          </p>
          <div className="text-sm text-gray-400">
            <p>Version: 1.0.0</p>
            <p>Built with Next.js 15, React, and TypeScript</p>
          </div>
        </div>
      </div>
    </div>
  )
}

