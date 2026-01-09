import React, { useState, useEffect } from 'react';

export const VoiceInput = ({ onInput, className = "" }) => {
    const [isListening, setIsListening] = useState(false);
    const [isSupported, setIsSupported] = useState(true);

    useEffect(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            setIsSupported(false);
        }
    }, []);

    const startListening = () => {
        if (!isSupported) return;

        try {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => {
                setIsListening(true);
            };

            recognition.onend = () => {
                setIsListening(false);
            };

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                onInput(transcript);
            };

            recognition.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognition.start();
        } catch (error) {
            console.error("Failed to start speech recognition", error);
            setIsListening(false);
        }
    };

    if (!isSupported) return null;

    return (
        <button
            type="button"
            onClick={startListening}
            className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center ${isListening
                    ? 'bg-red-500/20 text-red-400 animate-pulse ring-2 ring-red-500/50'
                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-sky-400'
                } ${className}`}
            title="Dictate with voice"
        >
            {isListening ? (
                <span className="flex gap-1 h-4 items-center">
                    <span className="w-1 h-2 bg-current rounded-full animate-[bounce_1s_infinite_0ms]"></span>
                    <span className="w-1 h-3 bg-current rounded-full animate-[bounce_1s_infinite_200ms]"></span>
                    <span className="w-1 h-2 bg-current rounded-full animate-[bounce_1s_infinite_400ms]"></span>
                </span>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                </svg>
            )}
        </button>
    );
};
