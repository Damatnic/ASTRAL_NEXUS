/**
 * Quick Reference Card Generator
 * Creates condensed cheat sheets from guide content
 */

import { Guide } from './guides'

export interface QuickReferenceCard {
  title: string
  items: {
    term: string
    definition: string
  }[]
  category: string
}

export function generateQuickReference(guide: Guide): QuickReferenceCard[] {
  const cards: QuickReferenceCard[] = []
  
  // Use manual quick reference if available
  const manual = manualQuickReference[guide.slug]
  if (manual) {
    return manual
  }

  // Auto-generate from content sections
  const content = guide.content
  const sections = content.split(/^## /m).filter(Boolean)

  sections.forEach(section => {
    const lines = section.split('\n')
    const title = lines[0].trim()
    
    // Extract key points (items starting with - or *)
    const items: { term: string; definition: string }[] = []
    const listRegex = /^[-*]\s+\*\*([^*]+)\*\*:\s*([^\n]+)/gm
    let match

    while ((match = listRegex.exec(section)) !== null && items.length < 10) {
      items.push({
        term: match[1].trim(),
        definition: match[2].trim(),
      })
    }

    if (items.length >= 3) {
      cards.push({
        title,
        items,
        category: guide.category,
      })
    }
  })

  return cards.slice(0, 5) // Limit to 5 cards per guide
}

// Manual high-quality quick reference cards
export const manualQuickReference: Record<string, QuickReferenceCard[]> = {
  'body-language-mastery': [
    {
      title: 'Positive Body Language Signals',
      category: 'Communication',
      items: [
        { term: 'Genuine smile', definition: 'Involves eyes (crow\'s feet), not just mouth' },
        { term: 'Open posture', definition: 'Uncrossed arms/legs, facing toward you' },
        { term: 'Leaning forward', definition: 'Shows interest and engagement' },
        { term: 'Direct eye contact', definition: '60-70% while listening, 30-40% while speaking' },
        { term: 'Mirroring', definition: 'Unconsciously copying your body language (rapport)' },
        { term: 'Open palms', definition: 'Shows openness and honesty' },
      ],
    },
    {
      title: 'Negative Body Language Signals',
      category: 'Communication',
      items: [
        { term: 'Crossed arms', definition: 'Often defensive (but check context)' },
        { term: 'Avoiding eye contact', definition: 'Discomfort, disinterest, or cultural norm' },
        { term: 'Leaning away', definition: 'Creating distance, disagreement' },
        { term: 'Foot pointing away', definition: 'Wanting to leave' },
        { term: 'Lip compression', definition: 'Stress, disagreement, withheld comment' },
        { term: 'Eye rolling', definition: 'Contempt or disrespect' },
      ],
    },
    {
      title: 'The Seven Universal Emotions',
      category: 'Communication',
      items: [
        { term: 'Happiness', definition: 'Corners of lips up, cheeks raised, crow\'s feet' },
        { term: 'Sadness', definition: 'Inner eyebrows raised and drawn together, drooping features' },
        { term: 'Anger', definition: 'Lowered eyebrows, vertical lines between brows, tense lower eyelids' },
        { term: 'Fear', definition: 'Eyebrows raised and pulled together, wide eyes' },
        { term: 'Disgust', definition: 'Upper lip raised, nose wrinkled, eyes narrowed' },
        { term: 'Surprise', definition: 'Eyebrows raised and curved, jaw drops, brief (<1 sec)' },
        { term: 'Contempt', definition: 'Asymmetrical - one corner of mouth raised (only one side)' },
      ],
    },
  ],
  'legal-essentials': [
    {
      title: 'Constitutional Rights Quick Reference',
      category: 'Legal',
      items: [
        { term: '1st Amendment', definition: 'Speech, religion, press, assembly, petition' },
        { term: '4th Amendment', definition: 'No unreasonable searches/seizures' },
        { term: '5th Amendment', definition: 'No self-incrimination, due process, no double jeopardy' },
        { term: '6th Amendment', definition: 'Right to attorney, speedy trial, confront witnesses' },
        { term: '8th Amendment', definition: 'No excessive bail or cruel punishment' },
      ],
    },
    {
      title: 'If You\'re Arrested - What to Do',
      category: 'Legal',
      items: [
        { term: 'Stay calm', definition: 'Don\'t resist physically, don\'t run' },
        { term: 'Invoke rights', definition: 'Say: "I\'m invoking my right to remain silent. I want a lawyer."' },
        { term: 'Then stop talking', definition: 'Seriously - don\'t answer ANY questions without attorney' },
        { term: 'Don\'t consent', definition: 'Don\'t consent to searches or sign anything' },
        { term: 'Document everything', definition: 'Remember details, write down ASAP' },
      ],
    },
    {
      title: 'Contract Essentials',
      category: 'Legal',
      items: [
        { term: 'Offer', definition: 'Clear proposal with definite terms' },
        { term: 'Acceptance', definition: 'Unambiguous agreement to exact terms' },
        { term: 'Consideration', definition: 'Something of value exchanged by both parties' },
        { term: 'Legal purpose', definition: 'Can\'t contract for illegal activity' },
        { term: 'Capacity', definition: 'Mental competence and legal age (18+)' },
        { term: 'Mutual assent', definition: 'Meeting of the minds - both understand and agree' },
      ],
    },
  ],
  'ultimate-life-manual': [
    {
      title: 'Survival Rule of Threes',
      category: 'Wellness',
      items: [
        { term: '3 minutes', definition: 'Without air (breathing is priority #1)' },
        { term: '3 hours', definition: 'Without shelter in harsh conditions' },
        { term: '3 days', definition: 'Without water (hydration critical)' },
        { term: '3 weeks', definition: 'Without food (important but less urgent)' },
        { term: '3 months', definition: 'Without hope (mental resilience essential)' },
      ],
    },
    {
      title: '50/30/20 Budgeting Rule',
      category: 'Wellness',
      items: [
        { term: '50% Needs', definition: 'Essentials: housing, utilities, groceries, transportation, insurance' },
        { term: '30% Wants', definition: 'Discretionary: dining out, entertainment, hobbies, shopping' },
        { term: '20% Savings', definition: 'Emergency fund, retirement, extra debt payments, investments' },
      ],
    },
    {
      title: 'Exercise Recommendations',
      category: 'Wellness',
      items: [
        { term: 'Cardio', definition: '150 min/week moderate OR 75 min/week vigorous' },
        { term: 'Strength', definition: '2-3 days/week, all major muscle groups' },
        { term: 'Flexibility', definition: '2-3 days/week, stretching after workouts' },
        { term: 'Rest', definition: 'Rest days between strength sessions for same muscles' },
      ],
    },
    {
      title: 'Sleep Hygiene Essentials',
      category: 'Wellness',
      items: [
        { term: 'Duration', definition: '7-9 hours for adults' },
        { term: 'Environment', definition: 'Dark, cool (60-67°F), quiet, comfortable' },
        { term: 'Routine', definition: 'Consistent sleep/wake times, even weekends' },
        { term: 'Avoid', definition: 'No screens 1 hour before bed, no caffeine after 2 PM' },
        { term: 'Wind-down', definition: '30-60 minute routine: reading, bath, meditation' },
      ],
    },
  ],
}

