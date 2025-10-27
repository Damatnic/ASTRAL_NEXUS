import React from 'react'

interface QuickExampleProps {
  title?: string
  children: React.ReactNode
  variant?: 'success' | 'warning' | 'info' | 'neutral'
}

export default function QuickExample({ title, children, variant = 'info' }: QuickExampleProps) {
  const variants = {
    success: 'border-green-500/40 bg-green-500/10',
    warning: 'border-yellow-500/40 bg-yellow-500/10',
    info: 'border-primary/40 bg-primary/10',
    neutral: 'border-[color:var(--border-soft)] bg-surface/60',
  }

  return (
    <div className={`rounded-2xl border p-6 ${variants[variant]}`}>
      {title && (
        <div className="mb-3 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          <h4 className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">{title}</h4>
        </div>
      )}
      <div className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
        {children}
      </div>
    </div>
  )
}

