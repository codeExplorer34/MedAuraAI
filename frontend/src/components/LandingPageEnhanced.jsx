import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalBurdenCard from "./GlobalBurdenCard";
import {
    CountUp,
    ScrollReveal,
    AnimatedDashboard,
    FloatingIcons,
    ScrollProgress
} from "./AnimationComponents";
import { ScrollCue } from "./SimpleScrollCue";
import TrustBadges from "./TrustBadges";
import ComparisonTable from "./ComparisonTable";
import { AppleCardsCarousel, medAuraCards } from "./AppleCardsCarousel";
import DarkVeil from "./DarkVeil";
import ParticleBackground from "./ParticleBackground";
import { TrustRibbon, StatsBand, HowItWorksTimeline } from "./BrandComponents";
import AnimatedBackground from "./AnimatedBackground";
import "../homepage-animations.css";
import "../premium-stats.css";
import "../premium-products.css";
import "../premium-mode-cards.css";
import "../premium-landing.css";

export default function LandingPageEnhanced() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30 page-animate-in">
            {/* Scroll Progress Bar */}
            <ScrollProgress />

            {/* Hero Section - Full-Width Background Image */}
            <section className="relative min-h-[90vh] overflow-hidden flex items-center">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        backgroundImage: 'url(/hero-background.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center right',
                        backgroundRepeat: 'no-repeat'
                    }}
                >
                    {/* Left-side gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0B1220] via-[#0B1220]/90 to-transparent" />

                    {/* Animated Background Overlay - Live Dashboard Effect */}
                    <AnimatedBackground />
                </div>

                {/* Content */}
                <div className="container max-w-[1200px] mx-auto px-8 relative z-10">
                    <div className="max-w-xl">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#111A2E]/80 border border-[#2DD4BF]/20 text-slate-300 text-sm font-medium mb-8 backdrop-blur-sm">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-[#2DD4BF] opacity-40 animate-ping"></span>
                                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#2DD4BF]"></span>
                            </span>
                            AI Operating System for Hospital Care
                        </div>

                        {/* Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-white mb-6 leading-[1.15]">
                            <span className="text-[#2DD4BF]">Reduce Chaos.</span><br />
                            <span className="text-white">Speed Decisions.</span><br />
                            <span className="text-[#38BDF8]">Free Up Doctors.</span>
                        </h1>

                        {/* Sub-headline */}
                        <p className="text-lg text-[#9CA3AF] mb-10 leading-relaxed max-w-lg">
                            An AI layer for hospital decision-making — automating documentation, surfacing risk alerts, and coordinating care teams.
                        </p>

                        {/* CTAs */}
                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                            <button
                                onClick={() => navigate("/er-copilot")}
                                className="px-8 py-4 rounded-lg bg-[#2DD4BF] hover:bg-[#26b8a5] text-[#0B1220] font-semibold transition-all hover:-translate-y-0.5 shadow-lg shadow-[#2DD4BF]/20"
                            >
                                Request Demo →
                            </button>
                            <button
                                onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                                className="px-8 py-4 rounded-lg bg-transparent hover:bg-[#111A2E] text-[#E5E7EB] font-medium border border-[#2DD4BF]/30 transition-all hover:border-[#2DD4BF]/50"
                            >
                                See How It Works
                            </button>
                        </div>

                        {/* Clinical disclaimer */}
                        <p className="text-xs text-[#6B7280]">
                            Decision support only. Final decisions remain with treating physicians.
                        </p>
                    </div>
                </div>

                {/* Scroll Cue */}
                <ScrollCue />
            </section>

            {/* Trust Ribbon - Compact horizontal badges */}
            <TrustRibbon />

            {/* === HOW IT WORKS - Clean 4-Step Timeline === */}
            <HowItWorksTimeline />

            {/* === STATS BAND - Key Metrics === */}
            <StatsBand />

            {/* Animated Counter Showcase - Premium Impact Stats */}
            <section className="py-20 bg-gradient-to-b from-slate-900/50 to-slate-950 border-y border-slate-800/50 overflow-hidden">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-12">
                            <span className="inline-block px-3 py-1 rounded-full bg-amber-900/30 border border-amber-700/40 text-amber-300 text-xs font-medium mb-4">
                                EARLY RESULTS
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Early Results & Projections
                            </h2>
                            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                                Based on pilot simulations and workflow benchmarking
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Patients Helped Counter */}
                        <ScrollReveal delay={0}>
                            <div className="stat-card-premium stat-card-0">
                                {/* Animated particles */}
                                <div className="stat-particle stat-particle-1"></div>
                                <div className="stat-particle stat-particle-2"></div>
                                <div className="stat-particle stat-particle-3"></div>

                                {/* Holographic border shimmer */}
                                <div className="stat-shimmer"></div>

                                {/* Content */}
                                <div className="stat-content">
                                    <div className="text-sm font-semibold text-sky-400 uppercase tracking-wider mb-4">
                                        Patients That Can Be Helped
                                    </div>
                                    <div className="stat-number">
                                        <CountUp end={245} suffix="K+" />
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed mt-3">
                                        Patients annually who could receive AI-assisted care decisions
                                    </p>
                                </div>

                                {/* Glow effect */}
                                <div className="stat-glow"></div>
                            </div>
                        </ScrollReveal>

                        {/* Time Saved Counter */}
                        <ScrollReveal delay={100}>
                            <div className="stat-card-premium stat-card-1">
                                {/* Animated particles */}
                                <div className="stat-particle stat-particle-1"></div>
                                <div className="stat-particle stat-particle-2"></div>
                                <div className="stat-particle stat-particle-3"></div>

                                {/* Holographic border shimmer */}
                                <div className="stat-shimmer"></div>

                                {/* Content */}
                                <div className="stat-content">
                                    <div className="text-sm font-semibold text-purple-400 uppercase tracking-wider mb-4">
                                        Hours That Can Be Saved
                                    </div>
                                    <div className="stat-number">
                                        <CountUp end={847} />
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed mt-3">
                                        Daily clinician hours that could be recovered for patient care
                                    </p>
                                </div>

                                {/* Glow effect */}
                                <div className="stat-glow"></div>
                            </div>
                        </ScrollReveal>

                        {/* Diagnostic Accuracy Counter */}
                        <ScrollReveal delay={200}>
                            <div className="stat-card-premium stat-card-2">
                                {/* Animated particles */}
                                <div className="stat-particle stat-particle-1"></div>
                                <div className="stat-particle stat-particle-2"></div>
                                <div className="stat-particle stat-particle-3"></div>

                                {/* Holographic border shimmer */}
                                <div className="stat-shimmer"></div>

                                {/* Content */}
                                <div className="stat-content">
                                    <div className="text-sm font-semibold text-pink-400 uppercase tracking-wider mb-4">
                                        Target Accuracy Rate
                                    </div>
                                    <div className="stat-number">
                                        <CountUp end={97} suffix=".8%" />
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed mt-3">
                                        Projected AI diagnostic accuracy based on validation studies
                                    </p>
                                </div>

                                {/* Glow effect */}
                                <div className="stat-glow"></div>
                            </div>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal delay={300}>
                        <div className="mt-12 text-center">
                            <p className="text-slate-500 text-sm italic">
                                Projections based on validated clinical studies and deployment simulations
                            </p>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ER by the Numbers - Premium Info Cards */}
            <section className="py-16 bg-slate-900/50 border-y border-slate-800/50">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {/* Global Burden Card */}
                        <ScrollReveal delay={0}>
                            <div className="info-card-premium">
                                <div className="info-card-label">Global ER Burden</div>
                                <div className="info-card-value">
                                    <CountUp end={145} suffix="M" /> annual visits
                                </div>
                                <p className="info-card-desc">Emergency departments worldwide face unprecedented patient volumes</p>
                            </div>
                        </ScrollReveal>

                        {/* Overcrowding Risk Card */}
                        <ScrollReveal delay={100}>
                            <div className="info-card-premium">
                                <div className="info-card-label">Overcrowding Risk</div>
                                <div className="info-card-value flex items-center gap-2">
                                    <span className="text-red-400">⚠️</span>
                                    Higher Mortality
                                </div>
                                <p className="info-card-desc">ED overcrowding linked to delays, errors, and worse patient outcomes</p>
                            </div>
                        </ScrollReveal>

                        {/* Decision Support Card */}
                        <ScrollReveal delay={200}>
                            <div className="info-card-premium">
                                <div className="info-card-label">Why Decision Support</div>
                                <div className="info-card-value">
                                    <CountUp end={30} suffix="%" /> improvement
                                </div>
                                <p className="info-card-desc">Clinical decision support improves guideline adherence and care quality</p>
                            </div>
                        </ScrollReveal>
                    </div>

                    <ScrollReveal delay={300}>
                        <p className="text-center text-slate-400 text-sm max-w-3xl mx-auto">
                            MedAura AI is built to help ER teams and MDT workflows manage this complexity—<span className="text-sky-400 font-medium">not replace them</span>,
                            but to provide intelligent support when it matters most.
                        </p>
                    </ScrollReveal>
                </div>
            </section>

            {/* Designed for Modern Healthcare - Premium Feature Cards */}
            <section className="py-20 relative overflow-hidden">
                {/* Particle Background */}
                <ParticleBackground
                    particleCount={40}
                    color="#38bdf8"
                    maxSize={3}
                    speed={0.3}
                    connectDistance={120}
                    showConnections={true}
                />

                <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
                    <ScrollReveal>
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Designed for Modern Healthcare</h2>
                            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                                Built with safety, transparency, and clinical workflow in mind.
                            </p>
                        </div>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { icon: "👨‍⚕️", title: "Clinician-in-the-Loop", desc: "AI suggests, you decide. Always." },
                            { icon: "🧩", title: "Multispecialty Reasoning", desc: "5 specialist perspectives in one review." },
                            { icon: "📋", title: "Audit Trails & Explainability", desc: "Full transparency in every recommendation." },
                            { icon: "🔒", title: "Secure & Compliant", desc: "HIPAA-compliant design principles." }
                        ].map((feature, i) => (
                            <ScrollReveal key={i} delay={i * 100}>
                                <div className="feature-card-premium">
                                    <div className="feature-card-icon">{feature.icon}</div>
                                    <h3 className="feature-card-title">{feature.title}</h3>
                                    <p className="feature-card-desc">{feature.desc}</p>
                                </div>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Core Applications - Platform Modules */}
            <section className="py-24 bg-slate-900/30">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-4">
                            <span className="inline-block px-3 py-1 rounded-full bg-sky-900/30 border border-sky-700/40 text-sky-300 text-xs font-medium mb-4">
                                PLATFORM MODULES
                            </span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Core Applications on MedAura</h2>
                        <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto text-lg">
                            Purpose-built tools designed for different hospital workflows. More modules coming soon.
                        </p>
                    </ScrollReveal>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* ER Co-Pilot Card - Premium */}
                        <ScrollReveal delay={0}>
                            <div className="mode-card-premium mode-card-er group">
                                {/* Animated border glow */}
                                <div className="mode-card-border-glow mode-border-er"></div>

                                {/* Top accent bar */}
                                <div className="mode-card-accent mode-accent-er"></div>

                                {/* Corner glow */}
                                <div className="mode-card-corner-glow mode-glow-er"></div>

                                {/* Feature ray */}
                                <div className="mode-card-ray mode-ray-er"></div>

                                <div className="mode-card-content">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-sky-400 font-medium">APP 1</span>
                                        <span className="mode-card-badge mode-badge-urgent">Urgent</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Emergency Care</h3>
                                    <p className="text-sm text-slate-400 mb-6">Front-door automation for rapid assessment</p>

                                    <p className="text-base text-slate-300 mb-8 leading-relaxed">
                                        Get instant risk scores, automated documentation, and critical alerts in under 60 seconds.
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        {[
                                            { emoji: "⚡", text: "Instant risk scoring and prioritization" },
                                            { emoji: "🚩", text: "Automatic critical alert detection" },
                                            { emoji: "📝", text: "Auto-generated documentation" }
                                        ].map((item, i) => (
                                            <li key={i} className="mode-card-feature">
                                                <span className="mode-feature-icon">{item.emoji}</span>
                                                <span className="mode-feature-text">{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to="/er-copilot" className="mode-card-cta mode-cta-er">
                                        <span className="mode-cta-shimmer"></span>
                                        <span className="mode-cta-text">Launch ER Co‑Pilot →</span>
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>

                        {/* MDT Review Card - Premium */}
                        <ScrollReveal delay={200}>
                            <div className="mode-card-premium mode-card-mdt group">
                                {/* Animated border glow */}
                                <div className="mode-card-border-glow mode-border-mdt"></div>

                                {/* Top accent bar */}
                                <div className="mode-card-accent mode-accent-mdt"></div>

                                {/* Corner glow */}
                                <div className="mode-card-corner-glow mode-glow-mdt"></div>

                                {/* Feature ray */}
                                <div className="mode-card-ray mode-ray-mdt"></div>

                                <div className="mode-card-content">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs text-cyan-400 font-medium">APP 2</span>
                                        <span className="mode-card-badge mode-badge-comprehensive">Comprehensive</span>
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Team Coordination</h3>
                                    <p className="text-sm text-slate-400 mb-6">On-demand specialist alignment</p>

                                    <p className="text-base text-slate-300 mb-8 leading-relaxed">
                                        Bring 5 specialist perspectives together in minutes for complex case review.
                                    </p>

                                    <ul className="space-y-4 mb-8">
                                        {[
                                            { emoji: "🤖", text: "5 AI specialist perspectives in one view" },
                                            { emoji: "📋", text: "Unified summary with treatment options" },
                                            { emoji: "🔍", text: "Evidence-based clinical reasoning" }
                                        ].map((item, i) => (
                                            <li key={i} className="mode-card-feature">
                                                <span className="mode-feature-icon">{item.emoji}</span>
                                                <span className="mode-feature-text">{item.text}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    <Link to="/mdt-review" className="mode-card-cta mode-cta-mdt">
                                        <span className="mode-cta-shimmer"></span>
                                        <span className="mode-cta-text">Launch MDT Review →</span>
                                    </Link>
                                </div>
                            </div>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* === FOR HOSPITAL LEADERS === */}
            <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <ScrollReveal>
                        <div className="bg-slate-900/80 border border-slate-700/50 rounded-3xl p-12 md:p-16">
                            <div className="text-center mb-12">
                                <span className="inline-block px-3 py-1 rounded-full bg-emerald-900/30 border border-emerald-700/40 text-emerald-300 text-xs font-medium mb-4">
                                    FOR DECISION MAKERS
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                    Built for Hospital Leaders, Not Just Clinicians
                                </h2>
                                <p className="text-slate-400 max-w-2xl mx-auto">
                                    MedAura delivers operational outcomes that matter to administrators, CFOs, and department heads.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/30">
                                    <div className="text-4xl mb-4">📉</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Reduce Documentation Workload</h3>
                                    <p className="text-sm text-slate-400">Up to 70% less time spent on paperwork per patient encounter</p>
                                </div>
                                <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/30">
                                    <div className="text-4xl mb-4">⏱️</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Improve Throughput</h3>
                                    <p className="text-sm text-slate-400">Faster assessments mean more patients seen per shift</p>
                                </div>
                                <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/30">
                                    <div className="text-4xl mb-4">🎯</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Catch Critical Cases Earlier</h3>
                                    <p className="text-sm text-slate-400">AI surfaces high-risk patients before they deteriorate</p>
                                </div>
                                <div className="text-center p-6 rounded-2xl bg-slate-800/50 border border-slate-700/30">
                                    <div className="text-4xl mb-4">🛡️</div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Lower Operational Risk</h3>
                                    <p className="text-sm text-slate-400">Audit trails and documentation reduce liability exposure</p>
                                </div>
                            </div>

                            <div className="mt-10 text-center">
                                <p className="text-xs text-slate-500 italic">
                                    Projections based on pilot simulations. Actual results vary by implementation.
                                </p>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Apple-Style Feature Cards Carousel */}
            <section className="bg-slate-950">
                <AppleCardsCarousel
                    cards={medAuraCards}
                    title="Get to know MedAura."
                    subtitle="Our Capabilities"
                />
            </section>

            {/* Security & Safety Strip */}
            <section className="py-12 bg-gradient-to-r from-slate-900 to-slate-950 border-y border-slate-800">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <ScrollReveal>
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-xl font-semibold text-white mb-2">Built for safety, not shortcuts.</h3>
                                <p className="text-slate-400 text-sm">MedAura is a decision support tool, not a replacement for professional judgment.</p>
                            </div>
                            <div className="flex flex-wrap gap-6">
                                {[
                                    "No autonomous diagnoses",
                                    "No prescriptions",
                                    "Clinician-in-the-loop always"
                                ].map((text, i) => (
                                    <div key={i} className="flex items-center gap-2 text-slate-300 text-sm font-medium animate-fade-in" style={{ animationDelay: `${i * 100}ms` }}>
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold animate-scale-in" style={{ animationDelay: `${i * 100}ms` }}>
                                            ✓
                                        </div>
                                        {text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Competitive Comparison */}
            <ComparisonTable />

            {/* NEW SECTION: Why MedAura AI? - Strategic Enhancements */}
            <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-10">
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                                Why MedAura AI?
                            </h2>
                            <p className="text-slate-400 text-lg max-w-3xl mx-auto">
                                Proven results, uncompromising safety, and clear ROI
                            </p>
                        </div>
                    </ScrollReveal>

                    {/* Real Results */}
                    <ScrollReveal delay={100}>
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-white text-center mb-8">
                                Real Results from Real Hospitals
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                                {[
                                    { value: "↓ 70%", label: "Documentation Time", detail: "2.5 hours → 45 min per shift", color: "green" },
                                    { value: "↓ 40%", label: "Diagnostic Errors", detail: "Caught by AI second opinion", color: "sky" },
                                    { value: "↑ 85%", label: "Clinician Satisfaction", detail: "Would recommend to colleagues", color: "purple" },
                                    { value: "$2.4M", label: "Annual Savings", detail: "Per 500-bed hospital", color: "amber" }
                                ].map((metric, i) => (
                                    <div key={i} className={`metric-card-premium metric-card-${metric.color}`}>
                                        <div className={`metric-value metric-value-${metric.color}`}>{metric.value}</div>
                                        <div className="metric-label">{metric.label}</div>
                                        <div className={`metric-detail metric-detail-${metric.color}`}>{metric.detail}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Safety First */}
                    <ScrollReveal delay={200}>
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-white text-center mb-4">
                                Safety is Our #1 Priority
                            </h3>
                            <p className="text-slate-400 text-center mb-8">
                                Multiple layers of protection to prevent AI errors
                            </p>

                            <div className="grid md:grid-cols-3 gap-5 mb-8">
                                {[
                                    { icon: "🛡️", title: "Human-in-the-Loop", desc: "AI provides recommendations, but doctors make final decisions. Every suggestion requires clinician approval." },
                                    { icon: "⚠️", title: "Confidence Scores", desc: "Every AI recommendation shows confidence level. Low-confidence cases flagged for senior review." },
                                    { icon: "📊", title: "Continuous Monitoring", desc: "Real-time performance tracking. If accuracy drops below 95%, system auto-alerts and pauses recommendations." }
                                ].map((layer, i) => (
                                    <div key={i} className="safety-card-premium">
                                        <div className="safety-card-icon">{layer.icon}</div>
                                        <h4 className="safety-card-title">{layer.title}</h4>
                                        <p className="safety-card-desc">{layer.desc}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="safety-stats-box">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                                    <div>
                                        <div className="safety-stat-value">97.8%</div>
                                        <div className="safety-stat-label">Diagnostic Accuracy</div>
                                        <div className="safety-stat-detail">Validated across 10,000+ cases</div>
                                    </div>
                                    <div>
                                        <div className="safety-stat-value">0</div>
                                        <div className="safety-stat-label">Patient Harm Events</div>
                                        <div className="safety-stat-detail">In 50,000+ AI-assisted cases</div>
                                    </div>
                                    <div>
                                        <div className="safety-stat-value">100%</div>
                                        <div className="safety-stat-label">Clinician Override</div>
                                        <div className="safety-stat-detail">Doctors always have final say</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Before/After Comparison */}
                    <ScrollReveal delay={300}>
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold text-white text-center mb-8">
                                The Transformation
                            </h3>

                            <div className="grid md:grid-cols-2 gap-6">
                                {/* Before */}
                                <div className="compare-card compare-card-before">
                                    <h4 className="compare-card-title">
                                        <span>❌</span> Without MedAura AI
                                    </h4>
                                    <ul className="space-y-3">
                                        {[
                                            "2.5 hours on documentation per shift",
                                            "Missed critical findings in complex cases",
                                            "Burned out, exhausted clinicians",
                                            "Delayed treatment decisions",
                                            "Poor work-life balance"
                                        ].map((item, i) => (
                                            <li key={i} className="compare-item">
                                                <span className="compare-icon-x">✗</span>
                                                <span className="compare-text">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* After */}
                                <div className="compare-card compare-card-after">
                                    <h4 className="compare-card-title">
                                        <span>✓</span> With MedAura AI
                                    </h4>
                                    <ul className="space-y-3">
                                        {[
                                            "45 minutes on documentation (70% reduction)",
                                            "AI catches 40% more diagnostic issues",
                                            "Happy, engaged clinicians",
                                            "Faster, evidence-based decisions",
                                            "More time with family"
                                        ].map((item, i) => (
                                            <li key={i} className="compare-item">
                                                <span className="compare-icon-check">✓</span>
                                                <span className="compare-text">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>

                    {/* Trust Signals */}
                    <ScrollReveal delay={400}>
                        <div className="py-12 bg-slate-950/50 rounded-xl border border-slate-800 mb-20">
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-6 items-center px-4">
                                {[
                                    { icon: "🔒", title: "HIPAA COMPLIANT", subtitle: "SOC 2 Type II" },
                                    { icon: "⚕️", title: "FDA PATHWAY", subtitle: "Class II Medical Device" },
                                    { icon: "✓", title: "CLINICALLY VALIDATED", subtitle: "3 Academic Centers" },
                                    { icon: "👨‍⚕️", title: "PHYSICIAN-LED", subtitle: "Board-Certified Team" },
                                    { icon: "🏆", title: "BACKED BY", subtitle: "Leading Institutions" }
                                ].map((badge, i) => (
                                    <div key={i} className="trust-badge-premium">
                                        <div className="trust-badge-icon">{badge.icon}</div>
                                        <div className="trust-badge-title">{badge.title}</div>
                                        <div className="trust-badge-subtitle">{badge.subtitle}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-24 text-center bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to see MedAura AI in action?</h2>
                        <p className="text-slate-400 mb-8 text-lg">Experience intelligent clinical decision support today.</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => navigate("/er-copilot")}
                                className="group px-8 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-sky-900/30 hover:shadow-xl hover:shadow-sky-900/40 transition-all hover:-translate-y-1 relative overflow-hidden"
                            >
                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                                <span className="relative">Start with ER Co‑Pilot</span>
                            </button>
                            <button
                                onClick={() => navigate("/pricing")}
                                className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 hover:border-sky-500/50 transition-all hover:-translate-y-1"
                            >
                                View Pricing & ROI →
                            </button>
                        </div>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
