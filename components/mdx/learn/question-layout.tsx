import * as React from "react"

interface QuestionLayoutProps {
  children: React.ReactNode
}

export function QuestionLayout({ children }: QuestionLayoutProps) {
  return (
    <div className="my-6 grid gap-8 lg:grid-cols-2 lg:items-start">
      {children}
    </div>
  )
}

export function QuestionPane({ children }: QuestionLayoutProps) {
  return <div className="lg:sticky lg:top-24 space-y-6">{children}</div>
}

export function ExplanationPane({ children }: QuestionLayoutProps) {
  return <div className="space-y-6">{children}</div>
}
