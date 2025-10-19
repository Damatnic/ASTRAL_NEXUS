'use client'

interface FocusAreasProps {
  mastery: { category: string; completion: number }[]
}

export default function FocusAreas({ mastery }: FocusAreasProps) {
  if (!mastery.length) return null
  const weakest = [...mastery].sort((a, b) => a.completion - b.completion).slice(0, 3)
  return (
    <div className="glass-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold text-primary mb-3">Focus Areas</h3>
      <div className="space-y-3">
        {weakest.map((area) => (
          <div key={area.category}>
            <div className="flex items-center justify-between text-sm text-gray-300 mb-1">
              <span>{area.category}</span>
              <span>{area.completion}%</span>
            </div>
            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-orange-400 to-red-400" style={{ width: `${area.completion}%` }} />
            </div>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3">Focus on these categories next to balance your mastery.</p>
    </div>
  )
}


