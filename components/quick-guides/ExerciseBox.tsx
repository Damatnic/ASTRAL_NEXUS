'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExerciseBoxProps {
  title: string
  instructions: React.ReactNode
  children?: React.ReactNode
  showSolution?: boolean
  solution?: React.ReactNode
}

export default function ExerciseBox({ title, instructions, children, showSolution, solution }: ExerciseBoxProps) {
  const [showSol, setShowSol] = useState(false)

  return (
    <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-8">
      <div className="mb-6">
        <div className="mb-2 flex items-center gap-2">
          <span className="text-2xl">✏️</span>
          <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{title}</h3>
        </div>
        <div className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
          {instructions}
        </div>
      </div>

      {children && (
        <div className="rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-6 mb-6">
          {children}
        </div>
      )}

      {showSolution && solution && (
        <div>
          <button
            onClick={() => setShowSol(!showSol)}
            className="btn-secondary mb-4"
          >
            {showSol ? 'Hide' : 'Show'} Solution
          </button>
          <AnimatePresence>
            {showSol && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="rounded-2xl border border-green-500/40 bg-green-500/10 p-6">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-green-500">Solution</div>
                  <div className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                    {solution}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  )
}

