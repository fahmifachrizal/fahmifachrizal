import Link from "next/link"
import { email, github, linkedin } from "@/lib/constant"
import { navItems } from "./nav-items"
import { Wordmark } from "./wordmark"

const linkClass = "text-[0.9375rem] underline-offset-[6px] decoration-1 hover:underline"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-background">
      <div className="page-container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div className="space-y-4">
            <Link href="/" aria-label="Fahmi Fachrizal, home" className="inline-block text-xl">
              <Wordmark />
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground">
              Crafting elegant solutions with modern technologies.
            </p>
          </div>

          <nav aria-label="Footer" className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Site
            </h2>
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={linkClass}
                    {...("external" in item && item.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Elsewhere
            </h2>
            <ul className="space-y-2">
              <li>
                <a href={github} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  GitHub
                </a>
              </li>
              <li>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Contact
            </h2>
            <a href={`mailto:${email}`} className={`${linkClass} break-all`}>
              {email}
            </a>
          </div>
        </div>

        <div className="mt-16 border-t pt-6 text-sm text-muted-foreground">
          <p>© {currentYear} Fahmi Fachrizal</p>
        </div>
      </div>
    </footer>
  )
}
