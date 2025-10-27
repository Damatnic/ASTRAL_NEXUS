'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Guide } from '@/lib/guides'

interface QuickGuideGridProps {
  quickGuides: Guide[]
}

export default function QuickGuideGrid({ quickGuides }: QuickGuideGridProps) {
  if (quickGuides.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-[color:var(--border-soft)] bg-background/70 py-24 text-center">
        <div className="rounded-2xl border border-primary/20 bg-primary/10 px-6 py-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Coming Soon
        </div>
        <h2 className="text-2xl font-semibold text-[color:var(--text-primary)]">
          Quick guides are on the way
        </h2>
        <p className="max-w-lg text-sm text-[color:var(--text-secondary)]">
          We're building out practical, actionable guides with templates and exercises. Check back soon or browse our comprehensive guides.
        </p>
        <Link href="/guides" className="btn-secondary">
          Browse All Guides
        </Link>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {quickGuides.map((guide, idx) => (
        <motion.div
          key={guide.slug}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
        >
          <Link
            href={`/guides/${guide.slug}`}
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-background/70 p-6 transition-all hover:border-primary/60 hover:bg-background/90 hover:shadow-glow-sm"
          >
            {/* Hover effect */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 rounded-3xl bg-primary/5" />
              <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/15 to-transparent" />
            </div>

            <div className="relative flex flex-1 flex-col">
              {/* Header with badges */}
              <div className="mb-4 flex items-start gap-2">
                <span className="inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                  Quick Guide
                </span>
                {guide.timeRequired && (
                  <span className="ml-auto rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-3 py-1 text-xs font-medium text-[color:var(--text-secondary)]">
                    ⏱ {guide.timeRequired}
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="mb-3 text-xl font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-primary">
                {guide.title}
              </h3>

              {/* Description */}
              <p className="mb-4 flex-1 text-sm leading-relaxed text-[color:var(--text-secondary)] line-clamp-3">
                {guide.description}
              </p>

              {/* Features */}
              <div className="flex flex-wrap gap-2 border-t border-[color:var(--border-soft)] pt-4">
                {guide.exercises && (
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    ✏️ Practice
                  </span>
                )}
                {guide.templates && guide.templates.length > 0 && (
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    📄 {guide.templates.length} Templates
                  </span>
                )}
                {guide.realWorldExamples && (
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    💡 Examples
                  </span>
                )}
              </div>

              {/* Footer */}
              <div className="mt-4 flex items-center justify-between text-xs text-[color:var(--text-muted)]">
                <span className="uppercase tracking-[0.25em]">{guide.category}</span>
                <div className="flex items-center gap-1 text-primary transition-transform group-hover:translate-x-1">
                  Read guide
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  )
}

