import { getAllGuides } from '@/lib/guides'
import DashboardClient from '@/components/DashboardClient'

export const metadata = {
  title: 'Dashboard | Astral Nexus',
  description: 'Track your learning progress, view stats, and see your achievements.',
}

export default function DashboardPage() {
  const allGuides = getAllGuides()
  
  return <DashboardClient allGuides={allGuides} />
}
