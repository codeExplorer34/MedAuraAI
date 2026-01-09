import React, { useState, useEffect } from 'react';

/**
 * Animated specialist consultation loader
 * Shows each specialist "thinking" sequentially
 */
export function SpecialistConsultationLoader({ specialists }) {
    const [activeSpecialist, setActiveSpecialist] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveSpecialist((prev) => {
                if (prev < specialists.length - 1) {
                    return prev + 1;
                }
                return prev;
            });
        }, 1500);

        return () => clearInterval(interval);
    }, [specialists.length]);

    const getSpecialistIcon = (name) => {
        const icons = {
            'General Medicine': '🩺',
            'Cardiology': '❤️',
            'Neurology': '🧠',
            'Gastroenterology': '🤢',
            'Psychiatry': '💭',
            'Radiology': '📸'
        };
        return icons[name] || '👨‍⚕️';
    };

    return (
        <div className="space-y-4 py-8">
            <h3 className="text-center text-lg font-semibold text-white mb-6">
                Consulting Specialists...
            </h3>

            {/* Progress timeline */}
            <div className="relative max-w-2xl mx-auto">
                {/* Vertical timeline line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-800">
                    <div
                        className="w-full bg-sky-500 transition-all duration-500"
                        style={{ height: `${((activeSpecialist + 1) / specialists.length) * 100}%` }}
                    />
                </div>

                {/* Specialist nodes */}
                {specialists.map((spec, i) => (
                    <div
                        key={i}
                        className={`relative flex items-center gap-4 mb-6 transition-all ${i === activeSpecialist ? 'scale-105' : ''
                            }`}
                    >
                        {/* Node circle */}
                        <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center text-xl z-10 transition-all ${i < activeSpecialist
                            ? 'bg-green-500 border-green-400'
                            : i === activeSpecialist
                                ? 'bg-sky-500 border-sky-400 animate-pulse'
                                : 'bg-slate-900 border-slate-700'
                            }`}>
                            {i < activeSpecialist ? '✓' : getSpecialistIcon(spec)}
                        </div>

                        {/* Specialist info */}
                        <div className="flex-1 p-4 rounded-xl border transition-all" style={{
                            backgroundColor: i === activeSpecialist ? 'rgba(14, 165, 233, 0.1)' : 'rgba(15, 23, 42, 0.5)',
                            borderColor: i === activeSpecialist ? 'rgba(14, 165, 233, 0.5)' : 'rgba(51, 65, 85, 1)',
                            opacity: i > activeSpecialist ? 0.5 : 1
                        }}>
                            <div className="font-semibold text-white">{spec}</div>
                            {i < activeSpecialist && (
                                <div className="text-xs text-green-400 flex items-center gap-1 mt-1 animate-fade-in">
                                    <span>✓</span> Analysis complete
                                </div>
                            )}
                            {i === activeSpecialist && (
                                <div className="text-xs text-sky-400 flex items-center gap-2 mt-1">
                                    <span className="animate-pulse">Analyzing case...</span>
                                    <div className="flex gap-1">
                                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                        <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Overall progress */}
            <div className="text-center mt-8">
                <div className="inline-flex items-center gap-2 text-sky-400">
                    <div className="w-2 h-2 bg-sky-400 rounded-full animate-ping" />
                    <span className="text-sm">
                        {activeSpecialist === specialists.length - 1
                            ? 'Finalizing recommendations...'
                            : `Consulting ${specialists[activeSpecialist]}...`}
                    </span>
                </div>
            </div>
        </div>
    );
}

/**
 * Specialist consensus meter
 */
export function ConsensusMeter({ consensus = 85 }) {
    const getColor = () => {
        if (consensus > 80) return { bg: 'bg-green-500', text: 'text-green-400', label: 'Strong agreement' };
        if (consensus > 60) return { bg: 'bg-sky-500', text: 'text-sky-400', label: 'Moderate agreement' };
        return { bg: 'bg-amber-500', text: 'text-amber-400', label: 'Divergent opinions' };
    };

    const colors = getColor();

    return (
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400 font-medium">Specialist Consensus</span>
                <span className={`text-sm font-semibold ${colors.text}`}>{consensus}%</span>
            </div>
            <div className="h-2.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colors.bg} transition-all duration-1000 ease-out`}
                    style={{ width: `${consensus}%` }}
                />
            </div>
            <p className="text-xs text-slate-500 mt-2">
                {colors.label}
                {consensus <= 60 && ' - further discussion recommended'}
            </p>
        </div>
    );
}

/**
 * Case complexity indicator
 */
export function CaseComplexityMeter({ complexity = 75 }) {
    const getColor = () => {
        if (complexity > 70) return { bg: 'bg-red-500', text: 'text-red-400', label: 'High Complexity' };
        if (complexity > 40) return { bg: 'bg-amber-500', text: 'text-amber-400', label: 'Moderate Complexity' };
        return { bg: 'bg-green-500', text: 'text-green-400', label: 'Low Complexity' };
    };

    const colors = getColor();

    return (
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 animate-fade-in">
            <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-slate-400 font-medium">Case Complexity</span>
                <span className={`text-sm font-semibold ${colors.text}`}>{colors.label}</span>
            </div>
            <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                <div
                    className={`h-full ${colors.bg} transition-all duration-1000 ease-out`}
                    style={{ width: `${complexity}%` }}
                />
            </div>
            <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
                <span>📊</span>
                <span>Based on: symptoms overlap, specialist divergence, urgency level</span>
            </div>
        </div>
    );
}

/**
 * Expandable specialist card
 */
export function ExpandableSpecialistCard({ specialist, index }) {
    const [expanded, setExpanded] = useState(false);

    const getSpecialistIcon = (name) => {
        const icons = {
            'General Medicine': '🩺',
            'Cardiology': '❤️',
            'Neurology': '🧠',
            'Gastroenterology': '🤢',
            'Psychiatry': '💭',
            'Radiology': '📸'
        };
        return icons[name] || '👨‍⚕️';
    };

    return (
        <div
            className="w-full max-w-sm p-6 rounded-xl bg-slate-900 border border-slate-800 hover:border-sky-500/30 transition-all group shadow-lg animate-fade-in-up"
            style={{ animationDelay: `${index * 100}ms` }}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky-500 to-indigo-500 flex items-center justify-center text-2xl border-2 border-sky-400/20 group-hover:border-sky-400/50 transition-colors flex-shrink-0">
                        {getSpecialistIcon(specialist.name)}
                    </div>
                    <div>
                        <h4 className="font-semibold text-white group-hover:text-sky-400 transition-colors text-base">
                            {specialist.name}
                        </h4>
                        {specialist.specialty && (
                            <span className="text-xs text-slate-500">{specialist.specialty}</span>
                        )}
                    </div>
                </div>
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="text-sky-400 hover:text-sky-300 transition-transform"
                    style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)' }}
                >
                    ▶
                </button>
            </div>

            {/* Summary (always visible) */}
            <p className="text-slate-400 text-sm leading-relaxed mb-4">
                {specialist.content}
            </p>

            {/* Detailed analysis (expandable) */}
            {expanded && specialist.details && (
                <div className="space-y-4 animate-fade-in-up">
                    {specialist.details.findings && (
                        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                            <h5 className="text-xs font-bold text-sky-400 uppercase mb-2 flex items-center gap-2">
                                <span>🔍</span> Key Findings
                            </h5>
                            <ul className="space-y-1.5 text-sm text-slate-300">
                                {specialist.details.findings.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-sky-500 mt-0.5">•</span>
                                        <span>{f}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {specialist.details.recommendations && (
                        <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
                            <h5 className="text-xs font-bold text-amber-400 uppercase mb-2 flex items-center gap-2">
                                <span>→</span> Recommendations
                            </h5>
                            <ul className="space-y-1.5 text-sm text-slate-300">
                                {specialist.details.recommendations.map((r, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-amber-500 mt-0.5">→</span>
                                        <span>{r}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

/**
 * Treatment comparison table
 */
export function TreatmentComparisonTable({ treatments }) {
    return (
        <div className="overflow-x-auto rounded-xl border border-slate-800">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-slate-800 bg-slate-900/50">
                        <th className="text-left p-4 text-slate-400 text-xs uppercase font-bold">Treatment</th>
                        <th className="text-center p-4 text-slate-400 text-xs uppercase font-bold">Match</th>
                        <th className="text-center p-4 text-slate-400 text-xs uppercase font-bold">Success Rate</th>
                        <th className="text-center p-4 text-slate-400 text-xs uppercase font-bold">Duration</th>
                        <th className="text-center p-4 text-slate-400 text-xs uppercase font-bold">Cost</th>
                    </tr>
                </thead>
                <tbody>
                    {treatments.map((t, i) => (
                        <tr
                            key={i}
                            className="border-b border-slate-800 hover:bg-slate-900/50 transition-colors animate-fade-in-up"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <td className="p-4">
                                <div className="font-semibold text-white text-sm">{t.primary_name}</div>
                                <div className="text-xs text-slate-500 mt-1">{t.modality}</div>
                            </td>
                            <td className="p-4 text-center">
                                <span className="inline-block px-3 py-1 rounded-full bg-emerald-900/20 text-emerald-400 text-sm font-bold border border-emerald-900/30">
                                    {t.match_percentage}%
                                </span>
                            </td>
                            <td className="p-4">
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-1000"
                                            style={{ width: `${t.success_rate}%` }}
                                        />
                                    </div>
                                    <span className="text-sm text-slate-300 font-medium">{t.success_rate}%</span>
                                </div>
                            </td>
                            <td className="p-4 text-center text-sm text-slate-300">{t.duration}</td>
                            <td className="p-4 text-center">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${t.cost_estimate.includes('Low') ? 'bg-green-900/20 text-green-400 border border-green-900/30' :
                                    t.cost_estimate.includes('Moderate') ? 'bg-amber-900/20 text-amber-400 border border-amber-900/30' :
                                        'bg-red-900/20 text-red-400 border border-red-900/30'
                                    }`}>
                                    {t.cost_estimate.split(' ')[0]}
                                </span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

/**
 * MDT Discussion Notes
 */
export function MDTNotes() {
    // Sample doctors/clinicians for demo
    const sampleAuthors = [
        { name: 'Dr. Sarah Chen', specialty: 'Cardiology', avatar: '👩‍⚕️', color: 'text-red-400' },
        { name: 'Dr. Michael Okonkwo', specialty: 'Internal Medicine', avatar: '👨‍⚕️', color: 'text-sky-400' },
        { name: 'Dr. Emily Rodriguez', specialty: 'Neurology', avatar: '👩‍⚕️', color: 'text-purple-400' },
        { name: 'Dr. James Wilson', specialty: 'Gastroenterology', avatar: '👨‍⚕️', color: 'text-amber-400' },
        { name: 'Nurse Practitioner Kim', specialty: 'Care Coordinator', avatar: '👩‍⚕️', color: 'text-emerald-400' },
    ];

    // Current user (for demo - would come from auth in production)
    const currentUser = { name: 'Dr. Ahmed Hassan', specialty: 'Emergency Medicine', avatar: '👨‍⚕️', color: 'text-sky-400' };

    // Pre-seeded sample notes
    const [notes, setNotes] = useState([
        {
            id: 1,
            author: sampleAuthors[0],
            timestamp: new Date(Date.now() - 3600000).toLocaleString(),
            content: 'Reviewed ECG findings - ST elevation in V2-V4 suggests anterior STEMI. Recommend urgent cath lab activation.'
        },
        {
            id: 2,
            author: sampleAuthors[1],
            timestamp: new Date(Date.now() - 1800000).toLocaleString(),
            content: 'Patient has history of CKD stage 3. Please use low osmolar contrast if proceeding with catheterization.'
        },
        {
            id: 3,
            author: sampleAuthors[4],
            timestamp: new Date(Date.now() - 900000).toLocaleString(),
            content: 'Family has been notified and is en route. They prefer treatment at Main Campus if transfer is needed.'
        }
    ]);
    const [newNote, setNewNote] = useState('');

    const addNote = () => {
        if (newNote.trim()) {
            setNotes([...notes, {
                id: Date.now(),
                author: currentUser,
                timestamp: new Date().toLocaleString(),
                content: newNote
            }]);
            setNewNote('');
        }
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const formatTimeAgo = (timestamp) => {
        const now = new Date();
        const noteTime = new Date(timestamp);
        const diffMs = now - noteTime;
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins} min ago`;
        if (diffMins < 1440) return `${Math.floor(diffMins / 60)} hr ago`;
        return timestamp;
    };

    return (
        <div className="p-6 bg-slate-900 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                    <span>📋</span> MDT Discussion Notes
                </h3>
                <span className="text-xs text-slate-500 bg-slate-800 px-2 py-1 rounded">
                    {notes.length} note{notes.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Current user indicator */}
            <div className="mb-4 p-2 bg-slate-950 rounded-lg border border-slate-800 flex items-center gap-2">
                <span className="text-lg">{currentUser.avatar}</span>
                <div>
                    <div className="text-sm font-medium text-white">{currentUser.name}</div>
                    <div className="text-xs text-slate-500">{currentUser.specialty}</div>
                </div>
                <span className="ml-auto text-xs text-emerald-400 bg-emerald-900/20 px-2 py-0.5 rounded border border-emerald-900/30">
                    ● Online
                </span>
            </div>

            {/* Existing notes */}
            {notes.length > 0 && (
                <div className="space-y-3 mb-4 max-h-80 overflow-y-auto pr-2">
                    {notes.map((note) => (
                        <div key={note.id} className="p-3 bg-slate-950 rounded-lg border border-slate-800 animate-fade-in group">
                            <div className="flex items-start justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{note.author.avatar}</span>
                                    <div>
                                        <span className={`text-sm font-semibold ${note.author.color}`}>
                                            {note.author.name}
                                        </span>
                                        <span className="text-xs text-slate-500 ml-2">
                                            {note.author.specialty}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-slate-500">
                                        {formatTimeAgo(note.timestamp)}
                                    </span>
                                    {note.author.name === currentUser.name && (
                                        <button
                                            onClick={() => deleteNote(note.id)}
                                            className="text-slate-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs"
                                            title="Delete note"
                                        >
                                            🗑️
                                        </button>
                                    )}
                                </div>
                            </div>
                            <p className="text-sm text-slate-300 pl-8">{note.content}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Add new note */}
            <div className="flex gap-2">
                <input
                    type="text"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addNote()}
                    placeholder="Add a discussion note..."
                    className="flex-1 px-4 py-2 rounded-lg bg-slate-950 border border-slate-700 text-white text-sm focus:border-sky-500 focus:ring-1 focus:ring-sky-500 outline-none transition-all"
                />
                <button
                    onClick={addNote}
                    disabled={!newNote.trim()}
                    className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${newNote.trim()
                            ? 'bg-sky-600 hover:bg-sky-500 text-white'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                >
                    Add Note
                </button>
            </div>

            <p className="text-xs text-slate-600 mt-2">
                💡 Notes are visible to all team members reviewing this case
            </p>
        </div>
    );
}

/**
 * Character counter for form fields
 */
export function CharacterCounter({ value, maxLength = 500, minRecommended = 100 }) {
    const length = value?.length || 0;
    const percentage = (length / maxLength) * 100;

    return (
        <div className="flex items-center justify-between text-xs mt-1">
            <div>
                {length < minRecommended && length > 0 && (
                    <span className="text-amber-400 flex items-center gap-1">
                        <span>⚠️</span>
                        Add more detail for better analysis
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <span className={`font-medium ${percentage > 90 ? 'text-red-400' :
                    percentage > 70 ? 'text-amber-400' :
                        'text-slate-500'
                    }`}>
                    {length} / {maxLength}
                </span>
            </div>
        </div>
    );
}
