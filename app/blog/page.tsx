import Link from "next/link"
import { getBlogPosts } from "@/lib/mdx"
import { TopNavbar } from "@/components/layout/top-navbar"
import { MainLayout } from "@/components/layout/main-layout"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <TopNavbar />
      <MainLayout>
        <div className="py-12 md:py-16 lg:py-24">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              Thoughts, tutorials, and stories
            </p>
          </header>

          <main className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </time>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h2 className="text-xl font-bold leading-tight transition-colors group-hover:text-primary">
                      {post.title}
                    </h2>
                    <p className="line-clamp-3 text-sm text-muted-foreground">
                      {post.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </main>
        </div>
      </MainLayout>
    </>
  )
}