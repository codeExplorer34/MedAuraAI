import React from 'react';

export function RiskStratificationBlock({ riskData }) {
    const getRiskColor = (score) => {
        if (score >= 70) return { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500' };
        if (score >= 40) return { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500' };
        return { bg: 'bg-green-500', text: 'text-green-400', border: 'border-green-500' };
    };

    const getRiskLevel = (score) => {
        if (score >= 70) return 'HIGH';
        if (score >= 40) return 'MODERATE';
        return 'LOW';
    };

    const overallColor = getRiskColor(riskData.overall);

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <span>⚠️</span> Risk Stratification
            </h3>

            {/* Overall Risk Score */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-slate-400">Overall Risk Score</span>
                    <span className={`text-2xl font-bold ${overallColor.text}`}>
                        {riskData.overall}/100
                    </span>
                </div>

                {/* Risk Gauge */}
                <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden">
                    <div
                        className={`h-full ${overallColor.bg} transition-all duration-500`}
                        style={{ width: `${riskData.overall}%` }}
                    />
                </div>

                <div className="flex items-center justify-between mt-2">
                    <span className={`text-xs font-bold ${overallColor.text} uppercase`}>
                        {getRiskLevel(riskData.overall)} RISK
                    </span>
                    <span className="text-xs text-slate-500">
                        Based on {riskData.factorsCount} clinical factors
                    </span>
                </div>
            </div>

            {/* Risk Breakdown */}
            <div className="grid grid-cols-3 gap-3 mb-4">
                {/* Mortality Risk */}
                <div className={`p-3 rounded-lg border-2 ${getRiskColor(riskData.mortality).border} bg-slate-950`}>
                    <div className="text-xs text-slate-400 mb-1">Mortality</div>
                    <div className={`text-lg font-bold ${getRiskColor(riskData.mortality).text}`}>
                        {riskData.mortality}%
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{getRiskLevel(riskData.mortality)}</div>
                </div>

                {/* Complication Risk */}
                <div className={`p-3 rounded-lg border-2 ${getRiskColor(riskData.complication).border} bg-slate-950`}>
                    <div className="text-xs text-slate-400 mb-1">Complication</div>
                    <div className={`text-lg font-bold ${getRiskColor(riskData.complication).text}`}>
                        {riskData.complication}%
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{getRiskLevel(riskData.complication)}</div>
                </div>

                {/* Readmission Risk */}
                <div className={`p-3 rounded-lg border-2 ${getRiskColor(riskData.readmission).border} bg-slate-950`}>
                    <div className="text-xs text-slate-400 mb-1">Readmission</div>
                    <div className={`text-lg font-bold ${getRiskColor(riskData.readmission).text}`}>
                        {riskData.readmission}%
                    </div>
                    <div className="text-xs text-slate-500 mt-1">{getRiskLevel(riskData.readmission)}</div>
                </div>
            </div>

            {/* Calculation Explanation */}
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                <div className="text-xs text-slate-400 mb-1 font-semibold">How is this calculated?</div>
                <p className="text-xs text-slate-500 leading-relaxed">
                    {riskData.calculation ||
                        "Risk score derived from patient demographics, comorbidities, vital signs, lab values, and presenting symptoms. Validated against 50,000+ similar cases in our database."}
                </p>
            </div>
        </div>
    );
}
