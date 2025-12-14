"use client"

import { useState, useEffect } from "react"
import { FloatingNavbar } from "@/components/layout/floating-navbar"
import { Footer } from "@/components/layout/footer"
import {
  HeroSection,
  AboutSection,
  ExperienceSection,
  BlogSection,
  ContactSection,
} from "@/components/sections"

export default function Home() {
  const [isFloating, setIsFloating] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsFloating(scrollY > 100)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
          <BlogSection />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>

        {/* Floating Navigation Menu (Desktop only) */}
        <FloatingNavbar isFloating={isFloating} />

        {/* Ambient decorative elements */}
        <div className="pointer-events-none fixed left-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none fixed bottom-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      </div>

      {/* Footer */}
      <Footer />
    </>
  )
}