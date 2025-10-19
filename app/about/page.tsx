import Link from 'next/link'

export const metadata = {
  title: 'About | Astral Nexus',
  description: 'Learn about Astral Nexus and our mission to provide comprehensive knowledge and guides.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">
          About <span className="neon-text">Astral Nexus</span>
        </h1>

        <div className="glass-card p-8 md:p-12 mb-8">
          <h2 className="text-2xl font-semibold text-primary mb-4">Our Mission</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Astral Nexus is the official knowledge hub for the Astral ecosystem. We believe
            that knowledge should be accessible, comprehensive, and beautifully presented.
            Our mission is to aggregate all existing Astral guides, manuals, and tutorials
            into a dynamic, searchable, and interactive web platform.
          </p>

          <h2 className="text-2xl font-semibold text-primary mb-4 mt-8">
            What We Offer
          </h2>
          <ul className="space-y-3 text-gray-300">
            <li className="flex items-start">
              <span className="text-primary mr-3">✦</span>
              <span>
                <strong>Comprehensive Guides:</strong> From tech to wellness, finance to
                creativity, we cover every domain of knowledge.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✦</span>
              <span>
                <strong>Smart Search:</strong> Find exactly what you need with our
                intelligent search system.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✦</span>
              <span>
                <strong>Organized Learning:</strong> Browse by category, tags, and
                difficulty to find the perfect guide for your needs.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-primary mr-3">✦</span>
              <span>
                <strong>Contextual Help:</strong> Our Astral Helper provides instant
                assistance and related topics.
              </span>
            </li>
          </ul>

          <h2 className="text-2xl font-semibold text-primary mb-4 mt-8">The Astral Brand</h2>
          <p className="text-gray-300 mb-6 leading-relaxed">
            Astral represents innovation, clarity, and cosmic alignment. Our design
            philosophy embraces neon teal aesthetics, glassmorphism, and modern typography
            to create an experience that is both functional and visually stunning.
          </p>

          <div className="glass-card p-6 border border-primary/20 mt-8">
            <p className="text-center text-lg italic text-gray-300">
              &ldquo;Where Knowledge Aligns with the Stars&rdquo;
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link
            href="/guides"
            className="btn-primary inline-block"
          >
            Explore All Guides
          </Link>
        </div>
      </div>
    </div>
  )
}

