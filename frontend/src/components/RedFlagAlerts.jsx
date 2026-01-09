import React, { useState } from 'react';

export function RedFlagAlerts({ flags }) {
    const [acknowledgedFlags, setAcknowledgedFlags] = useState(new Set());

    const handleAcknowledge = (flagId) => {
        setAcknowledgedFlags(prev => new Set([...prev, flagId]));
    };

    const criticalFlags = flags.filter(f => f.severity === 'critical');
    const highFlags = flags.filter(f => f.severity === 'high');

    if (flags.length === 0) return null;

    return (
        <div className="bg-red-900/20 border-2 border-red-500/50 rounded-xl p-6">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <span className="text-2xl">🚨</span> Red Flag Alerts
                <span className="text-xs font-normal text-red-300">
                    ({flags.length} critical finding{flags.length > 1 ? 's' : ''})
                </span>
            </h3>

            <div className="space-y-3">
                {/* Critical Flags - Require Acknowledgment */}
                {criticalFlags.map((flag) => (
                    <div
                        key={flag.id}
                        className={`p-4 rounded-lg border-2 transition-all ${acknowledgedFlags.has(flag.id)
                                ? 'bg-slate-900 border-slate-700 opacity-60'
                                : 'bg-red-950/50 border-red-500/50 animate-pulse-slow'
                            }`}
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-2xl flex-shrink-0">
                                {acknowledgedFlags.has(flag.id) ? '✓' : '⚠️'}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-red-300">{flag.title}</h4>
                                    <span className="px-2 py-0.5 rounded-full bg-red-500/30 text-red-300 text-xs font-bold uppercase">
                                        CRITICAL
                                    </span>
                                </div>
                                <p className="text-sm text-red-200 leading-relaxed mb-2">
                                    {flag.description}
                                </p>
                                <div className="text-xs text-red-300/70">
                                    <strong>Action:</strong> {flag.action}
                                </div>
                            </div>
                            {!acknowledgedFlags.has(flag.id) && (
                                <button
                                    onClick={() => handleAcknowledge(flag.id)}
                                    className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-white text-sm font-semibold transition-all"
                                >
                                    Acknowledge
                                </button>
                            )}
                        </div>
                    </div>
                ))}

                {/* High Severity Flags - No Acknowledgment Required */}
                {highFlags.map((flag) => (
                    <div
                        key={flag.id}
                        className="p-4 rounded-lg border border-amber-500/50 bg-amber-950/30"
                    >
                        <div className="flex items-start gap-3">
                            <div className="text-xl flex-shrink-0">⚠️</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-amber-300">{flag.title}</h4>
                                    <span className="px-2 py-0.5 rounded-full bg-amber-500/30 text-amber-300 text-xs font-bold uppercase">
                                        HIGH
                                    </span>
                                </div>
                                <p className="text-sm text-amber-200 leading-relaxed mb-2">
                                    {flag.description}
                                </p>
                                <div className="text-xs text-amber-300/70">
                                    <strong>Recommendation:</strong> {flag.action}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Summary */}
            {criticalFlags.length > 0 && (
                <div className="mt-4 p-3 bg-red-950/30 rounded-lg border border-red-500/30">
                    <div className="text-xs text-red-300">
                        <strong>Note:</strong> Critical flags must be acknowledged before closing this case.
                        This ensures all high-severity findings have been reviewed by the clinical team.
                    </div>
                </div>
            )}
        </div>
    );
}
