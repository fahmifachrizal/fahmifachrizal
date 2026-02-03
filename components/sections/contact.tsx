import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"
import { email, github, linkedin } from "@/lib/constant"

export function ContactSection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-card/30 px-8 py-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <h2 className="text-4xl font-bold text-foreground">Get In Touch</h2>

        <div className="space-y-6">
          <p className="text-lg text-muted-foreground">
            I&apos;m always interested in hearing about new projects and
            opportunities. Whether you have a question or just want to say hi,
            feel free to reach out!
          </p>

          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="shadow-lg" asChild>
              <a href={`mailto:${email}`}>
                <Mail className="mr-2 size-4" />
                {email}
              </a>
            </Button>
            <Button size="lg" variant="outline" className="shadow-md" asChild>
              <a href={github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 size-4" />
                GitHub
              </a>
            </Button>
            <Button size="lg" variant="outline" className="shadow-md" asChild>
              <a href={linkedin} target="_blank" rel="noopener noreferrer">
                <Linkedin className="mr-2 size-4" />
                LinkedIn
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
