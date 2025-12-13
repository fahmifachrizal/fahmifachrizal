import { Button } from "@/components/ui/button"
import { Mail, Github, Linkedin } from "lucide-react"

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
            <Button size="lg" className="shadow-lg">
              <Mail />
              fahmi@example.com
            </Button>
            <Button size="lg" variant="outline" className="shadow-md">
              <Github />
              GitHub
            </Button>
            <Button size="lg" variant="outline" className="shadow-md">
              <Linkedin />
              LinkedIn
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
