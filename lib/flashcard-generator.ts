/**
 * Automatic Flashcard Generation from Guide Content
 * Extracts key concepts, definitions, and facts
 */

import { Guide } from './guides'

export interface GeneratedFlashcard {
  question: string
  answer: string
  section: string
  difficulty: 'easy' | 'medium' | 'hard'
}

export function generateFlashcardsFromGuide(guide: Guide): GeneratedFlashcard[] {
  const flashcards: GeneratedFlashcard[] = []
  const content = guide.content

  // Extract definitions (pattern: **Term**: Definition or Term: Definition)
  const definitionRegex = /\*\*([^*]+)\*\*:\s*([^\n]+)|^([^:\n]+):\s*([^\n]+)/gm
  let match

  while ((match = definitionRegex.exec(content)) !== null) {
    const term = match[1] || match[3]
    const definition = match[2] || match[4]
    
    if (term && definition && term.length < 100 && definition.length < 300) {
      flashcards.push({
        question: `What is ${term}?`,
        answer: definition.trim(),
        section: extractSection(content, match.index),
        difficulty: determineDifficulty(term, definition),
      })
    }
  }

  // Extract list items as potential Q&A
  const listRegex = /^[-*]\s+\*\*([^*]+)\*\*:\s*([^\n]+)/gm
  while ((match = listRegex.exec(content)) !== null) {
    const concept = match[1]
    const explanation = match[2]
    
    if (concept && explanation && !flashcards.some(f => f.question.includes(concept))) {
      flashcards.push({
        question: `Explain: ${concept}`,
        answer: explanation.trim(),
        section: extractSection(content, match.index),
        difficulty: 'medium',
      })
    }
  }

  // Extract numbered steps/procedures
  const procedureRegex = /##\s+([^\n]+)\n((?:\d+\.\s+[^\n]+\n?)+)/g
  while ((match = procedureRegex.exec(content)) !== null) {
    const procedureName = match[1]
    const steps = match[2]
    
    if (steps.split('\n').filter(l => l.trim()).length >= 3) {
      flashcards.push({
        question: `What are the steps for ${procedureName}?`,
        answer: steps.trim(),
        section: procedureName,
        difficulty: 'hard',
      })
    }
  }

  // Limit and deduplicate
  const uniqueFlashcards = flashcards.filter(
    (card, index, self) =>
      index === self.findIndex((c) => c.question === card.question)
  )

  return uniqueFlashcards.slice(0, 100) // Limit per guide
}

function extractSection(content: string, position: number): string {
  // Find the nearest heading before this position
  const beforeContent = content.substring(0, position)
  const headingMatch = beforeContent.match(/##\s+([^\n]+)(?!.*##)/s)
  return headingMatch ? headingMatch[1].trim() : 'General'
}

function determineDifficulty(term: string, definition: string): 'easy' | 'medium' | 'hard' {
  const complexity = term.length + definition.length
  if (complexity < 50) return 'easy'
  if (complexity < 150) return 'medium'
  return 'hard'
}

// Pre-built flashcards for specific guides (higher quality)
export const manualFlashcards: Record<string, GeneratedFlashcard[]> = {
  'body-language-mastery': [
    {
      question: 'What percentage of communication impact comes from body language according to Mehrabian?',
      answer: '55% from body language, 38% from tone of voice, and only 7% from actual words.',
      section: 'Introduction',
      difficulty: 'easy',
    },
    {
      question: 'What is a Duchenne smile?',
      answer: 'A genuine smile that involves the eyes, showing crow\'s feet wrinkles. It\'s involuntary and harder to fake than a social smile which uses mouth only.',
      section: 'Facial Expressions',
      difficulty: 'medium',
    },
    {
      question: 'What are the seven universal emotions identified by Paul Ekman?',
      answer: 'Happiness, Sadness, Anger, Fear, Disgust, Surprise, and Contempt.',
      section: 'Facial Expressions',
      difficulty: 'hard',
    },
    {
      question: 'What is a microexpression?',
      answer: 'A very brief (1/25th to 1/5th of a second) involuntary facial expression that shows true emotion when someone tries to conceal their feelings.',
      section: 'Microexpressions',
      difficulty: 'medium',
    },
    {
      question: 'What do crossed arms typically indicate?',
      answer: 'Can indicate defensive/closed off feelings, but also could mean the person is cold, comfortable, or just has a habitual position. Always look for other body language cues.',
      section: 'Gestures',
      difficulty: 'easy',
    },
  ],
  'legal-essentials': [
    {
      question: 'What are your Miranda Rights?',
      answer: 'Right to remain silent, anything you say can be used against you, right to an attorney, and if you cannot afford one, one will be appointed for you.',
      section: 'Constitutional Rights',
      difficulty: 'easy',
    },
    {
      question: 'What should you say if arrested?',
      answer: '"I\'m invoking my right to remain silent. I want a lawyer." Then stop talking completely.',
      section: 'Criminal Law',
      difficulty: 'easy',
    },
    {
      question: 'What are the essential elements of a valid contract?',
      answer: 'Offer, Acceptance, Consideration, Legal Purpose, Capacity, and Mutual Assent.',
      section: 'Contract Law',
      difficulty: 'hard',
    },
  ],
  'ultimate-life-manual': [
    {
      question: 'What is the Rule of Threes in survival?',
      answer: '3 minutes without air, 3 hours without shelter (in harsh conditions), 3 days without water, 3 weeks without food, 3 months without hope.',
      section: 'Emergency Preparedness',
      difficulty: 'medium',
    },
    {
      question: 'What is the 50/30/20 budgeting rule?',
      answer: '50% for needs (essentials), 30% for wants (discretionary), 20% for savings and debt repayment.',
      section: 'Financial Mastery',
      difficulty: 'easy',
    },
    {
      question: 'What is the recommended amount of exercise per week?',
      answer: '150 minutes of moderate cardio or 75 minutes vigorous, plus 2-3 days of strength training.',
      section: 'Health & Fitness',
      difficulty: 'medium',
    },
  ],
}

