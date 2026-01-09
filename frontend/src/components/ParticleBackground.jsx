import React, { useEffect, useRef } from 'react';

/**
 * Particle Background Component
 * Creates floating ambient particles with optional mouse interaction
 */
export default function ParticleBackground({
    particleCount = 50,
    color = '#38bdf8',
    maxSize = 4,
    speed = 0.5,
    connectDistance = 100,
    showConnections = false,
    mouseInteraction = false,
    className = ''
}) {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;
        let particles = [];
        let mouse = { x: null, y: null };

        // Resize canvas to fill container
        const resize = () => {
            const parent = canvas.parentElement;
            canvas.width = parent.clientWidth;
            canvas.height = parent.clientHeight;
        };

        // Create particles
        const createParticles = () => {
            particles = [];
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * maxSize + 1,
                    speedX: (Math.random() - 0.5) * speed,
                    speedY: (Math.random() - 0.5) * speed,
                    opacity: Math.random() * 0.5 + 0.2
                });
            }
        };

        // Parse color to RGB
        const parseColor = (hex) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 56, g: 189, b: 248 };
        };

        const rgb = parseColor(color);

        // Update particle positions
        const update = () => {
            particles.forEach(p => {
                p.x += p.speedX;
                p.y += p.speedY;

                // Bounce off edges
                if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

                // Mouse interaction
                if (mouseInteraction && mouse.x !== null) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        const force = (100 - dist) / 100;
                        p.x -= (dx / dist) * force * 2;
                        p.y -= (dy / dist) * force * 2;
                    }
                }
            });
        };

        // Draw particles and connections
        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            if (showConnections) {
                particles.forEach((p1, i) => {
                    particles.slice(i + 1).forEach(p2 => {
                        const dx = p1.x - p2.x;
                        const dy = p1.y - p2.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        if (dist < connectDistance) {
                            const opacity = (1 - dist / connectDistance) * 0.3;
                            ctx.beginPath();
                            ctx.strokeStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
                            ctx.lineWidth = 1;
                            ctx.moveTo(p1.x, p1.y);
                            ctx.lineTo(p2.x, p2.y);
                            ctx.stroke();
                        }
                    });
                });
            }

            // Draw particles
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${p.opacity})`;
                ctx.fill();
            });
        };

        // Animation loop
        const animate = () => {
            update();
            draw();
            animationId = requestAnimationFrame(animate);
        };

        // Mouse move handler
        const handleMouseMove = (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        // Initialize
        resize();
        createParticles();
        animate();

        // Event listeners
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(canvas.parentElement);

        if (mouseInteraction) {
            canvas.addEventListener('mousemove', handleMouseMove);
            canvas.addEventListener('mouseleave', handleMouseLeave);
        }

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            if (mouseInteraction) {
                canvas.removeEventListener('mousemove', handleMouseMove);
                canvas.removeEventListener('mouseleave', handleMouseLeave);
            }
        };
    }, [particleCount, color, maxSize, speed, connectDistance, showConnections, mouseInteraction]);

    return (
        <canvas
            ref={canvasRef}
            className={className}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: mouseInteraction ? 'auto' : 'none'
            }}
        />
    );
}
