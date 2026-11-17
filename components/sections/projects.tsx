import Image from "next/image"
import { SectionIntro } from "./section-intro"

type Project = {
  title: string
  period: string
  description: string
  technologies: string[]
  images?: { src: string; alt: string; width: number; height: number }[]
}

// Content from the Experience section and the CV; screenshots only where
// they belong to the project (Wondr). No links: none are published yet.
const projects: Project[] = [
  {
    title: "Wondr by BNI",
    period: "June 2023 – present",
    description:
      "Foundational engineering team member for the Wondr digital banking platform. Built investment modules (Bonds, Mutual Funds) and internal developer tools.",
    technologies: ["React Native", "TypeScript", "Micro-frontends"],
    images: [
      { src: "/wondr/gold-dashboard.webp", alt: "Wondr gold savings dashboard", width: 600, height: 1300 },
      { src: "/wondr/mutualfunds-dashboard.webp", alt: "Wondr mutual funds dashboard", width: 600, height: 1300 },
      { src: "/wondr/dplk-dashboard.webp", alt: "Wondr retirement fund dashboard", width: 600, height: 1300 },
    ],
  },
  {
    title: "Wanderia",
    period: "January 2023",
    description:
      "AI-Assisted Travel & Navigation app helping users plan short trips with smart routing. Integrated OpenAI for itinerary generation.",
    technologies: ["React Native", "OpenAI", "MapsAPI", "PostgreSQL"],
  },
  {
    title: "Zigzag Delivery",
    period: "December 2022",
    description:
      "Public transport logistics app optimizing delivery routes based on existing schedules to reduce carbon footprint.",
    technologies: ["Vue", "Pinia", "Firebase", "AWS"],
  },
  {
    title: "MHEWS",
    period: "August 2018",
    description:
      "Multi Hazard Early Warning System providing real-time weather alerts and hazard monitoring for Indonesia.",
    technologies: ["WRF Modeling", "Linux", "PHP", "GIS"],
  },
]

function TechList({ items }: { items: string[] }) {
  return (
    <ul aria-label="Technologies" className="mt-8 flex flex-wrap gap-x-3 gap-y-2 text-xs font-medium uppercase tracking-[0.14em]">
      {items.map((tech, i) => (
        <li key={tech} className="flex items-center gap-3">
          {i > 0 && <span aria-hidden className="text-muted-foreground">/</span>}
          {tech}
        </li>
      ))}
    </ul>
  )
}

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-heading">
      <div className="page-container border-t pb-16 pt-16 md:pb-24 md:pt-24">
        <SectionIntro id="projects-heading" eyebrow="Selected work" title="Experience & Projects" />
      </div>

      {projects.map((project, i) => (
        <article
          key={project.title}
          aria-labelledby={`project-${i}`}
          className={i % 2 === 0 ? "surface-ink" : "border-t"}
        >
          <div className="page-container section-y grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div data-reveal className={project.images ? "lg:col-span-5" : "lg:col-span-6"}>
              <p className="eyebrow text-muted-foreground">{project.period}</p>
              <h3 id={`project-${i}`} className="display mt-5 text-4xl md:text-5xl lg:text-6xl">
                {project.title}
              </h3>
            </div>

            {project.images ? (
              <>
                <div data-reveal className="lg:col-span-7 lg:row-span-2">
                  <div className="grid grid-cols-3 items-start gap-3 md:gap-5">
                    {project.images.map((img) => (
                      <Image
                        key={img.src}
                        src={img.src}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        sizes="(min-width: 1024px) 18vw, 30vw"
                        className="h-auto w-full"
                      />
                    ))}
                  </div>
                </div>
                <div data-reveal className="lg:col-span-5">
                  <p className="max-w-[65ch] text-lg leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <TechList items={project.technologies} />
                </div>
              </>
            ) : (
              <div data-reveal className="lg:col-span-6">
                <p className="max-w-[65ch] text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {project.description}
                </p>
                <TechList items={project.technologies} />
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}
