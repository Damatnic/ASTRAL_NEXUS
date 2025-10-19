'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { QuizQuestion, generateQuizFromGuide } from '@/lib/quiz-generator'
import { Guide } from '@/lib/guides'
import { db } from '@/lib/db'

interface QuizModeProps {
  guide: Guide
  questionCount?: number
}

export default function QuizMode({ guide, questionCount = 10 }: QuizModeProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [userAnswers, setUserAnswers] = useState<{ question: string; userAnswer: string; correctAnswer: string; isCorrect: boolean }[]>([])
  const [quizComplete, setQuizComplete] = useState(false)
  const [startTime] = useState(new Date())

  useEffect(() => {
    const quizQuestions = generateQuizFromGuide(guide, questionCount)
    setQuestions(quizQuestions)
  }, [guide, questionCount])

  const currentQuestion = questions[currentIndex]
  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer)
    setShowExplanation(true)

    const isCorrect = answer === currentQuestion.correctAnswer

    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuestion.question,
        userAnswer: answer,
        correctAnswer: currentQuestion.correctAnswer,
        isCorrect,
      },
    ])
  }

  const handleNext = async () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      // Quiz complete
      setQuizComplete(true)
      
      // Save results to database
      const score = userAnswers.filter(a => a.isCorrect).length + 
                    (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)
      const endTime = new Date()
      const timeSpent = Math.round((endTime.getTime() - startTime.getTime()) / 60000)

      await db.quizResults.add({
        guideSlug: guide.slug,
        score,
        totalQuestions: questions.length,
        completedAt: new Date(),
        timeSpent,
        answers: [
          ...userAnswers,
          {
            question: currentQuestion.question,
            userAnswer: selectedAnswer || '',
            correctAnswer: currentQuestion.correctAnswer,
            isCorrect: selectedAnswer === currentQuestion.correctAnswer,
          },
        ],
      })
    }
  }

  if (questions.length === 0) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (quizComplete) {
    const finalScore = userAnswers.filter(a => a.isCorrect).length + 
                       (selectedAnswer === currentQuestion.correctAnswer ? 1 : 0)
    const percentage = Math.round((finalScore / questions.length) * 100)

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-3xl mx-auto"
      >
        <div className="glass-card p-12 text-center">
          <div className="text-6xl mb-6">
            {percentage >= 90 ? '🎉' : percentage >= 70 ? '🌟' : percentage >= 50 ? '👍' : '📚'}
          </div>
          <h2 className="text-4xl font-bold mb-4">Quiz Complete!</h2>
          <div className="text-6xl font-bold neon-text mb-6">{percentage}%</div>
          <p className="text-xl text-gray-300 mb-8">
            You scored {finalScore} out of {questions.length}
          </p>

          {percentage >= 90 && (
            <p className="text-primary text-lg mb-8">Excellent work! You&apos;ve mastered this material.</p>
          )}
          {percentage >= 70 && percentage < 90 && (
            <p className="text-accent text-lg mb-8">Good job! Review the areas you missed for mastery.</p>
          )}
          {percentage >= 50 && percentage < 70 && (
            <p className="text-orange-400 text-lg mb-8">Decent effort. More study recommended.</p>
          )}
          {percentage < 50 && (
            <p className="text-red-400 text-lg mb-8">Review the guide and try again.</p>
          )}

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => window.location.reload()}
              className="btn-primary"
            >
              Retake Quiz
            </button>
            <button
              onClick={() => window.location.href = `/guides/${guide.slug}`}
              className="btn-secondary"
            >
              Back to Guide
            </button>
          </div>

          {/* Review Incorrect Answers */}
          {userAnswers.some(a => !a.isCorrect) && (
            <div className="mt-12 text-left">
              <h3 className="text-2xl font-bold mb-6 text-center">Review Incorrect Answers</h3>
              <div className="space-y-4">
                {userAnswers.map((answer, idx) => 
                  !answer.isCorrect && (
                    <div key={idx} className="glass-card p-6 border-2 border-red-500/30">
                      <p className="font-semibold mb-2">{answer.question}</p>
                      <p className="text-red-400 mb-1">Your answer: {answer.userAnswer}</p>
                      <p className="text-green-400">Correct answer: {answer.correctAnswer}</p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-400 mb-2">
          <span>Question {currentIndex + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          className="glass-card p-8 md:p-12 mb-6"
        >
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-primary">{currentQuestion.section}</span>
              <span className="px-3 py-1 text-xs rounded-full bg-accent/20 text-accent">
                {currentQuestion.difficulty}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.type === 'multiple-choice' && currentQuestion.options ? (
              currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === option
                const isCorrect = option === currentQuestion.correctAnswer
                const showResult = showExplanation

                return (
                  <button
                    key={idx}
                    onClick={() => !showExplanation && handleAnswer(option)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                      showResult && isCorrect
                        ? 'border-green-500 bg-green-500/20'
                        : showResult && isSelected && !isCorrect
                        ? 'border-red-500 bg-red-500/20'
                        : isSelected
                        ? 'border-primary bg-primary/10'
                        : 'border-white/20 hover:border-primary/50 glass-card-hover'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showResult && isCorrect && <span className="text-green-400">✓</span>}
                      {showResult && isSelected && !isCorrect && <span className="text-red-400">✗</span>}
                    </div>
                  </button>
                )
              })
            ) : (
              // True/False
              <>
                {['true', 'false'].map((option) => {
                  const isSelected = selectedAnswer === option
                  const isCorrect = option === currentQuestion.correctAnswer.toLowerCase()
                  const showResult = showExplanation

                  return (
                    <button
                      key={option}
                      onClick={() => !showExplanation && handleAnswer(option)}
                      disabled={showExplanation}
                      className={`w-full text-left p-6 rounded-lg border-2 transition-all ${
                        showResult && isCorrect
                          ? 'border-green-500 bg-green-500/20'
                          : showResult && isSelected && !isCorrect
                          ? 'border-red-500 bg-red-500/20'
                          : isSelected
                          ? 'border-primary bg-primary/10'
                          : 'border-white/20 hover:border-primary/50 glass-card-hover'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold capitalize">{option}</span>
                        {showResult && isCorrect && <span className="text-4xl text-green-400">✓</span>}
                        {showResult && isSelected && !isCorrect && <span className="text-4xl text-red-400">✗</span>}
                      </div>
                    </button>
                  )
                })}
              </>
            )}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-6 p-6 rounded-lg bg-white/5 border border-white/10"
            >
              <h4 className="font-semibold text-primary mb-2">Explanation</h4>
              <p className="text-gray-300">{currentQuestion.explanation}</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      {showExplanation && (
        <div className="flex justify-center">
          <button onClick={handleNext} className="btn-primary px-8 py-4 text-lg">
            {currentIndex + 1 < questions.length ? 'Next Question →' : 'Finish Quiz'}
          </button>
        </div>
      )}
    </div>
  )
}

