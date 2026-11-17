import { cn } from "@/lib/utils"

// Opening block for inner pages: eyebrow, large light H1, optional lead.
export function PageIntro({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <header className={cn("max-w-4xl", className)}>
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h1 className="display mt-5 text-5xl md:text-6xl lg:text-7xl">{title}</h1>
      {description && (
        <p className="mt-6 max-w-[65ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
          {description}
        </p>
      )}
    </header>
  )
}
