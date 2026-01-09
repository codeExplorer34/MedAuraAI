import React, { useState } from 'react';

export default function PhysicianAcknowledgment({ onAcknowledge, required = true }) {
    const [hasAcknowledged, setHasAcknowledged] = useState(false);

    const handleChange = (e) => {
        const checked = e.target.checked;
        setHasAcknowledged(checked);
        if (onAcknowledge) {
            onAcknowledge(checked);
        }
    };

    return (
        <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-6 mb-6">
            <div className="flex items-start gap-4">
                <input
                    type="checkbox"
                    id="physician-acknowledgment"
                    checked={hasAcknowledged}
                    onChange={handleChange}
                    required={required}
                    className="mt-1 w-5 h-5 rounded border-slate-600 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900"
                />

                <label htmlFor="physician-acknowledgment" className="flex-1 cursor-pointer">
                    <div className="text-white font-semibold mb-2 flex items-center gap-2">
                        <span>Physician Acknowledgment</span>
                        {required && <span className="text-red-400 text-sm">(Required)</span>}
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">
                        I am a licensed healthcare professional. I understand that MedAuraAI is a <strong className="text-amber-400">decision support tool only</strong> and does not replace clinical judgment. I will independently verify all AI recommendations before taking any clinical action. <strong className="text-amber-400">The final medical decision is my sole responsibility.</strong>
                    </p>

                    <p className="text-xs text-slate-500 mt-2 italic">
                        This acknowledgment is logged for audit purposes.
                    </p>
                </label>
            </div>

            {required && !hasAcknowledged && (
                <div className="mt-3 text-xs text-amber-400 flex items-center gap-2">
                    <span>⚠️</span>
                    <span>You must acknowledge these terms before proceeding</span>
                </div>
            )}
        </div>
    );
}
