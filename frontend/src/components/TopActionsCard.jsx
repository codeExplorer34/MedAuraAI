import React from 'react';

export function NextStepsCard({ actions }) {
    const getConfidenceBadge = (confidence) => {
        if (confidence >= 90) return 'bg-green-500/20 text-green-400 border-green-500/30';
        if (confidence >= 75) return 'bg-sky-500/20 text-sky-400 border-sky-500/30';
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>✅</span> Next Steps (Top 3 Actions)
            </h3>

            <div className="space-y-3">
                {actions.map((action, index) => (
                    <div
                        key={index}
                        className="p-4 bg-slate-950 rounded-lg border border-slate-800"
                    >
                        <div className="flex items-start gap-3">
                            {/* Number Badge */}
                            <div className="flex-shrink-0 w-7 h-7 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-sm">
                                {index + 1}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-1 flex-wrap">
                                    <h4 className="font-semibold text-white">{action.title}</h4>
                                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${getConfidenceBadge(action.confidence)}`}>
                                        {action.confidence}%
                                    </span>
                                </div>
                                <p className="text-sm text-slate-300 mb-1">
                                    {action.description}
                                </p>
                                {action.why && (
                                    <p className="text-xs text-slate-500">
                                        <span className="font-semibold">Why:</span> {action.why}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
