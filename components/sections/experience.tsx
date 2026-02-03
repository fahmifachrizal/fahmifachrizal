import { ExternalLink } from "lucide-react"

export function ExperienceSection() {
  const projects = [
    {
      title: "Wondr by BNI",
      description:
        "Foundational engineering team member for the Wondr digital banking platform. Built investment modules (Bonds, Mutual Funds) and internal developer tools.",
      technologies: ["React Native", "TypeScript", "Micro-frontends"],
    },
    {
      title: "Wanderia",
      description:
        "AI-Assisted Travel & Navigation app helping users plan short trips with smart routing. Integrated OpenAI for itinerary generation.",
      technologies: ["React Native", "OpenAI", "MapsAPI", "PostgreSQL"],
    },
    {
      title: "Zigzag Delivery",
      description:
        "Public transport logistics app optimizing delivery routes based on existing schedules to reduce carbon footprint.",
      technologies: ["Vue", "Pinia", "Firebase", "AWS"],
    },
    {
      title: "MHEWS",
      description:
        "Multi Hazard Early Warning System providing real-time weather alerts and hazard monitoring for Indonesia.",
      technologies: ["WRF Modeling", "Linux", "PHP", "GIS"],
    },
  ]

  return (
    <section
      id="experience"
      className="scroll-mt-24 bg-card/30 px-8 py-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-6xl space-y-12">
        <h2 className="text-4xl font-bold text-foreground">
          Experience & Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group rounded-lg border border-border bg-card p-6 shadow-md transition-all hover:shadow-xl">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <h3 className="text-2xl font-semibold text-foreground">
                    {project.title}
                  </h3>
                  <ExternalLink className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <p className="text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
