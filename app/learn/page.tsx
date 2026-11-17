import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getPreps, getQuestions } from "@/lib/learn"
import { QuestionCard } from "@/components/learn/question-card"
import { SiteHeader } from "@/components/layout/site-header"
import { MainLayout } from "@/components/layout/main-layout"
import { Footer } from "@/components/layout/footer"
import { PageIntro } from "@/components/layout/page-intro"
import { cn } from "@/lib/utils"

export default async function LearnPage() {
  const preps = await getPreps()
  const sections = await Promise.all(
    preps.map(async (prep) => ({
      prep,
      questions: (await getQuestions(prep.id)).slice(0, 6),
    }))
  )

  return (
    <>
      <SiteHeader />
      <MainLayout>
        <PageIntro eyebrow="Practice" title="Learn" description="Practice questions for GRE, GMAT, and more" />

          <div className="mt-16 space-y-20 md:mt-24">
            {sections.map(({ prep, questions }) => (
              <section key={prep.id}>
                <div className="mb-6 flex items-end justify-between gap-4">
                  <div>
                    <h2 className="display text-3xl md:text-4xl">
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
                    className="inline-flex shrink-0 items-center gap-2 text-sm font-medium underline-offset-[6px] decoration-1 hover:underline"
                  >
                    View all
                    <ArrowRight className="size-4" />
                  </Link>
                </div>

                <div
                  className={cn(
                    "grid gap-x-8 gap-y-12",
                    questions.length === 1 && "max-w-sm",
                    questions.length === 2 && "sm:grid-cols-2 lg:max-w-2xl",
                    questions.length >= 3 && "sm:grid-cols-2 lg:grid-cols-3"
                  )}
                >
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
          </div>
      </MainLayout>
      <Footer />
    </>
  )
}
