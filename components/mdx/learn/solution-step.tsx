import * as React from "react"

interface SolutionStepProps {
  number: number
  title: string
  children: React.ReactNode
}

export function SolutionStep({ number, title, children }: SolutionStepProps) {
  return (
    <div className="flex gap-4">
      <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
        {number}
      </div>
      <div className="flex-1 space-y-2 pt-0.5">
        <h4 className="font-semibold">{title}</h4>
        <div className="prose prose-neutral prose-sm dark:prose-invert max-w-none text-muted-foreground [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {children}
        </div>
      </div>
    </div>
  )
}
