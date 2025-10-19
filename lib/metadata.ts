import { Metadata } from 'next'
import { Guide } from './guides'

export function generateGuideMetadata(guide: Guide): Metadata {
  return {
    title: `${guide.title} | Astral Nexus`,
    description: guide.description,
    keywords: [guide.category, ...guide.tags, 'Astral', 'guide', 'tutorial'],
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      tags: guide.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
  }
}

export function generateCategoryMetadata(category: string, guideCount: number): Metadata {
  return {
    title: `${category} Guides | Astral Nexus`,
    description: `Explore ${guideCount} comprehensive guides in the ${category} category. Learn, grow, and master new skills with Astral Nexus.`,
    openGraph: {
      title: `${category} Guides`,
      description: `Explore ${guideCount} guides in ${category}`,
      type: 'website',
    },
  }
}

export function generateSitemap(guides: Guide[]): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://astral-nexus.com'
  const currentDate = new Date().toISOString()

  const guideUrls = guides.map((guide) => `
  <url>
    <loc>${baseUrl}/guides/${guide.slug}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/guides</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>${guideUrls}
</urlset>`
}

export function generateRobotsTxt(): string {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://astral-nexus.com'

  return `# *
User-agent: *
Allow: /

# Sitemaps
Sitemap: ${baseUrl}/sitemap.xml
`
}

