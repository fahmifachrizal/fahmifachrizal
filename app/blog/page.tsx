import { getBlogPosts } from "@/lib/mdx"
import { SiteHeader } from "@/components/layout/site-header"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { PageIntro } from "@/components/layout/page-intro"
import { PostCard } from "@/components/blog/post-card"

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <>
      <SiteHeader />
      <MainLayout>
        <PageIntro eyebrow="Writing" title="Blog" description="Thoughts, tutorials, and stories" />

        <div className="mt-16 grid gap-x-8 gap-y-14 md:mt-24 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <div key={post.slug} data-reveal>
              <PostCard post={post} headingLevel="h2" />
            </div>
          ))}
        </div>
      </MainLayout>
      <Footer />
    </>
  )
}
