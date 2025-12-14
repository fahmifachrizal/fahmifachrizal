import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getBlogPost, getBlogPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import { mdxComponents } from "@/components/mdx-components"
import { TableOfContents } from "@/components/table-of-contents"
import { TopNavbar } from "@/components/layout/top-navbar"
import { Footer } from "@/components/layout/footer"

export async function generateStaticParams() {
  const posts = await getBlogPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      <TopNavbar />

      <div className="min-h-screen bg-background">
        {/* Breadcrumb Navigation */}
        <div className="border-b">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ChevronLeft className="size-4" />
              Back to blog
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_280px]">
            {/* Article Content */}
            <article className="mx-auto w-full max-w-3xl">
              <header className="mb-12">
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
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
                <h1 className="text-4xl font-black tracking-tight sm:text-5xl">
                  {post.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                  {post.description}
                </p>
              </header>

              <div className="prose prose-neutral prose-sm sm:prose-base dark:prose-invert max-w-none">
                <MDXRemote source={post.content} components={mdxComponents} />
              </div>
            </article>

            {/* Table of Contents - Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-24">
                <TableOfContents content={post.content} />
              </div>
            </aside>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
