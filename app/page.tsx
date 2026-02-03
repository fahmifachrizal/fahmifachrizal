import { FloatingNavbar } from "@/components/layout/floating-navbar"
import { Footer } from "@/components/layout/footer"
import { getBlogPosts } from "@/lib/mdx"
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  BlogSection,
  ContactSection,
} from "@/components/sections"

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <>
      <div className="relative min-h-screen w-full">
        {/* Hero Section */}
        <section id="hero">
          <HeroSection />
        </section>

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        {/* Experience/Projects Section */}
        <section id="experience">
          <ExperienceSection />
        </section>

        {/* Blog Section */}
        <section id="blog">
          <BlogSection posts={posts} />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>

        {/* Floating Navigation Menu (Desktop only) */}
        <FloatingNavbar />

        {/* Ambient decorative elements */}
        <div className="pointer-events-none fixed left-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none fixed bottom-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}