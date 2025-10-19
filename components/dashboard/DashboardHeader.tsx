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
    <div className="mb-12">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="mb-2 text-4xl font-semibold text-[color:var(--text-primary)] md:text-5xl">
            {greeting}, <span className="text-primary">Scholar</span>
          </h1>
          <p className="text-[color:var(--text-secondary)]">
            {streakDays > 0 ? `Day ${streakDays} of your streak. Keep the momentum going!` : 'Start your learning journey today.'}
          </p>
        </div>
        <div className="flex flex-wrap justify-end gap-3">
          <Link href={nextGuide ? `/guides/${nextGuide.slug}` : '/guides'} className="btn-primary">
            {nextGuide ? `Continue ${truncate(nextGuide.title, 22)}` : 'Browse Guides'}
          </Link>
          <Link href="/study" className="btn-secondary">Open Study Center</Link>
        </div>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {checklist.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-start gap-3 rounded-2xl border border-[color:var(--border-soft)] bg-surface/60 p-4 transition-all hover:border-primary/60 hover:bg-surface-muted/60"
          >
            <div className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-semibold ${item.done ? 'bg-green-500/80 text-black' : 'border border-primary/50 bg-primary/30 text-primary'}`}>
              {item.done ? '✓' : '•'}
            </div>
            <div>
              <div className="text-sm font-semibold text-[color:var(--text-primary)]">{item.label}</div>
              <div className="mt-1 text-xs text-[color:var(--text-muted)]">{item.badge}</div>
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


