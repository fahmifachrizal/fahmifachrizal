import { ExternalLink } from "lucide-react"

export function ExperienceSection() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "Built a full-featured e-commerce platform with payment integration, inventory management, and real-time order tracking. Implemented using Next.js, PostgreSQL, and Stripe API.",
      technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    },
    {
      title: "Analytics Dashboard",
      description:
        "Developed a comprehensive analytics dashboard for monitoring business metrics with real-time data visualization and custom reporting features.",
      technologies: ["React", "D3.js", "Node.js"],
    },
    {
      title: "Mobile App Development",
      description:
        "Created a cross-platform mobile application for task management with offline capabilities, push notifications, and seamless cloud synchronization.",
      technologies: ["React Native", "Firebase", "Redux"],
    },
    {
      title: "AI-Powered Chatbot",
      description:
        "Integrated AI capabilities into a customer service chatbot, improving response accuracy and reducing resolution time by 40%.",
      technologies: ["Python", "OpenAI", "FastAPI"],
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
