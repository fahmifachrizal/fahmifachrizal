import { Button } from "@/components/ui/button"
import { Mail, FileText } from "lucide-react"

export function HeroSection() {
  return (
    <section className="flex min-h-screen items-center justify-center px-8 py-16 md:px-16 lg:px-24">
      <div className="grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Left: Empty space with decorative elements */}
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 rounded-lg bg-linear-to-br from-primary/10 to-accent/10 blur-3xl" />
          <div className="absolute inset-20 rounded-lg bg-linear-to-tl from-primary/5 to-accent/5 blur-2xl" />
        </div>

        {/* Right: Caption/Description */}
        <div className="flex flex-col justify-center space-y-6 lg:space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl lg:text-7xl">
              Fahmi Fachrizal
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
    </section>
  )
}
