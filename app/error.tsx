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
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-12">
          <div className="text-6xl mb-6">⚠️</div>
          <h1 className="text-4xl font-bold mb-4">Something Went Wrong</h1>
          <p className="text-xl text-gray-400 mb-8">
            An error occurred while loading this page.
          </p>
          <button onClick={() => reset()} className="btn-primary">
            Try Again
          </button>
        </div>
      </div>
    </div>
  )
}

