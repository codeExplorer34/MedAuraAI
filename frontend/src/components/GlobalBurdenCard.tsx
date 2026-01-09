import React, { useState, useEffect, useRef } from 'react';
import CountUp from 'react-countup';

/**
 * GlobalBurdenCard - Animated stat card showing global disease burden
 * Displays a count-up animation from 0 to 155 million
 */
export default function GlobalBurdenCard(): JSX.Element {
    const [startAnimation, setStartAnimation] = useState<boolean>(false);

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
                        duration={1.5}
                        separator=","
                        suffix="+"
                        useEasing={true}
                        easingFn={(t: number, b: number, c: number, d: number): number => {
                            // Custom easing function for smooth deceleration (easeOutCubic)
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
export function GlobalBurdenCardWithIntersection(): JSX.Element {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]: IntersectionObserverEntry[]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        const currentRef = cardRef.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
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

/**
 * Props interface for customizable version
 */
interface StatCardProps {
    label: string;
    value: number;
    suffix?: string;
    description: string;
    duration?: number;
    accentColor?: 'sky' | 'red' | 'green' | 'purple';
}

/**
 * Reusable StatCard component with customizable props
 */
export function StatCard({
    label,
    value,
    suffix = '+',
    description,
    duration = 1.5,
    accentColor = 'sky'
}: StatCardProps): JSX.Element {
    const [startAnimation, setStartAnimation] = useState<boolean>(false);

    const accentColors = {
        sky: 'from-sky-500 to-cyan-500',
        red: 'from-red-500 to-orange-500',
        green: 'from-green-500 to-emerald-500',
        purple: 'from-purple-500 to-indigo-500'
    };

    const labelColors = {
        sky: 'text-sky-400',
        red: 'text-red-400',
        green: 'text-green-400',
        purple: 'text-purple-400'
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setStartAnimation(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative p-6 rounded-xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm group hover:border-sky-500/30 transition-colors">
            <div className={`absolute top-0 left-0 w-12 h-1 bg-gradient-to-r ${accentColors[accentColor]} rounded-full`}></div>

            <div className={`text-xs font-semibold ${labelColors[accentColor]} uppercase tracking-wider mb-3 mt-2`}>
                {label}
            </div>

            <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                {startAnimation ? (
                    <CountUp
                        start={0}
                        end={value}
                        duration={duration}
                        separator=","
                        suffix={suffix}
                        useEasing={true}
                    />
                ) : (
                    '0'
                )}
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
                {description}
            </p>
        </div>
    );
}
