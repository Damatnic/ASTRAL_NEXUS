import { db, Highlight } from './db'

export async function addHighlight(guideSlug: string, text: string, color: Highlight['color'], headingId?: string) {
  const h: Omit<Highlight, 'id'> = { guideSlug, text, color, headingId, createdAt: new Date() }
  await db.highlights.add(h)
}

export async function getHighlightsByGuide(guideSlug: string): Promise<Highlight[]> {
  return db.highlights.where('guideSlug').equals(guideSlug).reverse().sortBy('createdAt') as unknown as Highlight[]
}

export async function removeHighlight(id: number) {
  await db.highlights.delete(id)
}


