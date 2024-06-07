import ContentSection from "@/components/sections/ContentSection"
import HeroSection from "@/components/sections/HeroSection"
import Image from "next/image"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
      <ContentSection />
    </div>
  )
}
