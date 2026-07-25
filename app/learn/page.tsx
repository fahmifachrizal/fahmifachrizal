import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getPreps, getQuestions } from "@/lib/learn"
import { QuestionCard } from "@/components/learn/question-card"
import { TopNavbar } from "@/components/layout/top-navbar"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"

export default async function LearnPage() {
  const preps = getPreps()
  const sections = await Promise.all(
    preps.map(async (prep) => ({
      prep,
      questions: (await getQuestions(prep.id)).slice(0, 6),
    }))
  )

  return (
    <>
      <TopNavbar />
      <MainLayout>
        <div className="py-12 md:py-16 lg:py-24">
          <header className="mb-12 text-center">
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              Learn
            </h1>
            <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
              Practice questions for GRE, GMAT, and more
            </p>
          </header>

          <main className="mx-auto max-w-5xl space-y-16">
            {sections.map(({ prep, questions }) => (
              <section key={prep.id}>
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                      {prep.name}
                    </h2>
                    {prep.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {prep.description}
                      </p>
                    )}
                  </div>
                  <Link
                    href={`/learn/${prep.id}`}
                    className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    View all
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

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
              </section>
            ))}
          </main>
        </div>
      </MainLayout>
      <Footer />
    </>
  )
}
