export const threadVertexShader = `
  varying vec2 vUv;
  varying vec3 vPosition;

  void main() {
    vUv = uv;
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const threadFragmentShader = `
  varying vec2 vUv;
  uniform vec3 uColor;
  uniform float uGlowIntensity;
  uniform float uThickness; // Unused in frag for TubeGeometry, usually logic in vert, but keeping for compatibility

  void main() {
    // Tube UVs: x = length (0-1), y = circumference (0-1)
    // We want a glowing core.
    // Distance from center of tube cross-section (y=0.5 or y=0/1 depending on mapping).
    // Usually TubeGeometry maps y from 0 to 1 around the tube.
    
    // Calculate distance from "front" of tube?? 
    // Actually, for a glowing line, we want the center of the rendered strip to be bright.
    // If using TubeGeometry, looking at it, the "center" visually is hard to pin on UVs efficiently without normal incidence.

    // Simpler hack: Fresnel-like glow using normals? 
    // Or just flat color with bloom post-processing (User asked for Bloom).
    
    // If we rely on UnrealBloomPass, we just need to emit a generic bright color.
    // Let's add a subtle varying intensity along the length for "energy pulse".
    
    float pulse = 0.8 + 0.2 * sin(vUv.x * 20.0 - uGlowIntensity); // Animate uGlowIntensity as time
    
    // Core color
    gl_FragColor = vec4(uColor * pulse, 1.0);
  }
`
