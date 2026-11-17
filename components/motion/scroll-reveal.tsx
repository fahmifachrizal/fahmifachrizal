"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

// One observer for the whole page: any element with `data-reveal` fades and
// slides up the first time it enters the viewport. The hidden start state is
// CSS-only and gated on `.js` + no reduced-motion preference (globals.css).
export function ScrollReveal() {
  const pathname = usePathname()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-revealed", "")
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px" }
    )
    document
      .querySelectorAll("[data-reveal]:not([data-revealed])")
      .forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [pathname])

  return null
}
