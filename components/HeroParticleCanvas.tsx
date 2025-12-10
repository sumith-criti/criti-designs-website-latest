'use client'

import { useEffect, useRef } from 'react'
import { SimplexNoise } from '@/lib/noise'
import { Point, samplePointsInPolygon, getPolygonBounds } from '@/lib/geometry'

// Configuration
const PARTICLE_COUNT = 1200 // Increased for better density
const MIN_PARTICLE_COUNT = 500
const GRAVITY = 0.05
const FRICTION = 0.96

// Brand Colors
const COLORS_ROOF = ['#8AA46A', '#9AB678', '#7A9260'] // Green shades
const COLORS_BODY = ['#ffffff', '#f0f0f0', '#e0e0e0', '#d8d8d8']

type AnimationState = 'SPAWN' | 'SWIRL' | 'EXPLODE' | 'CONVERGE' | 'IDLE'

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  tx: number // Target X
  ty: number // Target Y
  size: number
  color: string
  life: number

  // Noise offsets
  nx: number
  ny: number

  constructor(canvasWidth: number, canvasHeight: number) {
    this.x = Math.random() * canvasWidth
    this.y = Math.random() * canvasHeight
    this.vx = (Math.random() - 0.5) * 0.5
    this.vy = (Math.random() - 0.5) * 0.5
    this.tx = 0
    this.ty = 0
    this.size = 1.5 + Math.random() * 2 // Slightly larger var
    this.color = '#ffffff'
    this.life = Math.random()
    this.nx = Math.random() * 100
    this.ny = Math.random() * 100
  }

  update(
    state: AnimationState,
    canvasWidth: number,
    canvasHeight: number,
    noise: SimplexNoise,
    time: number,
    center: Point
  ) {
    this.nx += 0.005
    this.ny += 0.005
    const noiseValX = noise.noise2D(this.nx, this.ny)
    const noiseValY = noise.noise2D(this.ny, this.nx)

    if (state === 'SPAWN') {
      this.vx += noiseValX * 0.02
      this.vy += noiseValY * 0.02
      this.vx *= 0.99
      this.vy *= 0.99
    } else if (state === 'SWIRL') {
      const dx = center.x - this.x
      const dy = center.y - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const angle = Math.atan2(dy, dx)
      const force = Math.max(0.5, 500 / (dist + 1))
      const rotForce = 0.5
      this.vx += Math.cos(angle + Math.PI / 2) * rotForce + Math.cos(angle) * force * 0.01
      this.vy += Math.sin(angle + Math.PI / 2) * rotForce + Math.sin(angle) * force * 0.01
      this.vx *= 0.95
      this.vy *= 0.95
    } else if (state === 'EXPLODE') {
      const dx = this.x - center.x
      const dy = this.y - center.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 1) {
        this.vx += (Math.random() - 0.5) * 10
        this.vy += (Math.random() - 0.5) * 10
      } else {
        const force = 50 / dist
        this.vx += (dx / dist) * force
        this.vy += (dy / dist) * force
      }
    } else if (state === 'CONVERGE') {
      const dx = this.tx - this.x
      const dy = this.ty - this.y
      const k = 0.03 + Math.random() * 0.02
      this.vx += dx * k
      this.vy += dy * k
      this.vx *= 0.85
      this.vy *= 0.85
    } else if (state === 'IDLE') {
      const dx = this.tx - this.x
      const dy = this.ty - this.y
      this.vx += dx * 0.05
      this.vy += dy * 0.05
      this.vx += noiseValX * 0.1
      this.vy += noiseValY * 0.1
      this.vx *= 0.8
      this.vy *= 0.8
    }

    this.x += this.vx
    this.y += this.vy

    if (state === 'SPAWN') {
      if (this.x < 0) this.x = canvasWidth
      if (this.x > canvasWidth) this.x = 0
      if (this.y < 0) this.y = canvasHeight
      if (this.y > canvasHeight) this.y = 0
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.globalAlpha = 0.4 + Math.abs(this.vx + this.vy) * 0.5
    if (ctx.globalAlpha > 1) ctx.globalAlpha = 1
    ctx.fillStyle = this.color
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function HeroParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationFrameRef = useRef<number>()
  const noiseRef = useRef(new SimplexNoise())
  const stateRef = useRef<AnimationState>('SPAWN')
  const startTimeRef = useRef<number>(Date.now())

  // --- Geometry Helpers ---

  // Line Interpolation for sharp edges
  const sampleLine = (p1: Point, p2: Point, count: number): Point[] => {
    const points: Point[] = []
    for (let i = 0; i < count; i++) {
      const t = i / Math.max(1, count - 1)
      points.push({
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t
      })
    }
    return points
  }

  const initParticles = (width: number, height: number): Particle[] => {
    const isMobile = width < 768
    const totalParticles = isMobile ? MIN_PARTICLE_COUNT : PARTICLE_COUNT
    const particles: Particle[] = []

    // House Dimensions
    const boxSize = Math.min(width, height) * 0.55
    const cx = width / 2
    const cy = height / 2 + boxSize * 0.1

    // Coordinates
    const roofTop = { x: cx, y: cy - boxSize * 0.6 }
    const roofLeft = { x: cx - boxSize * 0.5, y: cy - boxSize * 0.1 }
    const roofRight = { x: cx + boxSize * 0.5, y: cy - boxSize * 0.1 }
    const floorLeft = { x: cx - boxSize * 0.4, y: cy + boxSize * 0.5 }
    const floorRight = { x: cx + boxSize * 0.4, y: cy + boxSize * 0.5 }

    // Polygons for Fill
    const roofPoly = [roofLeft, roofTop, roofRight]
    const bodyPoly = [
      { x: floorLeft.x, y: roofLeft.y }, // Top Left of body
      { x: floorRight.x, y: roofRight.y }, // Top Right of body
      floorRight,
      floorLeft
    ]

    // --- Allocation Strategy ---
    // 30% Outline (Crisp edges)
    // 70% Fill (Volume)

    const outlineCount = Math.floor(totalParticles * 0.35)
    const fillCount = totalParticles - outlineCount

    // Outline Allocations
    // roof: 2 edges (left slope, right slope)
    // body: 3 edges (left wall, right wall, floor) - skipping top of body as it's under roof
    const pointsPerRoofEdge = Math.floor((outlineCount * 0.5) / 2)
    const pointsPerBodyEdge = Math.floor((outlineCount * 0.5) / 3)

    // Fill Allocations
    // Roof gets 40%, Body gets 60%
    const roofFillCount = Math.floor(fillCount * 0.4)
    const bodyFillCount = fillCount - roofFillCount

    // --- Generate Targets ---

    // 1. ROOF OUTLINES (Green)
    const roofOutlinePoints = [
      ...sampleLine(roofLeft, roofTop, pointsPerRoofEdge),
      ...sampleLine(roofTop, roofRight, pointsPerRoofEdge)
    ]

    // 2. BODY OUTLINES (White)
    const bodyOutlinePoints = [
      ...sampleLine({ x: floorLeft.x, y: roofLeft.y }, floorLeft, pointsPerBodyEdge), // Left Wall
      ...sampleLine(floorLeft, floorRight, pointsPerBodyEdge), // Floor
      ...sampleLine(floorRight, { x: floorRight.x, y: roofRight.y }, pointsPerBodyEdge) // Right Wall
    ]

    // 3. ROOF FILL (Green)
    const roofFillPoints = samplePointsInPolygon(roofPoly, roofFillCount, getPolygonBounds(roofPoly))

    // 4. BODY FILL (White)
    const bodyFillPoints = samplePointsInPolygon(bodyPoly, bodyFillCount, getPolygonBounds(bodyPoly))

    // --- Create Particles ---

    // Function to create and push
    const addParticle = (target: Point, colorSet: string[]) => {
      const p = new Particle(width, height)
      p.tx = target.x
      p.ty = target.y
      p.color = colorSet[Math.floor(Math.random() * colorSet.length)]
      particles.push(p)
    }

    // Add Roof Particles
    roofOutlinePoints.forEach(pt => addParticle(pt, COLORS_ROOF))
    roofFillPoints.forEach(pt => addParticle(pt, COLORS_ROOF))

    // Add Body Particles
    bodyOutlinePoints.forEach(pt => addParticle(pt, COLORS_BODY))
    bodyFillPoints.forEach(pt => addParticle(pt, COLORS_BODY))

    // Fill remaining if any rounding errors
    while (particles.length < totalParticles) {
      const p = new Particle(width, height)
      p.tx = cx
      p.ty = cy
      particles.push(p)
    }

    return particles
  }

  const animate = () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const width = canvas.width
    const height = canvas.height
    const centerX = width / 2
    const centerY = height / 2
    const time = Date.now() - startTimeRef.current

    if (time < 2000) stateRef.current = 'SPAWN'
    else if (time < 4500) stateRef.current = 'SWIRL'
    else if (time < 4700) stateRef.current = 'EXPLODE'
    else if (time < 8000) stateRef.current = 'CONVERGE'
    else stateRef.current = 'IDLE'

    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = 'lighter'

    const particles = particlesRef.current
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(stateRef.current, width, height, noiseRef.current, time, { x: centerX, y: centerY })
      particles[i].draw(ctx)
    }

    ctx.globalCompositeOperation = 'source-over'
    animationFrameRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const handleResize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      const ctx = canvas.getContext('2d')
      if (ctx) ctx.scale(dpr, dpr)
      particlesRef.current = initParticles(rect.width, rect.height)
    }
    handleResize()
    startTimeRef.current = Date.now()
    animate()
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  return (
    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-90 mixed-blend-screen" aria-hidden="true" />
  )
}
