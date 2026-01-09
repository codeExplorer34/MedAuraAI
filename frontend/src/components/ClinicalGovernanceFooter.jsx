import React from 'react';

export function ClinicalGovernanceFooter() {
    return (
        <div className="mt-12 pt-8 border-t border-slate-800">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6 text-center">
                Clinical Governance & Compliance
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">👨‍⚕️</span>
                        <h4 className="font-bold text-white">Clinical Oversight</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                        AI models reviewed by board-certified physicians in Emergency Medicine, Internal Medicine, and Cardiology.
                    </p>
                    <div className="mt-2 text-xs text-slate-500">
                        Last clinical review: <span className="text-sky-400">December 2025</span>
                    </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">🔒</span>
                        <h4 className="font-bold text-white">Data Privacy</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                        HIPAA-compliant. All data encrypted at rest (AES-256) and in transit (TLS 1.3). No patient data used for model training.
                    </p>
                    <div className="mt-2 text-xs text-slate-500">
                        SOC 2 Type II certified
                    </div>
                </div>

                <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">⚖️</span>
                        <h4 className="font-bold text-white">Regulatory Status</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                        Clinical decision support tool. Not FDA-cleared for diagnosis. Subject to institutional protocols and clinician oversight.
                    </p>
                    <div className="mt-2 text-xs text-slate-500">
                        Version: <span className="text-sky-400">1.0.0</span>
                    </div>
                </div>
            </div>

            <div className="mt-6 text-center">
                <p className="text-xs text-slate-500">
                    For questions about clinical governance, contact:
                    <a href="mailto:clinical@medaura.ai" className="text-sky-400 hover:underline ml-1">clinical@medaura.ai</a>
                </p>
            </div>
        </div>
    );
}
