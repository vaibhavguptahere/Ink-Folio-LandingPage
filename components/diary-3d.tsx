"use client"

import { useRef, useEffect, useState, Suspense } from "react"
import dynamic from "next/dynamic"
import * as THREE from "three"

// Dynamically import Three.js components to reduce bundle size
const Canvas = dynamic(() => import("@react-three/fiber").then((m) => m.Canvas), {
  ssr: false,
})

interface Diary3DProps {
  isVisible?: boolean
  mousePosition?: { x: number; y: number }
}

// Fallback component while loading
function DiaryFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white to-white/95 rounded-2xl shadow-2xl border border-border/30">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 mx-auto bg-gradient-to-br from-primary/20 to-accent/10 rounded-lg animate-pulse" />
        <p className="text-sm text-foreground/50">Loading diary...</p>
      </div>
    </div>
  )
}

// Diary 3D Scene Component
function DiaryScene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const diaryGroupRef = useRef<any>(null)

  useEffect(() => {
    if (diaryGroupRef.current) {
      diaryGroupRef.current.rotation.x = (mousePosition.y * 0.5 * Math.PI) / 180
      diaryGroupRef.current.rotation.y = (mousePosition.x * 0.5 * Math.PI) / 180
    }
  }, [mousePosition])

  return (
    <group ref={diaryGroupRef}>
      {/* Diary Back Cover */}
      <mesh position={[0, 0, -0.1]} castShadow receiveShadow>
        <boxGeometry args={[3, 4, 0.3]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Diary Left Page */}
      <mesh position={[-1.5, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[1.5, 4]} />
        <meshStandardMaterial color="#f5f1e8" roughness={0.8} metalness={0} />
      </mesh>

      {/* Diary Right Page (animated open) */}
      <mesh position={[1.5, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <planeGeometry args={[1.5, 4]} />
        <meshStandardMaterial color="#fdfbf7" roughness={0.8} metalness={0} />
      </mesh>

      {/* Gold Spine Detail */}
      <mesh position={[0, 0, 0.15]} castShadow>
        <boxGeometry args={[0.1, 4, 0.2]} />
        <meshStandardMaterial color="#d4af37" roughness={0.4} metalness={0.8} />
      </mesh>

      {/* Pen Nib - animated writing on right page */}
      <group ref={useRef(null)} position={[0.5, 0.5, 0.1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.05, 0.3, 8]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.7} />
        </mesh>
        <mesh position={[0, 0.15, 0]} castShadow>
          <boxGeometry args={[0.15, 0.1, 0.08]} />
          <meshStandardMaterial color="#c0a574" roughness={0.5} metalness={0.6} />
        </mesh>
      </group>

      {/* Handwritten text on page - using canvas texture */}
      <mesh position={[1.5, 0, 0.01]}>
        <planeGeometry args={[1.4, 3.8]} />
        <meshStandardMaterial map={createTextTexture()} roughness={0.9} metalness={0} />
      </mesh>
    </group>
  )
}

// Helper function to create canvas texture with handwritten text
function createTextTexture() {
  const canvas = document.createElement("canvas")
  canvas.width = 512
  canvas.height = 768
  const ctx = canvas.getContext("2d")!

  ctx.fillStyle = "#fdfbf7"
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  ctx.strokeStyle = "#2a2a2a"
  ctx.lineWidth = 2
  ctx.lineCap = "round"
  ctx.lineJoin = "round"
  ctx.font = "italic 32px Georgia, serif"
  ctx.fillStyle = "#2a2a2a"

  // Draw handwritten-style text
  const lines = [
    "Dear Diary,",
    "",
    "Today marks the beginning of",
    "something beautifully crafted.",
    "",
    "Every word written with a fountain",
    "pen carries the soul of the writer.",
    "It's not just ink on paper—",
    "it's a piece of art.",
    "",
    "Ink & Folio",
  ]

  let y = 60
  lines.forEach((line) => {
    ctx.fillText(line, 40, y)
    y += 50
  })

  return new THREE.CanvasTexture(canvas)
}

// Main Diary 3D Component
export default function Diary3D({ isVisible = true, mousePosition = { x: 0, y: 0 } }: Diary3DProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <DiaryFallback />
  }

  return (
    <div
      className={`relative w-full h-full flex items-center justify-center transition-all duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <Suspense fallback={<DiaryFallback />}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 45 }}
          style={{ width: "100%", height: "100%", borderRadius: "1rem" }}
          className="rounded-2xl"
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, 10]} intensity={0.5} />
          <DiaryScene mousePosition={mousePosition} />
        </Canvas>
      </Suspense>
    </div>
  )
}
