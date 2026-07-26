const SUPABASE_URL = process.env.SUPABASE_URL!
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const SUPABASE_DB_SCHEMA = process.env.SUPABASE_DB_SCHEMA!

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

async function supabaseFetch(query: string) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${query}`, {
    headers: {
      apikey: SUPABASE_SERVICE_ROLE_KEY,
      Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      "Accept-Profile": SUPABASE_DB_SCHEMA,
    },
  })

  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Supabase request failed (${res.status}): ${text}`)
  }

  return res.json()
}

let prepsCache: PrepInfo[] | null = null
const questionsCache = new Map<string, Question[]>()

export async function getPreps(): Promise<PrepInfo[]> {
  if (prepsCache) return prepsCache

  const rows: { prep: string }[] = await supabaseFetch(
    "questions?select=prep&order=prep"
  )

  const uniquePreps = Array.from(new Set(rows.map((row) => row.prep)))

  prepsCache = uniquePreps.map((id) => ({
    id,
    name: PREP_CONFIG[id]?.name ?? id.toUpperCase(),
    description: PREP_CONFIG[id]?.description ?? "",
  }))

  return prepsCache
}

export async function getQuestions(prep: string): Promise<Question[]> {
  const cached = questionsCache.get(prep)
  if (cached) return cached

  const questions: Question[] = await supabaseFetch(
    `questions?prep=eq.${encodeURIComponent(prep)}&select=slug,prep,title,topic,difficulty,date,content&order=date.desc`
  )

  questionsCache.set(prep, questions)
  return questions
}

export async function getQuestion(
  prep: string,
  slug: string
): Promise<Question | null> {
  const questions = await getQuestions(prep)
  return questions.find((q) => q.slug === slug) ?? null
}
