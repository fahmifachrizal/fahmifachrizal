"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Home, User, Briefcase, BookOpen, Mail } from "lucide-react"
import { Button } from "../ui/button"

interface FloatingNavbarProps {
  isFloating?: boolean
}

const navItems = [
  { id: "hero", icon: Home, label: "Home" },
  { id: "about", icon: User, label: "About" },
  { id: "experience", icon: Briefcase, label: "Experience" },
  { id: "blog", icon: BookOpen, label: "Blog" },
  { id: "contact", icon: Mail, label: "Contact" },
]

export function FloatingNavbar({ isFloating = false }: FloatingNavbarProps) {
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => {
          const element = document.getElementById(item.id)
          if (element) {
            const rect = element.getBoundingClientRect()
            return {
              id: item.id,
              top: rect.top,
              bottom: rect.bottom,
            }
          }
          return null
        })
        .filter(Boolean)

      // Find the section that's most visible in viewport
      const viewportMiddle = window.innerHeight / 2
      const currentSection = sections.find(
        (section) =>
          section &&
          section.top <= viewportMiddle &&
          section.bottom >= viewportMiddle
      )

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const top = element.offsetTop - 100
      window.scrollTo({ top, behavior: "smooth" })
    }
  }

  return (
    <nav
      className={cn(
        "fixed bottom-8 left-1/2 z-50 -translate-x-1/2 transition-all duration-300",
        "hidden md:block", // Hide on mobile
        isFloating ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
      )}>
      <div className="flex items-center gap-2 rounded-full border bg-background/95 px-4 py-3 shadow-lg backdrop-blur supports-backdrop-filter:bg-background/60">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <Button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={cn(
                "group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              title={item.label}>
              <Icon className="size-4" />
              <span
                className={cn(
                  "max-w-0 overflow-hidden transition-all duration-300",
                  isActive && "max-w-xs"
                )}>
                {item.label}
              </span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
