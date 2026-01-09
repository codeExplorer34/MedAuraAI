import React, { useState, useEffect } from 'react';
import './AnimatedBackground.css';

/**
 * Professional Animated Background Overlay
 * Creates a "live dashboard" effect with scanning lines, data points, and flowing gradients
 */
export default function AnimatedBackground() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    // Subtle parallax effect on mouse movement
    useEffect(() => {
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 15;
            const y = (e.clientY / window.innerHeight - 0.5) * 15;
            setMousePosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Data point locations (positioned to match dashboard UI elements)
    const dataPoints = [
        { top: '25%', left: '65%', delay: '0s', size: 'small' },
        { top: '35%', left: '72%', delay: '0.5s', size: 'medium' },
        { top: '45%', left: '68%', delay: '1s', size: 'small' },
        { top: '55%', left: '75%', delay: '1.5s', size: 'large' },
        { top: '30%', left: '80%', delay: '2s', size: 'small' },
        { top: '50%', left: '85%', delay: '2.5s', size: 'medium' },
    ];

    return (
        <div className="animated-background-overlay">
            {/* Parallax background layer */}
            <div
                className="parallax-layer"
                style={{
                    transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
                }}
            />

            {/* Slow zoom background */}
            <div className="zoom-layer" />

            {/* Scanning lines - multiple directions and speeds */}
            <div className="scan-line scan-vertical-1" />
            <div className="scan-line scan-vertical-2" />
            <div className="scan-line scan-horizontal" />

            {/* Animated gradient flow */}
            <div className="gradient-flow" />

            {/* Pulsing data points */}
            {dataPoints.map((point, index) => (
                <div
                    key={index}
                    className="data-point-wrapper"
                    style={{
                        top: point.top,
                        left: point.left,
                        animationDelay: point.delay,
                    }}
                >
                    <span className={`data-point-outer ${point.size}`}>
                        <span className="data-point-ping" />
                        <span className="data-point-core" />
                    </span>
                </div>
            ))}

            {/* Subtle grid overlay for tech feel */}
            <div className="grid-overlay" />

            {/* Ambient light spots */}
            <div className="light-spot light-spot-1" />
            <div className="light-spot light-spot-2" />
            <div className="light-spot light-spot-3" />
        </div>
    );
}
