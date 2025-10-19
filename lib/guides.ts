import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface Guide {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty?: string
  readingTime: string
  content: string
  sections?: string[]
  relatedGuides?: string[]
}

const guidesDirectory = path.join(process.cwd(), 'guides')

export function getAllGuides(): Guide[] {
  try {
    if (!fs.existsSync(guidesDirectory)) {
      return []
    }

    const fileNames = fs.readdirSync(guidesDirectory)
    const guides = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        const slug = fileName.replace(/\.md$/, '')
        return getGuideBySlug(slug)
      })
      .filter((guide): guide is Guide => guide !== null)

    return guides
  } catch (error) {
    console.error('Error reading guides:', error)
    return []
  }
}

export function getGuideBySlug(slug: string): Guide | null {
  try {
    const fullPath = path.join(guidesDirectory, `${slug}.md`)
    
    if (!fs.existsSync(fullPath)) {
      return null
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Calculate reading time (average reading speed: 200 words per minute)
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    return {
      slug,
      title: data.title || 'Untitled Guide',
      description: data.description || '',
      category: data.category || 'General',
      tags: data.tags || [],
      difficulty: data.difficulty,
      readingTime: `${readingTime} min read`,
      content,
      sections: data.sections || [],
      relatedGuides: data.relatedGuides || [],
    }
  } catch (error) {
    console.error(`Error reading guide ${slug}:`, error)
    return null
  }
}

export function getGuidesByCategory(category: string): Guide[] {
  const allGuides = getAllGuides()
  return allGuides.filter(
    (guide) => guide.category.toLowerCase() === category.toLowerCase()
  )
}

export function getGuidesByTag(tag: string): Guide[] {
  const allGuides = getAllGuides()
  return allGuides.filter((guide) =>
    guide.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllCategories(): string[] {
  const guides = getAllGuides()
  const categories = new Set(guides.map((guide) => guide.category))
  return Array.from(categories).sort()
}

export function getAllTags(): string[] {
  const guides = getAllGuides()
  const tags = new Set(guides.flatMap((guide) => guide.tags))
  return Array.from(tags).sort()
}

export function getRelatedGuides(currentSlug: string, limit: number = 3): Guide[] {
  const currentGuide = getGuideBySlug(currentSlug)
  if (!currentGuide) return []

  const allGuides = getAllGuides().filter((g) => g.slug !== currentSlug)

  // Score guides based on shared tags and category
  const scoredGuides = allGuides.map((guide) => {
    let score = 0

    // Same category
    if (guide.category === currentGuide.category) {
      score += 10
    }

    // Shared tags
    const sharedTags = guide.tags.filter((tag) =>
      currentGuide.tags.includes(tag)
    )
    score += sharedTags.length * 5

    return { guide, score }
  })

  // Sort by score and return top guides
  return scoredGuides
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.guide)
}

