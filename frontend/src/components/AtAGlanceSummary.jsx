import React from 'react';

export function AtAGlanceSummaryCard({ data }) {
    const items = [
        { label: 'Risk Level', value: data.risk, color: 'text-red-400' },
        { label: 'Urgency', value: data.urgency, color: 'text-amber-400' },
        { label: 'Department', value: data.department, color: 'text-sky-400' },
        { label: 'Primary Diagnosis', value: data.diagnosis, color: 'text-white' },
        { label: 'Recommended Action', value: data.action, color: 'text-green-400' },
        { label: 'Attending', value: data.attending || 'Dr. Sarah Chen', color: 'text-purple-400' }
    ];

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>📋</span> At-a-Glance Summary
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item, i) => (
                    <div
                        key={i}
                        className="p-3 bg-slate-950 rounded-lg border border-slate-800"
                    >
                        <div className="text-xs text-slate-500 uppercase tracking-wider mb-1">
                            {item.label}
                        </div>
                        <div className={`text-sm font-semibold ${item.color}`}>
                            {item.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
