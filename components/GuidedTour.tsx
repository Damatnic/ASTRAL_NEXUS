'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TourStep {
  id: string
  title: string
  description: string
  target?: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

const tourSteps: TourStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to Astral Nexus! 🌟',
    description: 'Your interactive learning platform with AI-powered study tools. Let me show you around!',
  },
  {
    id: 'search',
    title: 'Smart Search 🔍',
    description: 'Use the search bar to find any topic across all guides instantly. Try searching for "body language" or "legal rights".',
  },
  {
    id: 'guides',
    title: 'Browse Guides 📚',
    description: 'Explore our comprehensive master guides on Communication, Legal, and Wellness topics. Each guide is fully interactive!',
  },
  {
    id: 'study-modes',
    title: '5 Study Modes 🎯',
    description: 'Every guide has 5 ways to learn: Read, Flashcards, Quiz, Notes, and Quick Reference. Switch between them anytime!',
  },
  {
    id: 'flashcards',
    title: 'Spaced Repetition Flashcards 🎴',
    description: 'Review flashcards that adapt to your learning pace. Cards you know well appear less often, weak areas more often.',
  },
  {
    id: 'quizzes',
    title: 'Interactive Quizzes ✏️',
    description: 'Test your knowledge with instant feedback. Get detailed explanations for every question!',
  },
  {
    id: 'ai-chat',
    title: 'AI Study Assistant 🤖',
    description: 'Click the glowing button (bottom right) anytime to chat with an AI that knows all the guide content!',
  },
  {
    id: 'progress',
    title: 'Track Your Progress 📊',
    description: 'Visit your Dashboard to see completion stats, quiz scores, and study time. Stay motivated by watching your growth!',
  },
  {
    id: 'shortcuts',
    title: 'Keyboard Shortcuts ⌨️',
    description: 'Press ? anytime to see keyboard shortcuts. Power users can navigate entirely by keyboard!',
  },
  {
    id: 'finish',
    title: 'You\'re Ready to Learn! 🎉',
    description: 'Pick any guide and start exploring. The platform will guide you through each feature as you use it!',
  },
]

export default function GuidedTour() {
  const [isActive, setIsActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [hasSeenTour, setHasSeenTour] = useState(false)

  useEffect(() => {
    // Check if user has seen tour before
    const tourComplete = localStorage.getItem('astral-tour-complete')
    if (!tourComplete) {
      setTimeout(() => setIsActive(true), 1000)
    } else {
      setHasSeenTour(true)
    }
  }, [])

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSkip = () => {
    localStorage.setItem('astral-tour-complete', 'true')
    setIsActive(false)
    setHasSeenTour(true)
  }

  const handleComplete = () => {
    localStorage.setItem('astral-tour-complete', 'true')
    setIsActive(false)
    setHasSeenTour(true)
  }

  const restartTour = () => {
    setCurrentStep(0)
    setIsActive(true)
  }

  const step = tourSteps[currentStep]

  return (
    <>
      {/* Restart Tour Button (if tour was completed) */}
      {hasSeenTour && !isActive && (
        <button
          onClick={restartTour}
          className="fixed bottom-8 left-24 px-4 py-2 rounded-lg glass-card-hover text-sm z-40"
          title="Restart guided tour"
        >
          🎓 Tour
        </button>
      )}

      {/* Tour Overlay */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-[100] backdrop-blur-sm"
              onClick={handleSkip}
            />

            {/* Tour Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl glass-card border-2 border-primary rounded-2xl shadow-glow-lg z-[101] p-8 m-4"
            >
              {/* Progress */}
              <div className="mb-6">
                <div className="flex justify-between text-sm text-gray-400 mb-2">
                  <span>Step {currentStep + 1} of {tourSteps.length}</span>
                  <button onClick={handleSkip} className="text-primary hover:text-accent">
                    Skip Tour
                  </button>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-accent"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentStep + 1) / tourSteps.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>

              {/* Content */}
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4 neon-text">{step.title}</h2>
                <p className="text-xl text-gray-300 leading-relaxed">{step.description}</p>
              </div>

              {/* Navigation */}
              <div className="flex justify-between items-center">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="px-6 py-3 rounded-lg glass-card-hover disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                >
                  ← Previous
                </button>

                <div className="flex gap-2">
                  {tourSteps.map((_, idx) => (
                    <div
                      key={idx}
                      className={`w-2 h-2 rounded-full transition-all ${
                        idx === currentStep ? 'bg-primary w-8' : 'bg-white/30'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={handleNext}
                  className="px-6 py-3 rounded-lg bg-primary text-astral-dark font-semibold hover:shadow-glow-md transition-all"
                >
                  {currentStep === tourSteps.length - 1 ? 'Start Learning! 🚀' : 'Next →'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

