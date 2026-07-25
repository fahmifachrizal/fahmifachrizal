"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Shuffle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SiblingQuestion {
  slug: string
  topic: string
}

interface NextQuestionPickerProps {
  prep: string
  currentSlug: string
  currentTopic: string
  questions: SiblingQuestion[]
}

export function NextQuestionPicker({
  prep,
  currentSlug,
  currentTopic,
  questions,
}: NextQuestionPickerProps) {
  const router = useRouter()

  const topics = React.useMemo(
    () => Array.from(new Set(questions.map((q) => q.topic))).sort(),
    [questions]
  )

  const goToRandom = (topic: string) => {
    const others = questions.filter((q) => q.slug !== currentSlug)
    const sameTopic = others.filter((q) => q.topic === topic)
    const pool = sameTopic.length > 0 ? sameTopic : others

    if (pool.length === 0) return
    const next = pool[Math.floor(Math.random() * pool.length)]
    router.push(`/learn/${prep}/${next.slug}`)
  }

  return (
    <div className="inline-flex rounded-md shadow-xs">
      <Button
        onClick={() => goToRandom(currentTopic)}
        className="gap-2 rounded-r-none"
      >
        <Shuffle className="size-4" />
        Next question
      </Button>

      {topics.length > 1 && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              className="rounded-l-none border-l border-primary-foreground/20"
              aria-label="Pick a category"
            >
              <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {topics.map((topic) => (
              <DropdownMenuItem key={topic} onClick={() => goToRandom(topic)}>
                {topic}
                {topic === currentTopic && (
                  <span className="ml-auto text-xs text-muted-foreground">
                    current
                  </span>
                )}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  )
}
