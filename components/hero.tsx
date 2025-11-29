"use client"

import { useEffect, useState } from "react"
import { ArrowRight, ChevronDown } from "lucide-react"
import dynamic from "next/dynamic"

const DiaryVideo = dynamic(() => import("./diary-video"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-background/50 to-background/30 rounded-2xl animate-pulse" />
  ),
})

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-20 pb-20 md:pb-0">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/98 pointer-events-none" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-40 right-20 w-72 h-72 bg-gradient-to-br from-accent/10 to-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-gradient-to-tr from-primary/8 to-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center min-h-[calc(100vh-120px)] md:min-h-screen">
          {/* Left Column - Text Content */}
          <div
            className={`space-y-6 md:space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-full backdrop-blur-sm hover:border-primary/40 transition-colors">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs font-semibold text-foreground/90">Handcrafted Excellence</span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-pretty leading-tight text-foreground">
                Where Words
                <br />
                <span className="bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent">
                  Become Art
                </span>
              </h1>
            </div>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-foreground/70 leading-relaxed max-w-lg font-light">
              Experience the timeless elegance of premium stationery. From handmade diaries to fountain pens, every
              piece is crafted for those who value the art of writing.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="group px-8 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2">
                Explore Collection
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-3.5 border-2 border-primary text-primary rounded-full font-semibold text-sm hover:bg-primary/5 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2">
                Learn Our Story
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8 md:pt-12">
              {[
                { value: "10K+", label: "Happy Customers", color: "text-primary" },
                { value: "500+", label: "Designs", color: "text-accent" },
                { value: "15+", label: "Years Legacy", color: "text-primary" },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-1 p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                  <p className={`text-2xl sm:text-3xl font-bold font-serif ${stat.color}`}>{stat.value}</p>
                  <p className="text-xs sm:text-sm text-foreground/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - 3D Diary Animation */}
          <div className="relative h-full min-h-[500px] md:min-h-screen flex items-center justify-center">
            <DiaryVideo isVisible={isVisible} mousePosition={mousePosition} />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 animate-bounce">
        <span className="text-xs text-foreground/50 font-medium">Scroll to explore</span>
        <ChevronDown className="w-4 h-4 text-foreground/30" />
      </div>
    </section>
  )
}
