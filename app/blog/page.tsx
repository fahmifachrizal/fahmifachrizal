import Link from "next/link"
import { getBlogPosts } from "@/lib/mdx"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container mx-auto px-6 py-12">
          <h1 className="text-5xl font-black tracking-tight">Blog</h1>
          <p className="mt-3 text-xl text-muted-foreground">
            Thoughts, tutorials, and stories
          </p>
        </div>
      </header>

      <main className="container mx-auto px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-md">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-2xl font-bold group-hover:text-primary">
                  {post.title}
                </h2>
                <p className="text-muted-foreground">{post.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
