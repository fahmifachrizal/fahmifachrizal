import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { getPreps, getQuestion, getQuestions } from "@/lib/learn"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import { mdxComponents } from "@/components/mdx-components"
import { TopNavbar } from "@/components/layout/top-navbar"
import { Footer } from "@/components/layout/footer"
import { FocusMode } from "@/components/learn/focus-mode"

export async function generateStaticParams() {
  const preps = getPreps()
  const params: { prep: string; questionId: string }[] = []

  for (const prep of preps) {
    const questions = await getQuestions(prep.id)
    for (const question of questions) {
      params.push({ prep: prep.id, questionId: question.slug })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ prep: string; questionId: string }>
}) {
  const { prep, questionId } = await params
  const question = await getQuestion(prep, questionId)

  if (!question) {
    return {}
  }

  return {
    title: question.title,
    description: question.topic,
  }
}

export default async function QuestionPage({
  params,
}: {
  params: Promise<{ prep: string; questionId: string }>
}) {
  const { prep, questionId } = await params
  const question = await getQuestion(prep, questionId)

  if (!question) {
    notFound()
  }

  const siblingQuestions = (await getQuestions(prep)).map((q) => ({
    slug: q.slug,
    topic: q.topic,
  }))

  return (
    <>
      <TopNavbar />

      <div className="min-h-screen bg-muted/20">
        <div className="border-b bg-background/50 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
            <Link
              href={`/learn/${prep}`}
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ChevronLeft className="size-4" />
              Back to {question.prep.toUpperCase()}
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <article className="w-full rounded-2xl border bg-card p-6 shadow-sm md:p-12">
            <FocusMode
              prep={prep}
              currentSlug={question.slug}
              currentTopic={question.topic}
              questions={siblingQuestions}
            >
              <header className="mb-8">
                <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{question.topic}</span>
                  <span>•</span>
                  <span className="capitalize">{question.difficulty}</span>
                </div>
                <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                  {question.title}
                </h1>
              </header>

              <div className="prose prose-neutral prose-sm sm:prose-base max-w-none">
                <MDXRemote
                  source={question.content}
                  components={mdxComponents}
                  options={{
                    mdxOptions: {
                      remarkPlugins: [remarkMath],
                      rehypePlugins: [rehypeKatex],
                    },
                  }}
                />
              </div>
            </FocusMode>
          </article>
        </div>
      </div>

      <Footer />
    </>
  )
}
