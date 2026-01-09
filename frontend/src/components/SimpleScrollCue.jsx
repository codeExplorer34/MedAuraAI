import React, { useEffect, useRef } from "react";

/**
 * Simple Scroll Cue Component
 * Animated indicator to encourage scrolling
 */
export function ScrollCue() {
    const cueRef = useRef(null);

    useEffect(() => {
        if (!cueRef.current) return;

        // Hide scroll cue after user scrolls
        const handleScroll = () => {
            if (window.scrollY > 100 && cueRef.current) {
                cueRef.current.style.opacity = '0';
                cueRef.current.style.pointerEvents = 'none';
            } else if (window.scrollY <= 100 && cueRef.current) {
                cueRef.current.style.opacity = '0.7';
                cueRef.current.style.pointerEvents = 'auto';
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            ref={cueRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-70 pointer-events-none z-20 transition-opacity duration-300"
            style={{
                animation: 'bounce 2s ease-in-out infinite'
            }}
        >
            <span className="text-xs text-slate-400 font-medium">Scroll to explore</span>
            <svg
                className="w-6 h-6 text-sky-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
            </svg>
        </div>
    );
}
