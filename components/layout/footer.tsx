import Link from "next/link"
import { Github, Linkedin, Mail } from "lucide-react"
import { forwardRef } from "react"
import { email, github, linkedin } from "@/lib/constant"

export const Footer = forwardRef<HTMLElement>((props, ref) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer ref={ref} className="border-t bg-card/30 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand Section */}
          <div className="space-y-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-lg font-bold hover:text-primary transition-colors">
              <span className="text-2xl">✦</span>
              <span>fahmifachrizal</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer crafting elegant solutions with modern
              technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href="/#about"
                className="text-muted-foreground hover:text-foreground transition-colors">
                About
              </Link>
              <Link
                href="/#experience"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Experience
              </Link>
              <Link
                href="/blog"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
              <Link
                href="/#contact"
                className="text-muted-foreground hover:text-foreground transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Social Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Connect</h3>
            <div className="flex gap-3">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent hover:text-accent-foreground">
                <Github className="size-4" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex size-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent hover:text-accent-foreground">
                <Linkedin className="size-4" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href={`mailto:${email}`}
                className="inline-flex size-9 items-center justify-center rounded-md border bg-background transition-colors hover:bg-accent hover:text-accent-foreground">
                <Mail className="size-4" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
          <p>© {currentYear} fahmifachrizal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
})

Footer.displayName = "Footer"