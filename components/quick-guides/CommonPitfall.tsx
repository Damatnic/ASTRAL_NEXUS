import React from 'react'

interface CommonPitfallProps {
  mistake: React.ReactNode
  better: React.ReactNode
  why?: string
}

export default function CommonPitfall({ mistake, better, why }: CommonPitfallProps) {
  return (
    <div className="rounded-2xl border border-yellow-500/40 bg-yellow-500/10 p-6">
      <div className="mb-4 flex items-center gap-2">
        <span className="text-2xl">⚠️</span>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500">Common Pitfall</span>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <div className="mb-2 flex items-center gap-2 text-red-400">
            <span className="text-xl">❌</span>
            <span className="text-sm font-semibold uppercase tracking-[0.25em]">Don't</span>
          </div>
          <div className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
            {mistake}
          </div>
        </div>
        <div>
          <div className="mb-2 flex items-center gap-2 text-green-400">
            <span className="text-xl">✅</span>
            <span className="text-sm font-semibold uppercase tracking-[0.25em]">Do</span>
          </div>
          <div className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
            {better}
          </div>
        </div>
      </div>
      {why && (
        <div className="mt-4 rounded-xl border border-yellow-500/30 bg-yellow-500/5 p-3">
          <div className="text-xs font-semibold uppercase tracking-[0.3em] text-yellow-500 mb-1">Why?</div>
          <div className="text-sm leading-relaxed text-[color:var(--text-secondary)]">{why}</div>
        </div>
      )}
    </div>
  )
}

