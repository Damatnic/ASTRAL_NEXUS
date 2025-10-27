'use client'

import { motion } from 'framer-motion'
import { Guide } from '@/lib/guides'

interface QuickGuideStatsProps {
  quickGuides: Guide[]
}

export default function QuickGuideStats({ quickGuides }: QuickGuideStatsProps) {
  return (
    <div className="mb-12 grid gap-6 md:grid-cols-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 text-center shadow-inner-sm"
      >
        <div className="mb-2 text-4xl font-bold text-primary">{quickGuides.length}</div>
        <div className="text-sm text-[color:var(--text-muted)]">Quick Guides</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 text-center shadow-inner-sm"
      >
        <div className="mb-2 text-4xl font-bold text-primary">
          {quickGuides.filter((g) => g.exercises).length}
        </div>
        <div className="text-sm text-[color:var(--text-muted)]">With Exercises</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 text-center shadow-inner-sm"
      >
        <div className="mb-2 text-4xl font-bold text-primary">
          {quickGuides.reduce((acc, g) => acc + (g.templates?.length || 0), 0)}
        </div>
        <div className="text-sm text-[color:var(--text-muted)]">Templates</div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-3xl border border-[color:var(--border-soft)] bg-background/80 p-6 text-center shadow-inner-sm"
      >
        <div className="mb-2 text-4xl font-bold text-primary">15-30</div>
        <div className="text-sm text-[color:var(--text-muted)]">Min Read</div>
      </motion.div>
    </div>
  )
}

