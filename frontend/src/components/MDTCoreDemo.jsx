import React from 'react';
import { RiskStratificationBlock } from './RiskStratificationBlock';
import { RedFlagAlerts } from './RedFlagAlerts';
import { AIRecommendationPanel } from './AIRecommendationPanel';
import { InteractiveCaseTimeline } from './InteractiveCaseTimeline';
import { mockMDTData } from './mockMDTData';

export default function MDTCoreDemo() {
    return (
        <div className="min-h-screen bg-slate-950 py-8 px-4">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-white mb-2">
                        MDT Review - Core Features Demo
                    </h1>
                    <p className="text-slate-400">
                        6 Non-Negotiable Components for Clinical Decision Support
                    </p>
                </div>

                {/* Patient Info Banner */}
                <div className="bg-gradient-to-r from-sky-900 to-indigo-900 p-6 rounded-xl border border-sky-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-2xl font-bold text-white mb-1">
                                Patient: John Smith, 68M
                            </h2>
                            <p className="text-sky-200">
                                MRN: 12345678 | Admitted: Dec 14, 2024 08:30 AM | Location: CCU Bed 3
                            </p>
                        </div>
                        <div className="text-right">
                            <div className="text-sm text-sky-300 mb-1">Primary Diagnosis</div>
                            <div className="text-xl font-bold text-white">
                                Acute Anterior STEMI
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* Left Column */}
                    <div className="space-y-8">

                        {/* 1. Risk Stratification */}
                        <RiskStratificationBlock riskData={mockMDTData.riskData} />

                        {/* 2. Red Flag Alerts */}
                        <RedFlagAlerts flags={mockMDTData.redFlags} />

                    </div>

                    {/* Right Column */}
                    <div className="space-y-8">

                        {/* 3. AI Recommendations */}
                        <AIRecommendationPanel recommendations={mockMDTData.recommendations} />

                    </div>

                </div>

                {/* Full Width Section */}
                <div className="space-y-8">

                    {/* 4. Interactive Timeline */}
                    <InteractiveCaseTimeline events={mockMDTData.timelineEvents} />

                    {/* Placeholder for remaining components */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                        {/* 5. Specialist Consensus (Coming Soon) */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                            <div className="text-4xl mb-3">👥</div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                Specialist Consensus Visualization
                            </h3>
                            <p className="text-sm text-slate-400 mb-4">
                                Visual representation of specialist agreement/disagreement
                            </p>
                            <div className="inline-block px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                                Coming Next
                            </div>
                        </div>

                        {/* 6. Workflow Helpers (Coming Soon) */}
                        <div className="bg-slate-900 border border-slate-800 rounded-xl p-8 text-center">
                            <div className="text-4xl mb-3">📋</div>
                            <h3 className="text-lg font-bold text-white mb-2">
                                Core Workflow Helpers
                            </h3>
                            <p className="text-sm text-slate-400 mb-4">
                                Notes, Export, Follow-up Planner
                            </p>
                            <div className="inline-block px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 text-xs font-bold border border-amber-500/30">
                                Coming Next
                            </div>
                        </div>

                    </div>

                </div>

                {/* Footer */}
                <div className="text-center pt-8 border-t border-slate-800">
                    <p className="text-sm text-slate-500">
                        MDT Review Core Features | MedAura AI Platform
                    </p>
                </div>

            </div>
        </div>
    );
}
