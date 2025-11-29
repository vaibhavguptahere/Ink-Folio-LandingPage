import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google"
import "./globals.css"

const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "600", "700"],
})

export const metadata: Metadata = {
  title: "Ink & Folio - Premium Stationery & Fine Writing",
  description:
    "Discover handcrafted stationery, premium fountain pens, and personalized engravings. Elevate your writing with luxury paper and fine writing instruments.",
  keywords: "stationery, fountain pens, luxury paper, personalized journals, handmade diaries",
  openGraph: {
    title: "Ink & Folio - Premium Stationery & Fine Writing",
    description: "Discover handcrafted stationery, premium fountain pens, and personalized engravings.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased ${_playfair.variable}`}>
        {children}
      </body>
    </html>
  )
}
