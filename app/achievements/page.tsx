import AchievementsPanel from '@/components/AchievementsPanel'

export const metadata = {
  title: 'Achievements | Astral Nexus',
  description: 'Track your learning achievements and unlock badges as you master the guides.',
}

export default function AchievementsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <AchievementsPanel />
    </div>
  )
}

