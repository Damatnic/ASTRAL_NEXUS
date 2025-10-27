import React from 'react'
import Link from 'next/link'

interface TemplateDownloadProps {
  title: string
  description: string
  format?: 'PDF' | 'DOCX' | 'XLSX' | 'MD'
  icon?: string
  href?: string
}

export default function TemplateDownload({ title, description, format = 'PDF', icon, href }: TemplateDownloadProps) {
  const formatColors = {
    PDF: 'bg-red-500/10 border-red-500/40 text-red-400',
    DOCX: 'bg-blue-500/10 border-blue-500/40 text-blue-400',
    XLSX: 'bg-green-500/10 border-green-500/40 text-green-400',
    MD: 'bg-primary/10 border-primary/40 text-primary',
  }

  const icons = {
    PDF: '📄',
    DOCX: '📝',
    XLSX: '📊',
    MD: '📋',
  }

  const content = (
    <div className="flex items-center gap-4 rounded-2xl border border-[color:var(--border-soft)] bg-background/70 p-5 transition-all hover:border-primary/60 hover:bg-background/90 hover:shadow-glow-sm">
      <div className="text-4xl">{icon || icons[format]}</div>
      <div className="flex-1">
        <div className="mb-1 flex items-center gap-2">
          <h4 className="font-semibold text-[color:var(--text-primary)]">{title}</h4>
          <span className={`rounded-full border px-2 py-0.5 text-xs font-semibold ${formatColors[format]}`}>
            {format}
          </span>
        </div>
        <p className="text-sm text-[color:var(--text-secondary)]">{description}</p>
      </div>
      <div className="text-primary">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{content}</Link>
  }

  return content
}

