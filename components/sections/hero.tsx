import Image from "next/image"
import { ArrowDown } from "lucide-react"

const line = "block overflow-hidden"

export function HeroSection() {
  return (
    <section aria-label="Introduction" className="page-container pt-12 md:pt-20 lg:pt-24">
      <h1 id="hero-wordmark">
        <span className={line}>
          <span className="block animate-rise text-[clamp(3.25rem,11.5vw,9.75rem)] font-black uppercase leading-[0.9] tracking-tighter">
            Fahmi
          </span>
        </span>
        <span className={line}>
          <span className="block animate-rise text-[clamp(3.25rem,11.5vw,9.75rem)] font-black uppercase leading-[0.9] tracking-tighter [animation-delay:120ms]">
            Fachrizal
          </span>
        </span>
        <span className={`${line} pb-[0.12em]`}>
          <span className="display block animate-rise text-[clamp(2.25rem,6vw,4.5rem)] [animation-delay:240ms]">
            Full Stack Developer
          </span>
        </span>
      </h1>

      <a
        href="#tech"
        aria-label="Scroll to content"
        className="mt-8 inline-flex size-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowDown className="size-5" />
      </a>

      <div className="mt-10 grid items-end gap-10 md:mt-16 lg:grid-cols-12 lg:gap-16">
        <div className="relative h-[60vh] min-h-[22rem] w-full lg:col-span-7 lg:h-[78vh] [mask-image:linear-gradient(to_bottom,black_80%,transparent_100%)]">
          <Image
            src="/hero_picture.webp"
            alt="Portrait of Fahmi Fachrizal"
            fill
            sizes="(min-width: 1024px) 58vw, 100vw"
            className="object-cover object-top mix-blend-multiply saturate-80"
            priority
          />
        </div>
        <p
          data-reveal
          className="display pb-12 text-2xl leading-[1.25] text-muted-foreground md:text-3xl lg:col-span-5 lg:pb-24"
        >
          <span className="text-foreground">Crafting elegant solutions with modern technologies.</span>{" "}
          Specialized in building scalable web applications with clean,
          maintainable code.
        </p>
      </div>
    </section>
  )
}
