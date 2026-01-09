import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * Apple-style Cards Carousel Component
 * Inspired by Aceternity UI - adapted for MedAura dark theme
 */

// Hook for detecting outside clicks
const useOutsideClick = (ref, callback) => {
    useEffect(() => {
        const listener = (event) => {
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            callback(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, callback]);
};

// Individual Card Component
function AppleCard({ card, index, isActive, onOpen, onClose }) {
    const cardRef = useRef(null);

    useOutsideClick(cardRef, () => {
        if (isActive) onClose();
    });

    // Close on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isActive) onClose();
        };

        if (isActive) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isActive, onClose]);

    return (
        <>
            {/* Card in carousel */}
            <div
                onClick={() => onOpen(index)}
                className={`relative flex-shrink-0 cursor-pointer transition-all duration-500 ${isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                style={{
                    width: '320px',
                    height: '450px',
                }}
            >
                <div className="relative w-full h-full rounded-3xl overflow-hidden group">
                    {/* Background Image */}
                    <img
                        src={card.image}
                        alt={card.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="text-sky-400 text-sm font-semibold uppercase tracking-wider mb-2">
                            {card.category}
                        </div>
                        <h3 className="text-white text-2xl font-bold leading-tight mb-2">
                            {card.title}
                        </h3>
                        <p className="text-slate-300 text-sm line-clamp-2">
                            {card.description}
                        </p>
                    </div>

                    {/* Hover border effect */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-sky-500/50 rounded-3xl transition-colors duration-300" />
                </div>
            </div>

            {/* Expanded Modal */}
            {isActive && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 pb-4 overflow-y-auto">
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 bg-black/90 backdrop-blur-md animate-fade-in"
                        onClick={onClose}
                    />

                    {/* Expanded Card */}
                    <div
                        ref={cardRef}
                        className="relative w-full max-w-3xl mx-4 rounded-3xl overflow-hidden animate-scale-in bg-slate-900"
                        style={{ animationDuration: '0.3s' }}
                    >
                        {/* Close button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Image */}
                        <div className="relative h-48 md:h-64">
                            <img
                                src={card.image}
                                alt={card.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />

                            {/* Header content on image */}
                            <div className="absolute bottom-0 left-0 right-0 p-6">
                                <div className="text-sky-400 text-sm font-semibold uppercase tracking-wider mb-2">
                                    {card.category}
                                </div>
                                <h2 className="text-white text-2xl md:text-3xl font-bold">
                                    {card.title}
                                </h2>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="bg-slate-900 p-6">
                            <p className="text-slate-300 text-lg leading-relaxed mb-6">
                                {card.description}
                            </p>

                            {/* Features list */}
                            {card.features && (
                                <div className="mb-6">
                                    <h4 className="text-white font-semibold mb-3">Key Features</h4>
                                    <ul className="space-y-2">
                                        {card.features.map((feature, i) => (
                                            <li key={i} className="flex items-start gap-3 text-slate-400">
                                                <span className="text-sky-400 mt-1">✓</span>
                                                <span>{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* CTA Button */}
                            {card.link && (
                                <Link
                                    to={card.link}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold rounded-xl transition-all hover:-translate-y-0.5"
                                    onClick={onClose}
                                >
                                    <span>{card.ctaText || 'Learn More'}</span>
                                    <span>→</span>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Main Carousel Component
export function AppleCardsCarousel({ cards, title, subtitle }) {
    const [activeCard, setActiveCard] = useState(null);
    const scrollRef = useRef(null);

    const handleOpen = (index) => {
        setActiveCard(index);
    };

    const handleClose = () => {
        setActiveCard(null);
    };

    // Scroll controls
    const scroll = (direction) => {
        if (scrollRef.current) {
            const scrollAmount = 340; // card width + gap
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };

    return (
        <section className="py-20 relative overflow-hidden">
            {/* Section Header */}
            <div className="max-w-7xl mx-auto px-8 mb-12">
                {subtitle && (
                    <p className="text-sky-400 text-sm font-semibold uppercase tracking-wider mb-2">
                        {subtitle}
                    </p>
                )}
                <h2 className="text-4xl md:text-5xl font-bold text-white">
                    {title}
                </h2>
            </div>

            {/* Carousel Container */}
            <div className="relative">
                {/* Scroll buttons */}
                <button
                    onClick={() => scroll('left')}
                    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors backdrop-blur-sm border border-slate-700"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>

                <button
                    onClick={() => scroll('right')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors backdrop-blur-sm border border-slate-700"
                >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Cards Container */}
                <div
                    ref={scrollRef}
                    className="flex gap-5 px-8 overflow-x-auto scrollbar-hide scroll-smooth"
                    style={{
                        scrollbarWidth: 'none',
                        msOverflowStyle: 'none',
                    }}
                >
                    {/* Left padding for centering */}
                    <div className="flex-shrink-0 w-8 md:w-24" />

                    {cards.map((card, index) => (
                        <AppleCard
                            key={index}
                            card={card}
                            index={index}
                            isActive={activeCard === index}
                            onOpen={handleOpen}
                            onClose={handleClose}
                        />
                    ))}

                    {/* Right padding */}
                    <div className="flex-shrink-0 w-8 md:w-24" />
                </div>
            </div>

            {/* Gradient fades on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent pointer-events-none" />
        </section>
    );
}

// Pre-configured MedAura cards data
export const medAuraCards = [
    {
        category: "Emergency Care",
        title: "Emergency Care",
        description: "Rapid risk assessment and red-flag detection for emergency scenarios. Our AI analyzes symptoms, vitals, and history to provide instant triage recommendations, helping doctors make faster, safer decisions when every second counts.",
        image: "/images/er-copilot.png",
        link: "/er-copilot",
        ctaText: "Try Emergency Care",
        features: [
            "Real-time risk stratification",
            "Automated red-flag detection",
            "Clinical note generation",
            "Voice-enabled input",
            "EHR-ready documentation"
        ]
    },
    {
        category: "Multi-Specialist Analysis",
        title: "Team Coordination",
        description: "AI-powered multidisciplinary team review that orchestrates five specialist perspectives. Get comprehensive analysis from Cardiology, Neurology, Gastroenterology, Psychiatry, and General Medicine—all in one unified view.",
        image: "/images/mdt-review.png",
        link: "/mdt-review",
        ctaText: "Start Team Review",
        features: [
            "5 AI specialist agents",
            "Consensus scoring",
            "Treatment comparison",
            "PDF report generation",
            "Collaborative notes"
        ]
    },
    {
        category: "AI Technology",
        title: "Intelligent Diagnostics",
        description: "Powered by advanced medical AI trained on millions of clinical cases. Our algorithms continuously learn from the latest research and guidelines to provide evidence-based recommendations you can trust.",
        image: "/images/ai-diagnostics.png",
        link: "/about",
        ctaText: "Learn More",
        features: [
            "Evidence-based recommendations",
            "Confidence scoring",
            "Explainable AI reasoning",
            "Continuous learning",
            "Regulatory compliant"
        ]
    },
    {
        category: "Clinical Operations",
        title: "Patient Monitoring",
        description: "Track patient journeys from admission to discharge. View case timelines, monitor treatment progress, and ensure nothing falls through the cracks with our comprehensive patient tracking system.",
        image: "/images/patient-monitoring.png",
        link: "/patient-history",
        ctaText: "View Patients",
        features: [
            "Case timeline tracking",
            "Automated follow-ups",
            "Critical alerts",
            "Historical analysis",
            "Care coordination"
        ]
    }
];

export default AppleCardsCarousel;
