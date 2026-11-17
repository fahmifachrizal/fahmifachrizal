import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getBlogPost, getBlogPosts } from "@/lib/mdx"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import { mdxComponents } from "@/components/mdx-components"
import { TableOfContents } from "@/components/table-of-contents"
import { SiteHeader } from "@/components/layout/site-header"
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
      <SiteHeader />

      <div className="min-h-screen">
        {/* Breadcrumb Navigation */}
        <div className="border-b">
          <div className="page-container py-4">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <ChevronLeft className="size-4" />
              Back to blog
            </Link>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="page-container py-12 md:py-16 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_240px] xl:grid-cols-[1fr_280px]">
            {/* Article Content */}
            <article className="mx-auto w-full max-w-3xl">
              <header className="mb-12 border-b pb-12">
                <div className="mb-6 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
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
                <h1 className="display text-4xl md:text-5xl lg:text-6xl">
                  {post.title}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                  {post.description}
                </p>
              </header>

              <div className="prose prose-neutral prose-sm sm:prose-base max-w-none">
                <MDXRemote
                source={post.content}
                components={mdxComponents}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                  },
                }}
              />
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
