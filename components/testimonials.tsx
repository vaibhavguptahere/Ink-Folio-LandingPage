"use client"

import { useEffect, useRef } from "react"
import { Star } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Testimonial {
  id: number
  name: string
  role: string
  image: string
  rating: number
  text: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Writer & Editor",
    image: "/placeholder.svg?key=u0hvv",
    rating: 5,
    text: "Ink & Folio's fountain pens have transformed my writing process. The quality is unmatched, and the personalized engraving made it a truly special gift.",
  },
  {
    id: 2,
    name: "James Chen",
    role: "Artist & Designer",
    image: "/placeholder.svg?key=2aqlx",
    rating: 5,
    text: "The premium paper quality is exceptional. Every page feels like a canvas for my thoughts. I recommend Ink & Folio to all my creative friends.",
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    role: "Entrepreneur",
    image: "/placeholder.svg?key=g7dsd",
    rating: 5,
    text: "Investing in a quality diary from Ink & Folio was one of my best decisions. It has become an essential part of my daily routine and creative process.",
  },
]

export default function Testimonials() {
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
          y: 80,
          rotationX: 30,
          z: -150,
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          z: 0,
          duration: 0.8,
          ease: "back.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
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
    <section id="testimonials" ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-primary/8 to-primary/2 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-gradient-to-l from-accent/6 to-accent/1 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold text-accent mb-3 inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Customer Stories
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Loved by{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Writers & Creators
            </span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card */}
              <div className="relative h-full p-8 rounded-2xl border border-border/40 bg-gradient-to-br from-card/70 via-card/50 to-card/30 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-2">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                {/* Rating Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-foreground/80 text-sm leading-relaxed mb-6 relative z-10">"{testimonial.text}"</p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/20 relative z-10">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                    <p className="text-foreground/60 text-xs">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
