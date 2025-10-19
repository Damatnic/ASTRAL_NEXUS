'use client'

import { useEffect, useRef } from 'react'

export interface TocHeading {
  id: string
  text: string
  level: number
}

interface GuideTableOfContentsProps {
  headings: TocHeading[]
  activeId?: string
  onNavigate?: (id: string) => void
}

export default function GuideTableOfContents({ headings, activeId, onNavigate }: GuideTableOfContentsProps) {
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    if (!activeId || !listRef.current) return
    const activeElement = listRef.current.querySelector<HTMLButtonElement>(`button[data-id="${activeId}"]`)
    if (activeElement) {
      activeElement.scrollIntoView({ block: 'nearest' })
    }
  }, [activeId])

  if (!headings || headings.length === 0) return null

  return (
    <nav className="glass-card p-6 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold text-primary">On this page</h3>
        <span className="text-xs text-gray-500">{headings.length} sections</span>
      </div>
      <ul ref={listRef} className="space-y-2 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
        {headings.map((heading) => {
          const isActive = heading.id === activeId
          return (
            <li key={heading.id} style={{ paddingLeft: `${(heading.level - 1) * 12}px` }}>
              <button
                data-id={heading.id}
                onClick={() => onNavigate?.(heading.id)}
                className={`text-sm text-left w-full py-1 rounded-md transition-colors ${
                  isActive ? 'text-primary font-semibold bg-white/10' : 'text-gray-400 hover:text-primary'
                }`}
              >
                {heading.text}
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}


