/**
 * Wikilink System for Personal Knowledge Management
 * Implements bidirectional linking, backlinks, and knowledge graph
 */

// import { db } from './db' // Will be used when database integration is added

export interface WikiLink {
  id?: number
  sourceGuide: string
  sourcePage?: string // For personal notes
  targetGuide: string
  targetPage?: string
  linkText: string
  linkType: 'reference' | 'prerequisite' | 'related' | 'contradicts' | 'extends' | 'example'
  context?: string // Surrounding text for context
  createdAt: Date
}

export interface WikiNode {
  id: string
  title: string
  type: 'guide' | 'note' | 'concept'
  connections: number
  content?: string
  tags: string[]
}

export interface WikiEdge {
  source: string
  target: string
  type: WikiLink['linkType']
  strength: number // Based on frequency of connection
}

// Pattern to match [[links]] and [[display|target]] style links
const WIKILINK_PATTERN = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g
const TAG_PATTERN = /#[\w-]+/g

/**
 * Parse wikilinks from content
 */
export function parseWikilinks(content: string, sourceId: string): WikiLink[] {
  const links: WikiLink[] = []
  let match

  while ((match = WIKILINK_PATTERN.exec(content)) !== null) {
    const [fullMatch, target, displayText] = match
    const linkText = displayText || target
    
    // Get surrounding context (50 chars before and after)
    const startContext = Math.max(0, match.index - 50)
    const endContext = Math.min(content.length, match.index + fullMatch.length + 50)
    const context = content.substring(startContext, endContext)

    links.push({
      sourceGuide: sourceId,
      targetGuide: target.toLowerCase().replace(/\s+/g, '-'),
      linkText,
      linkType: inferLinkType(context),
      context,
      createdAt: new Date()
    })
  }

  return links
}

/**
 * Infer link type from surrounding context
 */
function inferLinkType(context: string): WikiLink['linkType'] {
  const lowerContext = context.toLowerCase()
  
  if (lowerContext.includes('prerequisite') || lowerContext.includes('requires') || lowerContext.includes('first learn')) {
    return 'prerequisite'
  }
  if (lowerContext.includes('contradicts') || lowerContext.includes('however') || lowerContext.includes('but')) {
    return 'contradicts'
  }
  if (lowerContext.includes('extends') || lowerContext.includes('builds on') || lowerContext.includes('advanced')) {
    return 'extends'
  }
  if (lowerContext.includes('example') || lowerContext.includes('for instance') || lowerContext.includes('such as')) {
    return 'example'
  }
  if (lowerContext.includes('related') || lowerContext.includes('see also') || lowerContext.includes('similar')) {
    return 'related'
  }
  
  return 'reference'
}

/**
 * Get all backlinks for a given page
 */
export async function getBacklinks(targetId: string): Promise<WikiLink[]> {
  // In a real implementation, this would query the database
  // For now, we'll parse all guides and find links
  const backlinks: WikiLink[] = []
  
  // This would need to iterate through all guides and notes
  // and find links pointing to targetId
  console.log(`Finding backlinks for: ${targetId}`)
  
  return backlinks
}

/**
 * Build knowledge graph from all links
 */
export async function buildKnowledgeGraph(): Promise<{ nodes: WikiNode[], edges: WikiEdge[] }> {
  const nodes: Map<string, WikiNode> = new Map()
  const edges: Map<string, WikiEdge> = new Map()
  
  // This would:
  // 1. Parse all guides and notes
  // 2. Extract all wikilinks
  // 3. Build node and edge maps
  // 4. Calculate connection strengths
  
  return {
    nodes: Array.from(nodes.values()),
    edges: Array.from(edges.values())
  }
}

/**
 * Find orphaned pages (no incoming or outgoing links)
 */
export async function findOrphans(): Promise<WikiNode[]> {
  const graph = await buildKnowledgeGraph()
  const connected = new Set<string>()
  
  // Mark all connected nodes
  graph.edges.forEach(edge => {
    connected.add(edge.source)
    connected.add(edge.target)
  })
  
  // Find nodes not in connected set
  return graph.nodes.filter(node => !connected.has(node.id))
}

/**
 * Get link suggestions based on content
 */
export async function getLinkSuggestions(content: string): Promise<string[]> {
  const suggestions: string[] = []
  const words = content.toLowerCase().split(/\s+/)
  
  // Common concepts to link
  const concepts = [
    'body language', 'financial independence', 'FIRE', 'investing',
    'privacy', 'security', 'encryption', 'psychology', 'communication',
    'negotiation', 'habits', 'productivity', 'mindfulness'
  ]
  
  concepts.forEach(concept => {
    if (words.includes(concept.toLowerCase()) || 
        content.toLowerCase().includes(concept.toLowerCase())) {
      suggestions.push(concept)
    }
  })
  
  return [...new Set(suggestions)]
}

/**
 * Extract tags from content
 */
export function extractTags(content: string): string[] {
  const tags: string[] = []
  let match
  
  while ((match = TAG_PATTERN.exec(content)) !== null) {
    tags.push(match[0].substring(1)) // Remove # prefix
  }
  
  return [...new Set(tags)]
}

/**
 * Convert content with wikilinks to HTML with clickable links
 */
export function wikilinkToHtml(content: string): string {
  return content.replace(WIKILINK_PATTERN, (match, target, displayText) => {
    const linkText = displayText || target
    const slug = target.toLowerCase().replace(/\s+/g, '-')
    return `<a href="/guides/${slug}" class="wikilink" data-target="${target}">${linkText}</a>`
  })
}

/**
 * Get related pages based on shared links and tags
 * @param pageId - The ID of the page to find related pages for
 * @param limit - Maximum number of related pages to return
 */
export async function getRelatedPages(pageId: string, limit: number = 5): Promise<WikiNode[]> {
  // This would:
  // 1. Get all links from this page
  // 2. Get all pages that link to the same targets
  // 3. Get all pages with similar tags
  // 4. Score by relevance
  // 5. Return top limit results
  console.log(`Finding ${limit} related pages for: ${pageId}`)
  
  return []
}

/**
 * Calculate page importance (PageRank-style)
 */
export async function calculatePageRank(): Promise<Map<string, number>> {
  const graph = await buildKnowledgeGraph()
  const pageRank = new Map<string, number>()
  
  // Initialize all nodes with equal rank
  graph.nodes.forEach(node => {
    pageRank.set(node.id, 1.0 / graph.nodes.length)
  })
  
  // Iterate to convergence (simplified)
  const damping = 0.85
  const iterations = 10
  
  for (let i = 0; i < iterations; i++) {
    const newRank = new Map<string, number>()
    
    graph.nodes.forEach(node => {
      let rank = (1 - damping) / graph.nodes.length
      
      // Add contribution from incoming links
      graph.edges
        .filter(edge => edge.target === node.id)
        .forEach(edge => {
          const sourceRank = pageRank.get(edge.source) || 0
          const outgoingLinks = graph.edges.filter(e => e.source === edge.source).length
          rank += damping * (sourceRank / outgoingLinks)
        })
      
      newRank.set(node.id, rank)
    })
    
    // Update ranks
    newRank.forEach((rank, id) => pageRank.set(id, rank))
  }
  
  return pageRank
}

/**
 * Smart link autocomplete
 */
export async function autocompleteLinkTarget(partial: string): Promise<string[]> {
  // This would search through:
  // 1. Guide titles
  // 2. Note titles
  // 3. Previously used link targets
  // 4. Common concepts
  
  // Mock implementation
  const allTargets = [
    'Body Language Mastery',
    'Financial Independence',
    'Digital Privacy',
    'Mind-Blowing Facts',
    'Ultimate Life Hacks',
    'Social Skills',
    'Voice and Accent',
    'Legal Essentials'
  ]
  
  return allTargets
    .filter(target => target.toLowerCase().includes(partial.toLowerCase()))
    .slice(0, 5)
}

/**
 * Create breadcrumb trail through links
 * @param currentPage - The page to find breadcrumb trails to
 * @param maxDepth - Maximum depth of breadcrumb trail
 */
export async function getBreadcrumbTrail(
  currentPage: string,
  maxDepth: number = 5
): Promise<string[][]> {
  const trails: string[][] = []
  
  // Find all paths from home/index to current page
  // This would use BFS/DFS through the link graph
  console.log(`Finding breadcrumb trails for: ${currentPage} (max depth: ${maxDepth})`)
  
  return trails
}

/**
 * Analyze link health
 */
export async function analyzeLinkHealth(): Promise<{
  broken: WikiLink[]
  circular: string[][]
  orphans: WikiNode[]
}> {
  const broken: WikiLink[] = []
  const circular: string[][] = []
  const orphans = await findOrphans()
  
  // Check for broken links (targets that don't exist)
  // Check for circular references
  
  return { broken, circular, orphans }
}

/**
 * Export knowledge graph for visualization
 */
interface GraphNode {
  id: string
  label: string
  group: string
  value: number
}

interface GraphLink {
  source: string
  target: string
  value: number
  type: string
}

export function exportGraphData(
  nodes: WikiNode[],
  edges: WikiEdge[]
): { 
  nodes: GraphNode[]
  links: GraphLink[] 
} {
  // Format for D3.js or similar visualization library
  return {
    nodes: nodes.map(node => ({
      id: node.id,
      label: node.title,
      group: node.type,
      value: node.connections
    })),
    links: edges.map(edge => ({
      source: edge.source,
      target: edge.target,
      value: edge.strength,
      type: edge.type
    }))
  }
}

/**
 * Transclusion - embed content from another page
 */
export async function transclude(
  targetId: string,
  section?: string
): Promise<string> {
  // Fetch content from target page
  // If section specified, extract just that section
  // Return formatted content for embedding
  
  return `<!-- Transcluded from ${targetId}${section ? '#' + section : ''} -->`
}

/**
 * Daily note template with automatic links
 */
export function generateDailyNote(date: Date = new Date()): string {
  const dateStr = date.toISOString().split('T')[0]
  const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
  
  return `# Daily Note - ${dateStr}

## ${dayName}

### 🎯 Today's Focus
- [ ] 

### 📚 Learning
- Studied: [[]]
- Key insight: 

### 💭 Thoughts
- 

### 🔗 Discovered
- 

### 📝 Notes


### 🏷️ Tags
#daily-note #${dateStr.replace(/-/g, '')}

---
[[${new Date(date.getTime() - 86400000).toISOString().split('T')[0]}]] ← Yesterday | Tomorrow → [[${new Date(date.getTime() + 86400000).toISOString().split('T')[0]}]]
`
}

/**
 * Zettelkasten note template
 */
export function generateZettelNote(id?: string): string {
  const noteId = id || `${Date.now()}`
  
  return `# ${noteId}

## Title

## Content


## Links
- Source: [[]]
- Related: [[]]
- Contradicts: [[]]
- Extends: [[]]

## Tags
#zettel #

---
Created: ${new Date().toISOString()}
`
}
