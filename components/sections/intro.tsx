import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export function IntroSection() {
  return (
    <section id="intro" aria-labelledby="intro-heading" className="surface-ink">
      <div className="grid lg:grid-cols-2">
        <div className="section-y px-6 md:px-10 lg:pr-16 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))]">
          <div data-reveal className="max-w-[36rem]">
            <p className="eyebrow text-muted-foreground">About</p>
            <h2
              id="intro-heading"
              className="display mt-5 text-3xl leading-[1.15] md:text-4xl lg:text-5xl"
            >
              A full-stack developer with a keen eye for design and a love for
              building user-centric applications.
            </h2>
            <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
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
        <div className="relative min-h-[28rem] lg:min-h-full">
          <Image
            src="/profile-intro.webp"
            alt="Fahmi Fachrizal standing against a plain wall"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-[50%_30%]"
          />
        </div>
      </div>
    </section>
  )
}
