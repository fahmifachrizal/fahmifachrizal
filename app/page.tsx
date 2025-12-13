import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, FileText, Briefcase, User } from "lucide-react"

export default function Home() {
  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Hero Section */}
      <main className="flex flex-1 items-center justify-center px-8 py-16 md:px-16 lg:px-24">
        <div className="grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left: Profile Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative background */}
              <div className="absolute -inset-4 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 blur-2xl" />

              {/* Image container */}
              <div className="relative overflow-hidden rounded-lg border-4 border-card shadow-2xl">
                <Image
                  src="/profile.jpg"
                  alt="Profile"
                  width={600}
                  height={800}
                  className="h-auto w-full max-w-md object-cover"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Right: Caption/Description */}
          <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                Your Name
              </h1>
              <p className="text-2xl font-semibold text-primary sm:text-3xl">
                Full Stack Developer
              </p>
            </div>

            <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Crafting elegant solutions with modern technologies. Passionate
              about creating exceptional digital experiences that make a
              difference. Specialized in building scalable web applications with
              clean, maintainable code.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="shadow-lg">
                <Mail />
                Get in Touch
              </Button>
              <Button size="lg" variant="outline" className="shadow-md">
                <FileText />
                View Resume
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation Menu - Full Width */}
      <nav className="w-full border-t border-border bg-card/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-1 px-8 py-4 md:gap-2">
          <Button
            size="lg"
            variant="ghost"
            className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none">
            <User />
            <span className="hidden sm:inline">About</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none">
            <Briefcase />
            <span className="hidden sm:inline">Projects</span>
          </Button>

          <div className="hidden h-8 w-px bg-border md:block" />

          <Button
            size="lg"
            variant="ghost"
            className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none">
            <Github />
            <span className="hidden sm:inline">GitHub</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none">
            <Linkedin />
            <span className="hidden sm:inline">LinkedIn</span>
          </Button>
          <Button
            size="lg"
            variant="ghost"
            className="flex-1 hover:bg-primary hover:text-primary-foreground md:flex-none">
            <Mail />
            <span className="hidden sm:inline">Email</span>
          </Button>
        </div>
      </nav>

      {/* Ambient decorative elements */}
      <div className="pointer-events-none absolute left-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
    </div>
  )
}
