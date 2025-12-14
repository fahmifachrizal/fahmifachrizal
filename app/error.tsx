"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RefreshCw, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Decorative Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-destructive/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-destructive/5 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <AlertTriangle className="h-16 w-16 text-destructive" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-8">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Something went wrong!
          </h1>
          <p className="text-lg text-muted-foreground">
            We encountered an unexpected error. Don&apos;t worry, it&apos;s not your
            fault. Try refreshing the page or go back to the home page.
          </p>
        </div>

        {/* Error Details (Development) */}
        {process.env.NODE_ENV === "development" && (
          <div className="mb-8 rounded-lg border border-destructive/20 bg-destructive/5 p-4">
            <p className="text-left text-xs font-mono text-destructive">
              {error.message || "Unknown error occurred"}
            </p>
            {error.digest && (
              <p className="mt-2 text-left text-xs text-muted-foreground">
                Error ID: {error.digest}
              </p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" onClick={reset} className="w-full sm:w-auto">
            <RefreshCw />
            Try Again
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => (window.location.href = "/")}
            className="w-full sm:w-auto">
            <Home />
            Back to Home
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 rounded-lg border bg-card/50 p-6 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">
            If this problem persists, please{" "}
            <Link
              href="/#contact"
              className="font-medium text-primary hover:underline">
              contact me
            </Link>{" "}
            with details about what you were trying to do.
          </p>
        </div>
      </div>
    </div>
  )
}
