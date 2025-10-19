'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'

interface AstralHelperProps {
  currentGuideSlug: string
  relatedGuides: { title: string; slug: string }[]
}

export default function AstralHelper({ relatedGuides }: AstralHelperProps) {
  const [isOpen, setIsOpen] = useState(false)

  const quickHelp = [
    'How do I navigate this guide?',
    'What are related topics?',
    'Show me similar guides',
    'Explain this concept',
  ]

  return (
    <>
      {/* Floating Helper Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center shadow-glow-md hover:shadow-glow-lg transition-all duration-300 hover:scale-110 z-40"
        aria-label="Astral Helper"
      >
        <svg
          className="w-6 h-6 text-astral-dark"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Helper Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 400 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 400 }}
            className="fixed bottom-24 right-8 w-96 max-h-[600px] glass-card border border-primary/30 rounded-lg shadow-glow-lg z-40 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <span className="text-astral-dark font-bold text-sm">A</span>
                </div>
                <div>
                  <h3 className="font-semibold text-white">Astral Helper</h3>
                  <p className="text-xs text-gray-400">Your guide assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Quick Help */}
              <div>
                <h4 className="text-sm font-semibold text-primary mb-2">Quick Help</h4>
                <div className="space-y-2">
                  {quickHelp.map((help, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickHelp(help)}
                      className="w-full text-left text-sm px-3 py-2 rounded-lg glass-card-hover text-gray-300"
                    >
                      {help}
                    </button>
                  ))}
                </div>
              </div>

              {/* Related Guides */}
              {relatedGuides.length > 0 && (
                <div>
                  <h4 className="text-sm font-semibold text-primary mb-2">Related Guides</h4>
                  <div className="space-y-2">
                    {relatedGuides.map((guide) => (
                      <Link
                        key={guide.slug}
                        href={`/guides/${guide.slug}`}
                        className="block text-sm px-3 py-2 rounded-lg glass-card-hover text-gray-300 hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        {guide.title}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Tips */}
              <div className="glass-card p-3 border border-primary/20">
                <div className="flex items-start space-x-2">
                  <div className="text-primary">💡</div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-300">
                      Use the table of contents to jump between sections, or search for specific topics using the search bar.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

