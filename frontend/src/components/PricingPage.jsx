import React from "react";
import { Link } from "react-router-dom";
import { ScrollReveal } from "./AnimationComponents";
import PricingSection from "./PricingSection";
import ROICalculator from "./ROICalculator";
import Prism from "./Prism";

export default function PricingPage() {
    const faqs = [
        {
            q: "Is there a free trial?",
            a: "Yes. All plans include a 14-day free trial with full access. No credit card required. Cancel anytime."
        },
        {
            q: "Is MedAura AI HIPAA compliant?",
            a: "Yes. We are HIPAA-compliant with SOC 2 Type II certification. All data is encrypted at rest and in transit with enterprise-grade security."
        },
        {
            q: "Does MedAura AI make diagnoses or prescriptions?",
            a: "No. MedAura AI provides clinical decision-support and documentation assistance only. All clinical decisions remain with the treating physician."
        },
        {
            q: "What EHR/EMR integrations are available?",
            a: "We support SMART on FHIR integration for Hospital and Health System tiers. Custom integrations available for enterprise deployments."
        },
        {
            q: "What support is included?",
            a: "Solo & Group plans include email support. Hospital tier adds phone support with 4-hour response SLA. Health System tier includes 24/7 dedicated support."
        },
        {
            q: "Who owns the data?",
            a: "You own your data. We process it solely to provide the service and never sell or share patient information with third parties."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-950 page-animate-in">
            {/* Hero Section - Investor-Grade Positioning */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                {/* Prism Shader Background */}
                <div className="absolute inset-0 z-0" style={{ opacity: 0.8 }}>
                    <Prism
                        timeScale={0.4}
                        glow={1.0}
                        hueShift={-0.54}
                        bloom={1.5}
                    />
                    {/* Dark gradient overlay - lighter for more visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/40 to-slate-950" />
                </div>

                <div className="container max-w-[1000px] mx-auto px-6 text-center relative z-10">
                    <ScrollReveal>
                        {/* Investment Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-xs font-medium mb-6">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                            Investment, Not Expense
                        </div>

                        {/* Primary Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
                            Invest in Faster Decisions.
                            <br />
                            <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent">
                                Pay Less Than the Cost of Inefficiency.
                            </span>
                        </h1>

                        {/* Supporting Subtext */}
                        <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                            Not a cost — an <span className="text-white font-medium">investment</span> in faster triage, safer decisions, and better outcomes.
                        </p>

                        {/* Value Metrics Strip */}
                        <div className="flex flex-wrap justify-center gap-6 mb-8">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-green-400 font-bold text-lg">70%</span>
                                <span className="text-slate-400">faster documentation</span>
                            </div>
                            <div className="w-px h-6 bg-slate-700 hidden sm:block" />
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-sky-400 font-bold text-lg">40%</span>
                                <span className="text-slate-400">fewer missed red flags</span>
                            </div>
                            <div className="w-px h-6 bg-slate-700 hidden sm:block" />
                            <div className="flex items-center gap-2 text-sm">
                                <span className="text-amber-400 font-bold text-lg">$2.4M</span>
                                <span className="text-slate-400">saved annually</span>
                            </div>
                        </div>

                        {/* Scope Clarification */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-400 text-xs">
                            <span>⚕️</span>
                            <span>Decision support only. No diagnoses or prescriptions. Final decisions remain with clinicians.</span>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Compliance & Trust Strip */}
            <section className="py-6 bg-slate-900 border-y border-slate-800">
                <div className="container max-w-[1100px] mx-auto px-6">
                    <ScrollReveal>
                        <div className="flex flex-wrap justify-center items-center gap-8 text-center">
                            {[
                                { icon: "🔒", label: "HIPAA Compliant", sub: "SOC 2 Type II" },
                                { icon: "⚕️", label: "FDA Pathway", sub: "Class II Device" },
                                { icon: "👨‍⚕️", label: "Physician-Led", sub: "Board-Certified Team" },
                                { icon: "🏥", label: "Academic Pilots", sub: "3 Medical Centers" },
                                { icon: "🛡️", label: "256-bit Encryption", sub: "At Rest & In Transit" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2">
                                    <span className="text-xl">{item.icon}</span>
                                    <div className="text-left">
                                        <div className="text-xs font-bold text-sky-400">{item.label}</div>
                                        <div className="text-[10px] text-slate-500">{item.sub}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Pricing Plans */}
            <PricingSection />

            {/* Built for Hospitals Section */}
            <section className="py-12 bg-slate-950 border-t border-slate-800">
                <div className="container max-w-[1000px] mx-auto px-6">
                    <ScrollReveal>
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold text-white mb-2">Built for Hospitals & Health Systems</h2>
                            <p className="text-slate-400 text-sm">Enterprise-grade infrastructure for healthcare environments</p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: "📋", label: "Audit Logs", link: "#" },
                                { icon: "👥", label: "Role-Based Access", link: "#" },
                                { icon: "🔐", label: "SSO Integration", link: "#" },
                                { icon: "🏢", label: "On-Premise Option", link: "#" },
                                { icon: "🔗", label: "SMART on FHIR", link: "#" },
                                { icon: "📊", label: "Analytics Dashboard", link: "#" },
                                { icon: "⚡", label: "99.9% Uptime SLA", link: "#" },
                                { icon: "📄", label: "BAA Included", link: "#" }
                            ].map((item, i) => (
                                <a
                                    key={i}
                                    href={item.link}
                                    className="flex items-center gap-3 p-3 rounded-lg bg-slate-900/50 border border-slate-800 hover:border-sky-500/30 transition-colors group"
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-sm text-slate-300 group-hover:text-sky-400 transition-colors">{item.label}</span>
                                </a>
                            ))}
                        </div>
                        <div className="mt-6 text-center">
                            <a href="#" className="text-sm text-sky-400 hover:underline">
                                View Technical & Security Documentation →
                            </a>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* ROI Calculator */}
            <ROICalculator />

            {/* FAQ Section - Trimmed & Compact */}
            <section className="py-16 bg-slate-900/50">
                <div className="container max-w-[800px] mx-auto px-6">
                    <ScrollReveal>
                        <h2 className="text-2xl font-bold text-white text-center mb-8">
                            Frequently Asked Questions
                        </h2>
                    </ScrollReveal>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => (
                            <ScrollReveal key={i} delay={i * 40}>
                                <details className="group bg-slate-950 border border-slate-800 rounded-lg overflow-hidden hover:border-slate-700 transition-colors">
                                    <summary className="px-5 py-3 cursor-pointer flex items-center justify-between text-white font-medium text-sm hover:text-sky-400 transition-colors">
                                        <span>{faq.q}</span>
                                        <span className="text-slate-500 text-xs group-open:rotate-180 transition-transform ml-2">▼</span>
                                    </summary>
                                    <div className="px-5 pb-3 text-slate-400 text-sm leading-relaxed">
                                        {faq.a}
                                    </div>
                                </details>
                            </ScrollReveal>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-16 bg-gradient-to-b from-slate-900 to-slate-950">
                <div className="container max-w-[600px] mx-auto px-6 text-center">
                    <ScrollReveal>
                        <h2 className="text-2xl font-bold text-white mb-3">
                            Ready to Transform Your ED Workflow?
                        </h2>
                        <p className="text-slate-400 text-sm mb-6">
                            Go live in under 1 day. See results from your first shift.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Link
                                to="/er-copilot"
                                className="px-8 py-3 bg-gradient-to-r from-sky-600 to-cyan-600 hover:from-sky-500 hover:to-cyan-500 text-white font-semibold rounded-xl transition-all hover:-translate-y-1 shadow-lg shadow-sky-500/25"
                            >
                                Start Free Trial →
                            </Link>
                            <a
                                href="#"
                                className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-all border border-slate-700"
                            >
                                Schedule Demo
                            </a>
                        </div>
                        <p className="text-slate-500 text-xs mt-4">
                            No credit card required • Setup in minutes • HIPAA compliant
                        </p>
                    </ScrollReveal>
                </div>
            </section>
        </div>
    );
}
