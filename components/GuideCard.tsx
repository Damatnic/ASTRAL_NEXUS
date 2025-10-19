import Link from 'next/link'
import { Guide } from '@/lib/guides'

interface GuideCardProps {
  guide: Guide
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-[color:var(--border-soft)] bg-background/70 p-6 transition-all hover:border-primary/60 hover:bg-background/90 hover:shadow-glow-sm"
    >
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="absolute inset-0 rounded-3xl bg-primary/5" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-primary/15 to-transparent" />
      </div>

      <div className="relative flex flex-1 flex-col">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-primary">
            {guide.category}
          </span>
          {guide.difficulty && (
            <span className="text-xs font-medium text-[color:var(--text-muted)]">{guide.difficulty}</span>
          )}
        </div>

        <h3 className="mt-6 text-xl font-semibold text-[color:var(--text-primary)] transition-colors group-hover:text-primary">
          {guide.title}
        </h3>

        <p className="mt-4 flex-1 text-sm leading-relaxed text-[color:var(--text-secondary)] line-clamp-4">
          {guide.description}
        </p>

        <div className="mt-6 flex items-center justify-between border-t border-[color:var(--border-soft)] pt-4 text-xs text-[color:var(--text-muted)]">
          <span>{guide.readingTime}</span>
          {guide.tags && guide.tags.length > 0 && (
            <div className="flex gap-2">
              {guide.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-primary/80">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}

