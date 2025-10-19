'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flashcard, updateFlashcardReview, getFlashcardsForReview } from '@/lib/db'

interface FlashcardStudyProps {
  guideSlug: string
  onComplete?: () => void
}

export default function FlashcardStudy({ guideSlug, onComplete }: FlashcardStudyProps) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadFlashcards()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guideSlug])

  const loadFlashcards = async () => {
    const cards = await getFlashcardsForReview(guideSlug)
    setFlashcards(cards)
    setLoading(false)
  }

  const handleRate = async (quality: number) => {
    const currentCard = flashcards[currentIndex]
    if (currentCard.id) {
      await updateFlashcardReview(currentCard.id, quality)
    }

    if (currentIndex + 1 < flashcards.length) {
      setCurrentIndex(currentIndex + 1)
      setIsFlipped(false)
    } else {
      onComplete?.()
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (flashcards.length === 0) {
    return (
      <div className="glass-card p-12 text-center">
        <div className="text-6xl mb-4">🎴</div>
        <h3 className="text-2xl font-bold mb-2">No Flashcards Due</h3>
        <p className="text-gray-400">
          Great job! All flashcards for this guide are reviewed. Check back later.
        </p>
      </div>
    )
  }

  const currentCard = flashcards[currentIndex]
  const progress = ((currentIndex + 1) / flashcards.length) * 100

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Card {currentIndex + 1} of {flashcards.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="perspective-1000 mb-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: isFlipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            className="relative preserve-3d cursor-pointer"
            onClick={() => setIsFlipped(!isFlipped)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div
              className={`glass-card p-6 sm:p-8 md:p-12 min-h-[300px] sm:min-h-[400px] flex items-center justify-center ${
                isFlipped ? 'invisible' : 'visible'
              }`}
              style={{ backfaceVisibility: 'hidden' }}
            >
              <div className="text-center">
                <div className="text-xs sm:text-sm text-primary mb-3 sm:mb-4">{currentCard.section}</div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 px-2">{currentCard.question}</h2>
                <p className="text-gray-400 text-xs sm:text-sm">Tap to reveal answer</p>
              </div>
            </div>

            {/* Back */}
            <div
              className={`absolute inset-0 glass-card p-6 sm:p-8 md:p-12 min-h-[300px] sm:min-h-[400px] flex items-center justify-center ${
                isFlipped ? 'visible' : 'invisible'
              }`}
              style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
            >
              <div className="text-center">
                <div className="text-sm text-accent mb-4">Answer</div>
                <p className="text-xl mb-6 leading-relaxed">{currentCard.answer}</p>
                <p className="text-gray-400 text-sm">Rate your recall below</p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rating Buttons */}
      {isFlipped && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4"
        >
          <button
            onClick={() => handleRate(1)}
            className="glass-card-hover p-3 sm:p-4 text-center border-2 border-red-500/30 hover:border-red-500 active:scale-95 transition-transform min-h-[88px] flex flex-col items-center justify-center"
          >
            <div className="text-2xl mb-2">😰</div>
            <div className="font-semibold text-red-400 text-sm sm:text-base">Again</div>
            <div className="text-xs text-gray-500">Didn&apos;t recall</div>
          </button>
          <button
            onClick={() => handleRate(3)}
            className="glass-card-hover p-3 sm:p-4 text-center border-2 border-orange-500/30 hover:border-orange-500 active:scale-95 transition-transform min-h-[88px] flex flex-col items-center justify-center"
          >
            <div className="text-2xl mb-2">😕</div>
            <div className="font-semibold text-orange-400 text-sm sm:text-base">Hard</div>
            <div className="text-xs text-gray-500">Struggled</div>
          </button>
          <button
            onClick={() => handleRate(4)}
            className="glass-card-hover p-3 sm:p-4 text-center border-2 border-primary/30 hover:border-primary active:scale-95 transition-transform min-h-[88px] flex flex-col items-center justify-center"
          >
            <div className="text-2xl mb-2">🙂</div>
            <div className="font-semibold text-primary text-sm sm:text-base">Good</div>
            <div className="text-xs text-gray-500">Recalled well</div>
          </button>
          <button
            onClick={() => handleRate(5)}
            className="glass-card-hover p-3 sm:p-4 text-center border-2 border-green-500/30 hover:border-green-500 active:scale-95 transition-transform min-h-[88px] flex flex-col items-center justify-center"
          >
            <div className="text-2xl mb-2">🎉</div>
            <div className="font-semibold text-green-400 text-sm sm:text-base">Easy</div>
            <div className="text-xs text-gray-500">Perfect!</div>
          </button>
        </motion.div>
      )}

      {/* Instructions */}
      {!isFlipped && (
        <div className="text-center text-sm text-gray-500 mt-4">
          <p>Click the card to flip it and see the answer</p>
          <p className="mt-2">Use keyboard: Space to flip, 1-4 to rate</p>
        </div>
      )}
    </div>
  )
}

