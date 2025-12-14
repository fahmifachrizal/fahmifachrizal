import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      {/* Decorative Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-2xl text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-black text-primary/20 sm:text-[12rem]">
            404
          </h1>
          <div className="-mt-12 sm:-mt-16">
            <div className="inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-sm font-medium shadow-lg">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-destructive"></span>
              </span>
              Page Not Found
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Oops! Page not found
          </h2>
          <p className="text-lg text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Don&apos;t worry, let&apos;s get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button size="lg" asChild className="w-full sm:w-auto">
            <Link href="/">
              <Home />
              Back to Home
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto">
            <Link href="/blog">
              <Search />
              Browse Blog
            </Link>
          </Button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 rounded-lg border bg-card/50 p-6 backdrop-blur-sm">
          <p className="text-sm text-muted-foreground">
            Need help? Try searching for what you&apos;re looking for or{" "}
            <Link
              href="/#contact"
              className="font-medium text-primary hover:underline">
              contact me
            </Link>{" "}
            if you think this is an error.
          </p>
        </div>
      </div>
    </div>
  )
}