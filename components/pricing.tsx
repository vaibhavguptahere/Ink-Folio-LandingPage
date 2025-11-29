"use client"

import { useEffect, useRef } from "react"
import { Check } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

interface PricingTier {
  id: number
  name: string
  price: string
  period: string
  description: string
  features: string[]
  highlighted: boolean
  cta: string
}

const pricingTiers: PricingTier[] = [
  {
    id: 1,
    name: "Starter",
    price: "$49",
    period: "per item",
    description: "Perfect for first-time collectors",
    features: ["Premium fountain pen", "Basic personalization", "Gift wrapping", "Standard shipping"],
    highlighted: false,
    cta: "Get Started",
  },
  {
    id: 2,
    name: "Premium",
    price: "$129",
    period: "per item",
    description: "For the discerning collector",
    features: [
      "Luxury fountain pen",
      "Full personalization",
      "Premium gift packaging",
      "Priority shipping",
      "Handmade diary",
      "Exclusive accessories",
    ],
    highlighted: true,
    cta: "Get Started",
  },
  {
    id: 3,
    name: "Bespoke",
    price: "Custom",
    period: "contact us",
    description: "Completely customized experience",
    features: [
      "Custom design creation",
      "Personalized engraving",
      "Luxury packaging",
      "White-glove service",
      "Priority support",
      "Limited edition items",
    ],
    highlighted: false,
    cta: "Request Quote",
  },
]

export default function Pricing() {
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
          scale: 0.85,
          rotationY: index === 1 ? 0 : index === 0 ? -15 : 15,
          y: 60,
        },
        {
          opacity: 1,
          scale: 1,
          rotationY: 0,
          y: 0,
          duration: 0.9,
          ease: "back.out",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 0.8,
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <section id="pricing" ref={ref} className="relative py-20 md:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-gradient-to-l from-accent/8 to-accent/2 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-primary/6 to-primary/1 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <p className="text-sm font-semibold text-accent mb-3 inline-flex items-center gap-2">
            <span className="w-2 h-2 bg-accent rounded-full" />
            Simple Pricing
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Choose Your Perfect{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Collection</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Transparent pricing for every collector. All prices include personalization options.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
          {pricingTiers.map((tier, index) => (
            <div
              key={tier.id}
              ref={(el) => {
                if (el) cardsRef.current[index] = el
              }}
              style={{
                perspective: "1200px",
                transformStyle: "preserve-3d",
              }}
            >
              {/* Card */}
              <div
                className={`relative h-full rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-2 ${
                  tier.highlighted
                    ? "bg-gradient-to-br from-primary/15 to-accent/8 border-primary/60 md:scale-105 md:-translate-y-6 hover:shadow-primary/20"
                    : "bg-gradient-to-br from-card/70 to-card/40 border-border/40 hover:border-primary/50"
                }`}
              >
                {/* Highlighted badge */}
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground text-xs font-semibold rounded-full shadow-lg">
                    Most Popular
                  </div>
                )}

                {/* Content */}
                <div className="p-8 space-y-8">
                  {/* Header */}
                  <div className="space-y-3">
                    <h3 className="font-serif text-2xl font-semibold text-foreground">{tier.name}</h3>
                    <p className="text-foreground/70 text-sm">{tier.description}</p>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-4xl font-bold text-foreground">{tier.price}</span>
                      <span className="text-foreground/60 text-sm">{tier.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {tier.features.map((feature, idx) => (
                      <div key={idx} className="flex gap-3">
                        <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span className="text-foreground/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button
                    className={`w-full py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-105 active:scale-95 ${
                      tier.highlighted
                        ? "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:shadow-lg hover:shadow-primary/30"
                        : "border-2 border-primary text-primary hover:bg-primary/5 hover:shadow-md"
                    }`}
                  >
                    {tier.cta}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
