
import Link from "next/link"
import { getBlogPosts } from "@/lib/mdx"
import { ArrowRight, Calendar } from "lucide-react"

async function LatestBlogContent() {
    // 1. Fetch posts securely on the server
    const posts = await getBlogPosts()
    const latestPost = posts[0]

    if (!latestPost) return null

    return (
        <div className="flex flex-col h-full justify-center space-y-8">
            <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tight">Latest from the Blog</h2>
                <p className="text-muted-foreground text-lg">
                    I write about web development, system design, and my journey in tech.
                    Check out my latest article:
                </p>
            </div>

            <div className="group relative overflow-hidden rounded-xl border bg-card transition-colors hover:bg-accent/50">
                <div className="p-6 md:p-8">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                        <Calendar className="size-4" />
                        <time dateTime={latestPost.date}>{latestPost.date}</time>
                        <span>•</span>
                        <span>{latestPost.readTime}</span>
                    </div>

                    <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {latestPost.title}
                    </h3>

                    <p className="text-muted-foreground mb-6 line-clamp-2">
                        {latestPost.description}
                    </p>

                    <Link
                        href={`/blog/${latestPost.slug}`}
                        className="inline-flex items-center gap-2 text-primary font-medium group-hover:translate-x-1 transition-transform"
                    >
                        Read Article <ArrowRight className="size-4" />
                    </Link>
                </div>
            </div>

            <div className="pt-4">
                <Link
                    href="/blog"
                    className="text-muted-foreground hover:text-foreground text-sm font-medium transition-colors"
                >
                    View all articles &rarr;
                </Link>
            </div>
        </div>
    )
}

export function LatestBlog() {
    // Wrap in a div that will be treated as a Step by the Presentation component
    // The Presentation component looks for children, and if we wrap our async component
    // inside a "Step" equivalent structure (div with data-title), it should work.
    // Actually, standard Step component adds `data-title`. 
    // We can reuse the Step component from mdx-components if accessible, 
    // or return the structure `Presentation` expects.
    // The `Presentation` component iterates children. 
    // If we assume this component is used INSIDE a <Step>...</Step> in MDX, 
    // then it just renders content.
    // BUT the user asked for "one more section... that show latest blog".
    // So we probably want this component to *be* the step.

    // Since `Presentation` (client component) expects children, passing a Server Component
    // as a child is fine in App Router.

    return (
        <div className="w-full" data-title="Read More">
            <LatestBlogContent />
        </div>
    )
}
