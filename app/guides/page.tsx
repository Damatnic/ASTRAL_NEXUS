import { getAllGuides, getAllCategories } from '@/lib/guides'
import GuideCard from '@/components/GuideCard'
import CategoryFilter from '@/components/CategoryFilter'

export const metadata = {
  title: 'All Guides | Astral Nexus',
  description: 'Browse all comprehensive guides and tutorials available on Astral Nexus.',
}

export default async function GuidesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const { category } = await searchParams
  const allGuides = getAllGuides()
  const categories = getAllCategories()
  const selectedCategory = category

  const filteredGuides = selectedCategory
    ? allGuides.filter(
        (guide) => guide.category.toLowerCase() === selectedCategory.toLowerCase()
      )
    : allGuides

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          All <span className="neon-text">Guides</span>
        </h1>
        <p className="text-xl text-gray-400">
          {selectedCategory
            ? `Showing ${filteredGuides.length} guides in ${selectedCategory}`
            : `Explore ${allGuides.length} comprehensive guides across all categories`}
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <CategoryFilter categories={categories} selectedCategory={selectedCategory} />
        </aside>

        {/* Guides Grid */}
        <div className="flex-1">
          {filteredGuides.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-semibold mb-2">No guides found</h2>
              <p className="text-gray-400">
                {selectedCategory
                  ? `No guides available in the ${selectedCategory} category yet.`
                  : 'No guides available yet. Check back soon!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

