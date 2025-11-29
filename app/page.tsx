"use client"

import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Features from "@/components/features"
// import ScrollDiaryAnimation from "@/components/scroll-diary-animation"
import Showcase from "@/components/showcase"
import Testimonials from "@/components/testimonials"
import Pricing from "@/components/pricing"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      {/* <ScrollDiaryAnimation /> */}
      <Features />
      <Showcase />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  )
}
