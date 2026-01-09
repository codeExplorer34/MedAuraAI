import React, { useState } from 'react';

export default function ROICalculator() {
    const [numDoctors, setNumDoctors] = useState(20);
    const [hourlyRate, setHourlyRate] = useState(150);
    const [showBreakdown, setShowBreakdown] = useState(false);

    const calculateSavings = () => {
        // 2 hours saved per doctor per shift × 260 shifts/year
        const hoursSavedPerYear = numDoctors * 2 * 260;
        const annualSavings = hoursSavedPerYear * hourlyRate;
        return annualSavings;
    };

    const savings = calculateSavings();
    const hoursSaved = numDoctors * 520;
    const roi = Math.round((savings / 84000) * 100);

    return (
        <section className="py-16 bg-slate-900/30">
            <div className="max-w-5xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">
                        Calculate Your ROI
                    </h2>
                    <p className="text-slate-400 text-sm">
                        See how much MedAura AI can save your organization
                    </p>
                </div>

                {/* Calculator Card - 2-Column Layout */}
                <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Left: Inputs */}
                        <div className="p-6 bg-slate-900/50 border-r border-slate-800">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-5">
                                Your Details
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                                        Number of ED Physicians
                                    </label>
                                    <input
                                        type="number"
                                        value={numDoctors}
                                        onChange={(e) => setNumDoctors(Math.max(1, parseInt(e.target.value) || 1))}
                                        className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-base focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                        placeholder="e.g., 20"
                                        min="1"
                                    />
                                </div>

                                <div>
                                    <label className="text-sm font-medium text-slate-300 mb-2 block">
                                        Avg. Hourly Rate (USD)
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 text-base">$</span>
                                        <input
                                            type="number"
                                            value={hourlyRate}
                                            onChange={(e) => setHourlyRate(Math.max(1, parseInt(e.target.value) || 1))}
                                            className="w-full pl-8 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-base focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all"
                                            placeholder="150"
                                            min="1"
                                        />
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">US avg: $150-200/hr</p>
                                </div>
                            </div>

                            {/* Assumptions - Expandable */}
                            <div className="mt-5 pt-4 border-t border-slate-800">
                                <button
                                    onClick={() => setShowBreakdown(!showBreakdown)}
                                    className="flex items-center gap-2 text-xs text-slate-500 hover:text-sky-400 transition-colors"
                                >
                                    <span>{showBreakdown ? '▼' : '▶'}</span>
                                    <span>How this is calculated</span>
                                </button>

                                {showBreakdown && (
                                    <div className="mt-3 p-3 bg-slate-900 rounded-lg text-xs text-slate-400 space-y-1 animate-fade-in">
                                        <p>• 2 hours saved per physician per shift</p>
                                        <p>• 260 working days per year</p>
                                        <p>• Platform cost estimate: $84,000/year</p>
                                        <p>• Based on internal simulations and pilot data</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Right: Results - Dominant Numbers */}
                        <div className="p-6 bg-gradient-to-br from-slate-950 to-slate-900">
                            <h3 className="text-xs font-bold text-green-400 uppercase tracking-wider mb-5">
                                Projected Annual Impact
                            </h3>

                            {/* Big Savings Number */}
                            <div className="mb-6">
                                <div className="text-5xl md:text-6xl font-bold text-green-400 mb-1">
                                    ${savings.toLocaleString()}
                                </div>
                                <div className="text-sm text-slate-400">
                                    estimated annual savings
                                </div>
                            </div>

                            {/* Key Metrics */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-center">
                                    <div className="text-2xl font-bold text-white">{roi}%+</div>
                                    <div className="text-[10px] text-slate-500 uppercase">ROI</div>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-center">
                                    <div className="text-2xl font-bold text-white">6 mo</div>
                                    <div className="text-[10px] text-slate-500 uppercase">Payback</div>
                                </div>
                                <div className="bg-slate-900/50 p-3 rounded-lg border border-slate-800 text-center">
                                    <div className="text-2xl font-bold text-white">{hoursSaved.toLocaleString()}</div>
                                    <div className="text-[10px] text-slate-500 uppercase">Hrs Saved</div>
                                </div>
                            </div>

                            {/* Additional Metrics */}
                            <div className="space-y-2 mb-5 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Time Reduction</span>
                                    <span className="font-semibold text-sky-400">↓ 70%</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-slate-400">Diagnostic Accuracy</span>
                                    <span className="font-semibold text-purple-400">↑ 40%</span>
                                </div>
                            </div>

                            {/* CTA */}
                            <button className="w-full px-6 py-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold rounded-lg transition-all hover:-translate-y-0.5 shadow-lg text-sm">
                                Get Personalized ROI Analysis →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Disclaimer */}
                <p className="text-center text-[11px] text-slate-500 mt-4 italic">
                    Based on internal simulations and early pilot data; actual results may vary by implementation.
                </p>
            </div>
        </section>
    );
}
