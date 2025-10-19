import Link from 'next/link'
import { getAllCategories, getGuidesByCategory } from '@/lib/guides'

export const metadata = {
  title: 'Categories | Astral Nexus',
  description: 'Browse guides by category on Astral Nexus.',
}

export default function CategoriesPage() {
  const categories = getAllCategories()

  const categoryData = categories.map((category) => ({
    name: category,
    guides: getGuidesByCategory(category),
    count: getGuidesByCategory(category).length,
  }))

  const categoryIcons: { [key: string]: string } = {
    wellness: '🧘',
    communication: '💬',
    legal: '⚖️',
    survival: '🏕️',
    technology: '💻',
    finance: '💰',
    creativity: '🎨',
    productivity: '⚡',
    general: '📚',
  }

  return (
    <div className="container mx-auto px-4 pb-24 pt-16">
      <div className="mb-16 text-center">
        <span className="mb-6 inline-block rounded-full border border-[color:var(--border-soft)] bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
          Guide Categories
        </span>
        <h1 className="mb-6 text-4xl font-semibold text-[color:var(--text-primary)] md:text-5xl">
          Browse by discipline
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-[color:var(--text-secondary)]">
          Explore guides organized by domain and specialty. Each category houses curated frameworks, case studies, and actionable insights.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {categoryData.map((category) => (
          <Link
            key={category.name}
            href={`/guides?category=${category.name.toLowerCase()}`}
            className="group relative flex flex-col overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-background/70 p-8 transition-all hover:border-primary/60 hover:bg-background/90 hover:shadow-glow-sm"
          >
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 rounded-3xl bg-primary/5" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/15 to-transparent" />
            </div>

            <div className="relative">
              <div className="mb-5 text-5xl">
                {categoryIcons[category.name.toLowerCase()] || '📚'}
              </div>
              <h2 className="mb-3 text-2xl font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-primary">
                {category.name}
              </h2>
              <p className="mb-5 text-sm text-[color:var(--text-secondary)]">
                {category.count} {category.count === 1 ? 'guide' : 'guides'} available
              </p>
              <div className="flex items-center text-primary">
                <span className="text-sm font-semibold">View collection</span>
                <svg
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

