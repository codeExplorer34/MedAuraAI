import React, { useState, useEffect, useRef } from 'react';

/**
 * Simple count-up animation component
 * No external dependencies - pure React
 */
export function CountUp({ end, duration = 2000, suffix = '', prefix = '' }) {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !hasAnimated) {
                    setHasAnimated(true);
                    animateCount();
                }
            },
            { threshold: 0.5 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [hasAnimated]);

    const animateCount = () => {
        const startTime = Date.now();
        const endValue = parseInt(end);

        const updateCount = () => {
            const now = Date.now();
            const progress = Math.min((now - startTime) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentCount = Math.floor(easeOutQuart * endValue);

            setCount(currentCount);

            if (progress < 1) {
                requestAnimationFrame(updateCount);
            } else {
                setCount(endValue);
            }
        };

        requestAnimationFrame(updateCount);
    };

    return (
        <span ref={elementRef} className="animate-count-up">
            {prefix}{count.toLocaleString()}{suffix}
        </span>
    );
}

/**
 * Scroll reveal component
 * Reveals children when scrolled into view
 */
export function ScrollReveal({ children, delay = 0, className = '' }) {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => setIsVisible(true), delay);
                }
            },
            { threshold: 0.1 }
        );

        if (elementRef.current) {
            observer.observe(elementRef.current);
        }

        return () => observer.disconnect();
    }, [delay]);

    return (
        <div
            ref={elementRef}
            className={`scroll-reveal ${isVisible ? 'revealed' : ''} ${className}`}
        >
            {children}
        </div>
    );
}

/**
 * Animated dashboard preview component
 * Cycles through different case examples
 */
export function AnimatedDashboard() {
    const [activeCase, setActiveCase] = useState(0);

    const cases = [
        {
            age: '52M',
            complaint: 'Chest pain',
            duration: '2 hours',
            risk: 'High',
            riskColor: 'red',
            hr: 115,
            spo2: 92,
            vitals: { hr: 115, rr: 24, spo2: 92, bp: '145/95' }
        },
        {
            age: '34F',
            complaint: 'Severe headache',
            duration: '6 hours',
            risk: 'Medium',
            riskColor: 'amber',
            hr: 88,
            spo2: 98,
            vitals: { hr: 88, rr: 18, spo2: 98, bp: '128/82' }
        },
        {
            age: '67M',
            complaint: 'Shortness of breath',
            duration: '1 hour',
            risk: 'High',
            riskColor: 'red',
            hr: 122,
            spo2: 88,
            vitals: { hr: 122, rr: 28, spo2: 88, bp: '168/102' }
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCase((prev) => (prev + 1) % cases.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);

    const currentCase = cases[activeCase];

    return (
        <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-3 shadow-2xl backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-500">
            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 opacity-30">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
                                         linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
                        backgroundSize: '40px 40px'
                    }}
                />
            </div>

            {/* Glowing effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-50" />

            <div className="relative bg-slate-950 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
                {/* Animated UI mockup */}
                <div className="w-full h-full p-6 space-y-4">
                    {/* Header bar */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="h-3 w-24 bg-gradient-to-r from-sky-500 to-cyan-500 rounded animate-pulse" />
                        <div className="flex gap-2">
                            <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                            <div className="h-2 w-2 rounded-full bg-yellow-500" />
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                        </div>
                    </div>

                    {/* Patient case card - animated transition */}
                    <div
                        key={activeCase}
                        className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50 backdrop-blur-sm animate-fade-in"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-semibold text-slate-300">
                                {currentCase.age} · {currentCase.complaint}
                            </div>
                            <span
                                className={`px-2 py-1 rounded-full text-xs font-bold ${currentCase.riskColor === 'red'
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                                    }`}
                            >
                                {currentCase.risk} Risk
                            </span>
                        </div>
                        <div className="grid grid-cols-4 gap-2 text-xs">
                            <div className="text-slate-500">
                                HR: <span className={currentCase.hr > 100 ? 'text-amber-400 font-bold' : 'text-slate-300'}>{currentCase.vitals.hr}</span>
                            </div>
                            <div className="text-slate-500">
                                RR: <span className="text-slate-300">{currentCase.vitals.rr}</span>
                            </div>
                            <div className="text-slate-500">
                                SpO₂: <span className={currentCase.spo2 < 95 ? 'text-amber-400 font-bold' : 'text-slate-300'}>{currentCase.vitals.spo2}%</span>
                            </div>
                            <div className="text-slate-500">
                                BP: <span className="text-slate-300">{currentCase.vitals.bp}</span>
                            </div>
                        </div>
                    </div>

                    {/* Red flag alert */}
                    {currentCase.risk === 'High' && (
                        <div className="bg-red-950/30 rounded-lg p-3 border border-red-800/50 backdrop-blur-sm flex items-center gap-3 animate-pulse-slow">
                            <div className="h-6 w-6 rounded bg-red-500/20 flex items-center justify-center text-red-400 text-xs font-bold">
                                !
                            </div>
                            <div className="flex-1 space-y-1.5">
                                <div className="h-2 w-24 bg-red-800/50 rounded" />
                                <div className="h-1.5 w-full bg-red-900/30 rounded" />
                            </div>
                        </div>
                    )}

                    {/* Specialist badges */}
                    <div className="grid grid-cols-3 gap-3">
                        {[
                            { color: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-700/40', icon: '❤️' },
                            { color: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-700/40', icon: '🧠' },
                            { color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-700/40', icon: '🫁' }
                        ].map((spec, i) => (
                            <div
                                key={i}
                                className={`bg-gradient-to-br ${spec.color} rounded-lg p-3 border ${spec.border} backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 hover:scale-105 transition-transform`}
                            >
                                <div className="text-lg">{spec.icon}</div>
                                <div className="h-1 w-8 bg-slate-600/50 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Case indicator dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                {cases.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${i === activeCase ? 'w-8 bg-sky-500' : 'w-1.5 bg-slate-600'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

/**
 * Floating medical icons background
 */
export function FloatingIcons() {
    const icons = ['🫀', '🧠', '🫁', '💊', '🩺', '⚕️', '🔬', '💉'];

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {icons.map((icon, i) => (
                <div
                    key={i}
                    className="absolute text-4xl opacity-5 animate-float"
                    style={{
                        left: `${(i * 12) % 100}%`,
                        top: `${(i * 15) % 100}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: `${3 + (i % 3)}s`
                    }}
                >
                    {icon}
                </div>
            ))}
        </div>
    );
}

/**
 * Scroll progress indicator
 */
export function ScrollProgress() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 right-0 h-1 bg-slate-900 z-50">
            <div
                className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-150"
                style={{ width: `${scrollProgress}%` }}
            />
        </div>
    );
}
