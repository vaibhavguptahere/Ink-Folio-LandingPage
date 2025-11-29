"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/20 bg-gradient-to-b from-background to-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span className="font-serif text-xl font-semibold text-foreground hidden sm:block group-hover:text-primary transition-colors">
              Ink
            </span>
            <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg hover:shadow-primary/20">
              <span className="font-serif text-xl text-white font-semibold text-foreground hidden sm:block group-hover:text-primary transition-colors">
                &
              </span>
            </div>
            <span className="font-serif text-xl font-semibold text-foreground hidden sm:block group-hover:text-primary transition-colors">
              Folio
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#features"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Products
            </Link>
            <Link
              href="#showcase"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Showcase
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Stories
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
            >
              Pricing
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <button className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full text-sm font-semibold hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 hover:scale-105 active:scale-95">
              Shop Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 hover:bg-muted/50 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} className="text-foreground" /> : <Menu size={20} className="text-foreground" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3 animate-fade-in border-t border-border/10 mt-3 pt-3">
            <Link
              href="#features"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/30 rounded-lg transition-colors"
            >
              Products
            </Link>
            <Link
              href="#showcase"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/30 rounded-lg transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="#testimonials"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/30 rounded-lg transition-colors"
            >
              Stories
            </Link>
            <Link
              href="#pricing"
              className="block px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-muted/30 rounded-lg transition-colors"
            >
              Pricing
            </Link>
            <button className="w-full px-4 py-2.5 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground rounded-full text-sm font-semibold hover:shadow-lg transition-all duration-300">
              Shop Now
            </button>
          </div>
        )}
      </div>
    </nav>
  )
}
