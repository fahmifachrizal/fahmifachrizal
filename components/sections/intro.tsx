import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function IntroSection() {
  return (
    <section id="intro" aria-labelledby="intro-heading" className="surface-ink">
      <div className="page-container section-y grid gap-10 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="lg:col-span-7">
          <p className="eyebrow text-muted-foreground">About</p>
          <h2
            id="intro-heading"
            className="display mt-5 text-3xl leading-[1.15] md:text-4xl lg:text-5xl"
          >
            A full-stack developer with a keen eye for design and a love for
            building user-centric applications.
          </h2>
        </div>
        <div data-reveal className="lg:col-span-5 lg:pt-12">
          <p className="max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
            Several years in the industry, on projects ranging from e-commerce
            platforms to SaaS applications. My approach pairs technical
            expertise with creative problem-solving, and I care about writing
            clean, maintainable code.
          </p>
          <Button asChild variant="link" className="mt-10 text-base">
            <Link href="/about">
              More about me
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
