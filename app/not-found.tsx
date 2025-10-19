import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-12">
          <div className="text-8xl font-bold neon-text mb-6">404</div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">
            The page you&apos;re looking for doesn&apos;t exist in the Astral Nexus.
          </p>
          <Link href="/" className="btn-primary">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  )
}

