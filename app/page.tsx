import { SiteHeader } from "@/components/layout/site-header"
import { Footer } from "@/components/layout/footer"
import { getBlogPosts } from "@/lib/mdx"
import {
  HeroSection,
  TechMarquee,
  IntroSection,
  GuideSection,
  ProjectsSection,
  WritingSection,
  NumbersSection,
  ContactSection,
} from "@/components/sections"

export default async function Home() {
  const posts = await getBlogPosts()

  return (
    <>
      <SiteHeader />
      <main>
        <HeroSection />
        <TechMarquee />
        <IntroSection />
        <GuideSection />
        <ProjectsSection />
        <WritingSection posts={posts} />
        <NumbersSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
