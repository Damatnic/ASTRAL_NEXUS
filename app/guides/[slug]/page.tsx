import { notFound } from 'next/navigation'
import { getGuideBySlug, getAllGuides, getRelatedGuides } from '@/lib/guides'
import { generateGuideMetadata } from '@/lib/metadata'
import StudyModeSwitcher from '@/components/StudyModeSwitcher'
import GuideTableOfContents from '@/components/GuideTableOfContents'
import ProgressWidget from '@/components/ProgressWidget'
import AIChat from '@/components/AIChat'
import InteractiveTutorial from '@/components/InteractiveTutorial'
import Link from 'next/link'

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
    <div className="container mx-auto px-4 py-12">
      <InteractiveTutorial guideSlug={slug} guideTitle={guide.title} />
      
      {/* Breadcrumbs */}
      <nav className="mb-8 flex items-center space-x-2 text-sm text-gray-400">
        <Link href="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/guides" className="hover:text-primary transition-colors">
          Guides
        </Link>
        <span>/</span>
        <Link
          href={`/guides?category=${guide.category.toLowerCase()}`}
          className="hover:text-primary transition-colors"
        >
          {guide.category}
        </Link>
        <span>/</span>
        <span className="text-white">{guide.title}</span>
      </nav>

      {/* Header */}
      <div className="mb-12">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-4 py-2 rounded-full bg-primary/20 text-primary border border-primary/30 font-semibold">
            {guide.category}
          </span>
          {guide.difficulty && (
            <span className="px-4 py-2 rounded-full glass-card text-gray-300">
              {guide.difficulty}
            </span>
          )}
          <span className="px-4 py-2 rounded-full glass-card text-gray-300">
            {guide.readingTime}
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 neon-text leading-tight">
          {guide.title}
        </h1>

        {guide.description && (
          <p className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">{guide.description}</p>
        )}

        {guide.tags && guide.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {guide.tags.map((tag) => (
              <Link
                key={tag}
                href={`/guides?tag=${tag.toLowerCase()}`}
                className="text-sm px-3 py-1 rounded-full glass-card text-accent hover:border-accent hover:shadow-glow-sm transition-all"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}

        {/* Study Tools Quick Access */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Link
            href={`/study/flashcards/${slug}`}
            className="glass-card-hover p-3 sm:p-4 text-center group min-h-[88px] flex flex-col items-center justify-center"
          >
            <div className="text-2xl sm:text-3xl mb-2">🎴</div>
            <div className="text-xs sm:text-sm font-semibold group-hover:text-primary transition-colors">Flashcards</div>
          </Link>
          <Link
            href={`/study/quiz/${slug}`}
            className="glass-card-hover p-3 sm:p-4 text-center group min-h-[88px] flex flex-col items-center justify-center"
          >
            <div className="text-2xl sm:text-3xl mb-2">✏️</div>
            <div className="text-xs sm:text-sm font-semibold group-hover:text-primary transition-colors">Take Quiz</div>
          </Link>
          <Link
            href={`/study/plan/${slug}`}
            className="glass-card-hover p-3 sm:p-4 text-center group min-h-[88px] flex flex-col items-center justify-center"
          >
            <div className="text-2xl sm:text-3xl mb-2">📅</div>
            <div className="text-xs sm:text-sm font-semibold group-hover:text-primary transition-colors">Study Plan</div>
          </Link>
          <Link
            href={`/dashboard`}
            className="glass-card-hover p-3 sm:p-4 text-center group min-h-[88px] flex flex-col items-center justify-center"
          >
            <div className="text-2xl sm:text-3xl mb-2">📊</div>
            <div className="text-xs sm:text-sm font-semibold group-hover:text-primary transition-colors">My Progress</div>
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content - Study Mode Switcher */}
        <article className="flex-1 min-w-0">
          <StudyModeSwitcher guide={guide} />
        </article>

        {/* Sidebar */}
        <aside className="lg:w-80 flex-shrink-0 space-y-6">
          <ProgressWidget guideSlug={slug} guideTitle={guide.title} />
          
          <GuideTableOfContents content={guide.content} />

          {/* Related Guides */}
          {relatedGuides.length > 0 && (
            <div className="glass-card p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-primary mb-4">
                Related Guides
              </h3>
              <div className="space-y-4">
                {relatedGuides.map((relatedGuide) => (
                  <Link
                    key={relatedGuide.slug}
                    href={`/guides/${relatedGuide.slug}`}
                    className="block p-4 rounded-lg glass-card-hover"
                  >
                    <h4 className="font-semibold text-white mb-1">
                      {relatedGuide.title}
                    </h4>
                    <p className="text-sm text-gray-400 line-clamp-2">
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

