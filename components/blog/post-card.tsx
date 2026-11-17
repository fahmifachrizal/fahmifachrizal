import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { BlogPost } from "@/lib/mdx"

// Editorial post card shared by the home "Writing" section and /blog.
export function PostCard({ post, headingLevel = "h3" }: { post: BlogPost; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel

  return (
    <article className="group relative flex flex-col border-t pt-6">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        <time dateTime={post.date}>
          {new Date(post.date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        {post.readTime ? <span> · {post.readTime}</span> : null}
      </p>
      <Heading className="display mt-5 text-2xl leading-tight md:text-[1.75rem]">
        <Link
          href={`/blog/${post.slug}`}
          className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[6px]"
        >
          {post.title}
        </Link>
      </Heading>
      <p className="mt-4 line-clamp-3 text-muted-foreground">{post.description}</p>
      <span aria-hidden className="mt-6 inline-flex items-center gap-2 text-sm font-medium">
        Read
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </article>
  )
}
