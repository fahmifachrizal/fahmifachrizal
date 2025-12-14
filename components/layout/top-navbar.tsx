import Link from "next/link"
import { Home, BookOpen, Mail } from "lucide-react"

export function TopNavbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Brand */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold hover:text-primary transition-colors">
            <span className="text-2xl">✦</span>
            <span>fahmifachrizal</span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              <Home className="size-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              <BookOpen className="size-4" />
              <span className="hidden sm:inline">Blog</span>
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground">
              <Mail className="size-4" />
              <span className="hidden sm:inline">Contact</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}