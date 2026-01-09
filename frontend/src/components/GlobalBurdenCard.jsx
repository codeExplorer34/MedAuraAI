import React, { useState, useEffect } from 'react';
import CountUp from 'react-countup';

/**
 * GlobalBurdenCard - Animated stat card showing global disease burden
 * Displays a count-up animation from 0 to 155 million
 */
export default function GlobalBurdenCard() {
    const [startAnimation, setStartAnimation] = useState(false);

    useEffect(() => {
        // Trigger animation on mount
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative p-6 rounded-xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm group hover:border-sky-500/30 transition-colors">
            {/* Accent bar */}
            <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"></div>

            {/* Label */}
            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3 mt-2">
                Global Burden
            </div>

            {/* Animated Number */}
            <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                {startAnimation ? (
                    <CountUp
                        start={0}
                        end={155000000}
                        duration={2.25}
                        separator=","
                        suffix="+"
                        useEasing={true}
                        easingFn={(t, b, c, d) => {
                            // Custom easing function for smooth deceleration
                            return c * ((t = t / d - 1) * t * t + 1) + b;
                        }}
                    />
                ) : (
                    '0'
                )}
            </div>

            {/* Description */}
            <p className="text-sm text-slate-400 leading-relaxed">
                Annual ED visits in the US alone, with similar strain worldwide
            </p>
        </div>
    );
}

/**
 * Alternative version with visibility trigger
 * Only starts counting when the card becomes visible in viewport
 */
export function GlobalBurdenCardWithIntersection() {
    const [isVisible, setIsVisible] = useState(false);
    const cardRef = React.useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (cardRef.current) {
            observer.observe(cardRef.current);
        }

        return () => {
            if (cardRef.current) {
                observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div
            ref={cardRef}
            className="relative p-6 rounded-xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm group hover:border-sky-500/30 transition-colors"
        >
            <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"></div>

            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3 mt-2">
                Global Burden
            </div>

            <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                {isVisible ? (
                    <CountUp
                        start={0}
                        end={155000000}
                        duration={1.5}
                        separator=","
                        suffix="+"
                        useEasing={true}
                    />
                ) : (
                    '0'
                )}
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
                Annual ED visits in the US alone, with similar strain worldwide
            </p>
        </div>
    );
}
