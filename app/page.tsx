import Link from 'next/link'
import { getAllGuides } from '@/lib/guides'
import GuideCard from '@/components/GuideCard'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  const guides = getAllGuides()
  const featuredGuides = guides.slice(0, 3)

  return (
    <div className="w-full">
      {/* Hero Section - Clean & Focused */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6">
              Astral <span className="neon-text">Nexus</span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 md:mb-12 leading-relaxed px-4">
              Master life skills with interactive tools, AI assistance, and proven learning methods
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 px-4">
              <Link href="/guides" className="btn-primary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] flex items-center justify-center">
                Browse Guides
              </Link>
              <Link href="/study" className="btn-secondary text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 min-h-[48px] flex items-center justify-center">
                Start Learning
              </Link>
            </div>
            <SearchBar />
          </div>
        </div>
      </section>

      {/* Featured Guides - 3 cards max */}
      <section className="container mx-auto px-4 py-12 sm:py-20">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">
          Featured <span className="text-primary">Guides</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      {/* Study Tools Preview - Clean grid */}
      <section className="container mx-auto px-4 py-12 sm:py-20 bg-white/5">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">
          Powerful <span className="text-primary">Study Tools</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div className="glass-card p-8 text-center hover:shadow-glow-md transition-all duration-300">
            <div className="text-6xl mb-6">🎴</div>
            <h3 className="text-xl font-bold mb-3 text-primary">Flashcards</h3>
            <p className="text-gray-300">
              Spaced repetition system that adapts to your learning pace
            </p>
          </div>
          <div className="glass-card p-8 text-center hover:shadow-glow-md transition-all duration-300">
            <div className="text-6xl mb-6">✏️</div>
            <h3 className="text-xl font-bold mb-3 text-primary">Quizzes</h3>
            <p className="text-gray-300">
              Interactive tests with instant feedback and progress tracking
            </p>
          </div>
          <div className="glass-card p-8 text-center hover:shadow-glow-md transition-all duration-300">
            <div className="text-6xl mb-6">📝</div>
            <h3 className="text-xl font-bold mb-3 text-primary">Notes</h3>
            <p className="text-gray-300">
              Smart highlighting and annotation with powerful organization
            </p>
          </div>
          <div className="glass-card p-8 text-center hover:shadow-glow-md transition-all duration-300">
            <div className="text-6xl mb-6">🤖</div>
            <h3 className="text-xl font-bold mb-3 text-primary">AI Helper</h3>
            <p className="text-gray-300">
              Get instant answers and personalized study assistance
            </p>
          </div>
          <div className="glass-card p-8 text-center hover:shadow-glow-md transition-all duration-300">
            <div className="text-6xl mb-6">📊</div>
            <h3 className="text-xl font-bold mb-3 text-primary">Progress</h3>
            <p className="text-gray-300">
              Track your learning journey with detailed analytics
            </p>
          </div>
          <div className="glass-card p-8 text-center hover:shadow-glow-md transition-all duration-300">
            <div className="text-6xl mb-6">⚡</div>
            <h3 className="text-xl font-bold mb-3 text-primary">Quick Ref</h3>
            <p className="text-gray-300">
              Instant access to key concepts and cheat sheets
            </p>
          </div>
        </div>
      </section>

      {/* Simple CTA */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">
            Ready to start <span className="neon-text">learning</span>?
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join thousands of learners mastering essential life skills with our interactive platform
          </p>
          <Link href="/guides" className="btn-primary text-lg px-12 py-4 inline-block">
            Browse All Guides
          </Link>
        </div>
      </section>
    </div>
  )
}

