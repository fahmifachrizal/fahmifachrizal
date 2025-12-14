"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@/lib/utils"

export function CopyButton({
  value,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  value: string
}) {
  const [hasCopied, setHasCopied] = React.useState(false)

  React.useEffect(() => {
    if (hasCopied) {
      const timeout = setTimeout(() => setHasCopied(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [hasCopied])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setHasCopied(true)
  }

  return (
    <button
      className={cn(
        "absolute right-4 top-4 z-10 size-8 rounded-md border bg-background p-1.5 opacity-70 hover:opacity-100",
        className
      )}
      onClick={copyToClipboard}
      {...props}>
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Check className="size-full" />
      ) : (
        <Copy className="size-full" />
      )}
    </button>
  )
}
