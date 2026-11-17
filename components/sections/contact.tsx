import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { email, github, linkedin } from "@/lib/constant"

export function ContactSection() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="surface-ink border-t">
      <div className="page-container py-28 lg:py-40">
        <div data-reveal className="max-w-4xl">
          <p className="eyebrow text-muted-foreground">Contact</p>
          <h2 id="contact-heading" className="display mt-5 text-5xl md:text-6xl lg:text-7xl">
            Let&apos;s talk.
          </h2>
          <p className="mt-8 max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
            I&apos;m always interested in hearing about new projects and
            opportunities. Whether you have a question or just want to say hi,
            feel free to reach out.
          </p>
          <div className="mt-12 flex flex-col items-start gap-8 sm:flex-row sm:items-center sm:gap-10">
            <Button asChild size="lg">
              <a href={`mailto:${email}`}>{email}</a>
            </Button>
            <ul className="flex flex-wrap gap-x-8 gap-y-2">
              <li>
                <Button asChild variant="link">
                  <a href="/resume" target="_blank" rel="noopener noreferrer">
                    Resume <ArrowRight />
                  </a>
                </Button>
              </li>
              <li>
                <Button asChild variant="link">
                  <a href={linkedin} target="_blank" rel="noopener noreferrer">
                    LinkedIn <ArrowRight />
                  </a>
                </Button>
              </li>
              <li>
                <Button asChild variant="link">
                  <a href={github} target="_blank" rel="noopener noreferrer">
                    GitHub <ArrowRight />
                  </a>
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
