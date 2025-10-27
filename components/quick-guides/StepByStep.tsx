import React from 'react'

interface Step {
  number: number
  title: string
  content: React.ReactNode
  tips?: string[]
}

interface StepByStepProps {
  steps: Step[]
}

export default function StepByStep({ steps }: StepByStepProps) {
  return (
    <div className="space-y-6">
      {steps.map((step) => (
        <div key={step.number} className="rounded-2xl border border-[color:var(--border-soft)] bg-background/80 p-6">
          <div className="mb-4 flex items-start gap-4">
            <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-primary/40 bg-primary/20 text-xl font-bold text-primary">
              {step.number}
            </div>
            <div className="flex-1">
              <h3 className="mb-2 text-lg font-semibold text-[color:var(--text-primary)]">{step.title}</h3>
              <div className="text-sm leading-relaxed text-[color:var(--text-secondary)]">
                {step.content}
              </div>
              {step.tips && step.tips.length > 0 && (
                <div className="mt-4 rounded-xl border border-[color:var(--border-soft)] bg-surface/60 p-3">
                  <div className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary">Pro Tips:</div>
                  <ul className="space-y-1.5 text-sm text-[color:var(--text-secondary)]">
                    {step.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary">✓</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

