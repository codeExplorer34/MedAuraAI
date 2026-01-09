import React, { useState, useEffect, useRef } from 'react';

/**
 * Global Market Opportunity Section - Premium Version
 * Features: Connecting lines, parallax, flying dots, progress bars, expandable section
 */

// Regional data with progress values
const regions = [
    {
        name: "Sub-Saharan Africa",
        stat: "0.2",
        unit: "physicians per 1,000",
        description: "Severe physician shortage",
        why: "With only 0.2 doctors per 1,000 people, AI triage can bridge critical gaps in primary diagnosis.",
        progress: 20,
        progressLabel: "Healthcare access",
        left: "50%",
        top: "55%",
        color: "#f97316"
    },
    {
        name: "South Asia",
        stat: "2.1B",
        unit: "population",
        description: "Highest ER overcrowding",
        why: "India, Bangladesh, Pakistan face the world's most overcrowded ERs. AI can reduce wait times by 40%.",
        progress: 85,
        progressLabel: "ER overcrowding",
        left: "67%",
        top: "40%",
        color: "#06b6d4"
    },
    {
        name: "Latin America",
        stat: "45%",
        unit: "rural underserved",
        description: "Limited specialist access",
        why: "45% of rural clinics lack specialist access. AI enables remote diagnostic support.",
        progress: 45,
        progressLabel: "Underserved rate",
        left: "27%",
        top: "60%",
        color: "#8b5cf6"
    },
    {
        name: "Southeast Asia",
        stat: "700M",
        unit: "people",
        description: "Rapid digitization",
        why: "Indonesia, Philippines, Vietnam are rapidly digitizing healthcare - perfect for AI integration.",
        progress: 70,
        progressLabel: "Digital readiness",
        left: "77%",
        top: "52%",
        color: "#10b981"
    },
];

// Connection lines between regions (SVG paths)
const connections = [
    { from: 0, to: 1 }, // Africa to South Asia
    { from: 1, to: 3 }, // South Asia to SE Asia
    { from: 2, to: 0 }, // Latin America to Africa
];

// TAM Stats
const tamStats = [
    { value: "$12B", label: "Clinical Decision Support TAM", sublabel: "by 2030", end: 12, prefix: "$", suffix: "B" },
    { value: "5.6B", label: "People Lacking Quality Care", sublabel: "globally", end: 5.6, prefix: "", suffix: "B" },
    { value: "140+", label: "LMICs with ER Gaps", sublabel: "target markets", end: 140, prefix: "", suffix: "+" },
];

// Animated counter hook
function useCountUp(end, duration = 2000) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let start;
        const animate = (ts) => {
            if (!start) start = ts;
            const progress = Math.min((ts - start) / duration, 1);
            setCount(progress * end);
            if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }, [started, end, duration]);

    return { count, ref };
}

// Progress bar with animation
function AnimatedProgressBar({ progress, color, label }) {
    const [width, setWidth] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setWidth(progress); },
            { threshold: 0.3 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [progress]);

    return (
        <div ref={ref} className="mt-2">
            <div className="flex justify-between text-[9px] text-slate-500 mb-1">
                <span>{label}</span>
                <span>{progress}%</span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${width}%`, backgroundColor: color }}
                />
            </div>
        </div>
    );
}

// Flying dot animation
function FlyingDots() {
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-sky-400 rounded-full opacity-60"
                    style={{
                        left: `${20 + i * 12}%`,
                        animation: `flyDot ${8 + i * 2}s linear infinite`,
                        animationDelay: `${i * 1.5}s`
                    }}
                />
            ))}
        </div>
    );
}

// Region marker with progress bar
function RegionMarker({ region, delay }) {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
            style={{ left: region.left, top: region.top, animation: `fadeIn 0.6s ease-out ${delay}s both` }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {/* Pulsing ring */}
            <div
                className="absolute w-10 h-10 rounded-full -left-3.5 -top-3.5 animate-ping"
                style={{ backgroundColor: region.color, opacity: 0.15, animationDuration: '2.5s' }}
            />

            {/* Glow */}
            <div
                className="absolute w-14 h-14 rounded-full -left-5.5 -top-5.5"
                style={{ background: `radial-gradient(circle, ${region.color}35 0%, transparent 70%)` }}
            />

            {/* Dot */}
            <div
                className="w-3 h-3 rounded-full border-2 border-white/40 transition-transform duration-200"
                style={{ backgroundColor: region.color, boxShadow: `0 0 12px ${region.color}`, transform: hovered ? 'scale(1.5)' : 'scale(1)' }}
            />

            {/* Label */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 whitespace-nowrap">
                <div className="text-base font-bold" style={{ color: region.color }}>{region.stat}</div>
                <div className="text-[10px] text-white/70">{region.name}</div>
            </div>

            {/* Hover card with progress bar */}
            {hovered && (
                <div
                    className="absolute left-5 top-8 bg-slate-800/95 border border-slate-700 rounded-lg px-3 py-2 w-48 z-20"
                    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.5)' }}
                >
                    <div className="text-white text-xs font-semibold mb-1">{region.unit}</div>
                    <div className="text-slate-400 text-[10px] mb-2">{region.description}</div>
                    <AnimatedProgressBar progress={region.progress} color={region.color} label={region.progressLabel} />
                </div>
            )}
        </div>
    );
}

// Animated stat
function AnimatedStat({ stat, index }) {
    const { count, ref } = useCountUp(stat.end, 1800);
    const display = stat.end % 1 !== 0 ? `${stat.prefix}${count.toFixed(1)}${stat.suffix}` : `${stat.prefix}${Math.round(count)}${stat.suffix}`;

    return (
        <div ref={ref} className="px-4" style={{ animation: `fadeIn 0.5s ease-out ${index * 0.15}s both` }}>
            <div className="text-3xl md:text-4xl font-bold text-white mb-1">{display}</div>
            <div className="text-slate-300 text-sm font-medium">{stat.label}</div>
            <div className="text-slate-500 text-xs">{stat.sublabel}</div>
        </div>
    );
}

// Expandable "Why These Regions" section
function WhyTheseRegions() {
    const [expanded, setExpanded] = useState(false);

    return (
        <div className="max-w-4xl mx-auto px-4 mt-8">
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-2 mx-auto text-slate-400 hover:text-white transition-colors text-sm"
            >
                <span>Why these regions?</span>
                <svg
                    className={`w-4 h-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {expanded && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 animate-fadeIn">
                    {regions.map((region, i) => (
                        <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-lg p-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: region.color }} />
                                <span className="text-white text-sm font-medium">{region.name}</span>
                            </div>
                            <p className="text-slate-400 text-xs leading-relaxed">{region.why}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

// SVG Connection lines
function ConnectionLines() {
    return (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.3" />
                </linearGradient>
            </defs>
            {connections.map((conn, i) => {
                const from = regions[conn.from];
                const to = regions[conn.to];
                return (
                    <line
                        key={i}
                        x1={from.left}
                        y1={from.top}
                        x2={to.left}
                        y2={to.top}
                        stroke="url(#lineGradient)"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        className="animate-pulse"
                    />
                );
            })}
        </svg>
    );
}

export function GlobalMarketSection() {
    const [scrollY, setScrollY] = useState(0);
    const sectionRef = useRef(null);

    // Parallax effect
    useEffect(() => {
        const handleScroll = () => {
            if (sectionRef.current) {
                const rect = sectionRef.current.getBoundingClientRect();
                const offset = (window.innerHeight - rect.top) * 0.1;
                setScrollY(Math.max(0, Math.min(50, offset)));
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="py-16 bg-slate-950 overflow-hidden">
            {/* Keyframes */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes flyDot {
                    0% { transform: translate(0, 100vh) scale(0); opacity: 0; }
                    10% { opacity: 0.6; transform: translate(10vw, 80vh) scale(1); }
                    50% { transform: translate(30vw, 20vh) scale(1.2); }
                    90% { opacity: 0.6; transform: translate(50vw, -10vh) scale(1); }
                    100% { transform: translate(60vw, -20vh) scale(0); opacity: 0; }
                }
                .animate-fadeIn { animation: fadeIn 0.4s ease-out; }
            `}</style>

            {/* Panoramic Map with Parallax */}
            <div className="relative w-full overflow-hidden">
                <img
                    src="/images/world-map.png"
                    alt="Global healthcare market opportunity"
                    className="w-full h-auto min-h-[280px] object-cover transition-transform duration-100"
                    style={{
                        opacity: 0.7,
                        filter: 'brightness(1.2) contrast(1.15)',
                        transform: `translateY(${scrollY}px)`
                    }}
                />

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-transparent to-slate-950 pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/70 pointer-events-none" />

                {/* Title */}
                <div className="absolute top-6 left-0 right-0 text-center">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white px-4">
                        Global Market{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-cyan-400">
                            Opportunity
                        </span>
                    </h2>
                </div>

                {/* Connection lines */}
                <ConnectionLines />

                {/* Flying dots */}
                <FlyingDots />

                {/* Region markers */}
                {regions.map((region, i) => (
                    <RegionMarker key={i} region={region} delay={0.2 + i * 0.1} />
                ))}
            </div>

            {/* TAM Stats */}
            <div className="max-w-5xl mx-auto px-4 -mt-8 relative z-10">
                <div className="bg-slate-900/80 backdrop-blur-sm border border-slate-800 rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        {tamStats.map((stat, i) => (
                            <AnimatedStat key={i} stat={stat} index={i} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Why These Regions - Expandable */}
            <WhyTheseRegions />

            {/* Source */}
            <p className="text-center text-slate-600 text-xs mt-6 italic">
                Sources: WHO, World Bank, McKinsey Healthcare Report 2024
            </p>
        </section>
    );
}

export const GlobalVisionSection = GlobalMarketSection;
export default GlobalMarketSection;
