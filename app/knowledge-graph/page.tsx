'use client'

import KnowledgeGraph from '@/components/KnowledgeGraph'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function KnowledgeGraphPage() {
  const router = useRouter()
  return (
    <div className="container mx-auto px-4 pb-24 pt-16">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="mb-6 inline-block rounded-full border border-[color:var(--border-soft)] bg-surface/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-primary">
            Knowledge Graph
          </span>
          <h1 className="mb-6 text-4xl font-semibold text-[color:var(--text-primary)] md:text-5xl">
            Visual knowledge explorer
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-[color:var(--text-secondary)]">
            Explore the interconnected web of knowledge across all guides. 
            See how concepts relate, discover new connections, and navigate your learning journey visually.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/guides" className="btn-secondary">
              ← Back to Guides
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="mb-10 rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-8 shadow-inner-sm">
          <h2 className="mb-6 text-xl font-semibold text-primary">How to Use</h2>
          <div className="grid gap-6 text-sm md:grid-cols-3">
            <div>
              <div className="mb-2 text-lg">🎯</div>
              <div className="mb-1 font-semibold text-[color:var(--text-primary)]">Explore</div>
              <p className="text-[color:var(--text-secondary)]">
                Hover over nodes to see details. Click to select and highlight connections.
              </p>
            </div>
            <div>
              <div className="mb-2 text-lg">🔗</div>
              <div className="mb-1 font-semibold text-[color:var(--text-primary)]">Connect</div>
              <p className="text-[color:var(--text-secondary)]">
                Different colored edges show different types of relationships between concepts.
              </p>
            </div>
            <div>
              <div className="mb-2 text-lg">📚</div>
              <div className="mb-1 font-semibold text-[color:var(--text-primary)]">Navigate</div>
              <p className="text-[color:var(--text-secondary)]">
                Click nodes to jump directly to guides. Discover unexpected learning paths.
              </p>
            </div>
          </div>
        </div>

        {/* Graph Container */}
        <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-4 shadow-inner-sm" style={{ height: '70vh', minHeight: '500px' }}>
          <KnowledgeGraph 
            onNodeClick={(nodeId) => {
              router.push(`/guides/${nodeId}`)
            }}
          />
        </div>

        {/* Features */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-8 shadow-inner-sm">
            <h3 className="mb-4 text-xl font-semibold text-primary">Wikilink System</h3>
            <p className="mb-4 text-[color:var(--text-secondary)]">
              Connect your thoughts using [[wikilinks]]. Type [[ anywhere in your notes to create 
              bidirectional links between concepts, automatically building your personal knowledge graph.
            </p>
            <ul className="space-y-2 text-sm text-[color:var(--text-secondary)]">
              <li>✦ [[Concept]] - Link to guides or create new notes</li>
              <li>✦ [[Display Text|Target]] - Custom link text</li>
              <li>✦ #tags - Auto-organize with hashtags</li>
              <li>✦ Backlinks show what references each page</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-8 shadow-inner-sm">
            <h3 className="mb-4 text-xl font-semibold text-primary">Personal Knowledge Base</h3>
            <p className="mb-4 text-[color:var(--text-secondary)]">
              Build your second brain. As you take notes and create links, the knowledge graph 
              grows, revealing unexpected connections and insights.
            </p>
            <ul className="space-y-2 text-sm text-[color:var(--text-secondary)]">
              <li>✦ Discover hidden patterns in your learning</li>
              <li>✦ Find orphaned content that needs connecting</li>
              <li>✦ See your most connected concepts (knowledge hubs)</li>
              <li>✦ Track how your understanding evolves over time</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-3xl border border-primary/20 bg-primary/10 p-10 text-center shadow-inner-sm">
          <h3 className="mb-4 text-2xl font-semibold text-[color:var(--text-primary)]">
            Start Building Your Knowledge Network
          </h3>
          <p className="mx-auto mb-8 max-w-2xl text-[color:var(--text-secondary)]">
            Every guide you read, every note you take, every connection you make adds to your 
            personal knowledge graph. Start learning, start linking, and watch your understanding grow.
          </p>
          <Link href="/guides" className="btn-primary inline-block px-8 py-3">
            Explore Guides →
          </Link>
        </div>
      </div>
    </div>
  )
}

