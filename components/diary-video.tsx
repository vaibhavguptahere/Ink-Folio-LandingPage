"use client"

import { useEffect, useRef } from "react"

interface DiaryVideoProps {
  isVisible?: boolean
  mousePosition?: { x: number; y: number }
}

export default function DiaryVideo({ isVisible = true, mousePosition = { x: 0, y: 0 } }: DiaryVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.transform = `perspective(1200px) rotateX(${mousePosition.y * 0.5}deg) rotateY(${
        mousePosition.x * 0.5
      }deg)`
    }
  }, [mousePosition])

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      style={{
        transition: "transform 0.1s ease-out",
      }}
    >
      <div className="relative w-full h-full max-w-sm bg-gradient-to-br from-white to-white/95 rounded-2xl shadow-2xl border border-border/30 overflow-hidden hover:shadow-primary/20 transition-shadow duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.02] via-transparent to-accent/[0.02] pointer-events-none" />

        {/* Video element with poster fallback */}
        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          poster="/elegant-diary-opening-with-pen-writing.jpg"
        >
          <source src="/videos/diary-animation.mp4" type="video/mp4" />
          {/* Fallback for browsers that don't support video */}
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center space-y-4 p-6">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center text-white font-serif text-2xl font-bold">
                IF
              </div>
              <p className="text-foreground/60">Beautiful diary opening animation</p>
            </div>
          </div>
        </video>

        {/* Floating pen icon decoration */}
        <div className="absolute top-6 right-6 w-12 h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-full flex items-center justify-center animate-subtle-float pointer-events-none">
          <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 17.25V21h3.75L17.81 9.94m-6.75-6.75L21 3m0 0l-4.24-1.06L3 16.5" />
          </svg>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-accent/8 to-accent/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-gradient-to-tr from-primary/8 to-primary/3 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}
