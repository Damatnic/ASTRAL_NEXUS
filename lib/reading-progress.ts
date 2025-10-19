import { db, ReadingProgressRow } from './db'

export async function saveReadingProgress(guideSlug: string, data: Partial<ReadingProgressRow>) {
  const existing = await db.readingProgress.where('guideSlug').equals(guideSlug).first()
  if (existing && existing.id) {
    await db.readingProgress.update(existing.id, {
      ...existing,
      ...data,
      updatedAt: new Date(),
    })
  } else {
    await db.readingProgress.add({
      guideSlug,
      lastHeadingId: data.lastHeadingId,
      lastScrollY: data.lastScrollY,
      updatedAt: new Date(),
    })
  }
}

export function loadReadingProgress(guideSlug: string): Promise<ReadingProgressRow | undefined> {
  return db.readingProgress.where('guideSlug').equals(guideSlug).first()
}


