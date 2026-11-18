"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

type Shot = { src: string; alt: string }

// Image width lives in --item. By default the strip shows one and a half
// images (the part-shown one signals more): (100cqw - 16px inset - one 12px
// gap) / 1.5. The last 3rem fade softly (to 25% opacity, not fully out).
// With `fill`, from lg up the strip takes the height its parent gives it and
// the width follows the 6:13 screen ratio. Fewer than two images are visible
// either way, so two clones of the first images make the wrap seamless.
const GAP = 12 // px between images
const INSET = 16 // px of left padding before the leading image
const SLIDE_MS = 450
const CLONES = 2

// One random seed per page load. The server snapshot is null, so the static
// HTML and hydration keep the authored order and the shuffle applies right after.
const pageSeed = typeof window === "undefined" ? 0 : Math.floor(Math.random() * 2 ** 32)
const noop = () => () => {}

function shuffled<T>(items: T[], seed: number): T[] {
  const out = [...items]
  let s = seed
  const rand = () => {
    // mulberry32: small, deterministic for a given seed
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1))
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

// Auto-rotating image strip with no controls: advances one image every
// `interval` ms and loops; `shuffle` randomises the order on every visit,
// keeping the first `pinned` images in place.
// `fill` makes it as tall as its parent allows (the parent must be a flex
// column from lg up). Pauses while hovered or focused. Under reduced motion it never moves; the
// strip becomes a native horizontal scroll instead.
export function AutoCarousel({
  images: authored,
  interval = 3000,
  firstDelay = 1000,
  shuffle = false,
  pinned = 0,
  fill = false,
}: {
  images: Shot[]
  interval?: number
  firstDelay?: number
  shuffle?: boolean
  pinned?: number
  fill?: boolean
}) {
  const seed = React.useSyncExternalStore(noop, () => pageSeed, () => null)
  const images = React.useMemo(
    () =>
      shuffle && seed !== null
        ? [...authored.slice(0, pinned), ...shuffled(authored.slice(pinned), seed)]
        : authored,
    [authored, shuffle, pinned, seed]
  )
  const [index, setIndex] = React.useState(0)
  const [animate, setAnimate] = React.useState(true)
  const [paused, setPaused] = React.useState(false)
  const reduced = React.useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
      mq.addEventListener("change", cb)
      return () => mq.removeEventListener("change", cb)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )

  // The first move comes after `firstDelay`, every later one after `interval`.
  const started = React.useRef(false)
  React.useEffect(() => {
    if (paused || reduced) return
    const id = window.setTimeout(() => {
      started.current = true
      setIndex((i) => i + 1)
    }, started.current ? interval : firstDelay)
    return () => window.clearTimeout(id)
  }, [paused, reduced, interval, firstDelay, index])

  // After sliding onto the clones, jump back to the real first image without a
  // transition, then turn the transition back on a frame later.
  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || index < images.length) return
    setAnimate(false)
    setIndex(0)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
  }

  const items = reduced ? images : [...images, ...images.slice(0, CLONES)]

  return (
    <div className={cn(fill && "lg:relative lg:min-h-0 lg:flex-1")}>
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Wondr screens"
      tabIndex={reduced ? 0 : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={cn(
        "[container-type:inline-size] [--item:calc((100cqw_-_28px)/1.5)]",
        "[mask-image:linear-gradient(to_right,#000_calc(100%_-_3rem),rgb(0_0_0/0.7)_calc(100%_-_1.5rem),rgb(0_0_0/0.25))]",
        reduced ? "overflow-x-auto" : "overflow-hidden",
        fill && "lg:absolute lg:inset-0 lg:[container-type:size] lg:[--item:calc(100cqh*6/13)]"
      )}
    >
      <div
        onTransitionEnd={onTransitionEnd}
        className={cn("flex", fill && "lg:h-full")}
        style={{
          gap: GAP,
          paddingLeft: INSET,
          transform: reduced ? undefined : `translateX(calc(${-index} * (var(--item) + ${GAP}px)))`,
          transition: animate && !reduced ? `transform ${SLIDE_MS}ms cubic-bezier(0.16, 1, 0.3, 1)` : "none",
        }}
      >
        {items.map((shot, i) => (
          // eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized WebP
          <img
            key={`${shot.src}-${i}`}
            src={shot.src}
            loading="lazy"
            decoding="async"
            alt={i < images.length ? shot.alt : ""}
            aria-hidden={i >= images.length || undefined}
            width={600}
            height={1300}
            className={cn("aspect-[6/13] h-auto shrink-0 border object-cover object-top", fill && "lg:h-full")}
            style={{ width: "var(--item)" }}
          />
        ))}
      </div>
    </div>
    </div>
  )
}
