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
    <div className="container mx-auto px-4 pb-24 pt-16">
      <div className="mx-auto max-w-3xl">
        <div className="mb-16 text-center">
          <span className="mb-6 inline-block rounded-full border border-[color:var(--border-soft)] bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Settings
          </span>
          <h1 className="mb-6 text-4xl font-semibold text-[color:var(--text-primary)] md:text-5xl">
            Preferences & data
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[color:var(--text-secondary)]">
            Configure your study experience, manage learning data, and customize platform behavior.
          </p>
        </div>

        {/* Study Settings */}
        <div className="mb-8 rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-8 shadow-inner-sm">
          <h2 className="mb-6 text-2xl font-semibold text-primary">Study Preferences</h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">
                Flashcards Per Session
              </label>
              <input
                type="number"
                min="5"
                max="50"
                value={settings.flashcardsPerSession}
                onChange={(e) => updateSettings({ flashcardsPerSession: Number(e.target.value) })}
                className="w-full rounded-xl border border-[color:var(--border-soft)] bg-surface/80 px-4 py-2 text-[color:var(--text-primary)] transition-all focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                Number of flashcards to review in each session
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">
                Quiz Questions Per Session
              </label>
              <input
                type="number"
                min="5"
                max="30"
                value={settings.quizQuestionsPerSession}
                onChange={(e) => updateSettings({ quizQuestionsPerSession: Number(e.target.value) })}
                className="w-full rounded-xl border border-[color:var(--border-soft)] bg-surface/80 px-4 py-2 text-[color:var(--text-primary)] transition-all focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                Number of questions in each quiz
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[color:var(--text-primary)]">
                Daily Study Goal (minutes)
              </label>
              <input
                type="number"
                min="10"
                max="180"
                step="5"
                value={settings.studyGoalMinutes}
                onChange={(e) => updateSettings({ studyGoalMinutes: Number(e.target.value) })}
                className="w-full rounded-xl border border-[color:var(--border-soft)] bg-surface/80 px-4 py-2 text-[color:var(--text-primary)] transition-all focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
              <p className="mt-1 text-xs text-[color:var(--text-muted)]">
                Your daily study time target
              </p>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-4">
              <div>
                <div className="font-semibold text-[color:var(--text-primary)]">Study Reminders</div>
                <p className="text-xs text-[color:var(--text-muted)]">Get notified about due flashcards</p>
              </div>
              <button
                onClick={() => updateSettings({ reminderEnabled: !settings.reminderEnabled })}
                className={`rounded-xl px-4 py-2 transition-all ${
                  settings.reminderEnabled
                    ? 'bg-primary text-background'
                    : 'border border-[color:var(--border-soft)] bg-surface/60 text-[color:var(--text-muted)]'
                }`}
              >
                {settings.reminderEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-4">
              <div>
                <div className="font-semibold text-[color:var(--text-primary)]">Sound Effects</div>
                <p className="text-xs text-[color:var(--text-muted)]">Play sounds for correct answers</p>
              </div>
              <button
                onClick={() => updateSettings({ soundEnabled: !settings.soundEnabled })}
                className={`rounded-xl px-4 py-2 transition-all ${
                  settings.soundEnabled
                    ? 'bg-primary text-background'
                    : 'border border-[color:var(--border-soft)] bg-surface/60 text-[color:var(--text-muted)]'
                }`}
              >
                {settings.soundEnabled ? 'Enabled' : 'Disabled'}
              </button>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="mb-8 rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-8 shadow-inner-sm">
          <h2 className="mb-6 text-2xl font-semibold text-primary">Data Management</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-4">
              <div>
                <div className="font-semibold text-[color:var(--text-primary)]">Export Study Data</div>
                <p className="text-xs text-[color:var(--text-muted)]">Download your notes and progress</p>
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

            <div className="rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-red-400">Reset Flashcards</div>
                  <p className="text-xs text-[color:var(--text-muted)]">Clear all flashcard progress</p>
                </div>
                <button
                  onClick={handleResetFlashcards}
                  className="rounded-xl border border-red-500/30 bg-red-500/20 px-4 py-2 text-red-400 transition-all hover:bg-red-500/30"
                >
                  Reset
                </button>
              </div>
            </div>

            <div className="rounded-2xl border-2 border-red-500/30 bg-red-500/5 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-semibold text-red-400">Reset All Data</div>
                  <p className="text-xs text-[color:var(--text-muted)]">Clear all progress, notes, and quiz results</p>
                </div>
                <button
                  onClick={() => setShowReset(true)}
                  className="rounded-xl border border-red-500/30 bg-red-500/20 px-4 py-2 text-red-400 transition-all hover:bg-red-500/30"
                >
                  Reset All
                </button>
              </div>
            </div>
          </div>

          {showReset && (
            <div className="mt-6 rounded-2xl border-2 border-red-500 bg-red-500/10 p-4">
              <p className="mb-4 font-semibold text-red-400">
                ⚠️ This will permanently delete ALL your data. Are you absolutely sure?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleResetProgress}
                  className="rounded-xl bg-red-500 px-6 py-2 text-white transition-colors hover:bg-red-600"
                >
                  Yes, Delete Everything
                </button>
                <button
                  onClick={() => setShowReset(false)}
                  className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-6 py-2 text-[color:var(--text-primary)] transition-all hover:bg-surface-muted/60"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* About Astral Nexus */}
        <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-8 shadow-inner-sm">
          <h2 className="mb-4 text-2xl font-semibold text-primary">About Astral Nexus</h2>
          <p className="mb-4 text-[color:var(--text-secondary)]">
            Your comprehensive interactive learning platform with AI-powered study tools,
            spaced repetition flashcards, progress tracking, and more.
          </p>
          <div className="text-sm text-[color:var(--text-muted)]">
            <p>Version: 1.0.0</p>
            <p>Built with Next.js 15, React, and TypeScript</p>
          </div>
        </div>
      </div>
    </div>
  )
}

