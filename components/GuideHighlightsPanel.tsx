'use client'

import { Highlight } from '@/lib/db'

interface GuideHighlightsPanelProps {
  highlights: Highlight[]
  onJump: (id: number, headingId?: string) => void
  onRemove: (id: number) => void
}

const colorLabels: Record<Highlight['color'], string> = {
  yellow: 'Key idea',
  green: 'Actionable',
  pink: 'Remember',
}

export default function GuideHighlightsPanel({ highlights, onJump, onRemove }: GuideHighlightsPanelProps) {
  if (!highlights || highlights.length === 0) {
    return (
      <div className="glass-card p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-primary mb-3">Highlights</h3>
        <p className="text-sm text-gray-400">Select text in this guide to add highlights.</p>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-primary mb-4">Highlights</h3>
      <div className="space-y-3">
        {highlights.map((highlight) => (
          <div key={highlight.id} className={`${highlightCardClasses(highlight.color)} group` }>
            <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
              <span>{colorLabels[highlight.color]}</span>
              <div className="flex gap-2">
                <button className="text-primary hover:underline" onClick={() => onJump(highlight.id!, highlight.headingId)}>View</button>
                <button className="text-red-400 hover:underline" onClick={() => highlight.id && onRemove(highlight.id)}>Remove</button>
              </div>
            </div>
            <div className="text-sm text-gray-200 whitespace-pre-wrap leading-relaxed">
              {highlight.text}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function highlightCardClasses(color: Highlight['color']) {
  switch (color) {
    case 'yellow':
      return 'rounded-lg p-3 border border-yellow-400/40 bg-yellow-500/10 text-yellow-50'
    case 'green':
      return 'rounded-lg p-3 border border-green-400/40 bg-green-500/10 text-green-50'
    case 'pink':
      return 'rounded-lg p-3 border border-pink-400/40 bg-pink-500/10 text-pink-50'
    default:
      return 'rounded-lg p-3 border border-white/10 bg-white/5'
  }
}


