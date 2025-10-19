'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import GuideReadView from './GuideReadView'
import FlashcardStudy from './FlashcardStudy'
import QuizMode from './QuizMode'
import NoteTaking from './NoteTaking'
import QuickReference from './QuickReference'
import { Guide } from '@/lib/guides'

interface StudyModeSwitcherProps {
  guide: Guide
}

type StudyMode = 'read' | 'flashcards' | 'quiz' | 'notes' | 'quick-ref'

export default function StudyModeSwitcher({ guide }: StudyModeSwitcherProps) {
  const [mode, setMode] = useState<StudyMode>('read')

  const modes = [
    { id: 'read', label: 'Read', icon: '📖', description: 'Study the full guide' },
    { id: 'flashcards', label: 'Flashcards', icon: '🎴', description: 'Review with flashcards' },
    { id: 'quiz', label: 'Quiz', icon: '✏️', description: 'Test your knowledge' },
    { id: 'notes', label: 'Notes', icon: '📝', description: 'Take notes & highlights' },
    { id: 'quick-ref', label: 'Quick Ref', icon: '⚡', description: 'Cheat sheets' },
  ]

  const guideSections = guide.content.match(/^##\s+(.+)$/gm)?.map(h => h.replace(/^##\s+/, '')) || []

  return (
    <div>
      {/* Mode Selector */}
      <div className="sticky top-20 z-30 bg-astral-dark/95 backdrop-blur-md border-b border-white/10 -mx-4 px-4 py-4 mb-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id as StudyMode)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg whitespace-nowrap transition-all ${
                mode === m.id
                  ? 'bg-primary text-astral-dark font-bold shadow-glow-md'
                  : 'glass-card-hover text-gray-300'
              }`}
              title={m.description}
            >
              <span className="text-xl">{m.icon}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Mode Content */}
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {mode === 'read' && (
          <GuideReadView guide={guide} />
        )}

        {mode === 'flashcards' && <FlashcardStudy guideSlug={guide.slug} />}

        {mode === 'quiz' && <QuizMode guide={guide} questionCount={10} />}

        {mode === 'notes' && <NoteTaking guideSlug={guide.slug} guideSections={guideSections} />}

        {mode === 'quick-ref' && <QuickReference guide={guide} />}
      </motion.div>

      {/* Tips based on mode */}
      <div className="mt-8 glass-card p-6 border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <h4 className="font-semibold text-primary mb-2">Study Tip</h4>
            <p className="text-sm text-gray-300">
              {mode === 'read' && 'Take your time and highlight important concepts. Use the AI chat for questions!'}
              {mode === 'flashcards' && 'Be honest with your ratings. The spaced repetition system works best when you accurately assess your recall.'}
              {mode === 'quiz' && 'Try without looking at the guide first. Review incorrect answers carefully.'}
              {mode === 'notes' && 'Highlight text by selecting it, then add your thoughts. Organize with tags!'}
              {mode === 'quick-ref' && 'Print these reference cards for quick review anytime. Perfect for last-minute refreshers!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

