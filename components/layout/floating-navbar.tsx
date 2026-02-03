"use client"

import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { User, Briefcase, BookOpen, Mail } from "lucide-react"

export function FloatingNavbar() {
  const [isFloating, setIsFloating] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsFloating(scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed left-1/2 z-50 w-full -translate-x-1/2 transition-all duration-500 ease-out bottom-2 max-w-fit ${isFloating &&
        "rounded-full border border-border shadow-2xl bg-background/40 backdrop-blur-2xl"
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
