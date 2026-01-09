import React from 'react';

export default function CriticalSafetyBanner() {
    return (
        <div className="bg-gradient-to-r from-amber-900/20 via-red-900/20 to-amber-900/20 border border-amber-500/40 p-4 rounded-lg mb-6">
            <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                        <span className="text-xl">⚠️</span>
                    </div>
                </div>

                <div className="flex-1">
                    <h3 className="text-amber-400 font-bold text-sm mb-2 flex items-center gap-2">
                        CLINICAL DECISION SUPPORT TOOL - NOT A MEDICAL DEVICE
                    </h3>

                    <div className="space-y-1.5 text-slate-300 text-xs leading-relaxed">
                        <p className="font-semibold text-white text-xs">
                            ⚡ This tool provides decision support ONLY. It does not diagnose, treat, prevent, or cure any disease.
                        </p>

                        <p>
                            <strong className="text-amber-400">Physician Responsibility:</strong> All recommendations must be independently verified by a qualified clinician before any clinical action is taken. The final medical decision rests solely with the treating physician.
                        </p>

                        <p>
                            <strong className="text-amber-400">No Liability:</strong> MedAuraAI is not responsible for clinical decisions, patient outcomes, or any actions taken based on AI recommendations.
                        </p>
                    </div>

                    <div className="mt-3 pt-3 border-t border-amber-500/20">
                        <p className="text-xs text-slate-500 italic">
                            By using this tool, you acknowledge that you are a licensed healthcare professional.
                            <a href="/terms" className="text-amber-400 hover:underline ml-1">Terms of Service</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
