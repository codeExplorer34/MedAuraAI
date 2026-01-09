import React, { useState } from 'react';

export function AIRecommendationPanel({ recommendations }) {
    const [decisions, setDecisions] = useState({});
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedText, setEditedText] = useState('');

    const getConfidenceColor = (confidence) => {
        if (confidence >= 80) return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' };
        if (confidence >= 60) return { bg: 'bg-sky-500', text: 'text-sky-400', border: 'border-sky-500' };
        if (confidence >= 40) return { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500' };
        return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' };
    };

    const getConfidenceLabel = (confidence) => {
        if (confidence >= 80) return 'High';
        if (confidence >= 60) return 'Moderate';
        if (confidence >= 40) return 'Low';
        return 'Very Low';
    };

    const handleAccept = (index) => {
        setDecisions({ ...decisions, [index]: { status: 'accepted', timestamp: new Date().toISOString() } });
        setEditingIndex(null);
    };

    const handleReject = (index) => {
        setDecisions({ ...decisions, [index]: { status: 'rejected', timestamp: new Date().toISOString() } });
        setEditingIndex(null);
    };

    const handleModify = (index, originalText) => {
        setEditingIndex(index);
        setEditedText(originalText);
    };

    const handleSaveModification = (index) => {
        setDecisions({
            ...decisions,
            [index]: {
                status: 'modified',
                modifiedText: editedText,
                timestamp: new Date().toISOString()
            }
        });
        setEditingIndex(null);
    };

    const handleUndo = (index) => {
        const newDecisions = { ...decisions };
        delete newDecisions[index];
        setDecisions(newDecisions);
        setEditingIndex(null);
    };

    return (
        <div className="space-y-3">

            {recommendations.map((rec, index) => {
                const confidenceColor = getConfidenceColor(rec.confidence);
                const isLowConfidence = rec.confidence < 60;
                const decision = decisions[index];
                const isEditing = editingIndex === index;

                return (
                    <div
                        key={index}
                        className={`bg-slate-900 border rounded-lg p-3 transition-all ${decision?.status === 'accepted' ? 'border-green-500 bg-green-950/20' :
                                decision?.status === 'rejected' ? 'border-red-500/50 bg-red-950/20 opacity-60' :
                                    decision?.status === 'modified' ? 'border-amber-500 bg-amber-950/20' :
                                        isLowConfidence ? 'border-amber-500/50' : 'border-slate-800 hover:border-sky-500/50'
                            }`}
                    >
                        {/* Status Badge */}
                        {decision && (
                            <div className={`flex items-center justify-between mb-2 px-2 py-1 rounded text-[10px] font-bold ${decision.status === 'accepted' ? 'bg-green-500/20 text-green-400' :
                                    decision.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                                        'bg-amber-500/20 text-amber-400'
                                }`}>
                                <span>
                                    {decision.status === 'accepted' && '✓ ACCEPTED'}
                                    {decision.status === 'rejected' && '✗ REJECTED'}
                                    {decision.status === 'modified' && '✏️ MODIFIED'}
                                </span>
                                <button
                                    onClick={() => handleUndo(index)}
                                    className="text-slate-400 hover:text-white text-[10px]"
                                >
                                    Undo
                                </button>
                            </div>
                        )}

                        {/* Header - Compact */}
                        <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                                <div className="flex items-center gap-1.5 mb-0.5">
                                    <span className="text-base">{rec.icon}</span>
                                    <h4 className={`font-semibold text-sm ${decision?.status === 'rejected' ? 'line-through text-slate-500' : 'text-white'}`}>
                                        {rec.title}
                                    </h4>
                                    {isLowConfidence && (
                                        <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 text-[10px] font-bold border border-amber-500/30">
                                            ⚠️ REVIEW
                                        </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-slate-500">{rec.category}</p>
                            </div>
                        </div>

                        {/* Recommendation Text - Compact or Edit Mode */}
                        <div className="mb-2 p-2 bg-slate-950 rounded border border-slate-800">
                            {isEditing ? (
                                <div className="space-y-2">
                                    <textarea
                                        value={editedText}
                                        onChange={(e) => setEditedText(e.target.value)}
                                        className="w-full px-2 py-1 bg-slate-900 border border-sky-500 rounded text-xs text-white resize-none"
                                        rows={3}
                                    />
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleSaveModification(index)}
                                            className="px-3 py-1 bg-sky-600 hover:bg-sky-500 text-white text-[10px] rounded font-semibold"
                                        >
                                            Save Changes
                                        </button>
                                        <button
                                            onClick={() => setEditingIndex(null)}
                                            className="px-3 py-1 bg-slate-700 hover:bg-slate-600 text-white text-[10px] rounded font-semibold"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className={`text-xs leading-relaxed ${decision?.status === 'rejected' ? 'line-through text-slate-500' : 'text-slate-300'}`}>
                                    {decision?.status === 'modified' ? decision.modifiedText : rec.recommendation}
                                </p>
                            )}
                        </div>

                        {/* Confidence Bar - Compact */}
                        <div className="mb-2">
                            <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] text-slate-500 font-semibold">Confidence</span>
                                <span className={`text-xs font-bold ${confidenceColor.text}`}>
                                    {rec.confidence}% ({getConfidenceLabel(rec.confidence)})
                                </span>
                            </div>
                            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={`h-full ${confidenceColor.bg} transition-all duration-500`}
                                    style={{ width: `${rec.confidence}%` }}
                                />
                            </div>
                        </div>

                        {/* Why Factors - Compact */}
                        <div className="mb-2">
                            <div className="text-[10px] font-semibold text-sky-400 mb-1 uppercase">
                                Why?
                            </div>
                            <div className="space-y-1">
                                {rec.whyFactors.slice(0, 2).map((factor, i) => (
                                    <div key={i} className="flex items-start gap-1.5 p-1.5 bg-slate-950 rounded border border-slate-800">
                                        <span className="text-sky-400 text-[10px] mt-0.5">•</span>
                                        <span className="text-[11px] text-slate-300 leading-tight">{factor}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Evidence - Compact */}
                        {rec.evidence && (
                            <div className="p-2 bg-purple-950/20 rounded border border-purple-900/30 mb-2">
                                <div className="text-[10px] font-semibold text-purple-400 mb-0.5">
                                    📚 Evidence
                                </div>
                                <p className="text-[11px] text-purple-200 leading-tight">
                                    {rec.evidence}
                                </p>
                            </div>
                        )}

                        {/* Actions - Compact */}
                        {!decision && !isEditing && (
                            <div className="flex gap-1.5">
                                <button
                                    onClick={() => handleAccept(index)}
                                    className="flex-1 px-2 py-1.5 rounded bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white text-[11px] font-semibold transition-all"
                                >
                                    ✓ Accept
                                </button>
                                <button
                                    onClick={() => handleModify(index, rec.recommendation)}
                                    className="px-2 py-1.5 rounded border border-slate-700 text-slate-300 hover:border-sky-500 hover:text-sky-400 text-[11px] font-semibold transition-all"
                                >
                                    ✏️ Modify
                                </button>
                                <button
                                    onClick={() => handleReject(index)}
                                    className="px-2 py-1.5 rounded border border-slate-700 text-slate-300 hover:border-red-500 hover:text-red-400 text-[11px] font-semibold transition-all"
                                >
                                    ✗ Reject
                                </button>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
