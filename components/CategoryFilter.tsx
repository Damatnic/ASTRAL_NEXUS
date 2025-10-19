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
    <aside className="sticky top-28 space-y-6">
      <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 shadow-inner-sm">
        <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Filter by discipline</h3>
        <p className="mt-2 text-sm text-[color:var(--text-secondary)]">
          Focus your reading list by selecting a primary area of interest.
        </p>
        <div className="mt-6 space-y-2">
          <Link
            href="/guides"
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
              !selectedCategory
                ? 'border-primary/50 bg-primary/10 text-primary'
                : 'border-transparent bg-surface/60 text-[color:var(--text-secondary)] hover:border-primary/40 hover:bg-surface-muted/60'
            }`}
          >
            <span>All guides</span>
            <span className="text-xs uppercase tracking-[0.25em]">View</span>
          </Link>
          {categories.map((category) => {
            const isActive = selectedCategory?.toLowerCase() === category.toLowerCase()
            return (
              <Link
                key={category}
                href={`/guides?category=${category.toLowerCase()}`}
                className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                  isActive
                    ? 'border-primary/50 bg-primary/10 text-primary'
                    : 'border-transparent bg-surface/60 text-[color:var(--text-secondary)] hover:border-primary/40 hover:bg-surface-muted/60'
                }`}
              >
                <span>{category}</span>
                <span className="text-xs uppercase tracking-[0.25em] text-[color:var(--text-muted)]">Select</span>
              </Link>
            )
          })}
        </div>
      </div>

      <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 shadow-inner-sm">
        <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Reading strategy</h3>
        <ul className="mt-4 space-y-3 text-sm text-[color:var(--text-secondary)]">
          <li className="rounded-2xl border border-transparent bg-surface/60 px-4 py-3">
            Start with a broad overview guide to anchor your understanding.
          </li>
          <li className="rounded-2xl border border-transparent bg-surface/60 px-4 py-3">
            Layer specialised guides for deep dives and practical frameworks.
          </li>
          <li className="rounded-2xl border border-transparent bg-surface/60 px-4 py-3">
            Capture key takeaways and build flashcards directly from highlights.
          </li>
        </ul>
      </div>
    </aside>
  )
}

