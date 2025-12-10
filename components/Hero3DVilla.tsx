'use client'

import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { PerspectiveCamera, OrbitControls } from '@react-three/drei'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import * as THREE from 'three'

// --- 1. Custom Shader Material for Wireframe ---
const vertexShader = `
  uniform float uTime;
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    vec3 pos = position;
    
    // Subtle wobble based on position and time (Vertex Displacement)
    float wobble = sin(uTime * 0.5 + pos.y * 2.0) * 0.02;
    float breathe = sin(uTime * 0.2) * 0.01;
    
    pos.x += wobble;
    pos.z += wobble;
    pos += normal * breathe; 
    
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`

const fragmentShader = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform float uIntensity;
  
  void main() {
    // Breathing opacity
    float alpha = 0.4 + 0.3 * sin(uTime * 0.8);
    
    gl_FragColor = vec4(uColor * uIntensity, alpha);
  }
`

function ModernVillaBlock({ position, args, color }: { position: [number, number, number], args: [number, number, number], color: string }) {
    const meshRef = useRef<THREE.Mesh>(null)

    // Create shader material instance
    const material = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0 },
                uColor: { value: new THREE.Color(color) },
                uIntensity: { value: 1.5 }
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            wireframe: true, // Key for wireframe look
            side: THREE.DoubleSide
        })
    }, [color])

    useFrame((state) => {
        if (material) {
            material.uniforms.uTime.value = state.clock.getElapsedTime()
        }
    })

    return (
        <mesh ref={meshRef} position={position}>
            <boxGeometry args={args} />
            <primitive object={material} attach="material" />
        </mesh>
    )
}

function ProceduralVilla() {
    const groupRef = useRef<THREE.Group>(null)

    useFrame((state) => {
        if (groupRef.current) {
            // Subtle floating/drift rotatation
            // Sine wave ensures it rocks back and forth gently instead of spinning endlessly
            groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.15) * 0.15
        }
    })

    return (
        <group ref={groupRef}>
            {/* Ground Floor - Main Volume */}
            <ModernVillaBlock position={[0, -1, 0]} args={[5, 2, 4]} color="#e5f3ff" />

            {/* First Floor - Cantilever */}
            <ModernVillaBlock position={[0.8, 1.2, 0.5]} args={[3.8, 1.8, 4.5]} color="#ffffff" />

            {/* Vertical Feature / Chimney / Lift shaft - Accent Color */}
            <ModernVillaBlock position={[-1.8, 0.5, 1]} args={[1.2, 4.5, 1.5]} color="#8AA46A" />

            {/* Entrance / Deck */}
            <ModernVillaBlock position={[2, -1.9, 2]} args={[2.5, 0.1, 3]} color="#8AA46A" />

            {/* Roof Detail */}
            <ModernVillaBlock position={[0.8, 2.15, 0.5]} args={[4, 0.1, 4.7]} color="#e5f3ff" />
        </group>
    )
}

function Scene({ enableAnimation }: { enableAnimation: boolean }) {
    return (
        <>
            <PerspectiveCamera makeDefault position={[8, 4, 8]} fov={40} />
            <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate={enableAnimation}
                autoRotateSpeed={0.3}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
            />

            <ambientLight intensity={0.2} />
            <directionalLight position={[10, 10, 5]} intensity={0.5} />

            <ProceduralVilla />

            <EffectComposer disableNormalPass>
                <Bloom
                    luminanceThreshold={0.1}
                    mipmapBlur
                    intensity={1.5}
                    radius={0.5}
                />
            </EffectComposer>
        </>
    )
}

export default function Hero3DVilla({ accentColor = '#8AA46A', enableIntroAnimation = true }: { accentColor?: string, enableIntroAnimation?: boolean }) {
    const [mounted, setMounted] = useState(false)
    const [hasWebGL, setHasWebGL] = useState(true)

    useEffect(() => {
        setMounted(true)
        // Simple WebGL check
        try {
            const canvas = document.createElement('canvas')
            const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
            if (!gl) setHasWebGL(false)
        } catch (e) {
            setHasWebGL(false)
        }
    }, [])

    if (!mounted) return <div className="absolute inset-0 bg-[#1a1a1a]" />

    if (!hasWebGL) {
        // Fallback
        return (
            <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center overflow-hidden">
                <div className="w-full h-full opacity-10 bg-[linear-gradient(45deg,#ffffff_1px,transparent_1px),linear-gradient(-45deg,#ffffff_1px,transparent_1px)] bg-[size:40px_40px]" />
            </div>
        )
    }

    return (
        <div className="absolute inset-0 w-full h-full bg-[#1a1a1a] z-0">
            <Canvas dpr={[1, 2]} gl={{ antialias: false, alpha: false, preserveDrawingBuffer: true }}>
                <color attach="background" args={['#1a1a1a']} />
                <Scene enableAnimation={enableIntroAnimation} />
            </Canvas>
        </div>
    )
}
