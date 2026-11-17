"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowRight, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { email } from "@/lib/constant"
import { navItems } from "./nav-items"
import { Wordmark } from "./wordmark"

export function SiteHeader() {
  const pathname = usePathname()
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [scrolled, setScrolled] = useState(false)
  // On the home page the big hero wordmark stands in for the logo, so the
  // header's small wordmark only fades in once the hero one has scrolled away.
  const [heroWordmarkVisible, setHeroWordmarkVisible] = useState(pathname === "/")

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const target = document.getElementById("hero-wordmark")
    if (!target) {
      setHeroWordmarkVisible(false)
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => setHeroWordmarkVisible(entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px" }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [pathname])

  const closeMenu = () => dialogRef.current?.close()

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href || pathname.startsWith(`${href}/`)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 h-16 border-b bg-background/85 backdrop-blur-md transition-colors duration-300",
        scrolled ? "border-border" : "border-transparent"
      )}
    >
      <div className="page-container flex h-full items-center justify-between gap-6">
        <Link
          href="/"
          aria-label="Fahmi Fachrizal, home"
          className={cn(
            "text-[0.8125rem] transition-opacity duration-500",
            heroWordmarkVisible && "pointer-events-none opacity-0"
          )}
          tabIndex={heroWordmarkVisible ? -1 : undefined}
        >
          <Wordmark />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              {...("external" in item && item.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="px-4 py-2 text-sm font-medium underline-offset-[6px] decoration-1 hover:underline aria-[current=page]:underline"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="hidden h-10 px-6 sm:inline-flex">
            <Link href="/#contact">Let&apos;s talk</Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open menu"
            aria-haspopup="dialog"
            onClick={() => dialogRef.current?.showModal()}
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        aria-label="Menu"
        className="m-0 h-dvh max-h-none w-full max-w-none bg-background p-0 text-foreground backdrop:bg-transparent open:flex"
      >
        <div className="page-container flex min-h-full flex-col">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <Link href="/" onClick={closeMenu} className="text-[0.8125rem]" aria-label="Fahmi Fachrizal, home">
              <Wordmark />
            </Link>
            <Button variant="ghost" size="icon" aria-label="Close menu" onClick={closeMenu} autoFocus>
              <X className="size-5" />
            </Button>
          </div>

          <nav aria-label="Mobile" className="mt-10 flex flex-col">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                {...("external" in item && item.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="display group flex items-center justify-between border-b py-4 text-4xl"
              >
                {item.label}
                <ArrowRight className="size-6 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-6 py-10">
            <Button asChild size="lg" className="self-start">
              <Link href="/#contact" onClick={closeMenu}>
                Let&apos;s talk
              </Link>
            </Button>
            <a href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-foreground">
              {email}
            </a>
          </div>
        </div>
      </dialog>
    </header>
  )
}
