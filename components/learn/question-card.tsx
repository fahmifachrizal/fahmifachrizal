import Link from "next/link"

const difficultyStyles: Record<string, string> = {
  easy: "text-success",
  medium: "text-warning",
  hard: "text-destructive",
}

interface QuestionCardProps {
  href: string
  title: string
  topic: string
  difficulty: string
  date: string
}

export function QuestionCard({
  href,
  title,
  topic,
  difficulty,
  date,
}: QuestionCardProps) {
  return (
    <Link
      href={href}
      className="group rounded-xl border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg"
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <time dateTime={date}>
            {new Date(date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
          <span>•</span>
          <span className={difficultyStyles[difficulty] ?? ""}>
            {difficulty}
          </span>
        </div>
        <h3 className="text-xl font-bold leading-tight transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{topic}</p>
      </div>
    </Link>
  )
}
