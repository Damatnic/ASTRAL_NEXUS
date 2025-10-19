import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <span className="text-astral-dark font-bold">A</span>
              </div>
              <span className="text-xl font-bold">
                Astral <span className="text-primary">Nexus</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Where Knowledge Aligns with the Stars
            </p>
            <p className="text-sm text-gray-500">
              Your comprehensive hub for guides, tutorials, and wisdom across every domain.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides" className="text-gray-400 hover:text-primary transition-colors">
                  All Guides
                </Link>
              </li>
              <li>
                <Link href="/study" className="text-gray-400 hover:text-primary transition-colors">
                  Study Center
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="text-gray-400 hover:text-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/settings" className="text-gray-400 hover:text-primary transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-primary mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  API Reference
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            © {currentYear} Astral Productions. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              Privacy
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-primary transition-colors">
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

