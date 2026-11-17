import { cn } from "@/lib/utils"

// Eyebrow label + large light heading: the opening of every home section.
export function SectionIntro({
  id,
  eyebrow,
  title,
  className,
}: {
  id: string
  eyebrow: string
  title: string
  className?: string
}) {
  return (
    <div data-reveal className={cn("max-w-4xl", className)}>
      <p className="eyebrow text-muted-foreground">{eyebrow}</p>
      <h2 id={id} className="display mt-5 text-4xl leading-[1.1] md:text-5xl lg:text-6xl">
        {title}
      </h2>
    </div>
  )
}
