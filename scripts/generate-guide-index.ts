/**
 * Generate Guide Index
 * 
 * This script scans all markdown files in the guides directory
 * and generates a JSON index with metadata for quick reference.
 */

import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

interface GuideIndex {
  slug: string
  title: string
  description: string
  category: string
  tags: string[]
  difficulty?: string
  wordCount: number
  readingTime: string
}

const guidesDirectory = path.join(process.cwd(), 'guides')
const outputPath = path.join(process.cwd(), 'guides', 'index.json')

function generateGuideIndex() {
  if (!fs.existsSync(guidesDirectory)) {
    console.error('Guides directory not found!')
    process.exit(1)
  }

  const fileNames = fs.readdirSync(guidesDirectory)
  const guides: GuideIndex[] = []

  fileNames.forEach((fileName) => {
    if (!fileName.endsWith('.md')) return

    const slug = fileName.replace(/\.md$/, '')
    const fullPath = path.join(guidesDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { data, content } = matter(fileContents)

    // Calculate reading time
    const wordCount = content.split(/\s+/).length
    const readingTime = Math.ceil(wordCount / 200)

    guides.push({
      slug,
      title: data.title || 'Untitled',
      description: data.description || '',
      category: data.category || 'General',
      tags: data.tags || [],
      difficulty: data.difficulty,
      wordCount,
      readingTime: `${readingTime} min read`,
    })
  })

  // Sort by category then title
  guides.sort((a, b) => {
    if (a.category !== b.category) {
      return a.category.localeCompare(b.category)
    }
    return a.title.localeCompare(b.title)
  })

  // Write to file
  fs.writeFileSync(outputPath, JSON.stringify(guides, null, 2))

  console.log(`✅ Generated index for ${guides.length} guides`)
  console.log(`📝 Saved to: ${outputPath}`)
  console.log('\n📊 Summary by Category:')

  const byCategory = guides.reduce((acc, guide) => {
    acc[guide.category] = (acc[guide.category] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} guides`)
  })
}

generateGuideIndex()

