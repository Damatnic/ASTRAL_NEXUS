'use client'

import Link from 'next/link'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import XPDisplay from './XPDisplay'

const navItems = [
  { name: 'Guides', href: '/guides' },
  { name: 'Categories', href: '/categories' },
  { name: 'Knowledge Base', href: '/knowledge-graph' },
]

const secondaryNavItems = [
  { name: 'Study Center', href: '/study' },
  { name: 'Achievements', href: '/achievements' },
  { name: 'Dashboard', href: '/dashboard' },
]

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-background/65 border-b border-[color:var(--border-soft)]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface-muted/80 border border-[color:var(--border-soft)] shadow-inner-sm transition-all duration-200 group-hover:border-primary/70 group-hover:shadow-glow-sm">
              <span className="text-lg font-semibold tracking-wide text-primary">AN</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm uppercase tracking-[0.3em] text-[color:var(--text-muted)]">Astral Nexus</span>
              <span className="text-xl font-semibold text-[color:var(--text-primary)]">Guide Library</span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium tracking-wide text-[color:var(--text-secondary)] transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="h-8 w-px bg-[color:var(--border-soft)]" aria-hidden />
            <div className="flex items-center gap-4">
              {secondaryNavItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-[color:var(--text-muted)] transition-colors hover:text-primary"
                >
                  {item.name}
                </Link>
              ))}
              <XPDisplay compact />
            </div>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[color:var(--border-soft)] bg-surface/60 transition-all hover:border-primary/60 hover:bg-surface-muted/70"
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-[color:var(--text-primary)]"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M3.75 6h16.5M3.75 12h16.5M3.75 18h16.5" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-[color:var(--border-soft)] bg-background/90 backdrop-blur-xl"
          >
            <div className="container mx-auto px-4 py-6 space-y-6">
              <div className="space-y-2">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-transparent bg-surface/60 px-4 py-3 text-base font-medium text-[color:var(--text-primary)] transition-all hover:border-primary/60 hover:bg-surface-muted/70"
                  >
                    {item.name}
                    <span className="text-sm text-[color:var(--text-muted)]">Explore</span>
                  </Link>
                ))}
              </div>
              <div className="space-y-2">
                <span className="px-2 text-xs font-semibold uppercase tracking-widest text-[color:var(--text-muted)]">Tools</span>
                {secondaryNavItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-xl border border-transparent px-4 py-2.5 text-sm font-medium text-[color:var(--text-secondary)] transition-all hover:border-primary/50 hover:bg-surface-muted/60"
                  >
                    {item.name}
                    <span className="text-xs text-[color:var(--text-muted)]">Open</span>
                  </Link>
                ))}
              </div>
              <div className="rounded-xl border border-[color:var(--border-soft)] bg-surface/60 px-4 py-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-[color:var(--text-muted)]">Progress</span>
                    <div className="text-base font-semibold text-[color:var(--text-primary)]">Learning streak</div>
                  </div>
                  <XPDisplay compact />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

