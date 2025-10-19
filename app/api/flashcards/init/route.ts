import { NextResponse } from 'next/server'
import { getAllGuides } from '@/lib/guides'
import { generateFlashcardsFromGuide, manualFlashcards } from '@/lib/flashcard-generator'

export async function POST() {
  try {
    const guides = getAllGuides()
    const flashcardsData = []

    for (const guide of guides) {
      // Use manual flashcards if available
      const manual = manualFlashcards[guide.slug]
      if (manual && manual.length > 0) {
        for (const card of manual) {
          flashcardsData.push({
            guideSlug: guide.slug,
            ...card,
          })
        }
      } else {
        // Auto-generate flashcards
        const generated = generateFlashcardsFromGuide(guide)
        for (const card of generated.slice(0, 20)) {
          flashcardsData.push({
            guideSlug: guide.slug,
            ...card,
          })
        }
      }
    }

    return NextResponse.json({ flashcards: flashcardsData, count: flashcardsData.length })
  } catch (error) {
    console.error('Flashcard init error:', error)
    return NextResponse.json({ error: 'Failed to initialize flashcards' }, { status: 500 })
  }
}

