import React, { useState } from "react";
import { ScrollReveal } from "./AnimationComponents";
import "../premium-pricing.css";

export default function PricingSection() {
    const [billingCycle, setBillingCycle] = useState('monthly');

    const plans = [
        {
            name: "Solo Clinician",
            tagline: "For individual ED physicians",
            icon: "👨‍⚕️",
            image: "/images/pricing-starter.png",
            price: billingCycle === 'monthly' ? 49 : 39,
            period: "/month",
            billedAs: billingCycle === 'annual' ? "Billed annually ($468/yr)" : "Billed monthly",
            limit: "Up to 50 patients/month",
            users: "1 physician",
            features: [
                "ER Co-Pilot access",
                "Risk stratification & red flags",
                "Clinical note generation",
                "7-day analysis history",
                "Email support (48hr response)"
            ],
            cta: "Start Free Trial",
            color: "teal",
            gradient: "from-teal-600 to-cyan-600",
            popular: false
        },
        {
            name: "Group Practice",
            tagline: "For small groups & urgent care",
            icon: "🏥",
            image: "/images/pricing-professional.png",
            price: billingCycle === 'monthly' ? 149 : 119,
            period: "/month",
            billedAs: billingCycle === 'annual' ? "Billed annually ($1,428/yr)" : "Billed monthly",
            limit: "Up to 500 patients/month",
            users: "Up to 5 physicians",
            features: [
                "Everything in Solo, plus:",
                "MDT Review access",
                "Priority AI processing",
                "30-day analysis history",
                "Custom note templates",
                "Priority support (24hr response)"
            ],
            cta: "Start Free Trial",
            color: "orange",
            gradient: "from-orange-600 to-amber-600",
            popular: true
        },
        {
            name: "Hospital / ED",
            tagline: "For emergency departments",
            icon: "🏢",
            image: "/images/pricing-professional.png",
            price: null,
            period: "",
            billedAs: "Per-site licensing",
            limit: "Volume-based pricing",
            users: "Up to 25 physicians/site",
            features: [
                "Everything in Group, plus:",
                "SMART on FHIR integration",
                "SSO & role-based access",
                "90-day analysis history",
                "Dedicated account manager",
                "Phone support (4hr response)"
            ],
            cta: "Get Custom Quote",
            color: "purple",
            gradient: "from-purple-600 to-pink-600",
            popular: false
        },
        {
            name: "Health System",
            tagline: "For multi-site health systems",
            icon: "🏛️",
            image: "/images/pricing-enterprise.png",
            price: null,
            period: "",
            billedAs: "Enterprise licensing",
            limit: "Custom volume tiers",
            users: "Unlimited sites & users",
            features: [
                "Everything in Hospital, plus:",
                "On-premise deployment option",
                "Custom AI model training",
                "Audit logs & compliance reporting",
                "White-label options",
                "24/7 dedicated support + SLA"
            ],
            cta: "Contact Sales",
            color: "red",
            gradient: "from-red-600 to-rose-600",
            popular: false
        }
    ];

    return (
        <section id="pricing-section" className="py-16 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
            <div className="container max-w-[1400px] mx-auto px-6">

                {/* Billing Toggle */}
                <ScrollReveal>
                    <div className="flex justify-center mb-12">
                        <div className="inline-flex items-center gap-1 p-1 bg-slate-800/80 border border-slate-700 rounded-xl">
                            <button
                                onClick={() => setBillingCycle('monthly')}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${billingCycle === 'monthly'
                                    ? 'bg-white text-slate-900 shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Monthly
                            </button>
                            <button
                                onClick={() => setBillingCycle('annual')}
                                className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all relative ${billingCycle === 'annual'
                                    ? 'bg-white text-slate-900 shadow-lg'
                                    : 'text-slate-400 hover:text-white'
                                    }`}
                            >
                                Annual
                                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-[10px] font-bold rounded-full">
                                    -20%
                                </span>
                            </button>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    {plans.map((plan, index) => (
                        <ScrollReveal key={plan.name} delay={index * 75}>
                            <div
                                className={`pricing-card ${plan.popular ? 'pricing-card-popular' : ''} 
                                    relative h-full p-6 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900/95 to-slate-950
                                `}
                            >
                                {/* Inner Glow */}
                                <div className="card-glow"></div>

                                {/* Popular Badge - Inside Card */}
                                {plan.popular && (
                                    <div className="mb-4 -mt-1">
                                        <span className="popular-badge inline-block px-4 py-1.5 bg-gradient-to-r from-orange-500 to-amber-500 text-white text-xs font-bold rounded-full">
                                            ⭐ MOST POPULAR
                                        </span>
                                    </div>
                                )}

                                {/* Tier Image Header */}
                                {plan.image && (
                                    <div className="relative -mx-6 -mt-6 mb-4 h-24 overflow-hidden rounded-t-2xl">
                                        <img
                                            src={plan.image}
                                            alt={plan.name}
                                            className="w-full h-full object-cover opacity-60"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent" />
                                        <div className={`absolute bottom-2 right-2 w-10 h-10 rounded-full bg-gradient-to-r ${plan.gradient} flex items-center justify-center text-xl shadow-lg`}>
                                            {plan.icon}
                                        </div>
                                    </div>
                                )}

                                {/* Name & Tagline */}
                                <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
                                <p className="text-sm text-slate-400 mb-4">{plan.tagline}</p>

                                {/* Price */}
                                <div className="mb-4 pb-4 border-b border-slate-700/50">
                                    {plan.price !== null ? (
                                        <>
                                            <div className="flex items-baseline gap-1">
                                                <span className="price-amount text-4xl font-bold">${plan.price}</span>
                                                <span className="text-slate-400 text-sm">{plan.period}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-1">{plan.billedAs}</div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="price-amount text-2xl font-bold">Custom Pricing</div>
                                            <div className="text-xs text-slate-500 mt-1">{plan.billedAs}</div>
                                        </>
                                    )}
                                </div>

                                {/* Limits */}
                                <div className="mb-4 space-y-1">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-sky-400">📊</span>
                                        <span className="text-slate-300">{plan.limit}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-sky-400">👥</span>
                                        <span className="text-slate-300">{plan.users}</span>
                                    </div>
                                </div>

                                {/* CTA Button */}
                                <button
                                    className={`pricing-cta w-full py-3 rounded-xl font-bold text-white text-sm mb-5
                                        bg-gradient-to-r ${plan.gradient}
                                        hover:shadow-lg transition-all duration-300
                                    `}
                                >
                                    {plan.cta}
                                </button>

                                {/* Features */}
                                <div className="space-y-2">
                                    {plan.features.map((feature, i) => (
                                        <div key={i} className="flex items-start gap-2 text-sm">
                                            <span className={`feature-check text-${plan.color}-400 flex-shrink-0 mt-0.5`}>✓</span>
                                            <span className={`${feature.includes(':') ? 'text-slate-300 font-medium' : 'text-slate-400'}`}>
                                                {feature}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Compare Link */}
                                <div className="mt-4 pt-3 border-t border-slate-700/30">
                                    <a href="#" className="text-xs text-sky-400 hover:underline">
                                        Compare all features →
                                    </a>
                                </div>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>

                {/* Implementation Promise */}
                <ScrollReveal delay={300}>
                    <div className="mt-10 text-center">
                        <p className="text-slate-400 text-sm">
                            <strong className="text-white">Go live in under 1 day</strong> for standard deployments • 14-day free trial on all plans
                        </p>
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}
