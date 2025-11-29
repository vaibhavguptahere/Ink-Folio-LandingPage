"use client"

import { useRef, useState, useEffect } from "react"
import { Play } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface Product {
  id: number
  title: string
  description: string
  poster: string
  video: string
}

const products: Product[] = [
  {
    id: 1,
    title: "Midnight Leather Collection",
    description: "Premium leather-bound diaries with hand-stitched pages",
    poster: "/premium-leather-diary.jpg",
    video: "/videos/showcase-1.mp4",
  },
  {
    id: 2,
    title: "Aurora Fountain Pens",
    description: "Handcrafted pens with sustainable materials",
    poster: "/luxury-fountain-pen.jpg",
    video: "/videos/showcase-2.mp4",
  },
  {
    id: 3,
    title: "Personalized Stationery Sets",
    description: "Custom engraved sets for the discerning collector",
    poster: "/elegant-stationery-set.jpg",
    video: "/videos/showcase-3.mp4",
  },
]

export default function Showcase() {
  const [playingId, setPlayingId] = useState<number | null>(null)
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
          y: 100,
          rotationX: 25,
          z: -200,
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
            end: "top 20%",
            scrub: 0.5,
            markers: false,
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="showcase" ref={ref} className="relative py-20 md:py-32">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-gradient-to-l from-primary/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold text-accent mb-3 inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Our Collection
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Discover the Beauty of{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Craftsmanship</span>
          </h2>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              className="group cursor-pointer"
              style={{
                perspective: "1000px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card */}
              <div className="relative h-80 rounded-2xl overflow-hidden border border-border/30 bg-gradient-to-br from-card/50 to-card/20 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300">
                {/* Video/Poster Background */}
                <div className="absolute inset-0 bg-cover bg-center overflow-hidden">
                  <img
                    src={product.poster || "/placeholder.svg"}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />
                </div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="space-y-2">
                    <h3 className="font-serif text-xl font-semibold text-white drop-shadow-lg">{product.title}</h3>
                    <p className="text-sm text-white/90 drop-shadow-md">{product.description}</p>
                  </div>
                </div>

                {/* Play Button */}
                <button
                  onClick={() => setPlayingId(product.id)}
                  className="absolute inset-0 flex items-center justify-center bg-foreground/5 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-md rounded-full flex items-center justify-center hover:from-white/40 hover:to-white/20 transition-all group-hover:scale-110">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                  </div>
                </button>

                {/* Video Modal */}
                {playingId === product.id && (
                  <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center rounded-2xl z-50">
                    <video src={product.video} autoPlay controls muted loop className="w-full h-full rounded-2xl" />
                    <button
                      onClick={() => setPlayingId(null)}
                      className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
                    >
                      <span className="text-white text-xl">×</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95">
            View All Products
          </button>
        </div>
      </div>
    </section>
  )
}
