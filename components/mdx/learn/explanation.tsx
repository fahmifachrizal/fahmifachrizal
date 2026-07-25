"use client"

import * as React from "react"
import { ChevronDown, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ExplanationProps {
  children: React.ReactNode
}

export function Explanation({ children }: ExplanationProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="my-6">
      <Button
        type="button"
        variant="outline"
        onClick={() => setOpen((prev) => !prev)}
        className="gap-2"
      >
        <Lightbulb className="size-4" />
        {open ? "Hide explanation" : "Show step-by-step explanation"}
        <ChevronDown
          className={cn("size-4 transition-transform", open && "rotate-180")}
        />
      </Button>

      {open && (
        <div className="mt-4 animate-in fade-in-0 slide-in-from-top-2 space-y-6 rounded-xl border bg-card/50 p-6">
          {children}
        </div>
      )}
    </div>
  )
}
