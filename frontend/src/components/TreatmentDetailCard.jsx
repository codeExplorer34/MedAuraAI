import React, { useState } from 'react';

export function TreatmentDetailCard({ treatment, index }) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="border border-slate-700 rounded-xl overflow-hidden hover:border-sky-500/50 transition-all animate-fade-in-up" style={{ animationDelay: `${index * 100}ms` }}>
            {/* Header - Always Visible */}
            <div
                className="p-4 cursor-pointer flex items-center justify-between bg-slate-900 hover:bg-slate-800 transition-all"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{treatment.icon}</span>
                        <div>
                            <h4 className="font-bold text-white text-lg">{treatment.name}</h4>
                            <p className="text-xs text-slate-400">{treatment.modality}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${treatment.match >= 90 ? 'bg-green-500/20 text-green-400 border border-green-500/30' :
                                treatment.match >= 75 ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' :
                                    'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                            }`}>
                            {treatment.match}% Match
                        </span>
                        <span className="text-xs text-slate-500">
                            Evidence: <span className="text-sky-400 font-semibold">{treatment.evidenceLevel}</span>
                        </span>
                        <span className="text-xs text-slate-500">
                            Success: <span className="text-green-400 font-semibold">{treatment.successRate}%</span>
                        </span>
                    </div>
                </div>
                <div className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`}>
                    <svg className="w-6 h-6 text-sky-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="p-6 bg-slate-950 border-t border-slate-800 animate-fade-in">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-4">
                            <div>
                                <h5 className="text-xs font-bold text-sky-400 uppercase mb-2 flex items-center gap-2">
                                    <span>🎯</span> Clinical Indication
                                </h5>
                                <p className="text-sm text-slate-300 leading-relaxed">{treatment.indication}</p>
                            </div>

                            <div>
                                <h5 className="text-xs font-bold text-sky-400 uppercase mb-2 flex items-center gap-2">
                                    <span>📋</span> Protocol
                                </h5>
                                <ul className="space-y-2">
                                    {treatment.protocol.map((step, i) => (
                                        <li key={i} className="text-sm text-slate-300 flex items-start gap-2 p-2 bg-slate-900 rounded">
                                            <span className="text-sky-400 mt-1 font-bold">{i + 1}.</span>
                                            <span>{step}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div>
                                <h5 className="text-xs font-bold text-amber-400 uppercase mb-2 flex items-center gap-2">
                                    <span>⚠️</span> Contraindications
                                </h5>
                                <ul className="space-y-1">
                                    {treatment.contraindications.map((item, i) => (
                                        <li key={i} className="text-sm text-amber-200 flex items-start gap-2 p-2 bg-amber-900/10 rounded border border-amber-900/20">
                                            <span className="text-amber-400 mt-0.5">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-4">
                            <div>
                                <h5 className="text-xs font-bold text-green-400 uppercase mb-2 flex items-center gap-2">
                                    <span>📊</span> Expected Outcomes
                                </h5>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-slate-300">Success Rate</span>
                                        <span className="text-lg font-bold text-green-400">{treatment.successRate}%</span>
                                    </div>
                                    <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                                            style={{ width: `${treatment.successRate}%` }}
                                        />
                                    </div>
                                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">{treatment.outcomeDetails}</p>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-xs font-bold text-slate-400 uppercase mb-2 flex items-center gap-2">
                                    <span>⏱️</span> Timeline & Cost
                                </h5>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                        <div className="text-xs text-slate-500 mb-1">Duration</div>
                                        <div className="text-sm font-semibold text-white">{treatment.duration}</div>
                                    </div>
                                    <div className="bg-slate-900 p-3 rounded-lg border border-slate-800">
                                        <div className="text-xs text-slate-500 mb-1">Cost</div>
                                        <div className={`text-sm font-semibold ${treatment.cost === 'Low' ? 'text-green-400' :
                                                treatment.cost === 'Moderate' ? 'text-amber-400' :
                                                    'text-red-400'
                                            }`}>
                                            {treatment.cost}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h5 className="text-xs font-bold text-purple-400 uppercase mb-2 flex items-center gap-2">
                                    <span>📚</span> Evidence Base
                                </h5>
                                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 text-xs font-bold border border-sky-500/30">
                                            {treatment.evidenceLevel}
                                        </span>
                                        <span className="text-xs text-slate-400">{treatment.evidenceSource}</span>
                                    </div>
                                    {treatment.guidelineLink && (
                                        <a
                                            href={treatment.guidelineLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-sky-400 hover:text-sky-300 hover:underline flex items-center gap-1 transition-all"
                                        >
                                            <span>View Clinical Guidelines</span>
                                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 pt-6 border-t border-slate-800 flex gap-3">
                        <button className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-semibold transition-all hover:scale-105 shadow-lg">
                            Add to Treatment Plan
                        </button>
                        <button className="px-4 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-400 hover:bg-slate-800 transition-all">
                            Compare Alternatives
                        </button>
                        <button className="px-4 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-400 hover:bg-slate-800 transition-all">
                            Print Protocol
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
