import React from 'react'

interface ProTipProps {
  children: React.ReactNode
}

export default function ProTip({ children }: ProTipProps) {
  return (
    <div className="rounded-2xl border border-primary/40 bg-primary/10 p-5">
      <div className="mb-2 flex items-center gap-2">
        <span className="text-2xl">💎</span>
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">Pro Tip</span>
      </div>
      <div className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
        {children}
      </div>
    </div>
  )
}

