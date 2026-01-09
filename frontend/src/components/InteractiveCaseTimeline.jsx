import React, { useState } from 'react';

export function InteractiveCaseTimeline({ events }) {
    const [selectedEvent, setSelectedEvent] = useState(null);

    const getEventIcon = (type) => {
        const icons = {
            admission: '🏥',
            labs: '🧪',
            imaging: '📷',
            ecg: '📈',
            treatment: '💊',
            consultation: '👨‍⚕️',
            decision: '✓',
            current: '📍'
        };
        return icons[type] || '•';
    };

    const getEventColor = (type) => {
        const colors = {
            admission: 'sky',
            labs: 'purple',
            imaging: 'cyan',
            ecg: 'green',
            treatment: 'amber',
            consultation: 'indigo',
            decision: 'emerald',
            current: 'red'
        };
        return colors[type] || 'slate';
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span>📅</span> Case Timeline
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Timeline - Left/Top */}
                <div className="lg:col-span-2">
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-700" />

                        {/* Events */}
                        <div className="space-y-4">
                            {events.map((event, index) => {
                                const color = getEventColor(event.type);
                                const isSelected = selectedEvent?.id === event.id;
                                const isCurrent = event.type === 'current';

                                return (
                                    <div
                                        key={event.id}
                                        className={`relative pl-14 cursor-pointer transition-all ${isSelected ? 'scale-105' : 'hover:scale-102'
                                            }`}
                                        onClick={() => setSelectedEvent(event)}
                                    >
                                        {/* Icon */}
                                        <div className={`absolute left-0 w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all ${isSelected
                                                ? `bg-${color}-500/30 border-2 border-${color}-500 shadow-lg shadow-${color}-500/50`
                                                : `bg-slate-800 border-2 border-slate-700`
                                            } ${isCurrent ? 'animate-pulse' : ''}`}>
                                            {getEventIcon(event.type)}
                                        </div>

                                        {/* Content */}
                                        <div className={`p-4 rounded-lg border-2 transition-all ${isSelected
                                                ? `bg-${color}-950/30 border-${color}-500/50`
                                                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                                            }`}>
                                            <div className="flex items-start justify-between mb-1">
                                                <h4 className={`font-bold ${isSelected ? `text-${color}-300` : 'text-white'}`}>
                                                    {event.title}
                                                </h4>
                                                <span className="text-xs text-slate-500">{event.time}</span>
                                            </div>
                                            <p className="text-sm text-slate-400">{event.summary}</p>
                                            {event.badge && (
                                                <span className={`inline-block mt-2 px-2 py-0.5 rounded-full bg-${color}-500/20 text-${color}-400 text-xs font-bold`}>
                                                    {event.badge}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Details Panel - Right/Bottom */}
                <div className="lg:col-span-1">
                    <div className="sticky top-4">
                        {selectedEvent ? (
                            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className={`text-3xl w-12 h-12 rounded-full bg-${getEventColor(selectedEvent.type)}-500/20 flex items-center justify-center`}>
                                        {getEventIcon(selectedEvent.type)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white">{selectedEvent.title}</h4>
                                        <p className="text-xs text-slate-400">{selectedEvent.time}</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {/* Description */}
                                    <div>
                                        <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Details</div>
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            {selectedEvent.details || selectedEvent.summary}
                                        </p>
                                    </div>

                                    {/* Data */}
                                    {selectedEvent.data && (
                                        <div>
                                            <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Key Data</div>
                                            <div className="space-y-2">
                                                {Object.entries(selectedEvent.data).map(([key, value]) => (
                                                    <div key={key} className="flex justify-between p-2 bg-slate-900 rounded border border-slate-800">
                                                        <span className="text-xs text-slate-400">{key}</span>
                                                        <span className="text-xs text-white font-semibold">{value}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    {selectedEvent.actions && (
                                        <div>
                                            <div className="text-xs font-semibold text-slate-400 uppercase mb-2">Actions Taken</div>
                                            <ul className="space-y-1">
                                                {selectedEvent.actions.map((action, i) => (
                                                    <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                                        <span className="text-sky-400 mt-0.5">•</span>
                                                        {action}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {/* Responsible */}
                                    {selectedEvent.responsible && (
                                        <div className="pt-3 border-t border-slate-800">
                                            <div className="text-xs text-slate-500">
                                                Responsible: <span className="text-sky-400 font-semibold">{selectedEvent.responsible}</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="bg-slate-950 border border-slate-800 rounded-xl p-8 text-center">
                                <div className="text-4xl mb-3">👈</div>
                                <p className="text-sm text-slate-400">
                                    Click on any event in the timeline to see detailed information
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
