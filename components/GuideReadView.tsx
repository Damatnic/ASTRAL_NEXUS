'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import EnhancedMarkdownRenderer from './EnhancedMarkdownRenderer'
import GuideTableOfContents, { TocHeading } from './GuideTableOfContents'
import GuideHighlightsPanel from './GuideHighlightsPanel'
import GuideSelectionToolbar from './GuideSelectionToolbar'
import { Guide } from '@/lib/guides'
import { addHighlight, getHighlightsByGuide, removeHighlight } from '@/lib/highlights'
import { loadReadingProgress, saveReadingProgress } from '@/lib/reading-progress'

type ReadingPrefs = {
  fontSize: 'sm' | 'md' | 'lg'
  width: 'normal' | 'wide'
  lineHeight: 'compact' | 'comfortable'
}

const defaultPrefs: ReadingPrefs = {
  fontSize: 'md',
  width: 'normal',
  lineHeight: 'comfortable',
}

interface GuideReadViewProps {
  guide: Guide
}

export default function GuideReadView({ guide }: GuideReadViewProps) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const selectionRangeRef = useRef<Range | null>(null)
  const [selectionAnchor, setSelectionAnchor] = useState<{ x: number; y: number } | null>(null)
  const [selectionText, setSelectionText] = useState('')
  const [prefs, setPrefs] = useState<ReadingPrefs>(defaultPrefs)
  const [activeHeading, setActiveHeading] = useState<string>('')
  const [highlights, setHighlights] = useState<Awaited<ReturnType<typeof getHighlightsByGuide>>>([])
  const headings = useMemo<TocHeading[]>(() => extractHeadings(guide.content), [guide.content])

  // Load reading preferences
  useEffect(() => {
    const stored = localStorage.getItem(`reading-prefs:${guide.slug}`)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setPrefs({ ...defaultPrefs, ...parsed })
      } catch (error) {
        console.warn('Failed to parse reading prefs', error)
      }
    }
  }, [guide.slug])

  // Persist preferences
  useEffect(() => {
    localStorage.setItem(`reading-prefs:${guide.slug}`, JSON.stringify(prefs))
  }, [prefs, guide.slug])

  // Load highlights
  useEffect(() => {
    let cancelled = false
    getHighlightsByGuide(guide.slug).then((items) => {
      if (!cancelled) {
        setHighlights(items)
      }
    })
    return () => {
      cancelled = true
    }
  }, [guide.slug])

  // Apply highlights to DOM whenever list changes
  useEffect(() => {
    applyHighlightsToDom(containerRef.current, highlights)
  }, [highlights, guide.slug])

  // Restore reading progress
  useEffect(() => {
    let cancelled = false
    loadReadingProgress(guide.slug).then((progress) => {
      if (cancelled || !progress) return
      if (progress.lastHeadingId) {
        const container = containerRef.current
        const target = container?.querySelector<HTMLElement>(`#${progress.lastHeadingId}`)
        if (target) {
          setTimeout(() => {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }, 300)
          setActiveHeading(progress.lastHeadingId)
        }
      }
    })
    return () => {
      cancelled = true
    }
  }, [guide.slug])

  // Track active heading with IntersectionObserver
  useEffect(() => {
    const container = containerRef.current
    if (!container || headings.length === 0) return

    const observedHeadings = headings
      .map((heading) => container.querySelector(`#${heading.id}`))
      .filter((el): el is HTMLElement => Boolean(el))

    if (observedHeadings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          const id = visible[0].target.id
          setActiveHeading(id)
          saveReadingProgress(guide.slug, { lastHeadingId: id })
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )

    observedHeadings.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [guide.slug, headings])

  // Selection handling
  useEffect(() => {
    const handleMouseUp = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed) {
        setSelectionAnchor(null)
        setSelectionText('')
        selectionRangeRef.current = null
        return
      }

      const range = selection.getRangeAt(0)
      const container = containerRef.current
      if (!container || !container.contains(range.commonAncestorContainer)) {
        setSelectionAnchor(null)
        setSelectionText('')
        selectionRangeRef.current = null
        return
      }

      const rect = range.getBoundingClientRect()
      setSelectionAnchor({ x: rect.left + rect.width / 2, y: rect.top })
      setSelectionText(selection.toString())
      selectionRangeRef.current = range.cloneRange()
    }

    document.addEventListener('mouseup', handleMouseUp)
    return () => document.removeEventListener('mouseup', handleMouseUp)
  }, [])

  const handleCreateHighlight = async (color: 'yellow' | 'green' | 'pink') => {
    const range = selectionRangeRef.current
    if (!range) return
    const text = selectionText.trim()
    if (!text) return

    const headingId = findNearestHeadingId(range.commonAncestorContainer)
    const id = await addHighlight(guide.slug, text, color, headingId)
    wrapRangeWithHighlight(range, id, color)
    clearTextSelection()
    setHighlights(await getHighlightsByGuide(guide.slug))
  }

  const handleRemoveHighlight = async (id: number) => {
    await removeHighlight(id)
    unwrapHighlightById(containerRef.current, id)
    setHighlights(await getHighlightsByGuide(guide.slug))
  }

  const handleJumpToHighlight = (id: number, headingId?: string) => {
    const article = containerRef.current
    if (!article) return
    const mark = article.querySelector(`mark[data-highlight-id="${id}"]`) as HTMLElement | null
    if (mark) {
      mark.scrollIntoView({ behavior: 'smooth', block: 'center' })
      mark.classList.add('guide-highlight-pulse')
      setTimeout(() => mark.classList.remove('guide-highlight-pulse'), 1000)
    } else if (headingId) {
      const heading = document.getElementById(headingId)
      heading?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleNavigateHeading = (id: string) => {
    const target = containerRef.current?.querySelector<HTMLElement>(`#${id}`)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const contentStyle: React.CSSProperties = {
    fontSize: prefs.fontSize === 'lg' ? '20px' : prefs.fontSize === 'sm' ? '16px' : '18px',
    lineHeight: prefs.lineHeight === 'comfortable' ? 1.8 : 1.6,
    maxWidth: prefs.width === 'wide' ? '840px' : '720px',
  }

  return (
    <div className="flex flex-col lg:flex-row gap-12">
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-8">
          <div className="text-sm text-gray-400">
            Active section: <span className="text-primary font-semibold">{formatHeadingLabel(headings, activeHeading)}</span>
          </div>
          <div className="flex gap-2">
            <PreferenceToggle
              label="Font"
              value={prefs.fontSize}
              options={[
                { id: 'sm', label: 'A' },
                { id: 'md', label: 'A+' },
                { id: 'lg', label: 'A++' },
              ]}
              onChange={(value) => setPrefs((prev) => ({ ...prev, fontSize: value as ReadingPrefs['fontSize'] }))}
            />
            <PreferenceToggle
              label="Width"
              value={prefs.width}
              options={[
                { id: 'normal', label: 'Standard' },
                { id: 'wide', label: 'Wide' },
              ]}
              onChange={(value) => setPrefs((prev) => ({ ...prev, width: value as ReadingPrefs['width'] }))}
            />
            <PreferenceToggle
              label="Spacing"
              value={prefs.lineHeight}
              options={[
                { id: 'compact', label: 'Compact' },
                { id: 'comfortable', label: 'Comfort' },
              ]}
              onChange={(value) => setPrefs((prev) => ({ ...prev, lineHeight: value as ReadingPrefs['lineHeight'] }))}
            />
          </div>
        </div>

        <div className="markdown-wrapper">
          <div ref={containerRef} className="markdown-content" style={contentStyle}>
            <EnhancedMarkdownRenderer content={guide.content} />
          </div>
        </div>

        {selectionAnchor && selectionText && (
          <GuideSelectionToolbar
            x={selectionAnchor.x}
            y={selectionAnchor.y}
            onClose={clearTextSelection}
            onCopy={() => {
              navigator.clipboard.writeText(selectionText)
              clearTextSelection()
            }}
            onHighlight={handleCreateHighlight}
          />
        )}
      </div>

      <aside className="lg:w-80 flex-shrink-0 space-y-6">
        <GuideTableOfContents
          headings={headings}
          activeId={activeHeading}
          onNavigate={handleNavigateHeading}
        />
        <GuideHighlightsPanel
          highlights={highlights}
          onRemove={handleRemoveHighlight}
          onJump={handleJumpToHighlight}
        />
      </aside>
    </div>
  )

  function clearTextSelection() {
    setSelectionAnchor(null)
    setSelectionText('')
    selectionRangeRef.current = null
    const selection = window.getSelection()
    selection?.removeAllRanges()
  }
}

function extractHeadings(content: string): TocHeading[] {
  const regex = /^(#{1,3})\s+(.+)$/gm
  const result: TocHeading[] = []
  let match
  while ((match = regex.exec(content)) !== null) {
    const level = match[1].length
    const text = match[2].trim()
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    result.push({ id, text, level })
  }
  return result
}

function findNearestHeadingId(node: Node): string | undefined {
  let current: Node | null = node
  while (current) {
    if (current instanceof HTMLElement && /H[1-6]/.test(current.tagName) && current.id) {
      return current.id
    }
    current = current.parentNode
  }
  return undefined
}

function wrapRangeWithHighlight(range: Range, id: number, color: 'yellow' | 'green' | 'pink') {
  const contents = range.extractContents()
  const mark = document.createElement('mark')
  mark.appendChild(contents)
  mark.className = `guide-highlight guide-highlight-${color}`
  mark.dataset.highlightId = String(id)
  range.insertNode(mark)
  range.selectNode(mark)
}

function applyHighlightsToDom(article: HTMLElement | null, highlights: Awaited<ReturnType<typeof getHighlightsByGuide>>) {
  if (!article) return
  clearExistingHighlights(article)
  highlights.forEach((highlight) => {
    if (!highlight.id || !highlight.text) return
    const range = findRangeForText(article, highlight.text)
    if (range) {
      wrapRangeWithHighlight(range, highlight.id, highlight.color)
    }
  })
}

function clearExistingHighlights(article: HTMLElement) {
  const marks = article.querySelectorAll('mark.guide-highlight')
  marks.forEach((mark) => unwrapHighlight(mark as HTMLElement))
}

function unwrapHighlight(mark: HTMLElement) {
  const parent = mark.parentNode
  if (!parent) return
  while (mark.firstChild) {
    parent.insertBefore(mark.firstChild, mark)
  }
  parent.removeChild(mark)
  if (parent instanceof HTMLElement) {
    parent.normalize()
  }
}

function unwrapHighlightById(article: HTMLElement | null, id: number) {
  if (!article) return
  article
    .querySelectorAll(`mark[data-highlight-id="${id}"]`)
    .forEach((mark) => unwrapHighlight(mark as HTMLElement))
}

function findRangeForText(root: HTMLElement, text: string): Range | null {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT)
  const target = text.toLowerCase()
  let node: Node | null
  while ((node = walker.nextNode())) {
    const value = node.nodeValue
    if (!value) continue
    const index = value.toLowerCase().indexOf(target)
    if (index !== -1) {
      const range = document.createRange()
      range.setStart(node, index)
      range.setEnd(node, index + text.length)
      return range
    }
  }
  return null
}

interface PreferenceToggleProps<T extends string> {
  label: string
  value: T
  options: { id: T; label: string }[]
  onChange: (value: T) => void
}

function PreferenceToggle<T extends string>({ label, value, options, onChange }: PreferenceToggleProps<T>) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-wide text-gray-500">{label}</span>
      <div className="flex rounded-lg border border-white/10 overflow-hidden">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={`px-3 py-2 text-xs font-semibold transition-colors ${
              value === option.id ? 'bg-primary text-black' : 'bg-white/5 text-gray-400 hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

function formatHeadingLabel(headings: TocHeading[], activeId: string): string {
  const active = headings.find((heading) => heading.id === activeId)
  return active ? active.text : 'Introduction'
}


