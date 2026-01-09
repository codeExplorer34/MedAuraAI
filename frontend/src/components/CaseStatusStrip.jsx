import React from 'react';

export function CaseStatusStrip({ urgency, department, consensus, complexity }) {
    const getUrgencyColor = (level) => {
        if (level === 'IMMEDIATE' || level === 'HIGH') return 'bg-red-900/20 border-red-500 text-red-400';
        if (level === 'MEDIUM') return 'bg-amber-900/20 border-amber-500 text-amber-400';
        return 'bg-green-900/20 border-green-500 text-green-400';
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                {/* Urgency */}
                <div className={`p-4 rounded-lg border-2 ${getUrgencyColor(urgency)}`}>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">⚠️</span>
                        <div className="text-xs font-bold uppercase tracking-wider opacity-70">Urgency</div>
                    </div>
                    <div className="text-2xl font-bold">{urgency}</div>
                </div>

                {/* Department */}
                <div className="p-4 rounded-lg border-2 border-sky-500 bg-sky-900/20">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">🏥</span>
                        <div className="text-xs font-bold uppercase tracking-wider text-sky-400 opacity-70">Department</div>
                    </div>
                    <div className="text-lg font-bold text-sky-400">{department}</div>
                </div>

                {/* Consensus */}
                <div className="p-4 rounded-lg border-2 border-green-500 bg-green-900/20">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">👥</span>
                        <div className="text-xs font-bold uppercase tracking-wider text-green-400 opacity-70">Consensus</div>
                    </div>
                    <div className="text-lg font-bold text-green-400">{consensus}%</div>
                    <div className="text-xs text-green-300 mt-0.5">Strong Agreement</div>
                </div>

                {/* Complexity */}
                <div className="p-4 rounded-lg border-2 border-purple-500 bg-purple-900/20">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-xl">📊</span>
                        <div className="text-xs font-bold uppercase tracking-wider text-purple-400 opacity-70">Complexity</div>
                    </div>
                    <div className="text-lg font-bold text-purple-400">{complexity}%</div>
                    <div className="text-xs text-purple-300 mt-0.5">High Complexity</div>
                </div>

            </div>
        </div>
    );
}
