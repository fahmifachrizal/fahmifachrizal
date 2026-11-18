"use client"

import * as React from "react"

type Shot = { src: string; alt: string }

const GAP = 12 // px between images
const VISIBLE = 1.5 // the part-shown next image signals there is more in the rotation
const GAPS = Math.floor(VISIBLE) // whole gaps inside the visible width
const CLONES = Math.ceil(VISIBLE) // copies of the first images, for a seamless wrap

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
// Pauses while hovered or focused. Under reduced motion it never moves; the
// strip becomes a native horizontal scroll instead.
export function AutoCarousel({
  images: authored,
  interval = 3000,
  shuffle = false,
  pinned = 0,
}: {
  images: Shot[]
  interval?: number
  shuffle?: boolean
  pinned?: number
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

  React.useEffect(() => {
    if (paused || reduced) return
    const id = window.setInterval(() => setIndex((i) => i + 1), interval)
    return () => window.clearInterval(id)
  }, [paused, reduced, interval])

  // After sliding onto the clones, jump back to the real first image without a
  // transition, then turn the transition back on a frame later.
  const onTransitionEnd = (e: React.TransitionEvent) => {
    if (e.target !== e.currentTarget || index < images.length) return
    setAnimate(false)
    setIndex(0)
    requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)))
  }

  const item = `calc((100cqw - ${GAPS * GAP}px) / ${VISIBLE})`
  const items = reduced ? images : [...images, ...images.slice(0, CLONES)]

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Wondr screens"
      tabIndex={reduced ? 0 : undefined}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      className={reduced ? "overflow-x-auto [container-type:inline-size]" : "overflow-hidden [container-type:inline-size]"}
    >
      <div
        onTransitionEnd={onTransitionEnd}
        className="flex"
        style={{
          gap: GAP,
          transform: reduced ? undefined : `translateX(calc(${-index} * (${item} + ${GAP}px)))`,
          transition: animate && !reduced ? "transform 700ms cubic-bezier(0.16, 1, 0.3, 1)" : "none",
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
            className="aspect-[6/13] h-auto shrink-0 border object-cover object-top"
            style={{ width: item }}
          />
        ))}
      </div>
    </div>
  )
}
