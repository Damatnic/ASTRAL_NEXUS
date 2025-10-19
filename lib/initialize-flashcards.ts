/**
 * Initialize Flashcards for All Guides
 * Populates the database with flashcards when first accessed
 */

import { db } from './db'

export async function initializeFlashcards() {
  // Check if already initialized
  const existingCount = await db.flashcards.count()
  if (existingCount > 0) {
    console.log('Flashcards already initialized')
    return existingCount
  }

  console.log('Initializing flashcards from API...')

  try {
    const response = await fetch('/api/flashcards/init', { method: 'POST' })
    if (!response.ok) {
      console.error('Failed to fetch flashcards from API')
      return 0
    }

    const { flashcards } = await response.json()

    for (const card of flashcards) {
      await db.flashcards.add({
        guideSlug: card.guideSlug,
        question: card.question,
        answer: card.answer,
        section: card.section,
        difficulty: card.difficulty,
        nextReview: new Date(),
        interval: 0,
        easeFactor: 2.5,
        repetitions: 0,
      })
    }

    const totalCards = await db.flashcards.count()
    console.log(`✅ Initialized ${totalCards} flashcards`)
    return totalCards
  } catch (error) {
    console.error('Error initializing flashcards:', error)
    return 0
  }
}

