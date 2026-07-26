"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { User, Briefcase, BookOpen, Mail } from "lucide-react"

export function FloatingNavbar() {
  const [isFloating, setIsFloating] = useState(false)
  const [nearFooter, setNearFooter] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsFloating(scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const footer = document.querySelector("footer")
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { rootMargin: "0px 0px -10% 0px" }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  const visible = isFloating && !nearFooter

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      aria-hidden={!visible}
      className={`fixed left-1/2 z-50 w-full -translate-x-1/2 transition-all duration-500 ease-out bottom-2 max-w-fit ${visible
          ? "rounded-full border border-border shadow-2xl bg-background/40 backdrop-blur-2xl opacity-100"
          : "pointer-events-none opacity-0"
        }`}>
      <div className="mx-auto flex items-center justify-center px-1 md:px-2 md:py-2 transition-all duration-500 ease-out md:gap-2">
        <Button
          size="lg"
          variant="ghost"
          onClick={() => scrollToSection("about")}
          className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none rounded-full">
          <User />
          <span className="hidden sm:inline">About</span>
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => scrollToSection("experience")}
          className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none rounded-full">
          <Briefcase />
          <span className="hidden sm:inline">Experience</span>
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => scrollToSection("blog")}
          className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none rounded-full">
          <BookOpen />
          <span className="hidden sm:inline">Blog</span>
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => scrollToSection("contact")}
          className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none rounded-full">
          <Mail />
          <span className="hidden sm:inline">Contact</span>
        </Button>
      </div>
    </nav>
  )
}
