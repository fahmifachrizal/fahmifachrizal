import { Pool } from "pg"

const connectionString = process.env.DATABASE_URL
const schema = process.env.DATABASE_SCHEMA

if (!connectionString || !schema) {
  throw new Error("DATABASE_URL and DATABASE_SCHEMA must be set")
}

// Reuse one pool across dev hot-reloads instead of leaking a new one per reload.
const globalForPg = globalThis as unknown as { pgPool?: Pool }
const pool = globalForPg.pgPool ?? new Pool({ connectionString })
if (process.env.NODE_ENV !== "production") globalForPg.pgPool = pool

// The schema name contains a dot ("fahmifachrizal.com"), so it must be quoted.
const questionsTable = `"${schema.replace(/"/g, '""')}".questions`

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

let prepsCache: PrepInfo[] | null = null
const questionsCache = new Map<string, Question[]>()

export async function getPreps(): Promise<PrepInfo[]> {
  if (prepsCache) return prepsCache

  const { rows } = await pool.query<{ prep: string }>(
    `SELECT DISTINCT prep FROM ${questionsTable} ORDER BY prep`
  )

  prepsCache = rows.map(({ prep: id }) => ({
    id,
    name: PREP_CONFIG[id]?.name ?? id.toUpperCase(),
    description: PREP_CONFIG[id]?.description ?? "",
  }))

  return prepsCache
}

export async function getQuestions(prep: string): Promise<Question[]> {
  const cached = questionsCache.get(prep)
  if (cached) return cached

  // to_char keeps `date` a plain "YYYY-MM-DD" string; node-pg would otherwise
  // hand back a JS Date (shifted by the local timezone).
  const { rows } = await pool.query<Question>(
    `SELECT slug, prep, title, topic, difficulty,
            to_char(date, 'YYYY-MM-DD') AS date, content
       FROM ${questionsTable} AS q
      WHERE prep = $1
      ORDER BY q.date DESC`,
    [prep]
  )

  questionsCache.set(prep, rows)
  return rows
}

export async function getQuestion(
  prep: string,
  slug: string
): Promise<Question | null> {
  const questions = await getQuestions(prep)
  return questions.find((q) => q.slug === slug) ?? null
}
