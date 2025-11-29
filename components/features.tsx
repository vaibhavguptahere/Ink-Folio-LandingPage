"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { BookOpen, Pen, Sparkles } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  accentColor: string
}

const features: Feature[] = [
  {
    icon: <BookOpen className="w-6 h-6" />,
    title: "Handmade Diaries",
    description:
      "Each diary is meticulously crafted by hand using premium paper and sustainable materials, ensuring a unique writing experience.",
    color: "from-primary/15 to-primary/5",
    accentColor: "from-primary",
  },
  {
    icon: <Pen className="w-6 h-6" />,
    title: "Premium Fountain Pens",
    description:
      "Our collection of fountain pens combines timeless design with modern engineering for the perfect writing companion.",
    color: "from-accent/15 to-accent/5",
    accentColor: "from-accent",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Personalized Engraving",
    description: "Add your initials or custom text with our professional engraving service for a truly personal touch.",
    color: "from-secondary/15 to-secondary/5",
    accentColor: "from-secondary",
  },
]

export default function Features() {
  const ref = useRef<HTMLElement>(null)
  const cardsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    if (!ref.current) return

    cardsRef.current.forEach((card, index) => {
      if (!card) return

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 60,
          scale: 0.9,
          rotationX: 15,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotationX: 0,
          duration: 0.8,
          ease: "back.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 0.6,
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="features" ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-bl from-accent/8 to-accent/2 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-96 h-96 bg-gradient-to-tr from-primary/6 to-primary/2 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold text-accent mb-3 inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Why Choose Ink & Folio
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Craftsmanship Meets{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Innovation</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto text-base sm:text-lg">
            Discover what sets our premium stationery collection apart from the rest.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
              className="group relative"
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lg hover:shadow-primary/5">
                <div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-300 bg-gradient-to-br ${feature.color} pointer-events-none`}
                />

                {/* Content */}
                <div className="relative z-10 space-y-4">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/25 to-accent/15 flex items-center justify-center text-primary group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/20 transition-all duration-300 hover:rotate-360">
                    {feature.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-foreground/70 leading-relaxed">{feature.description}</p>
                  </div>
                </div>

                {/* Hover accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-accent/15 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
