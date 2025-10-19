'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

interface SearchResult {
  title: string
  slug: string
  category: string
  snippet: string
  score: number
}

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const searchRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const searchGuides = async () => {
      if (query.length < 2) {
        setResults([])
        setIsOpen(false)
        return
      }

      setIsLoading(true)
      try {
        const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        setResults(data.results || [])
        setIsOpen(true)
      } catch (error) {
        console.error('Search error:', error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounce = setTimeout(searchGuides, 300)
    return () => clearTimeout(debounce)
  }, [query])

  const handleResultClick = (slug: string) => {
    router.push(`/guides/${slug}`)
    setQuery('')
    setIsOpen(false)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (results.length > 0) {
      handleResultClick(results[0].slug)
    }
  }

  return (
    <div ref={searchRef} className="relative w-full">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guides, topics, or keywords..."
            className="w-full rounded-2xl border border-[color:var(--border-soft)] bg-surface/80 px-6 py-4 text-[color:var(--text-primary)] placeholder:text-[color:var(--text-muted)] transition-all focus:border-primary/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
            ) : (
              <svg
                className="h-6 w-6 text-[color:var(--text-muted)]"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            )}
          </div>
        </div>
      </form>

      {/* Search Results Dropdown */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-50 mt-2 w-full max-h-96 overflow-y-auto rounded-2xl border border-[color:var(--border-strong)] bg-background/95 shadow-glow-md backdrop-blur-xl"
          >
            {results.map((result) => (
              <button
                key={result.slug}
                onClick={() => handleResultClick(result.slug)}
                className="w-full border-b border-[color:var(--border-soft)] px-6 py-4 text-left transition-colors last:border-b-0 hover:bg-surface-muted/60"
              >
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="font-semibold text-[color:var(--text-primary)]">{result.title}</h4>
                  <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary">
                    {result.category}
                  </span>
                </div>
                <p className="line-clamp-2 text-sm text-[color:var(--text-secondary)]">{result.snippet}</p>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results */}
      {isOpen && query.length >= 2 && results.length === 0 && !isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute z-50 mt-2 w-full rounded-2xl border border-[color:var(--border-soft)] bg-background/95 p-6 text-center backdrop-blur-xl"
        >
          <p className="text-[color:var(--text-secondary)]">No guides found for &ldquo;{query}&rdquo;</p>
        </motion.div>
      )}
    </div>
  )
}

