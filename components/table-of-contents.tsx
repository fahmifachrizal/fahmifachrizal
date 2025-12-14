"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  content: string
}

export function TableOfContents({ content }: TableOfContentsProps) {
  const [toc, setToc] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")
  const tocRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Parse headings from markdown content
    const headingRegex = /^(#{1,3})\s+(.+)$/gm
    const headings: TOCItem[] = []
    let match

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "")

      headings.push({ id, text, level })
    }

    setToc(headings)
  }, [content])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find all currently intersecting headings
        const intersectingEntries = entries.filter(
          (entry) => entry.isIntersecting
        )

        if (intersectingEntries.length > 0) {
          // Get the first intersecting heading
          const firstIntersecting = intersectingEntries[0]
          setActiveId(firstIntersecting.target.id)
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    )

    const headings = document.querySelectorAll(
      "article h1, article h2, article h3"
    )
    headings.forEach((heading) => observer.observe(heading))

    // Handle edge case: when scrolled to bottom, activate last heading
    const handleScroll = () => {
      const isBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 100
      if (isBottom && toc.length > 0) {
        setActiveId(toc[toc.length - 1].id)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [toc])

  // Auto-scroll active item into view
  useEffect(() => {
    if (activeId && tocRef.current) {
      const activeElement = tocRef.current.querySelector(
        `[data-id="${activeId}"]`
      )
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
        })
      }
    }
  }, [activeId])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element) {
      const top = element.offsetTop - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  if (toc.length === 0) return null

  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        On This Page
      </p>
      <nav
        ref={tocRef}
        className="max-h-[calc(100vh-12rem)] overflow-y-auto overscroll-contain pr-2 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-border">
        <div className="space-y-0.5">
          {toc.map((item) => (
            <a
              key={item.id}
              data-id={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "block border-l-2 py-1.5 text-xs transition-all hover:text-foreground",
                item.level === 1 && "pl-2",
                item.level === 2 && "pl-3",
                item.level === 3 && "pl-4",
                activeId === item.id
                  ? "border-primary text-foreground font-medium bg-accent/50"
                  : "border-border text-muted-foreground hover:border-muted-foreground/50"
              )}
              title={item.text}>
              <span className="line-clamp-2">{item.text}</span>
            </a>
          ))}
        </div>
      </nav>
    </div>
  )
}
