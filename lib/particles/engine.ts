import { createNoise3D } from 'simplex-noise';

// Constants
const FORMATION_SPEED = 0.05; // Spring force strength
const DAMPING = 0.92; // Friction
const NOISE_SCALE = 0.002;
const DISPERSE_FORCE = 0.5;

const noise3D = createNoise3D();

export class Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    ox: number; // Original Target X (Normalized)
    oy: number; // Original Target Y (Normalized)
    color: string;
    size: number;

    // State
    isForming: boolean = true;
    randomOffset: number; // For noise variation

    constructor(targetXNorm: number, targetYNorm: number, color: string, canvasWidth: number, canvasHeight: number) {
        this.ox = targetXNorm;
        this.oy = targetYNorm;
        this.color = color;

        // Start at random screen position
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;

        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1; // 1px to 3px
        this.randomOffset = Math.random() * 1000;
    }

    update(
        width: number,
        height: number,
        scrollProgress: number,
        time: number
    ) {
        // Calculate Target Position based on canvas size
        // We center the logo. 
        // Logo Aspect Ratio assumed squareish for simplicity, or we adapt.
        // We'll scale logo to fit 40% of screen width or height.
        const scale = Math.min(width, height) * 0.4; // Logo Size
        const targetX = (width / 2) - (scale / 2) + (this.ox * scale);
        const targetY = (height / 2) - (scale / 2) + (this.oy * scale);

        // 1. Formation Force (Spring)
        // Strength reduces as we disperse
        const cohesion = Math.max(0, 1 - scrollProgress * 1.5);

        if (cohesion > 0.01) {
            const dx = targetX - this.x;
            const dy = targetY - this.y;
            this.vx += dx * FORMATION_SPEED * cohesion;
            this.vy += dy * FORMATION_SPEED * cohesion;
        }

        // 2. Disintegration Force (Noise + Scroll)
        // Only active when scrolling starts
        if (scrollProgress > 0) {
            // Noise Field
            const n = noise3D(this.x * NOISE_SCALE, this.y * NOISE_SCALE, time * 0.1 + this.randomOffset);
            const angle = n * Math.PI * 2;

            // Push outwards and upwards
            const disperseX = Math.cos(angle) * DISPERSE_FORCE * scrollProgress * 5;
            const disperseY = (Math.sin(angle) - 1) * DISPERSE_FORCE * scrollProgress * 7; // -1 bias to float up

            this.vx += disperseX;
            this.vy += disperseY;
        }

        // 3. Idle "Breathing" (When fully formed and not scrolling)
        if (scrollProgress < 0.1) {
            const idleX = Math.sin(time * 0.002 + this.y * 0.01) * 0.05;
            const idleY = Math.cos(time * 0.002 + this.x * 0.01) * 0.05;
            this.vx += idleX;
            this.vy += idleY;
        }

        // Physics
        this.vx *= DAMPING;
        this.vy *= DAMPING;

        this.x += this.vx;
        this.y += this.vy;
    }

    draw(ctx: CanvasRenderingContext2D, scrollProgress: number) {
        // Fade out as we scroll deep
        const alpha = Math.max(0, 1 - scrollProgress * 2);
        if (alpha <= 0.01) return;

        ctx.globalAlpha = alpha;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

export class ParticleEngine {
    particles: Particle[] = [];
    ctx: CanvasRenderingContext2D;
    width: number = 0;
    height: number = 0;
    animationId: number = 0;
    time: number = 0;

    constructor(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx;
    }

    init(points: { x: number, y: number, color: string }[], width: number, height: number) {
        this.width = width;
        this.height = height;
        this.particles = points.map(p => new Particle(p.x, p.y, p.color, width, height));
    }

    resize(width: number, height: number) {
        this.width = width;
        this.height = height;
    }

    animate(scrollProgress: number) {
        this.time += 1;
        this.ctx.clearRect(0, 0, this.width, this.height);

        // Composite operation for "glow" feel
        this.ctx.globalCompositeOperation = "screen";

        this.particles.forEach(p => {
            p.update(this.width, this.height, scrollProgress, this.time);
            p.draw(this.ctx, scrollProgress);
        });

        this.ctx.globalCompositeOperation = "source-over"; // Reset
    }
}
