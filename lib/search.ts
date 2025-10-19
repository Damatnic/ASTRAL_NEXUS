import Fuse from 'fuse.js'
import { Guide } from './guides'

export interface SearchResult {
  title: string
  slug: string
  category: string
  snippet: string
  score: number
}

export function searchGuides(guides: Guide[], query: string): SearchResult[] {
  if (!query || query.length < 2) {
    return []
  }

  // Configure Fuse.js for fuzzy searching
  const fuse = new Fuse(guides, {
    keys: [
      { name: 'title', weight: 0.4 },
      { name: 'description', weight: 0.3 },
      { name: 'tags', weight: 0.2 },
      { name: 'content', weight: 0.1 },
    ],
    threshold: 0.4,
    includeScore: true,
    includeMatches: true,
    minMatchCharLength: 2,
  })

  const results = fuse.search(query)

  return results.map((result) => {
    const guide = result.item
    
    // Extract snippet from description or content
    let snippet = guide.description

    // If we have match info, try to extract relevant snippet
    if (result.matches && result.matches.length > 0) {
      const contentMatch = result.matches.find((m) => m.key === 'content')
      if (contentMatch && contentMatch.value) {
        snippet = extractSnippet(contentMatch.value, query)
      }
    }

    return {
      title: guide.title,
      slug: guide.slug,
      category: guide.category,
      snippet: snippet || guide.description,
      score: result.score || 0,
    }
  }).slice(0, 10) // Limit to top 10 results
}

function extractSnippet(content: string, query: string, contextLength: number = 150): string {
  const lowerContent = content.toLowerCase()
  const lowerQuery = query.toLowerCase()
  const index = lowerContent.indexOf(lowerQuery)

  if (index === -1) {
    // Query not found, return beginning of content
    return content.substring(0, contextLength) + '...'
  }

  // Extract context around the match
  const start = Math.max(0, index - contextLength / 2)
  const end = Math.min(content.length, index + query.length + contextLength / 2)

  let snippet = content.substring(start, end)

  // Add ellipsis if needed
  if (start > 0) snippet = '...' + snippet
  if (end < content.length) snippet = snippet + '...'

  return snippet.trim()
}

export function getContextualHelp(guides: Guide[], query: string): {
  answer: string
  relatedGuides: { title: string; slug: string }[]
} {
  // Simple contextual help based on keywords
  const results = searchGuides(guides, query)
  
  let answer = ''
  const keywords = query.toLowerCase()

  // Provide contextual answers based on common queries
  if (keywords.includes('how to') || keywords.includes('how do')) {
    answer = `I found ${results.length} guides that can help you with that. Check out the most relevant guides below.`
  } else if (keywords.includes('what is') || keywords.includes('what are')) {
    answer = `Here are the guides that explain this topic in detail:`
  } else if (keywords.includes('why') || keywords.includes('when')) {
    answer = `These guides cover the concepts you're asking about:`
  } else {
    answer = `Found ${results.length} guides related to "${query}"`
  }

  return {
    answer,
    relatedGuides: results.slice(0, 5).map((r) => ({
      title: r.title,
      slug: r.slug,
    })),
  }
}

