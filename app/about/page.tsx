import Link from 'next/link'

export const metadata = {
  title: 'About | Astral Nexus',
  description: 'Learn about Astral Nexus and our mission to provide comprehensive knowledge and guides.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 pb-24 pt-16">
      <div className="mx-auto max-w-4xl">
        <div className="mb-16 text-center">
          <span className="mb-6 inline-block rounded-full border border-[color:var(--border-soft)] bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            About Us
          </span>
          <h1 className="mb-6 text-4xl font-semibold text-[color:var(--text-primary)] md:text-5xl">
            Astral Nexus Guide Library
          </h1>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-[color:var(--text-secondary)]">
            A curated repository for ambitious learners seeking clarity, precision, and actionable knowledge.
          </p>
        </div>

        <div className="space-y-8">
          <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-8 shadow-inner-sm md:p-12">
            <h2 className="mb-4 text-xs uppercase tracking-[0.3em] text-primary">Our Mission</h2>
            <p className="mb-6 leading-relaxed text-[color:var(--text-secondary)]">
              Astral Nexus is the definitive knowledge hub for those who demand precision and depth. We aggregate field-tested frameworks, distilled research, and practitioner insights into a unified platform that rewards deliberate study and continuous refinement.
            </p>

            <h2 className="mb-4 mt-10 text-xs uppercase tracking-[0.3em] text-primary">
              What We Offer
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-5">
                <div className="mb-2 text-2xl">📖</div>
                <h3 className="mb-2 text-base font-semibold text-[color:var(--text-primary)]">
                  Comprehensive Guides
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  From strategic leadership to technical mastery, each guide blends theory with real-world application.
                </p>
              </div>
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-5">
                <div className="mb-2 text-2xl">🔍</div>
                <h3 className="mb-2 text-base font-semibold text-[color:var(--text-primary)]">
                  Smart Search
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  Semantic search that surfaces relevant frameworks, case studies, and tactical references instantly.
                </p>
              </div>
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-5">
                <div className="mb-2 text-2xl">🗂️</div>
                <h3 className="mb-2 text-base font-semibold text-[color:var(--text-primary)]">
                  Organized Learning
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  Browse by discipline, difficulty, and thematic tags to build structured learning pathways.
                </p>
              </div>
              <div className="rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-5">
                <div className="mb-2 text-2xl">🤖</div>
                <h3 className="mb-2 text-base font-semibold text-[color:var(--text-primary)]">
                  Contextual Assistance
                </h3>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  AI-powered helper surfaces related concepts, answers questions, and connects themes across domains.
                </p>
              </div>
            </div>

            <h2 className="mb-4 mt-10 text-xs uppercase tracking-[0.3em] text-primary">Philosophy</h2>
            <p className="leading-relaxed text-[color:var(--text-secondary)]">
              Astral Nexus is built for practitioners who treat knowledge work as a discipline. Our design favors clarity over decoration, precision over volume, and deliberate practice over passive consumption. Every guide is structured for quick comprehension and long-term retention.
            </p>

            <div className="mt-10 rounded-3xl border border-primary/20 bg-primary/10 p-8 text-center shadow-inner-sm">
              <p className="text-lg font-medium italic text-[color:var(--text-primary)]">
                &ldquo;Knowledge crafted for ambitious learners&rdquo;
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/guides"
            className="btn-primary"
          >
            Explore the Library
          </Link>
        </div>
      </div>
    </div>
  )
}

