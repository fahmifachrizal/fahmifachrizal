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
        "size-8 rounded-md border bg-background p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-accent",
        hasCopied && "opacity-100",
        className
      )}
      onClick={copyToClipboard}
      title={hasCopied ? "Copied!" : "Copy to clipboard"}
      {...props}
    >
      <span className="sr-only">Copy</span>
      {hasCopied ? (
        <Check className="size-full text-green-500" />
      ) : (
        <Copy className="size-full" />
      )}
    </button>
  )
}