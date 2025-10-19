'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface FeatureHighlightProps {
  feature: string
  title: string
  description: string
  tips: string[]
}

export default function FeatureHighlight({ feature, title, description, tips }: FeatureHighlightProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [dontShowAgain, setDontShowAgain] = useState(false)

  const handleClose = () => {
    if (dontShowAgain) {
      localStorage.setItem(`feature-${feature}-seen`, 'true')
    }
    setIsOpen(false)
  }

  // Auto-show on first use
  useEffect(() => {
    const featureSeen = localStorage.getItem(`feature-${feature}-seen`)
    if (!featureSeen) {
      setTimeout(() => setIsOpen(true), 500)
    }
  }, [feature])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-24 right-8 w-96 glass-card border-2 border-accent/30 rounded-xl shadow-glow-lg z-40 p-6"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-accent mb-2">{title}</h3>
              <p className="text-sm text-gray-300">{description}</p>
            </div>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-white transition-colors ml-2"
            >
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-2 mb-4">
            <p className="text-sm font-semibold text-primary">Quick Tips:</p>
            {tips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                <span className="text-accent">•</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-white/10">
            <label className="flex items-center gap-2 text-xs text-gray-400">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="rounded"
              />
              Don&apos;t show again
            </label>
            <button
              onClick={handleClose}
              className="px-4 py-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-all text-sm"
            >
              Got it!
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

