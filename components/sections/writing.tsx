import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { PostCard } from "@/components/blog/post-card"
import type { BlogPost } from "@/lib/mdx"
import { SectionIntro } from "./section-intro"

export function WritingSection({ posts }: { posts: BlogPost[] }) {
  const recentPosts = posts.slice(0, 3)

  return (
    <section id="writing" aria-labelledby="writing-heading" className="section-y border-t">
      <div className="page-container">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <SectionIntro id="writing-heading" eyebrow="Writing" title="Latest from the blog" />
          <Button asChild variant="link" className="self-start text-base md:self-auto">
            <Link href="/blog">
              All posts
              <ArrowRight />
            </Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-8">
          {recentPosts.map((post, i) => (
            <div
              key={post.slug}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
            >
              <PostCard post={post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
