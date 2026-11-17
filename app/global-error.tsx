"use client"

import { useEffect } from "react"
import Link from "next/link"
import "./globals.css"

// Replaces the root layout when it fails, so it loads the stylesheet itself
// and keeps to plain elements (no header, which may be what failed).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body className="bg-background font-sans text-foreground antialiased">
        <main className="page-container section-y min-h-screen">
          <p className="eyebrow text-muted-foreground">Error</p>
          <h1 className="display mt-5 text-5xl md:text-6xl lg:text-7xl">Something went wrong</h1>
          <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
            A critical error stopped the site from loading. Try again, or go back to the home page.
          </p>
          {error.digest && (
            <p className="mt-4 font-mono text-xs text-muted-foreground">Error ID: {error.digest}</p>
          )}
          <div className="mt-12 flex flex-wrap items-center gap-8">
            <button
              onClick={reset}
              className="inline-flex h-12 items-center bg-primary px-8 text-sm font-medium text-primary-foreground hover:bg-primary/85"
            >
              Try again
            </button>
            <Link href="/" className="text-sm font-medium underline-offset-[6px] hover:underline">
              Back to home →
            </Link>
          </div>
        </main>
      </body>
    </html>
  )
}
