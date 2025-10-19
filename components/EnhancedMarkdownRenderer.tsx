'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/tokyo-night-dark.css'

interface EnhancedMarkdownRendererProps {
  content: string
}

export default function EnhancedMarkdownRenderer({ content }: EnhancedMarkdownRendererProps) {
  return (
    <div className="markdown-content prose prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          h1: ({ ...props }) => (
            <h1 className="text-4xl font-bold mb-6 neon-text scroll-mt-20" {...props} id={generateId(props.children)} />
          ),
          h2: ({ ...props }) => (
            <h2 className="text-3xl font-bold mt-8 mb-4 text-primary scroll-mt-20" {...props} id={generateId(props.children)} />
          ),
          h3: ({ ...props }) => (
            <h3 className="text-2xl font-semibold mt-6 mb-3 text-accent scroll-mt-20" {...props} id={generateId(props.children)} />
          ),
          h4: ({ ...props }) => (
            <h4 className="text-xl font-semibold mt-4 mb-2 text-white scroll-mt-20" {...props} id={generateId(props.children)} />
          ),
          p: ({ ...props }) => (
            <p className="mb-4 leading-relaxed text-gray-300" {...props} />
          ),
          ul: ({ ...props }) => (
            <ul className="mb-4 ml-6 space-y-2 list-disc" {...props} />
          ),
          ol: ({ ...props }) => (
            <ol className="mb-4 ml-6 space-y-2 list-decimal" {...props} />
          ),
          li: ({ ...props }) => (
            <li className="text-gray-300" {...props} />
          ),
          code: ({ inline, ...props }: { inline?: boolean; className?: string; children?: React.ReactNode }) =>
            inline ? (
              <code className="font-mono bg-white/10 px-2 py-1 rounded text-accent text-sm" {...props} />
            ) : (
              <code className="font-mono text-sm" {...props} />
            ),
          pre: ({ ...props }) => (
            <pre className="glass-card p-4 overflow-x-auto mb-4 rounded-lg" {...props} />
          ),
          blockquote: ({ ...props }) => (
            <blockquote className="border-l-4 border-primary pl-4 italic text-gray-400 my-4" {...props} />
          ),
          table: ({ ...props }) => (
            <div className="overflow-x-auto mb-4">
              <table className="w-full glass-card overflow-hidden rounded-lg" {...props} />
            </div>
          ),
          th: ({ ...props }) => (
            <th className="bg-white/10 px-4 py-2 text-left font-semibold text-primary" {...props} />
          ),
          td: ({ ...props }) => (
            <td className="px-4 py-2 border-t border-white/10" {...props} />
          ),
          a: ({ ...props }) => (
            <a className="text-primary hover:text-accent transition-colors underline" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

function generateId(children: React.ReactNode): string {
  if (typeof children === 'string') {
    return children.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }
  if (Array.isArray(children)) {
    return children.map(c => typeof c === 'string' ? c : '').join('').toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }
  return ''
}

