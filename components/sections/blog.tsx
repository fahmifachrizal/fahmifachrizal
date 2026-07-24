import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BlogPost } from "@/lib/mdx"

interface BlogSectionProps {
  posts: BlogPost[]
}

export function BlogSection({ posts }: BlogSectionProps) {
  // Take only the first 3 posts
  const recentPosts = posts.slice(0, 3)

  return (
    <section id="blogs" className="bg-card/30 scroll-mt-24 px-8 py-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <h2 className="text-4xl font-bold text-foreground">Latest Blogs</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {recentPosts.map((blog, index) => (
            <article
              key={index}
              className="group flex flex-col justify-between space-y-4 rounded-lg border border-border bg-card p-6 shadow-md transition-all hover:shadow-xl">
              <div>
                <div className="text-sm text-muted-foreground">{blog.date}</div>
                <h3 className="mt-2 text-xl font-semibold text-foreground group-hover:text-primary line-clamp-2">
                  {blog.title}
                </h3>
                <p className="mt-2 text-muted-foreground line-clamp-3">{blog.description}</p>
              </div>
              <Button variant="link" className="p-0 self-start" asChild>
                <Link href={`/blog/${blog.slug}`}>Read More →</Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
