'use client'

import Link from 'next/link'

interface DashboardHeaderProps {
  nextGuide?: { slug: string; title: string }
  reviewQueue: number
  streakDays: number
}

export default function DashboardHeader({ nextGuide, reviewQueue, streakDays }: DashboardHeaderProps) {
  const now = new Date()
  const greeting = now.getHours() < 12 ? 'Good morning' : now.getHours() < 18 ? 'Good afternoon' : 'Good evening'

  const checklist = [
    {
      label: 'Review flashcards',
      done: reviewQueue === 0,
      href: '/study',
      badge: reviewQueue > 0 ? `${reviewQueue} due` : 'Up to date',
    },
    {
      label: nextGuide ? `Continue ${nextGuide.title}` : 'Explore guides',
      done: Boolean(nextGuide && streakDays >= 3),
      href: nextGuide ? `/guides/${nextGuide.slug}` : '/guides',
      badge: nextGuide ? 'In progress' : 'New topic',
    },
    {
      label: 'Take a quiz',
      done: false,
      href: '/study',
      badge: 'Self-test',
    },
  ]

  return (
    <div className="mb-10">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {greeting}, <span className="neon-text">Scholar</span>
          </h1>
          <p className="text-gray-400">
            {streakDays > 0 ? `Day ${streakDays} of your streak. Keep the momentum going!` : 'Start your learning journey today.'}
          </p>
        </div>
        <div className="flex flex-wrap gap-3 justify-end">
          <Link href={nextGuide ? `/guides/${nextGuide.slug}` : '/guides'} className="btn-primary">
            {nextGuide ? `Continue ${truncate(nextGuide.title, 22)}` : 'Browse Guides'}
          </Link>
          <Link href="/study" className="btn-secondary">Open Study Center</Link>
        </div>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 sm:grid-cols-2 gap-4">
        {checklist.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="glass-card-hover p-4 rounded-xl border border-white/10 flex items-start gap-3"
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${item.done ? 'bg-green-500/80 text-black' : 'bg-primary/30 text-primary border border-primary/50'}`}>
              {item.done ? '✓' : '•'}
            </div>
            <div>
              <div className="text-sm font-semibold text-white">{item.label}</div>
              <div className="text-xs text-gray-400 mt-1">{item.badge}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function truncate(value: string, max: number): string {
  if (value.length <= max) return value
  return `${value.slice(0, max - 1)}…`
}


