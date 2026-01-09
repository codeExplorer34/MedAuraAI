import React, { useState } from 'react';

export function ExplainerTooltip({ title, content }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block">
            <button
                onMouseEnter={() => setIsOpen(true)}
                onMouseLeave={() => setIsOpen(false)}
                onClick={() => setIsOpen(!isOpen)}
                className="text-sky-400 hover:text-sky-300 transition-all ml-1"
                type="button"
            >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            </button>

            {isOpen && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-72 p-4 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl z-50 animate-fade-in">
                    <h4 className="font-bold text-white text-sm mb-2">{title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{content}</p>
                    <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="w-2 h-2 bg-slate-800 border-r border-b border-slate-700 transform rotate-45" />
                    </div>
                </div>
            )}
        </div>
    );
}
