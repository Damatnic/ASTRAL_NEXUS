import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-[color:var(--border-soft)] bg-background/80">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div className="space-y-6">
            <div className="flex items-start gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[color:var(--border-soft)] bg-surface-muted/70 shadow-inner-sm">
                <span className="text-lg font-semibold tracking-wide text-primary">AN</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">Astral Nexus</p>
                <p className="text-xl font-semibold text-[color:var(--text-primary)]">Guide Library</p>
              </div>
            </div>
            <p className="max-w-lg text-sm leading-relaxed text-[color:var(--text-secondary)]">
              A refined repository for curated wisdom. Discover, organise, and master expert-crafted guides that elevate every facet of your craft.
            </p>
            <div className="flex flex-col gap-2 rounded-2xl border border-[color:var(--border-soft)] bg-surface/70 p-6 shadow-inner-sm">
              <div className="text-xs uppercase tracking-[0.3em] text-[color:var(--text-muted)]">Stay aligned</div>
              <div className="text-lg font-medium text-[color:var(--text-primary)]">Monthly guide digest</div>
              <p className="text-sm text-[color:var(--text-muted)]">Receive fresh frameworks, annotated highlights, and practical applications direct to your inbox.</p>
              <form className="mt-4 flex w-full flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="flex-1 rounded-xl border border-[color:var(--border-soft)] bg-surface-subtle/80 px-4 py-3 text-sm text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] focus:border-primary/70 focus:outline-none"
                />
                <button type="submit" className="btn-primary whitespace-nowrap">Join the list</button>
              </form>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Explore</h3>
            <ul className="space-y-3 text-sm text-[color:var(--text-secondary)]">
              <li>
                <Link href="/guides" className="transition-colors hover:text-primary">All guides</Link>
              </li>
              <li>
                <Link href="/categories" className="transition-colors hover:text-primary">Browse categories</Link>
              </li>
              <li>
                <Link href="/study" className="transition-colors hover:text-primary">Study centre</Link>
              </li>
              <li>
                <Link href="/knowledge-graph" className="transition-colors hover:text-primary">Knowledge graph</Link>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-xs uppercase tracking-[0.3em] text-primary">Resources</h3>
            <ul className="space-y-3 text-sm text-[color:var(--text-secondary)]">
              <li>
                <a href="#" className="transition-colors hover:text-primary">Editorial standards</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">Submission guidelines</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">Support</a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-primary">Press kit</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 border-t border-[color:var(--border-soft)] pt-8">
          <div className="flex flex-col gap-6 text-sm text-[color:var(--text-muted)] md:flex-row md:items-center md:justify-between">
            <p>© {currentYear} Astral Nexus. Crafted for lifelong learners.</p>
            <div className="flex flex-wrap gap-6">
              <a href="#" className="transition-colors hover:text-primary">Privacy</a>
              <a href="#" className="transition-colors hover:text-primary">Terms</a>
              <a href="#" className="transition-colors hover:text-primary">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

