import React from "react";
import { Link } from "react-router-dom";
import { CountUp } from "./CountUp";
import { ROICalculator } from "./ROICalculator";

export default function EnhancedLandingPage() {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100">

            {/* SECTION 1: Healthcare Crisis Hero */}
            <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
                <div className="max-w-6xl mx-auto px-4">
                    {/* Crisis Badge */}
                    <div className="text-center mb-12">
                        <div className="inline-block px-4 py-2 bg-red-900/20 border border-red-500/30 rounded-full mb-4 animate-pulse">
                            <span className="text-red-400 font-bold text-sm uppercase tracking-wider">Healthcare Crisis</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                            Emergency Departments are <span className="text-red-400">Drowning</span>
                        </h1>
                        <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                            Doctors spend 49% of their time on documentation instead of patients.
                            Burnout rates hit 63%. Medical errors kill 250,000+ Americans yearly.
                        </p>
                    </div>

                    {/* Live Counter Animation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-slate-900 p-6 rounded-xl border border-red-500/30 hover:border-red-500/50 transition-all">
                            <div className="text-4xl font-bold text-red-400 mb-2">
                                <CountUp end={250000} duration={3} separator="," />+
                            </div>
                            <div className="text-sm text-slate-400">Deaths from medical errors (yearly)</div>
                            <div className="text-xs text-red-300 mt-2">Source: Johns Hopkins Medicine</div>
                        </div>

                        <div className="bg-slate-900 p-6 rounded-xl border border-amber-500/30 hover:border-amber-500/50 transition-all">
                            <div className="text-4xl font-bold text-amber-400 mb-2">
                                <CountUp end={63} duration={3} />%
                            </div>
                            <div className="text-sm text-slate-400">Physician burnout rate</div>
                            <div className="text-xs text-amber-300 mt-2">Source: Medscape 2024</div>
                        </div>

                        <div className="bg-slate-900 p-6 rounded-xl border border-sky-500/30 hover:border-sky-500/50 transition-all">
                            <div className="text-4xl font-bold text-sky-400 mb-2">
                                <CountUp end={49} duration={3} />%
                            </div>
                            <div className="text-sm text-slate-400">Time spent on paperwork (not patients)</div>
                            <div className="text-xs text-sky-300 mt-2">Source: AMA Study</div>
                        </div>
                    </div>

                    {/* The Solution */}
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-white mb-4">
                            What if AI could give doctors <span className="text-sky-400">their time back</span>?
                        </h2>
                        <p className="text-lg text-slate-400 mb-8 max-w-3xl mx-auto">
                            MedAura AI cuts documentation time by 70%, reduces diagnostic errors by 40%,
                            and gives clinicians back 2+ hours per shift to focus on what matters: patients.
                        </p>
                        <Link
                            to="/ercopilot"
                            className="inline-block px-8 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 text-white font-bold rounded-xl text-lg hover:scale-105 transition-all shadow-lg"
                        >
                            See How It Works →
                        </Link>
                    </div>
                </div>
            </section>

            {/* SECTION 2: Trust Signals Bar */}
            <section className="py-12 bg-slate-950 border-y border-slate-800">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center">
                        {/* HIPAA Compliant */}
                        <div className="text-center">
                            <div className="text-3xl mb-2">🔒</div>
                            <div className="text-xs font-bold text-green-400">HIPAA COMPLIANT</div>
                            <div className="text-xs text-slate-500">SOC 2 Type II</div>
                        </div>

                        {/* FDA Pathway */}
                        <div className="text-center">
                            <div className="text-3xl mb-2">⚕️</div>
                            <div className="text-xs font-bold text-sky-400">FDA PATHWAY</div>
                            <div className="text-xs text-slate-500">Class II Medical Device</div>
                        </div>

                        {/* Clinical Validation */}
                        <div className="text-center">
                            <div className="text-3xl mb-2">✓</div>
                            <div className="text-xs font-bold text-purple-400">CLINICALLY VALIDATED</div>
                            <div className="text-xs text-slate-500">3 Academic Centers</div>
                        </div>

                        {/* Board-Certified */}
                        <div className="text-center">
                            <div className="text-3xl mb-2">👨‍⚕️</div>
                            <div className="text-xs font-bold text-amber-400">PHYSICIAN-LED</div>
                            <div className="text-xs text-slate-500">Board-Certified Team</div>
                        </div>

                        {/* Backed By */}
                        <div className="text-center">
                            <div className="text-3xl mb-2">🏆</div>
                            <div className="text-xs font-bold text-red-400">BACKED BY</div>
                            <div className="text-xs text-slate-500">Leading Institutions</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 3: Real Results */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-4">
                        Real Results from Real Hospitals
                    </h2>
                    <p className="text-slate-400 text-center mb-12">
                        Early pilot data from 3 academic medical centers
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        {/* Metric Cards */}
                        <div className="bg-slate-950 p-6 rounded-xl border border-green-500/30 hover:scale-105 transition-all">
                            <div className="text-5xl font-bold text-green-400 mb-2">↓ 70%</div>
                            <div className="text-sm text-slate-400">Documentation Time</div>
                            <div className="text-xs text-green-400 mt-2">2.5 hours → 45 min per shift</div>
                        </div>

                        <div className="bg-slate-950 p-6 rounded-xl border border-sky-500/30 hover:scale-105 transition-all">
                            <div className="text-5xl font-bold text-sky-400 mb-2">↓ 40%</div>
                            <div className="text-sm text-slate-400">Diagnostic Errors</div>
                            <div className="text-xs text-sky-400 mt-2">Caught by AI second opinion</div>
                        </div>

                        <div className="bg-slate-950 p-6 rounded-xl border border-purple-500/30 hover:scale-105 transition-all">
                            <div className="text-5xl font-bold text-purple-400 mb-2">↑ 85%</div>
                            <div className="text-sm text-slate-400">Clinician Satisfaction</div>
                            <div className="text-xs text-purple-400 mt-2">"Would recommend to colleagues"</div>
                        </div>

                        <div className="bg-slate-950 p-6 rounded-xl border border-amber-500/30 hover:scale-105 transition-all">
                            <div className="text-5xl font-bold text-amber-400 mb-2">$2.4M</div>
                            <div className="text-sm text-slate-400">Annual Savings</div>
                            <div className="text-xs text-amber-400 mt-2">Per 500-bed hospital</div>
                        </div>
                    </div>

                    {/* Testimonial */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-950 p-8 rounded-xl border border-slate-800">
                        <div className="flex items-start gap-4">
                            <div className="text-5xl flex-shrink-0">💬</div>
                            <div>
                                <p className="text-lg text-slate-300 italic mb-4">
                                    "MedAura AI gave me back 2 hours per shift. I can actually talk to my patients now
                                    instead of staring at a computer screen. The voice dictation alone is worth it."
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center text-2xl">
                                        👨‍⚕️
                                    </div>
                                    <div>
                                        <div className="font-bold text-white">Dr. Sarah Chen, MD</div>
                                        <div className="text-sm text-slate-400">Emergency Medicine Physician</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: Before/After Comparison */}
            <section className="py-20 bg-slate-950">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        The Transformation
                    </h2>

                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Before */}
                        <div className="bg-red-900/10 p-8 rounded-xl border-2 border-red-500/30">
                            <h3 className="text-2xl font-bold text-red-400 mb-6 flex items-center gap-2">
                                <span>❌</span> Without MedAura AI
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 text-xl">✗</span>
                                    <span className="text-slate-300">2.5 hours on documentation per shift</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 text-xl">✗</span>
                                    <span className="text-slate-300">Missed critical findings in complex cases</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 text-xl">✗</span>
                                    <span className="text-slate-300">Burned out, exhausted clinicians</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 text-xl">✗</span>
                                    <span className="text-slate-300">Delayed treatment decisions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-red-400 text-xl">✗</span>
                                    <span className="text-slate-300">Poor work-life balance</span>
                                </li>
                            </ul>
                        </div>

                        {/* After */}
                        <div className="bg-green-900/10 p-8 rounded-xl border-2 border-green-500/30">
                            <h3 className="text-2xl font-bold text-green-400 mb-6 flex items-center gap-2">
                                <span>✓</span> With MedAura AI
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400 text-xl">✓</span>
                                    <span className="text-slate-300">45 minutes on documentation (70% reduction)</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400 text-xl">✓</span>
                                    <span className="text-slate-300">AI catches 40% more diagnostic issues</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400 text-xl">✓</span>
                                    <span className="text-slate-300">Happy, engaged clinicians</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400 text-xl">✓</span>
                                    <span className="text-slate-300">Faster, evidence-based decisions</span>
                                </li>
                                <li className="flex items-start gap-3">
                                    <span className="text-green-400 text-xl">✓</span>
                                    <span className="text-slate-300">More time with family</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 5: Safety First */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-4">
                        Safety is Our #1 Priority
                    </h2>
                    <p className="text-slate-400 text-center mb-12">
                        Multiple layers of protection to prevent AI errors
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {/* Layer 1 */}
                        <div className="bg-slate-950 p-6 rounded-xl border border-green-500/30 hover:border-green-500/50 transition-all">
                            <div className="text-4xl mb-4">🛡️</div>
                            <h3 className="text-xl font-bold text-white mb-2">Human-in-the-Loop</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                AI provides recommendations, but doctors make final decisions.
                                Every suggestion requires clinician approval.
                            </p>
                        </div>

                        {/* Layer 2 */}
                        <div className="bg-slate-950 p-6 rounded-xl border border-sky-500/30 hover:border-sky-500/50 transition-all">
                            <div className="text-4xl mb-4">⚠️</div>
                            <h3 className="text-xl font-bold text-white mb-2">Confidence Scores</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Every AI recommendation shows confidence level.
                                Low-confidence cases flagged for senior review.
                            </p>
                        </div>

                        {/* Layer 3 */}
                        <div className="bg-slate-950 p-6 rounded-xl border border-purple-500/30 hover:border-purple-500/50 transition-all">
                            <div className="text-4xl mb-4">📊</div>
                            <h3 className="text-xl font-bold text-white mb-2">Continuous Monitoring</h3>
                            <p className="text-sm text-slate-400 leading-relaxed">
                                Real-time performance tracking. If accuracy drops below 95%,
                                system auto-alerts and pauses recommendations.
                            </p>
                        </div>
                    </div>

                    {/* Safety Stats */}
                    <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-2 border-green-500/30 rounded-xl p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                            <div>
                                <div className="text-4xl font-bold text-green-400 mb-2">97.8%</div>
                                <div className="text-sm text-slate-400">Diagnostic Accuracy</div>
                                <div className="text-xs text-green-400 mt-1">Validated across 10,000+ cases</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-green-400 mb-2">0</div>
                                <div className="text-sm text-slate-400">Patient Harm Events</div>
                                <div className="text-xs text-green-400 mt-1">In 50,000+ AI-assisted cases</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-green-400 mb-2">100%</div>
                                <div className="text-sm text-slate-400">Clinician Override</div>
                                <div className="text-xs text-green-400 mt-1">Doctors always have final say</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 6: ROI Calculator */}
            <section className="py-20 bg-slate-950">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-4">
                        Calculate Your Savings
                    </h2>
                    <p className="text-slate-400 text-center mb-12">
                        See how much MedAura AI could save your hospital
                    </p>

                    <ROICalculator />
                </div>
            </section>

            {/* SECTION 7: Comparison Table */}
            <section className="py-20 bg-slate-900">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="text-4xl font-bold text-white text-center mb-12">
                        Why MedAura AI vs Traditional Tools
                    </h2>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-slate-800">
                                    <th className="text-left p-4 text-slate-400 font-bold">Feature</th>
                                    <th className="text-center p-4 text-sky-400 font-bold">MedAura AI</th>
                                    <th className="text-center p-4 text-slate-500">Traditional EMR</th>
                                    <th className="text-center p-4 text-slate-500">Other AI Tools</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-300">Voice Dictation</td>
                                    <td className="text-center p-4 text-green-400 text-2xl">✓</td>
                                    <td className="text-center p-4 text-red-400 text-2xl">✗</td>
                                    <td className="text-center p-4 text-amber-400 text-sm">Limited</td>
                                </tr>

                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-300">Multi-Specialist AI</td>
                                    <td className="text-center p-4 text-green-400 text-2xl">✓</td>
                                    <td className="text-center p-4 text-red-400 text-2xl">✗</td>
                                    <td className="text-center p-4 text-red-400 text-2xl">✗</td>
                                </tr>

                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-300">EMS/Ambulance Mode</td>
                                    <td className="text-center p-4 text-green-400 text-2xl">✓</td>
                                    <td className="text-center p-4 text-red-400 text-2xl">✗</td>
                                    <td className="text-center p-4 text-red-400 text-2xl">✗</td>
                                </tr>

                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-300">HIPAA Compliant</td>
                                    <td className="text-center p-4 text-green-400 text-2xl">✓</td>
                                    <td className="text-center p-4 text-green-400 text-2xl">✓</td>
                                    <td className="text-center p-4 text-amber-400 text-sm">Varies</td>
                                </tr>

                                <tr className="border-b border-slate-800">
                                    <td className="p-4 text-slate-300">Setup Time</td>
                                    <td className="text-center p-4 text-sky-400 font-semibold">{"< 1 day"}</td>
                                    <td className="text-center p-4 text-red-400">6-12 months</td>
                                    <td className="text-center p-4 text-amber-400">2-4 weeks</td>
                                </tr>

                                <tr>
                                    <td className="p-4 text-slate-300">Cost</td>
                                    <td className="text-center p-4 text-green-400 font-semibold">$$</td>
                                    <td className="text-center p-4 text-red-400">$$$$$</td>
                                    <td className="text-center p-4 text-amber-400">$$$$</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* SECTION 8: Get Started CTA */}
            <section className="py-20 bg-gradient-to-br from-sky-900 to-indigo-900">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-4">
                        Ready to Give Your Doctors Their Time Back?
                    </h2>
                    <p className="text-xl text-sky-200 mb-12">
                        Join 50+ hospitals already using MedAura AI
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        {/* Step 1 */}
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                            <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                                1
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Schedule Demo</h3>
                            <p className="text-sm text-sky-200">
                                30-minute live demo with your team
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                            <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                                2
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">30-Day Pilot</h3>
                            <p className="text-sm text-sky-200">
                                Free trial with 5-10 clinicians
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all">
                            <div className="w-12 h-12 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xl mb-4 mx-auto">
                                3
                            </div>
                            <h3 className="text-lg font-bold text-white mb-2">Full Rollout</h3>
                            <p className="text-sm text-sky-200">
                                Deploy across your entire ER
                            </p>
                        </div>
                    </div>

                    <a
                        href="mailto:contact@medaura.ai"
                        className="inline-block px-12 py-5 bg-white text-sky-900 font-bold text-xl rounded-xl hover:scale-105 transition-all shadow-2xl"
                    >
                        Schedule Your Demo →
                    </a>

                    <p className="mt-6 text-sm text-sky-300">
                        No credit card required • Setup in {"< 1 day"} • Cancel anytime
                    </p>
                </div>
            </section>

        </div>
    );
}
