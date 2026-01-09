import React from 'react';
import GlobalBurdenCard, { GlobalBurdenCardWithIntersection } from './GlobalBurdenCard';

/**
 * Demo page showing GlobalBurdenCard component examples
 * Use this to test the component before integrating into LandingPage
 */
export default function GlobalBurdenCardDemo() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
            <div className="container max-w-[1200px] mx-auto">
                {/* Header */}
                <div className="mb-12 text-center">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        GlobalBurdenCard Component Demo
                    </h1>
                    <p className="text-slate-400 text-lg">
                        Animated stat cards with count-up effects
                    </p>
                </div>

                {/* Example 1: Single Card */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        1. Single Card (Auto-start)
                    </h2>
                    <div className="max-w-md">
                        <GlobalBurdenCard />
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                        Animation starts immediately on component mount
                    </p>
                </section>

                {/* Example 2: Three Cards in Grid */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        2. Grid Layout (As in LandingPage)
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <GlobalBurdenCard />

                        {/* Static card for comparison */}
                        <div className="relative p-6 rounded-xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm group hover:border-sky-500/30 transition-colors">
                            <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"></div>
                            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3 mt-2">
                                Overcrowding Risk
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Higher Mortality
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                ED overcrowding linked to delays, errors, and worse patient outcomes
                            </p>
                        </div>

                        <div className="relative p-6 rounded-xl bg-slate-950/50 border border-slate-800 backdrop-blur-sm group hover:border-sky-500/30 transition-colors">
                            <div className="absolute top-0 left-0 w-12 h-1 bg-gradient-to-r from-sky-500 to-cyan-500 rounded-full"></div>
                            <div className="text-xs font-semibold text-sky-400 uppercase tracking-wider mb-3 mt-2">
                                Why Decision Support
                            </div>
                            <div className="text-2xl md:text-3xl font-bold text-white mb-2">
                                Proven Impact
                            </div>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Clinical decision support improves guideline adherence and care quality
                            </p>
                        </div>
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                        First card animates, others are static
                    </p>
                </section>

                {/* Example 3: Intersection Observer */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        3. Intersection Observer Variant
                    </h2>
                    <p className="text-slate-400 mb-6">
                        Scroll down to see the animation trigger when the card becomes visible
                    </p>

                    {/* Spacer to push card below fold */}
                    <div className="h-[60vh] flex items-center justify-center border border-slate-800 rounded-xl mb-8">
                        <p className="text-slate-500">⬇️ Scroll down to see the card below ⬇️</p>
                    </div>

                    <div className="max-w-md">
                        <GlobalBurdenCardWithIntersection />
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                        Animation triggers only when card enters viewport
                    </p>
                </section>

                {/* Example 4: Multiple Cards */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        4. Multiple Animated Cards
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <GlobalBurdenCard />
                        <GlobalBurdenCard />
                    </div>
                    <p className="text-sm text-slate-500 mt-4">
                        Both cards animate simultaneously
                    </p>
                </section>

                {/* Technical Details */}
                <section className="mb-16 p-8 rounded-xl bg-slate-900/50 border border-slate-800">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Technical Details
                    </h2>
                    <div className="space-y-4 text-slate-300">
                        <div>
                            <strong className="text-white">Library:</strong> react-countup
                        </div>
                        <div>
                            <strong className="text-white">Animation Duration:</strong> 1.5 seconds
                        </div>
                        <div>
                            <strong className="text-white">Start Value:</strong> 0
                        </div>
                        <div>
                            <strong className="text-white">End Value:</strong> 155,000,000
                        </div>
                        <div>
                            <strong className="text-white">Format:</strong> Comma-separated with "+" suffix
                        </div>
                        <div>
                            <strong className="text-white">Easing:</strong> Custom easeOutCubic function
                        </div>
                    </div>
                </section>

                {/* Code Example */}
                <section className="mb-16">
                    <h2 className="text-2xl font-semibold text-white mb-6">
                        Usage Example
                    </h2>
                    <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 overflow-x-auto">
                        <pre className="text-sm text-slate-300">
                            <code>{`import GlobalBurdenCard from './components/GlobalBurdenCard';

function LandingPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <GlobalBurdenCard />
            {/* Other stat cards */}
        </div>
    );
}`}</code>
                        </pre>
                    </div>
                </section>

                {/* Footer */}
                <div className="text-center text-slate-500 text-sm">
                    <p>Ready to integrate? Check out GLOBALBURDENCARD_USAGE.md for detailed instructions</p>
                </div>
            </div>
        </div>
    );
}
