"use client"

import * as React from "react"
import { Check, X } from "lucide-react"
import { cn } from "@/lib/utils"

interface ChoicesContextValue {
  answer: string
  selected: string | null
  select: (label: string) => void
}

const ChoicesContext = React.createContext<ChoicesContextValue | null>(null)

interface ChoicesProps {
  answer: string
  children: React.ReactNode
}

export function Choices({ answer, children }: ChoicesProps) {
  const [selected, setSelected] = React.useState<string | null>(null)

  const select = React.useCallback(
    (label: string) => {
      setSelected((prev) => prev ?? label)
    },
    []
  )

  return (
    <ChoicesContext.Provider value={{ answer, selected, select }}>
      <div className="my-6 space-y-2">{children}</div>
    </ChoicesContext.Provider>
  )
}

interface ChoiceProps {
  label: string
  children: React.ReactNode
}

export function Choice({ label, children }: ChoiceProps) {
  const context = React.useContext(ChoicesContext)
  if (!context) {
    throw new Error("Choice must be used inside Choices")
  }

  const { answer, selected, select } = context
  const isAnswered = selected !== null
  const isCorrect = label === answer
  const isSelected = label === selected

  return (
    <button
      type="button"
      onClick={() => select(label)}
      disabled={isAnswered}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
        !isAnswered && "hover:border-primary/50 hover:bg-accent",
        isAnswered && "disabled:cursor-default",
        isAnswered && isCorrect && "border-green-500/50 bg-green-500/10",
        isAnswered && isSelected && !isCorrect && "border-red-500/50 bg-red-500/10"
      )}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
          isAnswered && isCorrect && "border-green-500 bg-green-500 text-white",
          isAnswered && isSelected && !isCorrect && "border-red-500 bg-red-500 text-white"
        )}
      >
        {isAnswered && isCorrect ? (
          <Check className="size-3.5" />
        ) : isAnswered && isSelected ? (
          <X className="size-3.5" />
        ) : (
          label
        )}
      </span>
      <span className="flex-1">{children}</span>
    </button>
  )
}
