import { Button } from "@/components/ui/button"
import { Mail, FileText } from "lucide-react"
import { email } from "@/lib/constant"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="flex min-h-screen items-center justify-center px-8 py-16 md:px-16 lg:px-24">
  <div className="grid h-full w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
    
    {/* Left: Set explicit height (e.g. 60vh or 70vh) to scale the picture up */}
    <div className="relative h-[65vh] w-full [mask-image:linear-gradient(to_bottom,black_75%,transparent_100%)]">
<Image
  src="/hero_picture.webp"
  alt="Fahmi Fachrizal"
  fill={true}
  className="object-cover object-top mix-blend-multiply saturate-80"
  priority
/>
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
        <Button size="lg" className="shadow-lg" asChild>
          <a href={`mailto:${email}`}>
            <Mail className="mr-2 size-4" />
            Get in Touch
          </a>
        </Button>
        <Button size="lg" variant="secondary" className="shadow-md" asChild>
          <a href="/resume" target="_blank" rel="noopener noreferrer">
            <FileText className="mr-2 size-4" />
            View Resume
          </a>
        </Button>
      </div>
    </div>
  </div>
</section>
  )
}
