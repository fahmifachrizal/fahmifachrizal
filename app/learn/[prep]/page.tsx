import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { getPreps, getQuestions } from "@/lib/learn"
import { QuestionCard } from "@/components/learn/question-card"
import { TopNavbar } from "@/components/layout/top-navbar"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"

export async function generateStaticParams() {
  return getPreps().map((prep) => ({ prep: prep.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ prep: string }>
}) {
  const { prep: prepId } = await params
  const prep = getPreps().find((p) => p.id === prepId)

  if (!prep) {
    return {}
  }

  return {
    title: prep.name,
    description: prep.description,
  }
}

export default async function PrepPage({
  params,
}: {
  params: Promise<{ prep: string }>
}) {
  const { prep: prepId } = await params
  const prep = getPreps().find((p) => p.id === prepId)

  if (!prep) {
    notFound()
  }

  const questions = await getQuestions(prep.id)

  return (
    <>
      <TopNavbar />
      <MainLayout>
        <div className="py-12 md:py-16 lg:py-24">
          <div className="mb-8">
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="size-4" />
              Back to Learn
            </Link>
          </div>

          <header className="mb-12 text-center">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              {prep.name}
            </h1>
            {prep.description && (
              <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
                {prep.description}
              </p>
            )}
          </header>

          <main className="mx-auto max-w-5xl">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {questions.map((question) => (
                <QuestionCard
                  key={question.slug}
                  href={`/learn/${prep.id}/${question.slug}`}
                  title={question.title}
                  topic={question.topic}
                  difficulty={question.difficulty}
                  date={question.date}
                />
              ))}
            </div>
          </main>
        </div>
      </MainLayout>
      <Footer />
    </>
  )
}
