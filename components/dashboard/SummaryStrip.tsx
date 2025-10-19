'use client'

interface SummaryStripProps {
  completionRate: number
  streakDays: number
  reviewQueue: number
  unlockedAchievements: number
  totalAchievements: number
  averageMinutes: number
}

export default function SummaryStrip({ completionRate, streakDays, reviewQueue, unlockedAchievements, totalAchievements, averageMinutes }: SummaryStripProps) {
  return (
    <div className="glass-card p-4 rounded-xl mb-8">
      <div className="grid xl:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 gap-4 text-sm text-gray-300">
        <SummaryItem label="Completion" value={`${Math.round(completionRate)}%`} subtitle="Overall progress" />
        <SummaryItem label="Current streak" value={`${streakDays} days`} subtitle="Keep learning daily" />
        <SummaryItem label="Reviews due" value={reviewQueue} subtitle="Flashcards awaiting review" highlight={reviewQueue > 0} />
        <SummaryItem label="Achievements" value={`${unlockedAchievements}/${totalAchievements}`} subtitle="Unlocked so far" />
        <SummaryItem label="Avg session" value={`${averageMinutes} min`} subtitle="Daily study average" />
      </div>
    </div>
  )
}

function SummaryItem({ label, value, subtitle, highlight }: { label: string; value: string | number; subtitle: string; highlight?: boolean }) {
  return (
    <div>
      <div className="flex items-baseline gap-2">
        <div className={`text-2xl font-semibold ${highlight ? 'text-accent' : 'text-white'}`}>{value}</div>
        <div className="uppercase text-xs tracking-wide text-gray-500">{label}</div>
      </div>
      <div className="text-xs text-gray-500 mt-1">{subtitle}</div>
    </div>
  )
}


