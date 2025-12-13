import { Button } from "@/components/ui/button"

export function BlogSection() {
  const blogs = [
    {
      date: "Dec 10, 2025",
      title: "Building Scalable APIs with Next.js",
      description:
        "Learn how to design and implement scalable API routes in Next.js with best practices for performance and security.",
    },
    {
      date: "Dec 5, 2025",
      title: "The Future of Web Development",
      description:
        "Exploring emerging trends and technologies that are shaping the future of web development in 2025 and beyond.",
    },
    {
      date: "Nov 28, 2025",
      title: "TypeScript Tips & Tricks",
      description:
        "Advanced TypeScript patterns and techniques that will make your code more robust and maintainable.",
    },
  ]

  return (
    <section id="blogs" className="scroll-mt-24 px-8 py-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <h2 className="text-4xl font-bold text-foreground">Latest Blogs</h2>

        <div className="grid gap-8 md:grid-cols-3">
          {blogs.map((blog, index) => (
            <article
              key={index}
              className="group space-y-4 rounded-lg border border-border bg-card p-6 shadow-md transition-all hover:shadow-xl">
              <div className="text-sm text-muted-foreground">{blog.date}</div>
              <h3 className="text-xl font-semibold text-foreground group-hover:text-primary">
                {blog.title}
              </h3>
              <p className="text-muted-foreground">{blog.description}</p>
              <Button variant="link" className="p-0">
                Read More →
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
