"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function ScrollDiaryAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const diaryRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!containerRef.current || !diaryRef.current) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 1.2,
        markers: false,
      },
    })

    // Animate diary rotation and scale
    tl.fromTo(
      diaryRef.current,
      {
        rotationY: 90,
        rotationX: 20,
        scale: 0.6,
        opacity: 0,
        z: -200,
      },
      {
        rotationY: 0,
        rotationX: 0,
        scale: 1,
        opacity: 1,
        z: 0,
        duration: 1,
        ease: "power2.out",
      },
      0,
    )

    return () => {
      tl.scrollTrigger?.kill()
    }
  }, [])

  return (
    <div ref={containerRef} className="relative w-full py-32 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-l from-accent/8 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-96 h-96 bg-gradient-to-r from-primary/8 to-transparent rounded-full blur-3xl" />
      </div>

      <div
        ref={diaryRef}
        className="relative w-full max-w-2xl h-96 rounded-2xl overflow-hidden"
        style={{
          perspective: "1200px",
          transformStyle: "preserve-3d",
        }}
      >
        <div className="w-full h-full rounded-2xl border-2 border-primary/30 bg-gradient-to-br from-primary/20 via-background to-background shadow-2xl overflow-hidden">
          {/* Background video */}
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            poster="/elegant-diary-opening-with-pen-writing.jpg"
          >
            <source src="/videos/diary-animation.mp4" type="video/mp4" />
          </video>

          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-t from-foreground/40 via-transparent to-transparent">
            <div className="text-center space-y-6">
              <h3 className="font-serif text-4xl font-bold text-white drop-shadow-lg">Handcrafted Stories</h3>
              <p className="text-lg text-white/90 drop-shadow-md max-w-md">
                Watch as your thoughts come to life, written with precision and care
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
