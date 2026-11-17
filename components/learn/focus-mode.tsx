"use client"

import * as React from "react"
import { Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { NextQuestionPicker } from "@/components/learn/next-question-picker"

interface SiblingQuestion {
  slug: string
  topic: string
}

interface FocusModeProps {
  children: React.ReactNode
  prep: string
  currentSlug: string
  currentTopic: string
  questions: SiblingQuestion[]
}

export function FocusMode({
  children,
  prep,
  currentSlug,
  currentTopic,
  questions,
}: FocusModeProps) {
  const [isFocus, setIsFocus] = React.useState(
    () => typeof document !== "undefined" && !!document.fullscreenElement
  )

  const enter = () => {
    setIsFocus(true)
    document.documentElement.requestFullscreen().catch(() => {})
  }

  const exit = () => {
    setIsFocus(false)
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {})
    }
  }

  React.useEffect(() => {
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) {
        setIsFocus(false)
      }
    }
    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  React.useEffect(() => {
    document.body.style.overflow = isFocus ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isFocus])

  return (
    <div
      className={cn(
        "relative",
        isFocus &&
          "fixed inset-0 top-16 z-40 overflow-y-auto bg-background"
      )}
    >

      <div
        className={cn(
          "relative",
          isFocus && "mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12"
        )}
      >
        {!isFocus && (
          <div className="mb-4 flex justify-end">
            <Button
              variant="outline"
              size="icon"
              onClick={enter}
              aria-label="Enter focus mode"
              title="Focus mode"
            >
              <Maximize className="size-4" />
            </Button>
          </div>
        )}

        {children}

        {!isFocus && (
          <div className="mt-10 flex justify-center border-t pt-8">
            <NextQuestionPicker
              prep={prep}
              currentSlug={currentSlug}
              currentTopic={currentTopic}
              questions={questions}
            />
          </div>
        )}
      </div>

      {isFocus && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 border bg-background p-3">
          <NextQuestionPicker
            prep={prep}
            currentSlug={currentSlug}
            currentTopic={currentTopic}
            questions={questions}
          />
          <Button
            variant="secondary"
            size="icon"
            onClick={exit}
            aria-label="Exit focus mode"
            title="Exit focus mode (Esc)"
          >
            <Minimize className="size-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
