'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, useScroll, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom, SMAA } from '@react-three/postprocessing'
import * as THREE from 'three'

// --- 1. Architectural Materials ---

// Glass Material (Physical)
const GLASS_MATERIAL = new THREE.MeshPhysicalMaterial({
    color: '#ffffff',
    metalness: 0.1,
    roughness: 0.05,
    transmission: 0.95, // Glass effect
    thickness: 0.5,
    clearcoat: 1,
    transparent: true,
    opacity: 0.8
})

// Concrete/Wall Material
const WALL_MATERIAL = new THREE.MeshStandardMaterial({
    color: '#f5f5f5',
    roughness: 0.8,
    metalness: 0.1
})

// Brand Accent Material
const ACCENT_MATERIAL = new THREE.MeshStandardMaterial({
    color: '#8AA46A',
    roughness: 0.4,
    metalness: 0.2
})

// --- 2. Components ---

function ArchitecturalBlock({ position, args, type = 'wall', color }: { position: [number, number, number], args: [number, number, number], type?: 'wall' | 'glass' | 'accent', color?: string }) {
    // Use appropriate material
    let material
    if (type === 'glass') material = GLASS_MATERIAL
    else if (type === 'accent') material = ACCENT_MATERIAL
    else material = WALL_MATERIAL

    return (
        <group position={position}>
            {/* Solid Volume */}
            <mesh receiveShadow castShadow material={material}>
                <boxGeometry args={args} />
            </mesh>

            {/* Structural Edges (Wireframe Overlay) */}
            <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(...args)]} />
                <lineBasicMaterial color={type === 'glass' ? '#a0a0a0' : '#d4d4d4'} transparent opacity={0.3} />
            </lineSegments>
        </group>
    )
}

function Pool({ position, args }: { position: [number, number, number], args: [number, number, number] }) {
    return (
        <group position={position}>
            {/* Water */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
                <planeGeometry args={[args[0], args[2]]} />
                <meshPhysicalMaterial
                    color="#4fa1c7"
                    roughness={0.1}
                    metalness={0.1}
                    transmission={0.6}
                    thickness={1}
                    transparent
                    opacity={0.8}
                />
            </mesh>
            {/* Basin */}
            <mesh position={[0, -0.1, 0]}>
                <boxGeometry args={[args[0] + 0.2, 0.2, args[2] + 0.2]} />
                <meshStandardMaterial color="#dddddd" />
            </mesh>
        </group>
    )
}

function ProceduralVilla({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            // 1. Idle Animation (Floating)
            const t = state.clock.getElapsedTime()
            const floatY = Math.sin(t * 0.5) * 0.1

            // 2. Scroll Animation
            // Use scrollY ref directly for smooth, non-reactive updates
            const currentScroll = scrollY.current || 0

            // Rotate based on scroll (Full 180 deg rotation over 1000px scroll)
            const scrollRot = currentScroll * 0.001

            // Parallax Lift (Move up as you scroll down)
            const scrollLift = currentScroll * 0.003

            // Apply
            groupRef.current.rotation.y = 0.5 + Math.sin(t * 0.1) * 0.05 + scrollRot
            groupRef.current.position.y = floatY + scrollLift
        }
    })

    return (
        <group ref={groupRef}>
            {/* --- Ground Floor --- */}
            {/* Main Living Area (Glass walls) */}
            <ArchitecturalBlock position={[0, -1, 0]} args={[5, 2, 4]} type="glass" />
            {/* Floor Slab */}
            <ArchitecturalBlock position={[0, -2.1, 0]} args={[5.2, 0.2, 4.2]} type="wall" />
            {/* Ceiling Slab */}
            <ArchitecturalBlock position={[0, 0.1, 0]} args={[5.2, 0.2, 4.2]} type="wall" />

            {/* --- First Floor (Cantilever) --- */}
            {/* Bedroom Block (Solid + Glass front) */}
            <ArchitecturalBlock position={[1, 1.2, 0.5]} args={[3.5, 1.8, 4.5]} type="wall" />
            {/* Glass Front */}
            <ArchitecturalBlock position={[1, 1.2, 2.76]} args={[3.3, 1.6, 0.1]} type="glass" />

            {/* --- Vertical Feature (Stairwell/Lift) --- */}
            <ArchitecturalBlock position={[-1.5, 0.5, 1]} args={[1, 5, 1.5]} type="accent" />

            {/* --- Details --- */}
            {/* Entrance Deck columns */}
            <ArchitecturalBlock position={[2, -1, 1.8]} args={[0.2, 2, 0.2]} type="wall" />
            <ArchitecturalBlock position={[0.5, -1, 1.8]} args={[0.2, 2, 0.2]} type="wall" />

            {/* Pool / Water Feature */}
            <Pool position={[3, -2.1, 1]} args={[3, 0.2, 5]} />
        </group>
    )
}

function Scene({ scrollY }: { scrollY: React.MutableRefObject<number> }) {
    return (
        <>
            <PerspectiveCamera makeDefault position={[8, 5, 12]} fov={35} />
            <OrbitControls target={[0, 1, 0]} enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 2} />

            {/* Lighting Setup for Realism */}
            <ambientLight intensity={0.4} />
            <directionalLight
                position={[10, 20, 10]}
                intensity={1.5}
                castShadow
                shadow-bias={-0.0001}
            />
            {/* Rim Light for Accent */}
            <spotLight position={[-10, 10, -5]} intensity={2} color="#8AA46A" />

            <ProceduralVilla scrollY={scrollY} />

            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.8} // Only bloom very bright things (reflections)
                    mipmapBlur
                    intensity={0.4}
                    radius={0.4}
                />
                <SMAA />
            </EffectComposer>
        </>
    )
}

// Wrapper to track scroll outside of Canvas 
// (doing it inside Canvas usually requires ScrollControls which hijacks DOM)
export default function Hero3DVilla() {
    const [mounted, setMounted] = useState(false)
    const [hasWebGL, setHasWebGL] = useState(true)
    const scrollY = useRef(0)

    useEffect(() => {
        setMounted(true)

        // Check WebGL
        try {
            const gl = document.createElement('canvas').getContext('webgl')
            if (!gl) setHasWebGL(false)
        } catch { setHasWebGL(false) }

        // Scroll Tracker
        const handleScroll = () => {
            scrollY.current = window.scrollY
        }
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    if (!mounted) return <div className="absolute inset-0 bg-[#1a1a1a]" />

    if (!hasWebGL) {
        return (
            <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center opacity-20">
                <div className="text-white font-mono">3D View Not Available</div>
            </div>
        )
    }

    return (
        <div className="absolute inset-0 w-full h-full bg-[#1a1a1a] z-0">
            <Canvas
                dpr={[1, 2]}
                shadows
                camera={{ position: [0, 0, 10], fov: 40 }}
                gl={{ antialias: false, alpha: false, preserveDrawingBuffer: true, toneMapping: THREE.ACESFilmicToneMapping }}
            >
                <color attach="background" args={['#1a1a1a']} />
                <Scene scrollY={scrollY} />
            </Canvas>
        </div>
    )
}
