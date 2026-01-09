import React from 'react';

export function CriticalAlertsCard({ alerts }) {
    if (!alerts || alerts.length === 0) return null;

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span className="text-red-400">🚨</span> Critical Alerts
            </h3>

            <div className="space-y-3">
                {alerts.map((alert, i) => (
                    <div
                        key={i}
                        className="p-4 rounded-lg bg-red-950/30 border border-red-500/50"
                    >
                        <div className="font-semibold text-red-300 mb-1">
                            {alert.title}
                        </div>
                        <div className="text-sm text-red-200/80">
                            {alert.description}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
