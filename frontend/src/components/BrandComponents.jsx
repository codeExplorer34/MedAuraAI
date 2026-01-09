import React from 'react';
import Aurora from './Aurora';

// Compact Trust Ribbon with badges - HIPAA, FDA, Physician-Led, Research-Backed
export function TrustRibbon() {
    const badges = [
        { icon: '🔒', label: 'HIPAA Compliant', sub: 'SOC 2 Type II' },
        { icon: '⚕️', label: 'FDA Pathway', sub: 'Class II Device' },
        { icon: '👨‍⚕️', label: 'Physician-Led', sub: 'Board-Certified' },
        { icon: '🔬', label: 'Research-Backed', sub: 'Evidence-Based' }
    ];

    return (
        <section style={{ background: '#111A2E', borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)' }} className="py-4">
            <div className="container max-w-[1100px] mx-auto px-6">
                <div className="flex flex-wrap justify-center items-center gap-8">
                    {badges.map((badge, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <span className="text-xl">{badge.icon}</span>
                            <div className="text-left">
                                <div className="text-xs font-semibold text-[#2DD4BF]">{badge.label}</div>
                                <div className="text-[10px] text-[#6B7280]">{badge.sub}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Simple animated counter hook component
function AnimatedCounter({ end, duration = 2000, suffix = '' }) {
    const [count, setCount] = React.useState(0);

    React.useEffect(() => {
        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = timestamp - startTime;

            if (progress < duration) {
                const percentage = Math.min(progress / duration, 1);
                // Ease out quart
                const ease = 1 - Math.pow(1 - percentage, 4);
                setCount(Math.floor(end * ease));
                animationFrame = requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return <span>{count}{suffix}</span>;
}

// Compact Stats Band - Single row with 3-4 key metrics
export function StatsBand() {
    const stats = [
        { value: 70, suffix: '%', label: 'Faster Documentation', color: '#2DD4BF' },
        { value: 40, suffix: '%', label: 'Fewer Missed Red Flags', color: '#38BDF8' },
        { value: 60, suffix: 's', label: 'Avg. Response Time', color: '#F59E0B' }
    ];

    return (
        <section style={{ background: '#0B1220' }} className="py-4">
            <div className="container max-w-[900px] mx-auto px-6">
                <div className="flex flex-wrap justify-center items-center gap-12">
                    {stats.map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-bold mb-1" style={{ color: stat.color }}>
                                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                            </div>
                            <div className="text-sm text-[#9CA3AF]">{stat.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// Enhanced 4-Step How It Works Timeline with Aurora Background
export function HowItWorksTimeline() {
    const steps = [
        { title: 'Input', desc: 'Patient data entry', sub: 'Vitals, history, chief complaint', icon: '📥', color: '#2DD4BF' },
        { title: 'Analyze', desc: 'AI-powered triage', sub: 'Risk flags, differentials, alerts', icon: '🤖', color: '#38BDF8' },
        { title: 'Review', desc: 'Clinician validation', sub: 'Modify, approve, or override', icon: '👨‍⚕️', color: '#A78BFA' },
        { title: 'Act', desc: 'Confident decision', sub: 'Documented, compliant, fast', icon: '✅', color: '#4ADE80' }
    ];

    return (
        <section id="how-it-works" style={{
            background: '#0B1220',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '400px'
        }} className="py-20">
            {/* Aurora Background */}
            <Aurora
                colorStops={["#2DD4BF", "#38BDF8", "#A78BFA"]}
                blend={0.5}
                amplitude={1.2}
                speed={0.3}
            />

            <div className="container max-w-[1000px] mx-auto px-6 relative z-10">
                {/* Header */}
                <div className="text-center mb-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#2DD4BF] text-xs font-semibold tracking-wide mb-4">
                        SIMPLE WORKFLOW
                    </span>
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">How MedAura Works</h2>
                    <p className="text-sm text-[#9CA3AF]">
                        One AI layer connecting every step of care
                    </p>
                </div>

                {/* Card Container */}
                <div style={{
                    background: 'rgba(11,18,32,0.85)',
                    backdropFilter: 'blur(12px)',
                    borderRadius: '20px',
                    border: '1px solid rgba(45,212,191,0.2)',
                    padding: '32px',
                    position: 'relative'
                }}>
                    {/* Connecting Line (desktop only) */}
                    <div className="hidden md:block" style={{
                        position: 'absolute',
                        top: '72px',
                        left: '15%',
                        right: '15%',
                        height: '2px',
                        background: 'linear-gradient(90deg, #2DD4BF 0%, #38BDF8 33%, #A78BFA 66%, #4ADE80 100%)',
                        opacity: 0.5
                    }} />

                    {/* Steps */}
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 relative z-10">
                        {steps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center text-center">
                                {/* Icon with glow */}
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    borderRadius: '50%',
                                    background: 'rgba(17,26,46,0.9)',
                                    border: `2px solid ${step.color}`,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    marginBottom: '16px',
                                    boxShadow: `0 0 25px ${step.color}40, 0 0 50px ${step.color}20`,
                                    position: 'relative'
                                }}>
                                    {step.icon}
                                </div>
                                {/* Title */}
                                <h3 className="text-base font-semibold text-white">{step.title}</h3>
                                {/* Description - two lines */}
                                <p className="text-xs text-[#9CA3AF] leading-relaxed">
                                    {step.desc}<br />{step.sub}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default TrustRibbon;
