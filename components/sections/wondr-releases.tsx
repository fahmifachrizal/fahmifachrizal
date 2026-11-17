"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export type Module = {
  name: string
  description: string
  screens: { file: string; alt: string }[]
}

// One module per slide, in release order. The track is a native scroll-snap row, so touch
// swipe and arrow-key scrolling work without extra code; the buttons scroll it
// and the scroll position drives the active module. Inactive slides are inert.
export function WondrReleases({ modules, className }: { modules: Module[]; className?: string }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  const goTo = (i: number) => {
    const track = trackRef.current
    if (!track) return
    const index = Math.max(0, Math.min(modules.length - 1, i))
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    track.scrollTo({ left: index * track.clientWidth, behavior: reduce ? "auto" : "smooth" })
    setActive(index)
  }

  const onScroll = () => {
    const track = trackRef.current
    if (!track) return
    const index = Math.round(track.scrollLeft / track.clientWidth)
    if (index !== active) setActive(index)
  }

  return (
    <div
      data-reveal
      role="region"
      aria-roledescription="carousel"
      aria-label="Wondr modules"
      className={cn("min-w-0", className)}
    >
      <div className="flex items-center justify-between gap-6">
        <ul className="flex flex-wrap gap-x-6 gap-y-3">
          {modules.map((m, i) => (
            <li key={m.name}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-controls={`module-${i}`}
                aria-current={i === active ? "true" : undefined}
                className={cn(
                  "eyebrow border-b py-1 transition-colors duration-300",
                  i === active
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                )}
              >
                {m.name}
              </button>
            </li>
          ))}
        </ul>
        <div className="flex shrink-0 gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => goTo(active - 1)}
            disabled={active === 0}
            aria-label="Previous module"
          >
            <ArrowLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => goTo(active + 1)}
            disabled={active === modules.length - 1}
            aria-label="Next module"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        tabIndex={0}
        aria-live="polite"
        aria-label="Modules"
        className="relative mt-10 flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] md:mt-12 [&::-webkit-scrollbar]:hidden"
      >
        {modules.map((m, i) => (
          <div
            key={m.name}
            id={`module-${i}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${modules.length}: ${m.name}`}
            inert={i !== active}
            className="w-full shrink-0 snap-start"
          >
            <h4 className="display text-3xl md:text-4xl">{m.name}</h4>
            <p className="mt-4 max-w-[65ch] leading-relaxed text-muted-foreground">
              {m.description}
            </p>
            <div className="mt-8 grid grid-cols-2 items-start gap-3 md:grid-cols-4 md:gap-4">
              {m.screens.map((s) => (
                <Image
                  key={s.file}
                  src={`/wondr/${s.file}.webp`}
                  alt={s.alt}
                  width={600}
                  height={1300}
                  sizes="(min-width: 1024px) 13vw, (min-width: 768px) 22vw, 45vw"
                  className="h-auto w-full"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
