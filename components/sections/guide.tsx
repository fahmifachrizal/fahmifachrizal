import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionIntro } from "./section-intro"

const paths = [
  {
    title: "Projects",
    href: "/#projects",
    description: "Digital banking, travel, logistics and early-warning systems.",
  },
  {
    title: "Writing",
    href: "/blog",
    description: "Thoughts, tutorials, and stories.",
  },
  {
    title: "Contact",
    href: "/#contact",
    description: "Have a question, or just want to say hi?",
  },
]

export function GuideSection() {
  return (
    <section aria-labelledby="guide-heading" className="section-y">
      <div className="page-container">
        <SectionIntro id="guide-heading" eyebrow="Where to next" title="What are you looking for?" />

        <ul className="mt-14 grid border-t md:mt-20 md:grid-cols-3">
          {paths.map((path, i) => (
            <li
              key={path.title}
              data-reveal
              style={{ "--reveal-delay": `${i * 100}ms` } as React.CSSProperties}
              className="border-b md:border-b-0 md:border-l md:first:border-l-0"
            >
              <Link
                href={path.href}
                className="group flex h-full flex-col p-6 transition-colors duration-300 hover:bg-card md:p-8 lg:p-10"
              >
                <span className="eyebrow text-muted-foreground">0{i + 1}</span>
                <h3 className="mt-12 text-[1.75rem] font-normal uppercase leading-[0.88] tracking-tight lg:mt-20 lg:text-[2rem] xl:text-4xl">
                  {path.title}
                </h3>
                <p className="mt-4 text-muted-foreground">{path.description}</p>
                <ArrowRight className="mt-8 size-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
