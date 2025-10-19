import Link from 'next/link'
import { getAllGuides } from '@/lib/guides'
import GuideCard from '@/components/GuideCard'
import SearchBar from '@/components/SearchBar'

export default function Home() {
  const guides = getAllGuides()
  const latestGuides = guides.slice(0, 4)
  const featuredGuides = guides.slice(0, 3)
  const categories = Array.from(new Set(guides.map((guide) => guide.category))).slice(0, 6)

  return (
    <div className="flex w-full flex-col gap-24">
      <section className="relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[420px] bg-gradient-to-b from-primary/15 via-background/60 to-background" />
        <div className="container relative z-10 mx-auto px-4 pb-12 pt-24 md:pt-32">
          <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
            <span className="rounded-full border border-[color:var(--border-soft)] bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
              Curated Guide Library
            </span>
            <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-[color:var(--text-primary)] md:text-6xl">
              Knowledge crafted for ambitious learners
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed text-[color:var(--text-secondary)]">
              Discover actionable frameworks, field-tested strategies, and distilled insights. Each guide is structured for quick comprehension and long-term mastery.
            </p>
            <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link href="/guides" className="btn-primary w-full sm:w-auto">
                Explore the library
              </Link>
              <Link href="/study" className="btn-secondary w-full sm:w-auto">
                Continue studying
              </Link>
            </div>
            <div className="w-full max-w-3xl rounded-2xl border border-[color:var(--border-soft)] bg-background/80 p-2 shadow-inner-sm">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <h2 className="text-3xl font-semibold text-[color:var(--text-primary)] md:text-4xl">
              Featured narratives
            </h2>
            <p className="text-base text-[color:var(--text-secondary)]">
              Editor-curated selections to anchor your journey. Each guide pairs practical tactics with strategic perspective.
            </p>
          </div>
          <Link href="/guides" className="btn-secondary self-start">
            View all guides
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featuredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-4">
            <h2 className="text-3xl font-semibold text-[color:var(--text-primary)] md:text-4xl">
              Latest releases
            </h2>
            <p className="max-w-2xl text-base text-[color:var(--text-secondary)]">
              Fresh thinking from subject specialists, complete with summaries, implementation steps, and curated references.
            </p>
          </div>
          <Link href="/guides?sort=latest" className="text-sm font-medium text-primary transition-colors hover:text-accent">
            Browse most recent
          </Link>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {latestGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border border-[color:var(--border-soft)] bg-surface/60 p-10 md:p-14 shadow-glow-sm">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">How to use the library</span>
              <h2 className="text-3xl font-semibold text-[color:var(--text-primary)] md:text-4xl">
                A disciplined approach to personal mastery
              </h2>
              <p className="text-base text-[color:var(--text-secondary)]">
                Progress through curated sequences, capture action notes, and connect themes across domains. The Astral methodology balances strategic clarity with on-the-ground application.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {[{
                  title: 'Guided pathways',
                  description: 'Follow thematic collections that map principles, case studies, and weekly action prompts.',
                }, {
                  title: 'Research-backed insights',
                  description: 'Each guide cites core studies, practitioner interviews, and field-tested frameworks.',
                }, {
                  title: 'Retention systems',
                  description: 'Convert highlights into flashcards, quiz sets, and spaced review loops automatically.',
                }, {
                  title: 'Integrated workspace',
                  description: 'Capture notes, timeline progress, and maintain context with the Astral dashboard.',
                }].map((item) => (
                  <div key={item.title} className="rounded-2xl border border-[color:var(--border-soft)] bg-background/70 p-5">
                    <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{item.title}</h3>
                    <p className="mt-2 text-sm text-[color:var(--text-secondary)]">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6 rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-8">
              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-primary">Snapshot</span>
                <h3 className="text-2xl font-semibold text-[color:var(--text-primary)]">Library at a glance</h3>
                <p className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                  Designed for intent-driven learners who demand clarity and precision.
                </p>
              </div>
              <div className="space-y-3 text-sm text-[color:var(--text-secondary)]">
                <div className="flex items-center justify-between rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-4 py-3">
                  <span>Guides published</span>
                  <span className="text-base font-semibold text-[color:var(--text-primary)]">{guides.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-4 py-3">
                  <span>Focus areas</span>
                  <span className="text-base font-semibold text-[color:var(--text-primary)]">{categories.length}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-4 py-3">
                  <span>Avg. reading time</span>
                  <span className="text-base font-semibold text-[color:var(--text-primary)]">{guides.length ? featuredGuides[0].readingTime : '—'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-10 md:p-14">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1fr] lg:items-center">
            <div className="space-y-6">
              <span className="text-xs uppercase tracking-[0.3em] text-primary">Find your next guide</span>
              <h2 className="text-3xl font-semibold text-[color:var(--text-primary)] md:text-4xl">
                Explore by discipline
              </h2>
              <p className="text-base text-[color:var(--text-secondary)]">
                Traverse the library by category to build deep competency. Each discipline includes signature guides, supporting resources, and recommended sequencing.
              </p>
              <Link href="/guides" className="btn-primary w-full sm:w-auto">
                Browse all categories
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/guides?category=${category.toLowerCase()}`}
                  className="group flex flex-col justify-between rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-5 transition-colors hover:border-primary/60 hover:bg-surface-muted/60"
                >
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-primary/80">Discipline</span>
                    <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{category}</h3>
                  </div>
                  <span className="mt-6 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">View collection →</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 pb-24">
        <div className="rounded-3xl border border-primary/20 bg-primary/10 px-10 py-14 text-center shadow-glow-sm">
          <div className="mx-auto flex max-w-3xl flex-col gap-8">
            <h2 className="text-3xl font-semibold text-[color:var(--text-primary)] md:text-4xl">
              Build a reliable practice around knowledge acquisition
            </h2>
            <p className="text-lg leading-relaxed text-[color:var(--text-secondary)]">
              Commit to deliberate learning with a structured guide library, intelligent retention tools, and deep contextual notes. Astral Nexus keeps your knowledge aligned and actionable.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Link href="/guides" className="btn-primary sm:w-auto">
                Access the library
              </Link>
              <Link href="/dashboard" className="btn-secondary sm:w-auto">
                Open your workspace
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

