import React from 'react';

export function SpecialistDetailModal({ specialist, onClose }) {
    if (!specialist) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
                {/* Header */}
                <div className="sticky top-0 bg-gradient-to-br from-sky-900 to-indigo-900 p-6 border-b border-slate-700 z-10">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="text-5xl">{specialist.icon}</div>
                            <div>
                                <h2 className="text-2xl font-bold text-white">{specialist.name}</h2>
                                <p className="text-sky-200">Detailed Clinical Analysis</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-lg hover:bg-white/10 transition-all"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Summary */}
                    <section className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                            <span>📋</span> Summary
                        </h3>
                        <p className="text-slate-300 leading-relaxed">{specialist.content}</p>
                    </section>

                    {/* Key Findings */}
                    {specialist.keyFindings && specialist.keyFindings.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-amber-400 mb-3 flex items-center gap-2">
                                <span>🔍</span> Key Findings
                            </h3>
                            <div className="space-y-2">
                                {specialist.keyFindings.map((finding, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-slate-950 rounded-lg border border-slate-800">
                                        <span className="text-amber-400 mt-1">•</span>
                                        <span className="text-slate-300">{finding}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Recommendations */}
                    {specialist.recommendations && specialist.recommendations.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
                                <span>→</span> Recommendations
                            </h3>
                            <div className="space-y-2">
                                {specialist.recommendations.map((rec, i) => (
                                    <div key={i} className="flex items-start gap-3 p-3 bg-green-900/10 rounded-lg border border-green-900/20">
                                        <span className="text-green-400 font-bold">{i + 1}.</span>
                                        <span className="text-slate-300">{rec}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Risk Factors */}
                    {specialist.riskFactors && specialist.riskFactors.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-red-400 mb-3 flex items-center gap-2">
                                <span>⚠️</span> Risk Factors
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {specialist.riskFactors.map((risk, i) => (
                                    <div key={i} className="p-3 bg-red-900/10 rounded-lg border border-red-900/20">
                                        <span className="text-red-300 text-sm">{risk}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Diagnostic Workup */}
                    {specialist.diagnosticWorkup && specialist.diagnosticWorkup.length > 0 && (
                        <section>
                            <h3 className="text-lg font-bold text-cyan-400 mb-3 flex items-center gap-2">
                                <span>🧪</span> Recommended Diagnostic Workup
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {specialist.diagnosticWorkup.map((test, i) => (
                                    <div key={i} className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                                        <div className="font-semibold text-white mb-1">{test.name || test}</div>
                                        {test.rationale && (
                                            <div className="text-xs text-slate-400 mb-2">{test.rationale}</div>
                                        )}
                                        {test.priority && (
                                            <div className={`text-xs font-bold ${test.priority === 'Urgent' ? 'text-red-400' :
                                                    test.priority === 'High' ? 'text-amber-400' :
                                                        'text-slate-400'
                                                }`}>
                                                Priority: {test.priority}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Treatment Considerations */}
                    {specialist.treatmentConsiderations && (
                        <section>
                            <h3 className="text-lg font-bold text-purple-400 mb-3 flex items-center gap-2">
                                <span>💊</span> Treatment Considerations
                            </h3>
                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                <p className="text-slate-300 leading-relaxed whitespace-pre-line">{specialist.treatmentConsiderations}</p>
                            </div>
                        </section>
                    )}

                    {/* Follow-up Plan */}
                    {specialist.followUp && (
                        <section>
                            <h3 className="text-lg font-bold text-sky-400 mb-3 flex items-center gap-2">
                                <span>📅</span> Follow-up Plan
                            </h3>
                            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
                                <p className="text-slate-300 leading-relaxed">{specialist.followUp}</p>
                            </div>
                        </section>
                    )}
                </div>

                {/* Footer Actions */}
                <div className="sticky bottom-0 bg-slate-900 border-t border-slate-700 p-4 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-3 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-all"
                    >
                        Close
                    </button>
                    <button className="px-4 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-400 transition-all">
                        Print Analysis
                    </button>
                    <button className="px-4 py-3 rounded-lg border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-400 transition-all">
                        Add to Notes
                    </button>
                </div>
            </div>
        </div>
    );
}
