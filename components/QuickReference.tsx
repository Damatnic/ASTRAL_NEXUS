'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { QuickReferenceCard, generateQuickReference } from '@/lib/quick-reference'
import { Guide } from '@/lib/guides'

interface QuickReferenceProps {
  guide: Guide
}

export default function QuickReference({ guide }: QuickReferenceProps) {
  const [cards, setCards] = useState<QuickReferenceCard[]>([])
  const [selectedCard, setSelectedCard] = useState(0)

  useEffect(() => {
    const refCards = generateQuickReference(guide)
    setCards(refCards)
  }, [guide])

  if (cards.length === 0) {
    return null
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold mb-2">
          Quick <span className="neon-text">Reference</span>
        </h2>
        <p className="text-gray-400">Condensed key information for quick review</p>
      </div>

      {/* Card Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {cards.map((card, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCard(idx)}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              selectedCard === idx
                ? 'bg-primary text-astral-dark font-semibold shadow-glow-sm'
                : 'glass-card-hover text-gray-300'
            }`}
          >
            {card.title}
          </button>
        ))}
      </div>

      {/* Selected Card */}
      <motion.div
        key={selectedCard}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8"
      >
        <h3 className="text-2xl font-bold mb-6 text-primary">{cards[selectedCard].title}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {cards[selectedCard].items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-lg glass-card-hover border border-white/10"
            >
              <h4 className="font-semibold text-accent mb-2">{item.term}</h4>
              <p className="text-sm text-gray-300">{item.definition}</p>
            </div>
          ))}
        </div>

        {/* Download/Print Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => window.print()}
            className="btn-secondary"
          >
            <svg className="w-5 h-5 inline mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Reference Card
          </button>
        </div>
      </motion.div>
    </div>
  )
}

