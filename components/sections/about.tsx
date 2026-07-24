export function AboutSection() {
  return (
    <section id="about" className="bg-card/30  scroll-mt-24 px-8 py-16 md:px-16 lg:px-24">
      <div className="mx-auto max-w-4xl space-y-8">
        <h2 className="text-4xl font-bold text-foreground">About Me</h2>
        <div className="space-y-4 text-lg text-muted-foreground">
          <p>
            I&apos;m a passionate full-stack developer with a keen eye for
            design and a love for building user-centric applications. With
            several years of experience in the industry, I&apos;ve worked on
            diverse projects ranging from e-commerce platforms to SaaS
            applications.
          </p>
          <p>
            My approach combines technical expertise with creative
            problem-solving, ensuring that every project not only functions
            flawlessly but also delivers an exceptional user experience. I
            believe in writing clean, maintainable code and staying up-to-date
            with the latest industry trends and best practices.
          </p>
          <div className="pt-4">
            <a href="/about" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
              Read more about my journey <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
