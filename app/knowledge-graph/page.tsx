import KnowledgeGraph from '@/components/KnowledgeGraph'
import Link from 'next/link'

export const metadata = {
  title: 'Knowledge Graph | Astral Nexus',
  description: 'Visualize connections between guides and concepts with an interactive knowledge graph',
}

export default function KnowledgeGraphPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="neon-text">Knowledge Graph</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6">
            Explore the interconnected web of knowledge across all guides. 
            See how concepts relate, discover new connections, and navigate your learning journey visually.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/guides" className="btn-secondary">
              ← Back to Guides
            </Link>
          </div>
        </div>

        {/* Instructions */}
        <div className="glass-card p-6 mb-8">
          <h2 className="text-xl font-bold mb-4 text-primary">How to Use</h2>
          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-lg mb-2">🎯</div>
              <div className="font-semibold mb-1">Explore</div>
              <p className="text-gray-400">
                Hover over nodes to see details. Click to select and highlight connections.
              </p>
            </div>
            <div>
              <div className="text-lg mb-2">🔗</div>
              <div className="font-semibold mb-1">Connect</div>
              <p className="text-gray-400">
                Different colored edges show different types of relationships between concepts.
              </p>
            </div>
            <div>
              <div className="text-lg mb-2">📚</div>
              <div className="font-semibold mb-1">Navigate</div>
              <p className="text-gray-400">
                Click nodes to jump directly to guides. Discover unexpected learning paths.
              </p>
            </div>
          </div>
        </div>

        {/* Graph Container */}
        <div className="glass-card p-4 rounded-lg" style={{ height: '70vh', minHeight: '500px' }}>
          <KnowledgeGraph 
            onNodeClick={(nodeId) => {
              // Navigate to guide
              window.location.href = `/guides/${nodeId}`
            }}
          />
        </div>

        {/* Features */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-primary">Wikilink System</h3>
            <p className="text-gray-300 mb-4">
              Connect your thoughts using [[wikilinks]]. Type [[ anywhere in your notes to create 
              bidirectional links between concepts, automatically building your personal knowledge graph.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✦ [[Concept]] - Link to guides or create new notes</li>
              <li>✦ [[Display Text|Target]] - Custom link text</li>
              <li>✦ #tags - Auto-organize with hashtags</li>
              <li>✦ Backlinks show what references each page</li>
            </ul>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-xl font-bold mb-4 text-primary">Personal Knowledge Base</h3>
            <p className="text-gray-300 mb-4">
              Build your second brain. As you take notes and create links, the knowledge graph 
              grows, revealing unexpected connections and insights.
            </p>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>✦ Discover hidden patterns in your learning</li>
              <li>✦ Find orphaned content that needs connecting</li>
              <li>✦ See your most connected concepts (knowledge hubs)</li>
              <li>✦ Track how your understanding evolves over time</li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center glass-card p-8">
          <h3 className="text-2xl font-bold mb-4">
            Start Building Your Knowledge Network
          </h3>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Every guide you read, every note you take, every connection you make adds to your 
            personal knowledge graph. Start learning, start linking, and watch your understanding grow.
          </p>
          <Link href="/guides" className="btn-primary px-8 py-3 inline-block">
            Explore Guides →
          </Link>
        </div>
      </div>
    </div>
  )
}

