import React from "react"
import { Button } from "@/components/ui/button"
import { User, Briefcase, BookOpen, Mail } from "lucide-react"

interface NavigationMenuProps {
  isFloating: boolean
}

export function Navbar({ isFloating }: NavigationMenuProps) {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <nav
      className={`fixed left-1/2 z-50 w-full -translate-x-1/2 transition-all duration-300 ease-out ${
        isFloating ? "bottom-8" : "bottom-0"
      }`}>
      <div
        className={`mx-auto flex items-center justify-center gap-1 px-4 py-4 backdrop-blur-xl transition-all duration-300 ease-out md:gap-2 ${
          isFloating
            ? "max-w-3xl rounded-lg border border-border shadow-2xl bg-background/40"
            : "max-w-7xl border-t border-border bg-background/50"
        }`}>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => scrollToSection("about")}
          className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none">
          <User />
          <span className="hidden sm:inline">About</span>
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => scrollToSection("experience")}
          className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none">
          <Briefcase />
          <span className="hidden sm:inline">Experience</span>
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => scrollToSection("blogs")}
          className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none">
          <BookOpen />
          <span className="hidden sm:inline">Blogs</span>
        </Button>
        <Button
          size="lg"
          variant="ghost"
          onClick={() => scrollToSection("contact")}
          className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none">
          <Mail />
          <span className="hidden sm:inline">Contact</span>
        </Button>
      </div>
    </nav>
  )
}
