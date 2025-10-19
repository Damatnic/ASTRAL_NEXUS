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
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Browse by <span className="neon-text">Category</span>
        </h1>
        <p className="text-xl text-gray-400">
          Explore guides organized by topic and domain
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryData.map((category) => (
          <Link
            key={category.name}
            href={`/guides?category=${category.name.toLowerCase()}`}
            className="glass-card-hover p-8 block"
          >
            <div className="text-5xl mb-4">
              {categoryIcons[category.name.toLowerCase()] || '📚'}
            </div>
            <h2 className="text-2xl font-bold mb-2 text-white group-hover:text-primary transition-colors">
              {category.name}
            </h2>
            <p className="text-gray-400 mb-4">
              {category.count} {category.count === 1 ? 'guide' : 'guides'} available
            </p>
            <div className="flex items-center text-primary">
              <span className="text-sm font-semibold">Explore</span>
              <svg
                className="w-4 h-4 ml-2"
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
          </Link>
        ))}
      </div>
    </div>
  )
}

