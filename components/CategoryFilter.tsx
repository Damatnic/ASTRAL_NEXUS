import Link from 'next/link'

interface CategoryFilterProps {
  categories: string[]
  selectedCategory?: string
}

export default function CategoryFilter({
  categories,
  selectedCategory,
}: CategoryFilterProps) {
  return (
    <div className="glass-card p-6 rounded-lg sticky top-20">
      <h3 className="text-lg font-semibold text-primary mb-4">Categories</h3>
      <div className="space-y-2">
        <Link
          href="/guides"
          className={`block px-4 py-2 rounded-lg transition-colors ${
            !selectedCategory
              ? 'bg-primary/20 text-primary border border-primary/30'
              : 'glass-card-hover text-gray-300'
          }`}
        >
          All Guides
        </Link>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/guides?category=${category.toLowerCase()}`}
            className={`block px-4 py-2 rounded-lg transition-colors ${
              selectedCategory?.toLowerCase() === category.toLowerCase()
                ? 'bg-primary/20 text-primary border border-primary/30'
                : 'glass-card-hover text-gray-300'
            }`}
          >
            {category}
          </Link>
        ))}
      </div>
    </div>
  )
}

