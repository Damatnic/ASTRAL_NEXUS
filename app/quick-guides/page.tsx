import { getAllGuides } from '@/lib/guides'
import QuickGuideStats from './QuickGuideStats'
import QuickGuideGrid from './QuickGuideGrid'

export default async function QuickGuidesPage() {
  const allGuides = getAllGuides()
  const quickGuides = allGuides.filter((guide) => guide.guideType === 'quick-guide')

  return (
    <div className="container mx-auto px-4 pb-24 pt-16">
      <div className="mb-16 text-center">
        <span className="mb-6 inline-block rounded-full border border-[color:var(--border-soft)] bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          Quick Guides
        </span>
        <h1 className="mb-6 text-4xl font-semibold text-[color:var(--text-primary)] md:text-5xl lg:text-6xl">
          Learn fast, apply immediately
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-[color:var(--text-secondary)]">
          Practical guides with step-by-step instructions, real examples, and templates. Master new skills in 15-30 minutes.
        </p>
      </div>

      {/* Stats Bar */}
      <QuickGuideStats quickGuides={quickGuides} />

      {/* Quick Guide Grid */}
      <QuickGuideGrid quickGuides={quickGuides} />
    </div>
  )
}
