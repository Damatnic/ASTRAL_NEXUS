import { getGuideBySlug, getAllGuides } from '@/lib/guides'
import { notFound } from 'next/navigation'
import StudyPlanViewer from '@/components/StudyPlanViewer'
import Link from 'next/link'

export async function generateStaticParams() {
  const guides = getAllGuides()
  return guides.map((guide) => ({
    slug: guide.slug,
  }))
}

export default async function StudyPlanPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = getGuideBySlug(slug)

  if (!guide) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <div className="mb-8">
        <Link
          href={`/guides/${slug}`}
          className="inline-flex items-center text-primary hover:text-accent transition-colors mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 19l-7-7 7-7" />
          </svg>
          Back to Guide
        </Link>
        <h1 className="text-4xl font-bold mb-2">
          Study Plan: <span className="neon-text">{guide.title}</span>
        </h1>
        <p className="text-gray-400">
          Your personalized learning schedule
        </p>
      </div>

      {/* Study Plan Component */}
      <StudyPlanViewer guide={guide} />
    </div>
  )
}

