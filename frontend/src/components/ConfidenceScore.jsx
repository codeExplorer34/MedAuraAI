import React, { useState } from 'react';

export default function ConfidenceScore({
    score = 85,
    label = "Recommendation Confidence",
    showExplanation = true
}) {
    const [showDetails, setShowDetails] = useState(false);

    const getColor = (score) => {
        if (score >= 90) return { text: 'text-green-400', bg: 'bg-green-500', border: 'border-green-500' };
        if (score >= 75) return { text: 'text-sky-400', bg: 'bg-sky-500', border: 'border-sky-500' };
        if (score >= 60) return { text: 'text-amber-400', bg: 'bg-amber-500', border: 'border-amber-500' };
        return { text: 'text-red-400', bg: 'bg-red-500', border: 'border-red-500' };
    };

    const getLabel = (score) => {
        if (score >= 90) return 'Very High Confidence';
        if (score >= 75) return 'High Confidence';
        if (score >= 60) return 'Moderate Confidence';
        return 'Low Confidence - Requires Senior Review';
    };

    const colors = getColor(score);
    const confidenceLabel = getLabel(score);

    return (
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-400">{label}</span>
                <div className="flex items-center gap-2">
                    <span className={`text-2xl font-bold ${colors.text}`}>{score}%</span>
                    {showExplanation && (
                        <button
                            onClick={() => setShowDetails(!showDetails)}
                            className="text-slate-500 hover:text-sky-400 text-sm transition-colors"
                            title="How is this calculated?"
                        >
                            ℹ️
                        </button>
                    )}
                </div>
            </div>

            {/* Progress Bar */}
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden mb-2">
                <div
                    className={`h-full ${colors.bg} transition-all duration-500 ease-out`}
                    style={{ width: `${score}%` }}
                />
            </div>

            <div className={`text-xs font-semibold ${colors.text} mb-2`}>
                {confidenceLabel}
            </div>

            {/* Explanation */}
            {showDetails && showExplanation && (
                <div className="mt-3 pt-3 border-t border-slate-700 text-xs text-slate-400 space-y-2 animate-fade-in">
                    <p className="font-semibold text-white mb-2">How Confidence is Calculated:</p>
                    <ul className="space-y-1 list-disc list-inside">
                        <li>Data completeness (all required fields present)</li>
                        <li>Symptom pattern matches to known cases</li>
                        <li>Consistency across multiple AI agents</li>
                        <li>Evidence strength from clinical literature</li>
                    </ul>
                    <p className="mt-3 text-amber-400 italic">
                        ⚠️ Scores below 75% should be reviewed by a senior physician.
                    </p>
                </div>
            )}

            {score < 75 && (
                <div className="mt-3 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                    <div className="flex items-start gap-2">
                        <span className="text-amber-400">⚠️</span>
                        <p className="text-xs text-amber-300">
                            <strong>Lower confidence detected.</strong> Consider requesting senior review or additional testing before proceeding.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}
