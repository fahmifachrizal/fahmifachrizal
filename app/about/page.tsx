import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { TopNavbar } from "@/components/layout/top-navbar"
import { Footer } from "@/components/layout/footer"
import Content from "./content.mdx"

export const metadata = {
    title: "About | Mukhammad Fahmi Fachrizal",
    description: "Professional portfolio and background of Mukhammad Fahmi Fachrizal",
}

export default function AboutPage() {
    return (
        <>
            <TopNavbar />

            <div className="min-h-screen bg-background pb-8">
                {/* Breadcrumb Navigation */}
                <div className="border-b">
                    <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                            <ChevronLeft className="size-4" />
                            Back to home
                        </Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12 bg-white rounded-2xl">
                    {/* Article Content */}
                    <article className="mx-auto w-full max-w-5xl">
                        <div className="prose prose-neutral prose-sm sm:prose-lg max-w-none">
                            <Content />
                        </div>
                    </article>
                </div>
            </div>

            <Footer />
        </>
    )
}
