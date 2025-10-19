import { getAllGuides } from '@/lib/guides'
import StudyHomeClient from '@/components/StudyHomeClient'

export const metadata = {
  title: 'Study Center | Astral Nexus',
  description: 'Interactive learning tools - flashcards, quizzes, study plans, and progress tracking.',
}

export default function StudyHomePage() {
  const guides = getAllGuides()

  return <StudyHomeClient guides={guides} />
}
