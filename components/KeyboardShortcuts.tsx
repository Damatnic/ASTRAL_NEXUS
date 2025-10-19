'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Open shortcuts panel with ? key
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault()
          setIsOpen(true)
        }
      }

      // Close with Escape
      if (e.key === 'Escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  const shortcuts = [
    { key: '?', description: 'Show keyboard shortcuts' },
    { key: '/', description: 'Focus search bar' },
    { key: 'Esc', description: 'Close modals' },
    { key: 'Space', description: 'Flip flashcard (in flashcard mode)' },
    { key: '1-4', description: 'Rate flashcard (in flashcard mode)' },
    { key: 'Ctrl+K', description: 'Quick navigation' },
  ]

  return (
    <>
      {/* Keyboard Shortcuts Help Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 left-8 w-12 h-12 rounded-full glass-card-hover flex items-center justify-center z-40 group"
        title="Keyboard Shortcuts (?)"
      >
        <span className="text-xl group-hover:scale-110 transition-transform">⌨️</span>
      </button>

      {/* Shortcuts Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl glass-card border-2 border-primary/30 rounded-2xl shadow-glow-lg z-50 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">
                  Keyboard <span className="text-primary">Shortcuts</span>
                </h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                {shortcuts.map((shortcut, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-4 rounded-lg glass-card-hover"
                  >
                    <span className="text-gray-300">{shortcut.description}</span>
                    <kbd className="px-3 py-1 rounded-lg bg-white/10 border border-white/20 font-mono text-sm text-primary">
                      {shortcut.key}
                    </kbd>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center text-sm text-gray-400">
                Press <kbd className="px-2 py-1 rounded bg-white/10 font-mono text-xs">?</kbd> anytime to see this help
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

