'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface InteractiveTutorialProps {
  guideSlug: string
  guideTitle: string
}

export default function InteractiveTutorial({ guideSlug, guideTitle }: InteractiveTutorialProps) {
  const [showTutorial, setShowTutorial] = useState(true)
  const [step, setStep] = useState(0)

  const tutorialSteps = [
    {
      title: 'Welcome to this Guide!',
      content: `You're about to dive into ${guideTitle}. Here's how to get the most out of it.`,
      action: 'Start Tutorial',
    },
    {
      title: 'Read & Highlight',
      content: 'Select any text while reading to create highlights. These will be saved in your Notes.',
      action: 'Next',
    },
    {
      title: 'Switch Modes',
      content: 'Use the tabs at the top to switch between Read, Flashcards, Quiz, Notes, and Quick Reference modes.',
      action: 'Next',
    },
    {
      title: 'Track Progress',
      content: 'Your reading time is tracked automatically. Use the progress widget to mark sections complete!',
      action: 'Next',
    },
    {
      title: 'Get Help',
      content: 'Click the AI chat button (bottom right) anytime for instant help and explanations.',
      action: 'Start Learning!',
    },
  ]

  const currentStepData = tutorialSteps[step]

  const handleNext = () => {
    if (step < tutorialSteps.length - 1) {
      setStep(step + 1)
    } else {
      handleFinish()
    }
  }

  const handleSkip = () => {
    localStorage.setItem(`guide-tutorial-${guideSlug}`, 'seen')
    setShowTutorial(false)
  }

  const handleFinish = () => {
    localStorage.setItem(`guide-tutorial-${guideSlug}`, 'seen')
    setShowTutorial(false)
  }

  // Check if user has seen this guide's tutorial
  useEffect(() => {
    const tutorialSeen = localStorage.getItem(`guide-tutorial-${guideSlug}`)
    if (tutorialSeen) {
      setShowTutorial(false)
    }
  }, [guideSlug])

  return (
    <AnimatePresence>
      {showTutorial && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="mb-8 glass-card p-6 border-2 border-primary/50"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="text-2xl">🎓</div>
                <h3 className="text-xl font-bold text-primary">{currentStepData.title}</h3>
              </div>
              <p className="text-gray-300">{currentStepData.content}</p>
            </div>
            <button
              onClick={handleSkip}
              className="text-gray-400 hover:text-white transition-colors ml-4"
              title="Skip tutorial"
            >
              <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-1">
              {tutorialSteps.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1 rounded-full transition-all ${
                    idx === step ? 'w-8 bg-primary' : idx < step ? 'w-4 bg-accent' : 'w-4 bg-white/20'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-3">
              {step > 0 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 rounded-lg glass-card-hover text-sm"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-lg bg-primary text-astral-dark font-semibold hover:shadow-glow-md transition-all"
              >
                {currentStepData.action}
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

