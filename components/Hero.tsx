'use client'

import { motion } from 'framer-motion'

interface HeroProps {
  title: string
  subtitle?: string
  description?: string
  children?: React.ReactNode
}

export default function Hero({ title, subtitle, description, children }: HeroProps) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-transparent to-transparent"></div>
      <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            {title.split(' ').map((word, i) =>
              i === 0 ? (
                <span key={i} className="neon-text">{word} </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-300 mb-4">{subtitle}</p>
          )}
          {description && (
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  )
}

