"use client"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/Navbar"
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
    <div className="relative min-h-screen w-full pb-32">
      {/* Hero Section */}
      <HeroSection />

      {/* About Section */}
      <AboutSection />

      {/* Experience/Projects Section */}
      <ExperienceSection />

      {/* Blogs Section */}
      <BlogSection />

      {/* Contact Section */}
      <ContactSection />

      {/* Navigation Menu */}
      <Navbar isFloating={isFloating} />

      {/* Ambient decorative elements */}
      <div className="pointer-events-none fixed left-0 top-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-0 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
    </div>
  )
}
