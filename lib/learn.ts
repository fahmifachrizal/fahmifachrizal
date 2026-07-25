import fs from "fs"
import path from "path"
import matter from "gray-matter"

const learnDirectory = path.join(process.cwd(), "content/learn")

export const PREP_CONFIG: Record<string, { name: string; description: string }> = {
  gre: {
    name: "GRE",
    description: "Graduate Record Examination practice questions",
  },
  gmat: {
    name: "GMAT",
    description: "Graduate Management Admission Test practice questions",
  },
}

export interface PrepInfo {
  id: string
  name: string
  description: string
}

export interface Question {
  slug: string
  prep: string
  title: string
  topic: string
  difficulty: "easy" | "medium" | "hard"
  date: string
  content: string
}

export function getPreps(): PrepInfo[] {
  if (!fs.existsSync(learnDirectory)) return []

  return fs
    .readdirSync(learnDirectory, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const id = entry.name
      return {
        id,
        name: PREP_CONFIG[id]?.name ?? id.toUpperCase(),
        description: PREP_CONFIG[id]?.description ?? "",
      }
    })
}

export async function getQuestions(prep: string): Promise<Question[]> {
  const prepDirectory = path.join(learnDirectory, prep)
  if (!fs.existsSync(prepDirectory)) return []

  const files = fs.readdirSync(prepDirectory)

  const questions = files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "")
      const filePath = path.join(prepDirectory, file)
      const fileContent = fs.readFileSync(filePath, "utf8")
      const { data, content } = matter(fileContent)

      return {
        slug,
        prep,
        title: data.title,
        topic: data.topic,
        difficulty: data.difficulty,
        date: data.date,
        content,
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return questions
}

export async function getQuestion(
  prep: string,
  slug: string
): Promise<Question | null> {
  try {
    const filePath = path.join(learnDirectory, prep, `${slug}.mdx`)
    const fileContent = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContent)

    return {
      slug,
      prep,
      title: data.title,
      topic: data.topic,
      difficulty: data.difficulty,
      date: data.date,
      content,
    }
  } catch {
    return null
  }
}
