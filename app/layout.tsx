import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: {
    default: "Fahmi Fachrizal - Full Stack Developer",
    template: "%s | Fahmi Fachrizal",
  },
  description:
    "Full Stack Developer crafting elegant solutions with modern technologies. Passionate about creating exceptional digital experiences.",
  keywords: [
    "Full Stack Developer",
    "Web Development",
    "React",
    "Next.js",
    "TypeScript",
    "Software Engineer",
  ],
  authors: [{ name: "Fahmi Fachrizal" }],
  creator: "Fahmi Fachrizal",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://fahmifachrizal.vercel.app",
    title: "fahmifachrizal - Full Stack Developer",
    description:
      "Full Stack Developer crafting elegant solutions with modern technologies.",
    siteName: "fahmifachrizal",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fahmi Fachrizal - Full Stack Developer",
    description:
      "Full Stack Developer crafting elegant solutions with modern technologies.",
    creator: "@mf_fachrizal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
