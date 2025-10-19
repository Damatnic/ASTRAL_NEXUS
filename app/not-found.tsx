import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 pb-24 pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-12 shadow-inner-sm">
          <div className="mb-8 text-8xl font-bold text-primary">404</div>
          <h1 className="mb-6 text-4xl font-semibold text-[color:var(--text-primary)]">Page Not Found</h1>
          <p className="mb-10 text-lg leading-relaxed text-[color:var(--text-secondary)]">
            The page you&apos;re looking for doesn&apos;t exist in the Astral Nexus library.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/" className="btn-primary">
              Return Home
            </Link>
            <Link href="/guides" className="btn-secondary">
              Browse Guides
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

