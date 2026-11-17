import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { Footer } from "@/components/layout/footer"
import { PageIntro } from "@/components/layout/page-intro"

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="page-container section-y min-h-[70vh]">
        <PageIntro
          eyebrow="404"
          title="Page not found"
          description="The page you're looking for doesn't exist or has been moved."
        />
        <div className="mt-12 flex flex-wrap items-center gap-8">
          <Button asChild size="lg">
            <Link href="/">Back to home</Link>
          </Button>
          <Button asChild variant="link">
            <Link href="/blog">
              Browse the blog <ArrowRight />
            </Link>
          </Button>
        </div>
      </main>
      <Footer />
    </>
  )
}
