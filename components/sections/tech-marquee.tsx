"use client"

import { useState } from "react"
import { Pause, Play } from "lucide-react"

const technologies = [
  "React Native",
  "TypeScript",
  "Micro-frontends",
  "OpenAI",
  "MapsAPI",
  "PostgreSQL",
  "Vue",
  "Pinia",
  "Firebase",
  "AWS",
  "WRF Modeling",
  "Linux",
  "PHP",
  "GIS",
]

export function TechMarquee() {
  const [paused, setPaused] = useState(false)

  return (
    <section id="tech" aria-labelledby="tech-heading" className="overflow-hidden py-16 md:py-24">
      <div className="page-container flex items-center justify-between gap-6">
        <h2 id="tech-heading" className="eyebrow text-muted-foreground">
          Technologies I work with
        </h2>
        <button
          type="button"
          onClick={() => setPaused((p) => !p)}
          aria-pressed={paused}
          className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground hover:text-foreground motion-reduce:hidden"
        >
          {paused ? <Play className="size-3.5" /> : <Pause className="size-3.5" />}
          {paused ? "Play" : "Pause"}
        </button>
      </div>

      <div
        className="mt-10 flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:w-auto motion-reduce:animate-none"
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            aria-hidden={copy === 1 || undefined}
            className={`flex shrink-0 items-center motion-reduce:page-container motion-reduce:flex-wrap motion-reduce:gap-y-4 ${copy === 1 ? "motion-reduce:hidden" : ""}`}
          >
            {technologies.map((tech) => (
              <li
                key={tech}
                className="display flex items-center whitespace-nowrap text-3xl md:text-5xl after:mx-6 after:text-muted-foreground after:content-['/'] md:after:mx-10"
              >
                {tech}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  )
}
