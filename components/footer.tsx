"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative border-t border-border/20 bg-gradient-to-b from-card/40 to-card/20 backdrop-blur-sm">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-tl from-accent/5 to-accent/0 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center">
                <span className="font-serif text-primary-foreground font-bold">IF</span>
              </div>
              <span className="font-serif text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                Ink & Folio
              </span>
            </Link>
            <p className="text-sm text-foreground/70">
              Crafting premium stationery for those who value the art of writing.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Products</h4>
            <ul className="space-y-2">
              {["Diaries", "Fountain Pens", "Stationery", "Gifts"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Company</h4>
            <ul className="space-y-2">
              {["About Us", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2">
              {["FAQs", "Shipping", "Returns", "Privacy"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-foreground/70 hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/20 pt-8 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-sm text-foreground/60">© {currentYear} Ink & Folio. All rights reserved.</p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            {[
              { icon: Facebook, href: "#" },
              { icon: Instagram, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Mail, href: "#" },
            ].map((social, index) => {
              const Icon = social.icon
              return (
                <Link
                  key={index}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-muted/50 hover:bg-gradient-to-br hover:from-primary hover:to-primary/80 text-foreground hover:text-primary-foreground transition-all duration-300 flex items-center justify-center hover:scale-110"
                  aria-label={`Social link ${index}`}
                >
                  <Icon className="w-4 h-4" />
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </footer>
  )
}
