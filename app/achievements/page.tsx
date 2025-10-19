import AchievementsPanel from '@/components/AchievementsPanel'

export const metadata = {
  title: 'Achievements | Astral Nexus',
  description: 'Track your learning achievements and unlock badges as you master the guides.',
}

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 pb-24 pt-16">
      <div className="mb-16 text-center">
        <span className="mb-6 inline-block rounded-full border border-[color:var(--border-soft)] bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          Achievements
        </span>
        <h1 className="mb-6 text-4xl font-semibold text-[color:var(--text-primary)] md:text-5xl">
          Your learning milestones
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-[color:var(--text-secondary)]">
          Track your progress and unlock badges as you master guides, build streaks, and complete challenges.
        </p>
      </div>
      <AchievementsPanel />
    </div>
  )
}

