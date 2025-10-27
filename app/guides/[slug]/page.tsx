import { notFound } from 'next/navigation'
import { getGuideBySlug, getAllGuides, getRelatedGuides } from '@/lib/guides'
import { generateGuideMetadata } from '@/lib/metadata'
import StudyModeSwitcher from '@/components/StudyModeSwitcher'
import GuideTableOfContents, { TocHeading } from '@/components/GuideTableOfContents'
import ProgressWidget from '@/components/ProgressWidget'
import AIChat from '@/components/AIChat'
import InteractiveTutorial from '@/components/InteractiveTutorial'
import Link from 'next/link'

function extractHeadings(content: string): TocHeading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm
  const headings: TocHeading[] = []
  let match

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
    headings.push({ id, text, level })
  }

  return headings
}

export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)
  if (!guide) return {}
  return generateGuideMetadata(guide)
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  const relatedGuides = getRelatedGuides(slug)

  return (
    <div className="container mx-auto px-4 pb-24 pt-8">
      <InteractiveTutorial guideSlug={slug} guideTitle={guide.title} />
      
      {/* Breadcrumbs */}
      <nav className="mb-10 flex items-center gap-2 text-sm text-[color:var(--text-muted)]">
        <Link href="/" className="transition-colors hover:text-primary">
          Home
        </Link>
        <span>/</span>
        <Link href="/guides" className="transition-colors hover:text-primary">
          Guides
        </Link>
        <span>/</span>
        <Link
          href={`/guides?category=${guide.category.toLowerCase()}`}
          className="transition-colors hover:text-primary"
        >
          {guide.category}
        </Link>
        <span>/</span>
        <span className="text-[color:var(--text-primary)]">{guide.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-16">
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
            {guide.category}
          </span>
          {guide.difficulty && (
            <span className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-4 py-1.5 text-xs font-medium text-[color:var(--text-secondary)]">
              {guide.difficulty}
            </span>
          )}
          <span className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-4 py-1.5 text-xs font-medium text-[color:var(--text-secondary)]">
            {guide.readingTime}
          </span>
        </div>

        <h1 className="mb-6 text-3xl font-semibold leading-tight text-[color:var(--text-primary)] sm:text-4xl md:text-5xl lg:text-6xl">
          {guide.title}
        </h1>

        {guide.description && (
          <p className="mb-8 max-w-3xl text-base leading-relaxed text-[color:var(--text-secondary)] sm:text-lg md:text-xl">
            {guide.description}
          </p>
        )}

        {guide.tags && guide.tags.length > 0 && (
          <div className="mb-10 flex flex-wrap gap-2">
            {guide.tags.map((tag) => (
              <Link
                key={tag}
                href={`/guides?tag=${tag.toLowerCase()}`}
                className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-3 py-1.5 text-xs font-medium text-primary/80 transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:text-primary"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Study Tools Quick Access */}
        <div className="rounded-3xl border border-[color:var(--border-soft)] bg-surface/60 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xs uppercase tracking-[0.3em] text-primary">Study Tools</h2>
            <span className="text-xs text-[color:var(--text-muted)]">Quick access</span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Link
              href={`/study/flashcards/${slug}`}
              className="group flex min-h-[100px] flex-col items-center justify-center rounded-2xl border border-[color:var(--border-soft)] bg-background/70 p-4 transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:shadow-glow-sm"
            >
              <div className="mb-3 text-3xl">🎴</div>
              <div className="text-center text-sm font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-primary">
                Flashcards
              </div>
            </Link>
            <Link
              href={`/study/quiz/${slug}`}
              className="group flex min-h-[100px] flex-col items-center justify-center rounded-2xl border border-[color:var(--border-soft)] bg-background/70 p-4 transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:shadow-glow-sm"
            >
              <div className="mb-3 text-3xl">✏️</div>
              <div className="text-center text-sm font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-primary">
                Take Quiz
              </div>
            </Link>
            <Link
              href={`/study/plan/${slug}`}
              className="group flex min-h-[100px] flex-col items-center justify-center rounded-2xl border border-[color:var(--border-soft)] bg-background/70 p-4 transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:shadow-glow-sm"
            >
              <div className="mb-3 text-3xl">📅</div>
              <div className="text-center text-sm font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-primary">
                Study Plan
              </div>
            </Link>
            <Link
              href={`/dashboard`}
              className="group flex min-h-[100px] flex-col items-center justify-center rounded-2xl border border-[color:var(--border-soft)] bg-background/70 p-4 transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:shadow-glow-sm"
            >
              <div className="mb-3 text-3xl">📊</div>
              <div className="text-center text-sm font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-primary">
                Progress
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-12">
        {/* Main Content - Study Mode Switcher */}
        <article className="min-w-0 flex-1">
          <StudyModeSwitcher guide={guide} />
        </article>

        {/* Sidebar */}
        <aside className="flex-shrink-0 space-y-6 lg:w-80">
          <ProgressWidget guideSlug={slug} guideTitle={guide.title} />
          
          <GuideTableOfContents headings={extractHeadings(guide.content)} />

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 shadow-inner-sm">
              <h3 className="mb-5 text-xs uppercase tracking-[0.3em] text-primary">
                Related Guides
              </h3>
              <div className="space-y-3">
                {relatedGuides.map((relatedGuide) => (
                  <Link
                    key={relatedGuide.slug}
                    href={`/guides/${relatedGuide.slug}`}
                    className="block rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-4 transition-all hover:border-primary/60 hover:bg-surface-muted/60 hover:shadow-glow-sm"
                  >
                    <h4 className="mb-2 text-sm font-semibold text-[color:var(--text-primary)]">
                      {relatedGuide.title}
                    </h4>
                    <p className="line-clamp-2 text-xs leading-relaxed text-[color:var(--text-secondary)]">
                      {relatedGuide.description}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* AI Chat Assistant */}
      <AIChat guideSlug={slug} guideTitle={guide.title} />
    </div>
  )
}

