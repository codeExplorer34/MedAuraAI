import React, { useState, useEffect } from 'react';

/**
 * Real-time vital sign input with visual feedback
 */
export function VitalSignInput({
    label,
    name,
    value,
    onChange,
    placeholder,
    unit,
    normalRange,
    checkAbnormal
}) {
    const isAbnormal = checkAbnormal ? checkAbnormal(value) : false;
    const hasValue = value && value.length > 0;

    return (
        <div className="space-y-1">
            <label className={`text-sm font-medium transition-colors ${isAbnormal ? 'text-amber-400' : 'text-slate-300'
                }`}>
                {label}
                {isAbnormal && <span className="ml-2 animate-pulse">⚠️</span>}
            </label>

            <div className="relative">
                <input
                    type="number"
                    name={name}
                    className={`block w-full px-3 py-2 rounded-lg border text-white focus:ring-1 outline-none transition-all ${isAbnormal
                            ? 'bg-amber-900/20 border-amber-600/50 focus:border-amber-500 focus:ring-amber-500'
                            : 'bg-slate-950 border-slate-700 focus:border-sky-500 focus:ring-sky-500'
                        }`}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                />

                {/* Real-time feedback indicator */}
                {hasValue && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2 animate-fade-in">
                        {isAbnormal ? (
                            <span className="flex items-center gap-1 text-amber-400 text-xs font-medium">
                                <span className="animate-pulse">⚠️</span>
                                Abnormal
                            </span>
                        ) : (
                            <span className="flex items-center gap-1 text-green-400 text-xs font-medium animate-scale-in">
                                <span>✓</span>
                                Normal
                            </span>
                        )}
                    </div>
                )}
            </div>

            {normalRange && (
                <div className="text-xs text-slate-500">
                    Normal: {normalRange}
                </div>
            )}
        </div>
    );
}

/**
 * Form completion progress bar
 */
export function FormProgress({ formData, requiredFields }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const filledFields = requiredFields.filter(field =>
            formData[field] && formData[field].toString().length > 0
        ).length;
        const percentage = Math.round((filledFields / requiredFields.length) * 100);
        setProgress(percentage);
    }, [formData, requiredFields]);

    return (
        <div className="mb-6 animate-fade-in">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="font-medium">Form Completion</span>
                <span className="font-semibold text-sky-400">{progress}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-sky-500 to-cyan-500 transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
}

/**
 * Animated loading state with steps
 */
export function AnalysisLoader() {
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { icon: '🔍', text: 'Analyzing vital signs...', duration: 500 },
        { icon: '⚠️', text: 'Detecting red flags...', duration: 400 },
        { icon: '🧠', text: 'Generating risk assessment...', duration: 600 }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentStep(prev => (prev + 1) % steps.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="space-y-6 py-8">
            {/* Skeleton cards */}
            <div className="space-y-4">
                {[1, 2].map((i) => (
                    <div key={i} className="bg-slate-900 rounded-xl p-6 border border-slate-800 animate-pulse">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-8 h-8 bg-slate-800 rounded-full" />
                            <div className="h-4 w-32 bg-slate-800 rounded" />
                        </div>
                        <div className="space-y-2">
                            <div className="h-3 bg-slate-800 rounded" />
                            <div className="h-3 bg-slate-800 rounded w-3/4" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Analysis steps */}
            <div className="space-y-3">
                {steps.map((step, i) => (
                    <div
                        key={i}
                        className={`flex items-center gap-3 transition-all ${i === currentStep ? 'opacity-100' : 'opacity-40'
                            }`}
                    >
                        <span className="text-2xl">{step.icon}</span>
                        <span className="text-sm text-slate-300 flex-1">{step.text}</span>
                        <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden">
                            <div
                                className={`h-full bg-sky-500 transition-all ${i === currentStep ? 'w-full' : 'w-0'
                                    }`}
                                style={{ transitionDuration: `${step.duration}ms` }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Pulsing indicator */}
            <div className="text-center">
                <div className="inline-flex items-center gap-2 text-sky-400">
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping" />
                    <span className="text-sm animate-pulse">Processing clinical data...</span>
                </div>
            </div>
        </div>
    );
}

/**
 * Copy button with animated feedback
 */
export function CopyButton({ text, label = 'Copy', className = '' }) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className={`relative px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-medium transition-all ${className}`}
        >
            {copied ? (
                <span className="flex items-center gap-1.5 text-green-400 animate-scale-in">
                    <span>✓</span>
                    Copied!
                </span>
            ) : (
                <span className="flex items-center gap-1.5 text-slate-300">
                    <span>📋</span>
                    {label}
                </span>
            )}
        </button>
    );
}

/**
 * Chief complaint autocomplete
 */
export function ChiefComplaintInput({ value, onChange, name }) {
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);

    const commonComplaints = [
        'Chest pain',
        'Shortness of breath',
        'Abdominal pain',
        'Headache',
        'Fever',
        'Dizziness',
        'Nausea and vomiting',
        'Back pain',
        'Cough',
        'Weakness',
        'Altered mental status',
        'Syncope'
    ];

    useEffect(() => {
        if (value && value.length > 0) {
            const filtered = commonComplaints.filter(complaint =>
                complaint.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            setShowSuggestions(filtered.length > 0 && value !== filtered[0]);
        } else {
            setShowSuggestions(false);
        }
    }, [value]);

    const selectSuggestion = (suggestion) => {
        onChange({ target: { name, value: suggestion } });
        setShowSuggestions(false);
    };

    return (
        <div className="relative">
            <input
                type="text"
                name={name}
                className="block w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                value={value}
                onChange={onChange}
                onFocus={() => value && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                required
                placeholder="e.g. Acute chest pain radiating to left arm"
            />

            {showSuggestions && filteredSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-10 max-h-48 overflow-auto animate-fade-in">
                    {filteredSuggestions.map((complaint, i) => (
                        <button
                            key={i}
                            type="button"
                            className="w-full text-left px-4 py-2 hover:bg-slate-800 transition-colors text-sm text-slate-300 border-b border-slate-800 last:border-b-0"
                            onClick={() => selectSuggestion(complaint)}
                        >
                            {complaint}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

/**
 * Quick fill templates
 */
export function QuickTemplates({ onSelectTemplate }) {
    const templates = [
        {
            name: 'Chest Pain',
            icon: '❤️',
            data: {
                age: '52',
                sex: 'male',
                complaint: 'Chest pain radiating to left arm',
                duration: '2 hours',
                hr: '115',
                rr: '24',
                spo2: '92',
                bpSys: '145',
                bpDia: '95',
                temp: '37.2'
            }
        },
        {
            name: 'Respiratory',
            icon: '🫁',
            data: {
                age: '67',
                sex: 'male',
                complaint: 'Shortness of breath',
                duration: '1 hour',
                hr: '122',
                rr: '28',
                spo2: '88',
                bpSys: '168',
                bpDia: '102',
                temp: '38.1'
            }
        },
        {
            name: 'Trauma',
            icon: '🚑',
            data: {
                age: '34',
                sex: 'female',
                complaint: 'Motor vehicle accident - chest trauma',
                duration: '30 minutes',
                hr: '128',
                rr: '26',
                spo2: '90',
                bpSys: '95',
                bpDia: '60',
                temp: '36.8'
            }
        }
    ];

    return (
        <div className="mb-4 animate-fade-in">
            <label className="text-xs text-slate-400 mb-2 block font-medium">Quick Templates</label>
            <div className="flex gap-2 flex-wrap">
                {templates.map((template, i) => (
                    <button
                        key={i}
                        type="button"
                        onClick={() => onSelectTemplate(template.data)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs text-slate-300 transition-all hover:scale-105 hover:border-sky-500/50"
                    >
                        <span className="mr-1.5">{template.icon}</span>
                        {template.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

/**
 * Confidence indicator
 */
export function ConfidenceIndicator({ confidence = 85 }) {
    const getColor = () => {
        if (confidence > 80) return 'bg-green-500';
        if (confidence > 60) return 'bg-sky-500';
        return 'bg-amber-500';
    };

    const getTextColor = () => {
        if (confidence > 80) return 'text-green-400';
        if (confidence > 60) return 'text-sky-400';
        return 'text-amber-400';
    };

    return (
        <div className="mb-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-slate-400 font-medium">AI Confidence</span>
                <span className={`font-semibold ${getTextColor()}`}>{confidence}%</span>
            </div>
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-1000 ease-out ${getColor()}`}
                    style={{ width: `${confidence}%` }}
                />
            </div>
        </div>
    );
}

/**
 * Formatted clinical note with syntax highlighting
 */
export function FormattedClinicalNote({ note }) {
    const sections = note.split('\n\n');

    return (
        <div className="space-y-4">
            {sections.map((section, i) => {
                const lines = section.split('\n');
                const title = lines[0];
                const content = lines.slice(1);

                return (
                    <div
                        key={i}
                        className="animate-fade-in-up"
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <h4 className="text-sky-400 font-semibold text-sm mb-2 flex items-center gap-2">
                            <span className="w-1 h-4 bg-sky-500 rounded-full"></span>
                            {title}
                        </h4>
                        <div className="text-slate-400 text-xs space-y-1 pl-4 leading-relaxed">
                            {content.map((line, j) => (
                                <p key={j}>{line}</p>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

/**
 * Vital signs summary card
 */
export function VitalsSummaryCard({ vitals }) {
    const vitalsList = [
        { label: 'HR', value: vitals.hr, unit: 'bpm', isAbnormal: vitals.hr && parseInt(vitals.hr) > 100 },
        { label: 'SpO₂', value: vitals.spo2, unit: '%', isAbnormal: vitals.spo2 && parseInt(vitals.spo2) < 95 },
        { label: 'RR', value: vitals.rr, unit: '/min', isAbnormal: vitals.rr && parseInt(vitals.rr) > 20 },
        { label: 'BP', value: vitals.bpSys && vitals.bpDia ? `${vitals.bpSys}/${vitals.bpDia}` : '', unit: 'mmHg', isAbnormal: false },
        { label: 'Temp', value: vitals.temp, unit: '°C', isAbnormal: vitals.temp && (parseFloat(vitals.temp) < 36.0 || parseFloat(vitals.temp) > 38.0) }
    ];

    const hasAnyVitals = vitalsList.some(v => v.value);

    if (!hasAnyVitals) return null;

    return (
        <div className="grid grid-cols-3 md:grid-cols-5 gap-3 p-4 bg-slate-900/50 rounded-xl border border-slate-800 mb-4 animate-fade-in">
            {vitalsList.map((vital, i) => (
                <div key={i} className="text-center">
                    <div className="text-xs text-slate-500 mb-1">{vital.label}</div>
                    <div className={`text-lg font-bold transition-all ${vital.isAbnormal
                            ? 'text-amber-400 animate-pulse'
                            : 'text-slate-300'
                        }`}>
                        {vital.value || '--'}
                    </div>
                    <div className="text-xs text-slate-600">{vital.unit}</div>
                </div>
            ))}
        </div>
    );
}
