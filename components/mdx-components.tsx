import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { FileIcon, AlertCircle, Info, CheckCircle, AlertTriangle } from "lucide-react"
import { Presentation } from "@/components/mdx/step-container"
import { DatabaseDiagram } from "@/components/mdx/database-diagram"
import { CopyButton } from "@/components/mdx/copy-button"
import { LatestBlog } from "@/components/mdx/latest-blog"
import { Question } from "@/components/mdx/learn/question"
import { Choices, Choice } from "@/components/mdx/learn/choices"
import { Explanation } from "@/components/mdx/learn/explanation"
import { SolutionStep } from "@/components/mdx/learn/solution-step"
import {
  QuestionLayout,
  QuestionPane,
  ExplanationPane,
} from "@/components/mdx/learn/question-layout"

// Generate ID from heading text
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

// Icon component for code blocks
function getIconForLanguage(language: string) {
  const icons: Record<string, React.ReactNode> = {
    typescript: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z" />
      </svg>
    ),
    javascript: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z" />
      </svg>
    ),
    bash: (
      <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21.038 4.9 13.461.402a2.86 2.86 0 0 0-2.923.001L2.961 4.9A3.023 3.023 0 0 0 1.5 7.503v8.995c0 1.073.557 2.066 1.462 2.603l7.577 4.497a2.86 2.86 0 0 0 2.922 0l7.577-4.497a3.023 3.023 0 0 0 1.462-2.603V7.503A3.021 3.021 0 0 0 21.038 4.9z" />
      </svg>
    ),
  }

  return icons[language] || <FileIcon className="size-4" />
}

// Callout component for special messages
interface CalloutProps extends React.HTMLAttributes<HTMLDivElement> {
  type?: "info" | "warning" | "danger" | "success"
}

const Callout = ({ type = "info", className, children, ...props }: CalloutProps) => {
  const icons = {
    info: <Info className="size-5" />,
    warning: <AlertTriangle className="size-5" />,
    danger: <AlertCircle className="size-5" />,
    success: <CheckCircle className="size-5" />,
  }

  const styles = {
    info: "bg-primary/5 border-primary/10 text-primary",
    warning: "bg-yellow-500/10 border-yellow-500/20 text-yellow-700 dark:text-yellow-400",
    danger: "bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400",
    success: "bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400",
  }

  return (
    <div
      className={cn(
        "my-6 flex gap-3 rounded-lg border p-4",
        styles[type],
        className
      )}
      {...props}
    >
      <div className="mt-0.5">{icons[type]}</div>
      <div className="flex-1 space-y-2">{children}</div>
    </div>
  )
}

export const mdxComponents = {
  // Typography
  h1: ({ className, children, ...props }: React.ComponentProps<"h1">) => {
    const id = typeof children === "string" ? slugify(children) : ""
    return (
      <h1
        id={id}
        className={cn(
          "mt-2 scroll-m-20 text-4xl font-bold tracking-tight",
          className
        )}
        {...props}
      >
        {children}
      </h1>
    )
  },
  h2: ({ className, children, ...props }: React.ComponentProps<"h2">) => {
    const id = typeof children === "string" ? slugify(children) : ""
    return (
      <h2
        id={id}
        className={cn(
          "mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
          className
        )}
        {...props}
      >
        {children}
      </h2>
    )
  },
  h3: ({ className, children, ...props }: React.ComponentProps<"h3">) => {
    const id = typeof children === "string" ? slugify(children) : ""
    return (
      <h3
        id={id}
        className={cn(
          "mt-8 scroll-m-20 text-2xl font-semibold tracking-tight",
          className
        )}
        {...props}
      >
        {children}
      </h3>
    )
  },
  h4: ({ className, ...props }: React.ComponentProps<"h4">) => (
    <h4
      className={cn(
        "mt-8 scroll-m-20 text-xl font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h5: ({ className, ...props }: React.ComponentProps<"h5">) => (
    <h5
      className={cn(
        "mt-8 scroll-m-20 text-lg font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  h6: ({ className, ...props }: React.ComponentProps<"h6">) => (
    <h6
      className={cn(
        "mt-8 scroll-m-20 text-base font-semibold tracking-tight",
        className
      )}
      {...props}
    />
  ),
  a: ({ className, ...props }: React.ComponentProps<"a">) => (
    <a
      className={cn(
        "font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  p: ({ className, ...props }: React.ComponentProps<"p">) => (
    <p
      className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}
      {...props}
    />
  ),
  ul: ({ className, ...props }: React.ComponentProps<"ul">) => (
    <ul className={cn("my-6 ml-6 list-disc", className)} {...props} />
  ),
  ol: ({ className, ...props }: React.ComponentProps<"ol">) => (
    <ol className={cn("my-6 ml-6 list-decimal", className)} {...props} />
  ),
  li: ({ className, ...props }: React.ComponentProps<"li">) => (
    <li className={cn("mt-2", className)} {...props} />
  ),
  blockquote: ({ className, ...props }: React.ComponentProps<"blockquote">) => (
    <blockquote
      className={cn(
        "mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground",
        className
      )}
      {...props}
    />
  ),
  img: ({ className, alt, ...props }: React.ComponentProps<"img">) => (
    <img className={cn("rounded-md border", className)} alt={alt} {...props} />
  ),
  hr: ({ ...props }: React.ComponentProps<"hr">) => (
    <hr className="my-8 border-border" {...props} />
  ),
  table: ({ className, ...props }: React.ComponentProps<"table">) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className={cn("w-full border-collapse", className)} {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.ComponentProps<"tr">) => (
    <tr
      className={cn("m-0 border-t border-border p-0 even:bg-muted/50", className)}
      {...props}
    />
  ),
  th: ({ className, ...props }: React.ComponentProps<"th">) => (
    <th
      className={cn(
        "border border-border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),
  td: ({ className, ...props }: React.ComponentProps<"td">) => (
    <td
      className={cn(
        "border border-border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        className
      )}
      {...props}
    />
  ),

  // Code blocks
  pre: ({ children }: React.ComponentProps<"pre">) => {
    return <>{children}</>
  },

  code: ({
    className,
    children,
    ...props
  }: React.ComponentProps<"code"> & {
    __raw__?: string
    __language__?: string
  }) => {
    // Inline code
    if (typeof children === "string" && !className?.includes("language-")) {
      return (
        <code
          className={cn(
            "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold",
            className
          )}
          {...props}
        >
          {children}
        </code>
      )
    }

    // Code block
    const language = className?.replace("language-", "") || "text"
    const codeString = String(children).trim()

    return (
      <div className="relative my-6 group rounded-lg border bg-muted/50">
        <div className="flex items-center justify-between rounded-t-lg border-b bg-muted/30 px-4 py-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            {getIconForLanguage(language)}
            <span className="font-medium">{language}</span>
          </div>
          <CopyButton value={codeString} />
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-sm rounded-b-lg">
          <code
            className={cn("relative block font-mono text-sm", className)}
            {...props}
          >
            {children}
          </code>
        </pre>
      </div>
    )
  },

  // Custom components
  Link: ({ className, ...props }: React.ComponentProps<typeof Link>) => (
    <Link
      className={cn(
        "font-medium text-foreground underline underline-offset-4 hover:text-muted-foreground",
        className
      )}
      {...props}
    />
  ),

  Image: ({
    src,
    className,
    width,
    height,
    alt,
    ...props
  }: React.ComponentProps<"img">) => (
    <Image
      className={cn("mt-6 rounded-lg border", className)}
      src={(src as string) || ""}
      width={Number(width) || 800}
      height={Number(height) || 400}
      alt={alt || ""}
      {...props}
    />
  ),

  Callout,
  Presentation,
  DatabaseDiagram,
  LatestBlog,
  Step: ({ title, children }: { title?: string; children: React.ReactNode }) => (
    <div className="w-full" data-title={title}>
      {children}
    </div>
  ),

  // Learn (GRE/GMAT/etc. prep questions)
  Question,
  Choices,
  Choice,
  Explanation,
  SolutionStep,
  QuestionLayout,
  QuestionPane,
  ExplanationPane,
}