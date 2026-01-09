import React from 'react';

export default function TrustBadges() {
    const badges = [
        {
            icon: '🔒',
            title: 'HIPAA COMPLIANT',
            subtitle: 'Data Security',
            color: 'green'
        },
        {
            icon: '⚕️',
            title: 'FDA PATHWAY',
            subtitle: 'Clinical Decision Support',
            color: 'sky'
        },
        {
            icon: '✓',
            title: 'VALIDATION',
            subtitle: 'Pilot Studies in Progress',
            color: 'purple'
        },
        {
            icon: '👨‍⚕️',
            title: 'PHYSICIAN-LED',
            subtitle: 'Board-Certified Team',
            color: 'amber'
        },
        {
            icon: '🎓',
            title: 'RESEARCH-BACKED',
            subtitle: 'Academic Partnerships',
            color: 'indigo'
        }
    ];

    return (
        <section className="py-12 bg-slate-950/50 border-y border-slate-800">
            <div className="max-w-6xl mx-auto px-6">
                <p className="text-center text-slate-500 text-xs uppercase tracking-wider mb-8">
                    TRUSTED & COMPLIANT
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center">
                    {badges.map((badge, i) => (
                        <div
                            key={i}
                            className="text-center group hover:scale-105 transition-transform duration-300 cursor-pointer"
                        >
                            {/* Icon with animation */}
                            <div className="text-4xl mb-3 group-hover:animate-bounce inline-block">
                                {badge.icon}
                            </div>

                            {/* Title */}
                            <div className={`text-xs font-bold text-${badge.color}-400 mb-1`}>
                                {badge.title}
                            </div>

                            {/* Subtitle */}
                            <div className="text-xs text-slate-500">
                                {badge.subtitle}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
