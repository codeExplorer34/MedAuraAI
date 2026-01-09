import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GlobalBurdenCard from "./GlobalBurdenCard";

export default function LandingPage() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-500/30">
            {/* Hero Section - Enhanced Two-Column Layout */}
            <section className="relative pt-20 pb-12 md:pt-32 md:pb-16 overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-sky-500/10 blur-[140px] rounded-full pointer-events-none z-0" />
                <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-teal-500/8 blur-[100px] rounded-full pointer-events-none z-0" />

                <div className="container max-w-[1200px] mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Left Column: Text & CTAs */}
                        <div className="text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-900/30 border border-sky-700/50 text-sky-300 text-sm font-medium mb-6 backdrop-blur-sm">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
                                </span>
                                AI-Powered Clinical Decision Support
                            </div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
                                MedAura AI <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400">
                                    AI-Powered Clinical Co‑Pilot
                                </span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Safety-first, clinician-in-the-loop decision support for ER and MDT workflows.
                                Faster triage, better insights, smarter care.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-6">
                                <button
                                    onClick={() => navigate("/er-copilot")}
                                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-sky-900/30 transition-all transform hover:-translate-y-0.5 hover:shadow-xl hover:shadow-sky-900/40"
                                >
                                    Try ER Co‑Pilot
                                </button>
                                <button
                                    onClick={() => navigate("/mdt-review")}
                                    className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 transition-all hover:border-slate-600 hover:-translate-y-0.5"
                                >
                                    Try MDT Review
                                </button>
                            </div>

                            <p className="text-sm text-slate-500 italic">
                                Decision support only. Final decisions remain with clinicians.
                            </p>
                        </div>

                        {/* Right Column: Hero Visual */}
                        <div className="relative hidden lg:block">
                            <div className="relative rounded-2xl bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50 p-3 shadow-2xl backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-500">
                                {/* Subtle grid pattern overlay */}
                                <div className="absolute inset-0 opacity-30">
                                    <div className="absolute inset-0" style={{
                                        backgroundImage: `linear-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
                                                         linear-gradient(90deg, rgba(56, 189, 248, 0.1) 1px, transparent 1px)`,
                                        backgroundSize: '40px 40px'
                                    }}></div>
                                </div>

                                {/* Glowing effect */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500/20 to-teal-500/20 rounded-2xl blur-xl opacity-50"></div>

                                <div className="relative bg-slate-950 rounded-xl overflow-hidden aspect-[4/3] flex items-center justify-center">
                                    {/* Floating UI mockup */}
                                    <div className="w-full h-full p-6 space-y-4">
                                        {/* Header bar */}
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="h-3 w-24 bg-gradient-to-r from-sky-500 to-cyan-500 rounded animate-pulse"></div>
                                            <div className="flex gap-2">
                                                <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse"></div>
                                                <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            </div>
                                        </div>

                                        {/* Case summary card */}
                                        <div className="bg-slate-800/60 rounded-lg p-4 border border-slate-700/50 backdrop-blur-sm">
                                            <div className="h-2 w-20 bg-slate-600 rounded mb-3"></div>
                                            <div className="space-y-2">
                                                <div className="h-2 w-full bg-slate-700 rounded"></div>
                                                <div className="h-2 w-3/4 bg-slate-700 rounded"></div>
                                            </div>
                                        </div>

                                        {/* Red flag alert */}
                                        <div className="bg-red-950/30 rounded-lg p-3 border border-red-800/50 backdrop-blur-sm flex items-center gap-3">
                                            <div className="h-6 w-6 rounded bg-red-500/20 flex items-center justify-center text-red-400 text-xs font-bold">!</div>
                                            <div className="flex-1 space-y-1.5">
                                                <div className="h-2 w-24 bg-red-800/50 rounded"></div>
                                                <div className="h-1.5 w-full bg-red-900/30 rounded"></div>
                                            </div>
                                        </div>

                                        {/* Specialist badges */}
                                        <div className="grid grid-cols-3 gap-3">
                                            {[
                                                { color: 'from-pink-500/20 to-rose-500/20', border: 'border-pink-700/40', icon: '❤️' },
                                                { color: 'from-purple-500/20 to-indigo-500/20', border: 'border-purple-700/40', icon: '🧠' },
                                                { color: 'from-green-500/20 to-emerald-500/20', border: 'border-green-700/40', icon: '🫁' }
                                            ].map((spec, i) => (
                                                <div key={i} className={`bg-gradient-to-br ${spec.color} rounded-lg p-3 border ${spec.border} backdrop-blur-sm flex flex-col items-center justify-center gap-1.5 hover:scale-105 transition-transform`}>
                                                    <div className="text-lg">{spec.icon}</div>
                                                    <div className="h-1 w-8 bg-slate-600/50 rounded"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ER by the Numbers - Evidence Band */}
            <section className="py-16 bg-slate-900/50 border-y border-slate-800/50">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        {/* Animated Global Burden Card */}
                        <GlobalBurdenCard />

                        {/* Static Overcrowding Risk Card */}
                        <div className="relative p-6 rounded-xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm group hover:border-sky-500/30 transition-colors">
                            <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"></div>
                            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3 mt-2">Overcrowding Risk</div>
                            <div className="text-2xl md:text-3xl font-bold text-white mb-2">Higher Mortality</div>
                            <p className="text-sm text-slate-400 leading-relaxed">ED overcrowding linked to delays, errors, and worse patient outcomes</p>
                        </div>

                        {/* Static Decision Support Card */}
                        <div className="relative p-6 rounded-xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm group hover:border-sky-500/30 transition-colors">
                            <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"></div>
                            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3 mt-2">Why Decision Support</div>
                            <div className="text-2xl md:text-3xl font-bold text-white mb-2">Proven Impact</div>
                            <p className="text-sm text-slate-400 leading-relaxed">Clinical decision support improves guideline adherence and care quality</p>
                        </div>
                    </div>

                    <p className="text-center text-slate-400 text-sm max-w-3xl mx-auto">
                        MedAura AI is built to help ER teams and MDT workflows manage this complexity—<span className="text-sky-400 font-medium">not replace them</span>,
                        but to provide intelligent support when it matters most.
                    </p>
                </div>
            </section>

            {/* Designed for Modern Healthcare - Feature Cards */}
            <section className="py-20">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Designed for Modern Healthcare</h2>
                        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
                            Built with safety, transparency, and clinical workflow in mind.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            {
                                icon: "👨‍⚕️",
                                title: "Clinician-in-the-Loop",
                                desc: "AI suggests, you decide. Always."
                            },
                            {
                                icon: "🧩",
                                title: "Multispecialty Reasoning",
                                desc: "5 specialist perspectives in one review."
                            },
                            {
                                icon: "📋",
                                title: "Audit Trails & Explainability",
                                desc: "Full transparency in every recommendation."
                            },
                            {
                                icon: "🔒",
                                title: "Secure & Compliant",
                                desc: "HIPAA-compliant design principles."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 transition-all group hover:shadow-lg hover:shadow-sky-500/10">
                                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{feature.icon}</div>
                                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Choose Your Mode - Enhanced Product Tiles */}
            <section className="py-24 bg-slate-900/30">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">Choose Your Mode</h2>
                    <p className="text-center text-slate-400 mb-16 max-w-2xl mx-auto text-lg">
                        Two powerful workflows designed for different clinical scenarios.
                    </p>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* ER Co-Pilot Card */}
                        <div className="relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-red-500/40 transition-all group overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-red-500"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-3xl rounded-full group-hover:bg-red-500/20 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">ER Co‑Pilot</h3>
                                    <span className="px-3 py-1.5 rounded-full bg-red-500/15 text-red-400 text-xs font-bold uppercase tracking-wider border border-red-500/30">Urgent</span>
                                </div>

                                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                    Emergency decision support for rapid triage and risk stratification in time-critical scenarios.
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "⚡ Instant risk stratification and severity scoring",
                                        "🚩 Automated red flag detection and alerts",
                                        "📝 Auto-generated clinical notes and documentation"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-3 mt-2 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/er-copilot" className="inline-flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white font-semibold transition-all shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40 hover:-translate-y-0.5">
                                    Launch ER Co‑Pilot →
                                </Link>
                            </div>
                        </div>

                        {/* MDT Review Card */}
                        <div className="relative p-8 rounded-3xl bg-slate-900 border border-slate-800 hover:border-sky-500/40 transition-all group overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-sky-500 via-cyan-500 to-sky-500"></div>
                            <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full group-hover:bg-sky-500/20 transition-colors"></div>

                            <div className="relative z-10">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white">MDT Review</h3>
                                    <span className="px-3 py-1.5 rounded-full bg-sky-500/15 text-sky-400 text-xs font-bold uppercase tracking-wider border border-sky-500/30">Comprehensive</span>
                                </div>

                                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                                    Deep multi-specialist analysis for complex follow-up cases requiring comprehensive review.
                                </p>

                                <ul className="space-y-4 mb-8">
                                    {[
                                        "🤖 5 Specialist AI Agents (Cardiology, Neurology, GI, Psych, Radiology)",
                                        "📋 Unified Coordinator Summary with treatment options",
                                        "🔍 Deep clinical reasoning with evidence-based insights"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-start text-slate-300">
                                            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 mr-3 mt-2 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link to="/mdt-review" className="inline-flex items-center justify-center w-full px-6 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-semibold transition-all shadow-lg shadow-sky-900/30 hover:shadow-xl hover:shadow-sky-900/40 hover:-translate-y-0.5">
                                    Launch MDT Review →
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Security & Safety Strip */}
            <section className="py-12 bg-gradient-to-r from-slate-900 to-slate-950 border-y border-slate-800">
                <div className="container max-w-[1200px] mx-auto px-6">
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
                                <div key={i} className="flex items-center gap-2 text-slate-300 text-sm font-medium">
                                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500/20 text-green-400 text-xs font-bold">✓</div>
                                    {text}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Footer */}
            <section className="py-24 text-center">
                <div className="container max-w-[1200px] mx-auto px-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to see MedAura AI in action?</h2>
                    <p className="text-slate-400 mb-8 text-lg">Experience intelligent clinical decision support today.</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate("/er-copilot")}
                            className="px-8 py-4 rounded-xl bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-sky-900/30 hover:shadow-xl hover:shadow-sky-900/40 transition-all hover:-translate-y-0.5"
                        >
                            Start with ER Co‑Pilot
                        </button>
                        <button
                            onClick={() => navigate("/mdt-review")}
                            className="px-8 py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold border border-slate-700 hover:border-slate-600 transition-all hover:-translate-y-0.5"
                        >
                            Run an MDT Review
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
