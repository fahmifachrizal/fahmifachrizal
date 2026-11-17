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

export function QuestionCard({ href, title, topic, difficulty, date }: QuestionCardProps) {
  return (
    <article className="group relative flex flex-col border-t pt-6">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        <time dateTime={date}>
          {new Date(date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </time>
        <span aria-hidden> · </span>
        <span className={difficultyStyles[difficulty] ?? ""}>{difficulty}</span>
      </p>
      <h3 className="display mt-4 text-xl leading-tight md:text-2xl">
        <Link
          href={href}
          className="after:absolute after:inset-0 group-hover:underline group-hover:decoration-1 group-hover:underline-offset-[6px]"
        >
          {title}
        </Link>
      </h3>
      <p className="mt-3 text-sm text-muted-foreground">{topic}</p>
    </article>
  )
}
