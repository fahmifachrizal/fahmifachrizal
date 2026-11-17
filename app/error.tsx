"use client"

import { useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { Footer } from "@/components/layout/footer"
import { PageIntro } from "@/components/layout/page-intro"

export default function Error({
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
    <>
      <SiteHeader />
      <main className="page-container section-y min-h-[70vh]">
        <PageIntro
          eyebrow="Error"
          title="Something went wrong"
          description="An unexpected error stopped this page from loading. Try again, or go back to the home page."
        />
        {process.env.NODE_ENV === "development" && (
          <pre className="mt-8 max-w-[65ch] overflow-x-auto border border-destructive/40 p-4 font-mono text-xs text-destructive">
            {error.message || "Unknown error occurred"}
            {error.digest && `\nError ID: ${error.digest}`}
          </pre>
        )}
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Button size="lg" onClick={reset}>
            Try again
          </Button>
          <Button asChild variant="link">
            <Link href="/">
              Back to home <ArrowRight />
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
