import Link from 'next/link'
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
    <div className="container mx-auto px-4 pb-24 pt-16">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Astral guide library</span>
          <h1 className="text-4xl font-semibold text-[color:var(--text-primary)] md:text-5xl">
            All guides
          </h1>
          <p className="max-w-2xl text-base text-[color:var(--text-secondary)]">
            {selectedCategory
              ? `Curated guides focused on ${selectedCategory.toLowerCase()}, blending strategic perspective with actionable practice.`
              : `Explore ${allGuides.length} evidence-backed guides spanning performance, leadership, communication, and beyond.`}
          </p>
        </div>
        <div className="flex items-center gap-6 rounded-3xl border border-[color:var(--border-soft)] bg-background/70 px-6 py-4 text-sm text-[color:var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Guides</span>
            <span className="text-lg font-semibold text-[color:var(--text-primary)]">{filteredGuides.length}</span>
          </div>
          <div className="h-8 w-px bg-[color:var(--border-soft)]" aria-hidden />
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Categories</span>
            <span className="text-lg font-semibold text-[color:var(--text-primary)]">{categories.length}</span>
          </div>
        </div>
      </div>

      <div className="mt-16 grid gap-10 lg:grid-cols-[0.28fr_0.72fr]">
        <CategoryFilter categories={categories} selectedCategory={selectedCategory} />

        <div className="space-y-6">
          {filteredGuides.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2">
              {filteredGuides.map((guide) => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-[color:var(--border-soft)] bg-background/70 py-24 text-center">
              <div className="rounded-2xl border border-primary/20 bg-primary/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
                No guides yet
              </div>
              <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">
                We&apos;re expanding this collection
              </h2>
              <p className="max-w-lg text-sm text-[color:var(--text-secondary)]">
                The editorial team is refining resources for this discipline. Check back soon or suggest a topic for us to prioritise.
              </p>
              <Link href="/contact" className="btn-secondary">
                Suggest a guide
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

