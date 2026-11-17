import { cn } from "@/lib/utils"
import { SectionIntro } from "./section-intro"
import { WondrReleases, type Module } from "./wondr-releases"

type Project = {
  title: string
  period: string
  description: string
  technologies: string[]
  modules?: Module[]
}

// Content from the Experience section and the CV. Wondr is the latest work, so
// it is the one ink feature: summary on the left, a carousel of the modules
// built for it (in release order) on the right. No links: none are published yet.
const projects: Project[] = [
  {
    title: "Wondr by BNI",
    period: "June 2023 – present",
    description:
      "Foundational engineering team member for the Wondr digital banking platform, building a feature module in each release, plus internal developer tools.",
    technologies: ["Miniprograms", "TypeScript", "Micro-frontends"],
    modules: [
      {
        name: "Bonds",
        description:
          "Government bonds and sukuk (ORI, SBR, ST) in the app: browse open series with their remaining national quota, coupon rate and ordering window, then track holdings and estimated coupons in the portfolio.",
        screens: [
          { file: "bonds-creation", alt: "Bonds onboarding: start investing in Wondr" },
          { file: "bonds-products", alt: "Bonds product list with quota and coupon rates" },
          { file: "bonds-detail", alt: "Bond detail with coupon, tenor and product info" },
          { file: "bonds-dashboard", alt: "Bonds portfolio dashboard" },
        ],
      },
      {
        name: "Mutual Funds",
        description:
          "A risk-profile check with recommended allocations, a fund catalogue filtered by category with side-by-side comparison, and fund detail pages with performance history.",
        screens: [
          { file: "mutualfunds-risk", alt: "Investment risk profile with recommended allocations" },
          { file: "mutualfunds-compare", alt: "Mutual fund list with compare tray" },
          { file: "mutualfunds-detail", alt: "Mutual fund detail with performance and product info" },
          { file: "mutualfunds-dashboard", alt: "Mutual funds portfolio dashboard" },
        ],
      },
      {
        name: "DPLK",
        description:
          "A retirement fund opened in a few steps: an inflation-aware retirement simulation, package selection, account opening, then balance and growth tracking.",
        screens: [
          { file: "dplk-creation", alt: "Retirement simulation explaining inflation" },
          { file: "dplk-detail", alt: "Retirement fund package detail with returns chart" },
          { file: "dplk-result", alt: "Retirement account opening in progress" },
          { file: "dplk-dashboard", alt: "Retirement fund dashboard with balance and growth" },
        ],
      },
      {
        name: "Gold",
        description:
          "Gold savings bought and sold by the gram, with live buy and sell prices, a price-history chart and the gold portfolio in one place.",
        screens: [
          { file: "gold-dashboard", alt: "Gold dashboard with portfolio and buy and sell prices" },
          { file: "gold-graph", alt: "Gold price history chart" },
          { file: "gold-gather", alt: "Gold purchase form in rupiah and grams" },
          { file: "gold-result", alt: "Gold purchase confirmation" },
        ],
      },
      {
        name: "Lifestyle",
        description:
          "A lifestyle hub for train and flight tickets, events and vouchers, with payment from a Wondr account and a filterable transaction history.",
        screens: [
          { file: "lifestyle-dashboard", alt: "Lifestyle hub with tickets, events and vouchers" },
          { file: "lifestyle-gather", alt: "Train ticket bill payment" },
          { file: "lifestyle-result", alt: "Payment in progress receipt" },
          { file: "lifestyle-history", alt: "Lifestyle transaction history" },
        ],
      },
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

function Summary({ project, className }: { project: Project; className?: string }) {
  return (
    <>
      <p className={cn("max-w-[65ch] text-lg leading-relaxed text-muted-foreground", className)}>
        {project.description}
      </p>
      <TechList items={project.technologies} />
    </>
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
          className={project.modules ? "surface-ink" : "border-t"}
        >
          <div className="page-container section-y grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div data-reveal className={project.modules ? "lg:col-span-4" : "lg:col-span-6"}>
              <p className="eyebrow text-muted-foreground">
                {project.period}
                {project.modules && " · Latest work"}
              </p>
              <h3 id={`project-${i}`} className="display mt-5 text-4xl md:text-5xl lg:text-6xl">
                {project.title}
              </h3>
              {project.modules && <Summary project={project} className="mt-8" />}
            </div>
            {project.modules ? (
              <WondrReleases modules={project.modules} className="lg:col-span-8" />
            ) : (
              <div data-reveal className="lg:col-span-6">
                <Summary project={project} className="md:text-xl" />
              </div>
            )}
          </div>
        </article>
      ))}
    </section>
  )
}
