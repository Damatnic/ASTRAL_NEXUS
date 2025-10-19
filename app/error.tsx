'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="container mx-auto px-4 pb-24 pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-12 shadow-inner-sm">
          <div className="mb-6 text-6xl">⚠️</div>
          <h1 className="mb-6 text-4xl font-semibold text-[color:var(--text-primary)]">Something Went Wrong</h1>
          <p className="mb-10 text-lg leading-relaxed text-[color:var(--text-secondary)]">
            An unexpected error occurred while loading this page. Please try again.
          </p>
          <button onClick={() => reset()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

