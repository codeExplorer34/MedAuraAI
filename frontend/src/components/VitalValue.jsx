import React from "react";

/**
 * Vital sign input with automatic highlighting for abnormal values
 * @param {object} props
 * @param {string} props.label - Label for the vital sign
 * @param {string} props.name - Input name attribute
 * @param {string|number} props.value - Current value
 * @param {function} props.onChange - Change handler
 * @param {string} [props.placeholder] - Placeholder text
 * @param {function} [props.isAbnormal] - Function to determine if value is abnormal
 */
export default function VitalValue({ label, name, value, onChange, placeholder, isAbnormal }) {
    const abnormal = isAbnormal && isAbnormal(value);

    return (
        <div className="space-y-1">
            <label className={`text-sm font-medium ${abnormal ? 'text-amber-400' : 'text-slate-300'}`}>
                {label}
                {abnormal && <span className="ml-1 text-xs">⚠️</span>}
            </label>
            <input
                type="number"
                name={name}
                className={`block w-full px-3 py-2 rounded-lg border text-white focus:border-sky-500 outline-none transition-all ${abnormal
                        ? 'bg-amber-900/20 border-amber-600/50 focus:ring-1 focus:ring-amber-500'
                        : 'bg-slate-950 border-slate-700'
                    }`}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}
