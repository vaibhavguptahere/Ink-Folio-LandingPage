"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const ref = useRef<HTMLElement>(null)
  const leftRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current || !leftRef.current || !rightRef.current) return

    gsap.fromTo(
      leftRef.current,
      {
        opacity: 0,
        x: -100,
        rotationZ: -5,
      },
      {
        opacity: 1,
        x: 0,
        rotationZ: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.8,
        },
      },
    )

    gsap.fromTo(
      rightRef.current,
      {
        opacity: 0,
        x: 100,
        rotationZ: 5,
      },
      {
        opacity: 1,
        x: 0,
        rotationZ: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          end: "top 30%",
          scrub: 0.8,
        },
      },
    )
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <section ref={ref} className="relative py-20 md:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-primary/8 to-primary/2 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent/8 to-accent/2 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left Column - Contact Info */}
          <div
            ref={leftRef}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-accent inline-flex items-center gap-2">
                  <span className="w-2 h-2 bg-accent rounded-full" />
                  Get in Touch
                </p>
                <h2 className="font-serif text-4xl sm:text-5xl font-bold text-foreground">
                  We'd Love to{" "}
                  <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    Hear from You
                  </span>
                </h2>
                <p className="text-foreground/70 text-lg leading-relaxed">
                  Have questions about our collections? Need custom recommendations? Our team is here to help you find
                  the perfect piece.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-4">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "hello@inkandfolio.com",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "+1 (555) 123-4567",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "San Francisco, CA",
                  },
                ].map((contact, index) => {
                  const Icon = contact.icon
                  return (
                    <div key={index} className="flex gap-4 items-start group cursor-pointer">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 mt-1 group-hover:from-primary/30 group-hover:to-primary/15 transition-all">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground/60">{contact.label}</p>
                        <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                          {contact.value}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            ref={rightRef}
            style={{
              perspective: "1000px",
              transformStyle: "preserve-3d",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name Input */}
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-card/60 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                  required
                />
              </div>

              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-card/60 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                  required
                />
              </div>

              {/* Subject Input */}
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-card/60 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300"
                  required
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us more..."
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-border/50 bg-card/60 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all duration-300 resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full group px-6 py-3.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full font-semibold text-sm hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Send Message
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
