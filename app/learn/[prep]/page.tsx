import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { getPreps, getQuestions } from "@/lib/learn"
import { QuestionCard } from "@/components/learn/question-card"
import { SiteHeader } from "@/components/layout/site-header"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { PageIntro } from "@/components/layout/page-intro"

export async function generateStaticParams() {
  const preps = await getPreps()
  return preps.map((prep) => ({ prep: prep.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ prep: string }>
}) {
  const { prep: prepId } = await params
  const prep = (await getPreps()).find((p) => p.id === prepId)

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
  const prep = (await getPreps()).find((p) => p.id === prepId)

  if (!prep) {
    notFound()
  }

  const questions = await getQuestions(prep.id)

  return (
    <>
      <SiteHeader />
      <MainLayout>
          <Link
            href="/learn"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ChevronLeft className="size-4" />
            Back to Learn
          </Link>

          <PageIntro className="mt-10" eyebrow="Learn" title={prep.name} description={prep.description || undefined} />

          <div className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-24 lg:grid-cols-3">
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
      </MainLayout>
      <Footer />
    </>
  )
}
