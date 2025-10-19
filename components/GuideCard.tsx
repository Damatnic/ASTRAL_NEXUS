import Link from 'next/link'
import { Guide } from '@/lib/guides'

interface GuideCardProps {
  guide: Guide
}

export default function GuideCard({ guide }: GuideCardProps) {
  return (
    <Link href={`/guides/${guide.slug}`} className="block h-full">
      <div className="glass-card-hover h-full p-6 flex flex-col">
        {/* Category badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="px-3 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary border border-primary/30">
            {guide.category}
          </span>
          {guide.difficulty && (
            <span className="text-xs text-gray-400">{guide.difficulty}</span>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary transition-colors">
          {guide.title}
        </h3>

        {/* Description */}
        <p className="text-gray-400 mb-4 flex-1 line-clamp-3">
          {guide.description}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-white/10">
          <span>{guide.readingTime}</span>
          {guide.tags && guide.tags.length > 0 && (
            <div className="flex gap-2">
              {guide.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-accent">
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

