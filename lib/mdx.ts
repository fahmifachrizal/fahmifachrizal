import fs from "fs"
import path from "path"
import matter from "gray-matter"

const contentDirectory = path.join(process.cwd(), "content/blog")

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  content: string
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(contentDirectory)

  const posts = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const filePath = path.join(contentDirectory, file)
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContent)

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        readTime: data.readTime,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return posts
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(contentDirectory, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    return {
      slug,
      title: data.title,
      description: data.description,
      date: data.date,
      readTime: data.readTime,
      content,
    }
  } catch {
    return null
  }
}
