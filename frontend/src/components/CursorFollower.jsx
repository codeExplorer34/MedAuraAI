import React, { useState, useEffect } from 'react';

/**
 * Custom Cursor Follower
 * Creates a glowing cursor effect that follows the mouse
 */
export default function CursorFollower({ enabled = true }) {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);

    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e) => {
            setPosition({ x: e.clientX, y: e.clientY });
            setVisible(true);
        };

        const handleMouseDown = () => setClicking(true);
        const handleMouseUp = () => setClicking(false);
        const handleMouseLeave = () => setVisible(false);
        const handleMouseEnter = () => setVisible(true);

        // Check for hoverable elements
        const handleMouseOver = (e) => {
            const target = e.target;
            const isHoverable =
                target.tagName === 'A' ||
                target.tagName === 'BUTTON' ||
                target.closest('a') ||
                target.closest('button') ||
                target.classList.contains('cursor-hover') ||
                window.getComputedStyle(target).cursor === 'pointer';
            setHovering(isHoverable);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseover', handleMouseOver);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseover', handleMouseOver);
        };
    }, [enabled]);

    if (!enabled) return null;

    return (
        <>
            <style>{`
                .cursor-follower {
                    position: fixed;
                    pointer-events: none;
                    z-index: 99998;
                    mix-blend-mode: screen;
                    transition: opacity 0.3s ease;
                }
                
                .cursor-dot {
                    position: fixed;
                    width: 8px;
                    height: 8px;
                    background: #38bdf8;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99999;
                    transition: transform 0.1s ease, opacity 0.3s ease;
                    box-shadow: 0 0 10px rgba(56, 189, 248, 0.8);
                }
                
                .cursor-ring {
                    position: fixed;
                    width: 40px;
                    height: 40px;
                    border: 2px solid rgba(56, 189, 248, 0.4);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99998;
                    transition: transform 0.15s ease-out, width 0.2s ease, height 0.2s ease, border-color 0.2s ease;
                }
                
                .cursor-glow-aura {
                    position: fixed;
                    width: 150px;
                    height: 150px;
                    background: radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 99997;
                    transition: transform 0.3s ease-out, opacity 0.3s ease;
                }
            `}</style>

            {/* Inner dot */}
            <div
                className="cursor-dot"
                style={{
                    left: position.x - 4,
                    top: position.y - 4,
                    opacity: visible ? 1 : 0,
                    transform: clicking ? 'scale(0.5)' : hovering ? 'scale(1.5)' : 'scale(1)'
                }}
            />

            {/* Outer ring */}
            <div
                className="cursor-ring"
                style={{
                    left: position.x - 20,
                    top: position.y - 20,
                    opacity: visible ? 1 : 0,
                    transform: clicking ? 'scale(0.8)' : hovering ? 'scale(1.5)' : 'scale(1)',
                    borderColor: hovering ? 'rgba(56, 189, 248, 0.8)' : 'rgba(56, 189, 248, 0.4)',
                    width: hovering ? '60px' : '40px',
                    height: hovering ? '60px' : '40px',
                    marginLeft: hovering ? '-10px' : '0',
                    marginTop: hovering ? '-10px' : '0'
                }}
            />

            {/* Glow aura */}
            <div
                className="cursor-glow-aura"
                style={{
                    left: position.x - 75,
                    top: position.y - 75,
                    opacity: visible ? 0.5 : 0
                }}
            />
        </>
    );
}
