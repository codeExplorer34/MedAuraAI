import React from 'react';

export function EnhancedSafetyBanner() {
    return (
        <div className="mb-6 animate-fade-in">
            <div className="bg-amber-900/20 border-2 border-amber-500/50 rounded-xl p-4 flex items-start gap-4 shadow-lg">
                <div className="text-3xl flex-shrink-0">⚠️</div>
                <div className="flex-1">
                    <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wide mb-1">
                        Clinical Safety Notice - Clinician Use Only
                    </h3>
                    <p className="text-sm text-amber-200 leading-relaxed mb-2">
                        This AI analysis is a <strong>decision support tool</strong>, not a diagnostic device.
                        All recommendations must be verified against your clinical judgment, local protocols,
                        and current evidence-based guidelines. This system does not replace specialist consultation
                        or clinical examination.
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-amber-300">
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Not FDA-cleared for diagnosis
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Requires clinician oversight
                        </span>
                        <span className="flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                            Subject to institutional protocols
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
