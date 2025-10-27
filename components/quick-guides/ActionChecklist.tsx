'use client'

import React, { useState } from 'react'

interface ChecklistItem {
  id: string
  label: string
  description?: string
}

interface ActionChecklistProps {
  title: string
  items: ChecklistItem[]
}

export default function ActionChecklist({ title, items }: ActionChecklistProps) {
  const [checked, setChecked] = useState<Set<string>>(new Set())

  const toggleItem = (id: string) => {
    const newChecked = new Set(checked)
    if (newChecked.has(id)) {
      newChecked.delete(id)
    } else {
      newChecked.add(id)
    }
    setChecked(newChecked)
  }

  const progress = Math.round((checked.size / items.length) * 100)

  return (
    <div className="rounded-2xl border border-[color:var(--border-soft)] bg-background/80 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[color:var(--text-primary)]">{title}</h3>
        <span className="text-xs font-semibold text-primary">{progress}% Complete</span>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex cursor-pointer items-start gap-3 rounded-xl border border-[color:var(--border-soft)] bg-surface/60 p-3 transition-all hover:border-primary/60 hover:bg-surface-muted/60"
            onClick={() => toggleItem(item.id)}
          >
            <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 border-primary/40 bg-transparent text-primary transition-all">
              {checked.has(item.id) && <span className="text-xs">✓</span>}
            </div>
            <div className="flex-1">
              <div className={`text-sm font-medium ${checked.has(item.id) ? 'text-[color:var(--text-muted)] line-through' : 'text-[color:var(--text-primary)]'}`}>
                {item.label}
              </div>
              {item.description && (
                <div className="mt-1 text-xs text-[color:var(--text-secondary)]">
                  {item.description}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      {checked.size === items.length && (
        <div className="mt-4 rounded-xl border border-green-500/40 bg-green-500/10 p-4 text-center">
          <span className="text-2xl">🎉</span>
          <div className="mt-2 text-sm font-semibold text-green-400">All Done! Great work!</div>
        </div>
      )}
    </div>
  )
}

