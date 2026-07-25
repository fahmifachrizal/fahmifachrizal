import * as React from "react"

interface QuestionProps {
  children: React.ReactNode
}

export function Question({ children }: QuestionProps) {
  return (
    <div className="my-6 rounded-xl border bg-card p-6">
      <div className="prose prose-neutral prose-sm sm:prose-base dark:prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
        {children}
      </div>
    </div>
  )
}
