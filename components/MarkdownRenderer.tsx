'use client'

import { useEffect, useRef } from 'react'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Simple markdown to HTML conversion
  const convertMarkdown = (md: string): string => {
    let html = md

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>')
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>')
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>')
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>')

    // Bold
    html = html.replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')

    // Italic
    html = html.replace(/\*(.*?)\*/gim, '<em>$1</em>')

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2">$1</a>')

    // Inline code
    html = html.replace(/`([^`]+)`/gim, '<code>$1</code>')

    // Code blocks
    html = html.replace(/```([^\n]*)\n([\s\S]*?)```/gim, '<pre><code class="language-$1">$2</code></pre>')

    // Blockquotes
    html = html.replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>')
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')

    // Lists
    html = html.replace(/^\* (.*$)/gim, '<li>$1</li>')
    html = html.replace(/^- (.*$)/gim, '<li>$1</li>')
    html = html.replace(/^\d+\. (.*$)/gim, '<li>$1</li>')

    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li>.*<\/li>\n?)+/gim, (match) => {
      return '<ul>' + match + '</ul>'
    })

    // Paragraphs
    html = html.replace(/\n\n/g, '</p><p>')
    html = '<p>' + html + '</p>'

    // Clean up
    html = html.replace(/<p><\/p>/g, '')
    html = html.replace(/<p>(<h[1-6]>)/g, '$1')
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1')
    html = html.replace(/<p>(<ul>)/g, '$1')
    html = html.replace(/(<\/ul>)<\/p>/g, '$1')
    html = html.replace(/<p>(<pre>)/g, '$1')
    html = html.replace(/(<\/pre>)<\/p>/g, '$1')
    html = html.replace(/<p>(<blockquote>)/g, '$1')
    html = html.replace(/(<\/blockquote>)<\/p>/g, '$1')

    return html
  }

  useEffect(() => {
    if (contentRef.current) {
      // Add smooth scroll behavior to anchor links
      const links = contentRef.current.querySelectorAll('a[href^="#"]')
      links.forEach((link) => {
        link.addEventListener('click', (e) => {
          e.preventDefault()
          const target = document.querySelector(
            (e.currentTarget as HTMLAnchorElement).getAttribute('href') || ''
          )
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' })
          }
        })
      })
    }
  }, [content])

  const htmlContent = convertMarkdown(content)

  return (
    <div
      ref={contentRef}
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}

