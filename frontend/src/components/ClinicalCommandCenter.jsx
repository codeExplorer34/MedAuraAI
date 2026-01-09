import React from 'react';
import { ExplainerTooltip } from './ExplainerTooltip';

export function ClinicalCommandCenter({ urgency, consensus, complexity }) {
    const getUrgencyColor = () => {
        if (urgency.level === 'HIGH') return {
            bg: 'from-red-900/20 to-orange-900/20',
            border: 'border-red-500/50',
            text: 'text-red-400',
            icon: '🚨'
        };
        if (urgency.level === 'MEDIUM') return {
            bg: 'from-amber-900/20 to-yellow-900/20',
            border: 'border-amber-500/50',
            text: 'text-amber-400',
            icon: '⚠️'
        };
        return {
            bg: 'from-green-900/20 to-emerald-900/20',
            border: 'border-green-500/50',
            text: 'text-green-400',
            icon: '✓'
        };
    };

    const getConsensusColor = () => {
        if (consensus >= 80) return { bar: 'bg-green-500', text: 'text-green-400', label: 'Strong Agreement' };
        if (consensus >= 60) return { bar: 'bg-sky-500', text: 'text-sky-400', label: 'Moderate Agreement' };
        return { bar: 'bg-amber-500', text: 'text-amber-400', label: 'Divergent Opinions' };
    };

    const getComplexityColor = () => {
        if (complexity >= 70) return { bar: 'bg-red-500', text: 'text-red-400', label: 'High Complexity' };
        if (complexity >= 40) return { bar: 'bg-amber-500', text: 'text-amber-400', label: 'Moderate Complexity' };
        return { bar: 'bg-green-500', text: 'text-green-400', label: 'Low Complexity' };
    };

    const urgencyStyle = getUrgencyColor();
    const consensusStyle = getConsensusColor();
    const complexityStyle = getComplexityColor();

    return (
        <div className="bg-slate-950/95 backdrop-blur-sm border-b border-slate-800 p-4 mb-6 shadow-lg">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Left: Urgency & Disposition */}
                    <div className={`bg-gradient-to-br ${urgencyStyle.bg} border-2 ${urgencyStyle.border} rounded-xl p-4`}>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="text-3xl animate-pulse">{urgencyStyle.icon}</span>
                            <div>
                                <div className="text-xs text-slate-400 font-bold uppercase">Urgency</div>
                                <div className={`text-2xl font-bold text-white ${urgency.level === 'HIGH' ? 'animate-pulse' : ''}`}>
                                    {urgency.level}
                                </div>
                            </div>
                        </div>
                        <div className={`text-sm ${urgencyStyle.text} font-semibold`}>
                            {urgency.action}
                        </div>
                        {urgency.department && (
                            <div className="text-xs text-slate-400 mt-1">
                                Primary: {urgency.department}
                            </div>
                        )}
                    </div>

                    {/* Center: Consensus */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                        <div className="text-xs text-slate-400 font-bold uppercase mb-2">Specialist Consensus</div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex-1">
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${consensusStyle.bar} transition-all duration-1000`} style={{ width: `${consensus}%` }} />
                                </div>
                            </div>
                            <div className={`text-2xl font-bold ${consensusStyle.text}`}>{consensus}%</div>
                        </div>
                        <div className={`text-xs ${consensusStyle.text} mb-1 flex items-center gap-1`}>
                            {consensusStyle.label}
                            <ExplainerTooltip
                                title="How is consensus calculated?"
                                content="Consensus measures agreement between specialist AI agents on primary diagnosis, disposition, and treatment priority. Calculated by comparing diagnostic confidence scores and treatment recommendations across all 5 specialists."
                            />
                        </div>
                    </div>

                    {/* Right: Complexity */}
                    <div className="bg-slate-900 border border-slate-700 rounded-xl p-4">
                        <div className="text-xs text-slate-400 font-bold uppercase mb-2">Case Complexity</div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="flex-1">
                                <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${complexityStyle.bar} transition-all duration-1000`} style={{ width: `${complexity}%` }} />
                                </div>
                            </div>
                            <div className={`text-2xl font-bold ${complexityStyle.text}`}>{complexity}%</div>
                        </div>
                        <div className={`text-xs ${complexityStyle.text} mb-1 flex items-center gap-1`}>
                            {complexityStyle.label}
                            <ExplainerTooltip
                                title={`Why is this ${complexityStyle.label.split(' ')[0].toLowerCase()}?`}
                                content="Case complexity is calculated based on: number of comorbidities, severity of presenting symptoms, diagnostic uncertainty, treatment risk factors, and need for multi-specialty coordination. Higher scores indicate cases requiring more intensive clinical oversight."
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
