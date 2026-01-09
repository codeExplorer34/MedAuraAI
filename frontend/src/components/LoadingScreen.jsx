import React, { useState, useEffect } from 'react';
import './LoadingScreen.css';

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [fadeOut, setFadeOut] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Ease out - slower as it approaches 100
                const increment = Math.max(1, (100 - prev) / 10);
                return Math.min(100, prev + increment);
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (progress >= 100) {
            // Start fade out
            setTimeout(() => setFadeOut(true), 300);
            // Complete after fade animation
            setTimeout(() => onComplete?.(), 800);
        }
    }, [progress, onComplete]);

    return (
        <div className={`loading-screen ${fadeOut ? 'fade-out' : ''}`}>
            {/* Animated background gradient */}
            <div className="loading-bg" />

            {/* Center content */}
            <div className="loading-content">
                {/* Logo with pulse animation */}
                <div className="loading-logo">
                    <img
                        src="/MedAuraAI Logo.png"
                        alt="MedAura AI"
                        className="loading-logo-img"
                    />
                </div>

                {/* Brand name with gradient */}
                <h1 className="loading-title">
                    MedAura <span className="loading-title-ai">AI</span>
                </h1>

                {/* Tagline */}
                <p className="loading-tagline">AI-Powered Clinical Decision Support</p>

                {/* Progress bar */}
                <div className="loading-progress-container">
                    <div
                        className="loading-progress-bar"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Percentage */}
                <div className="loading-percentage">{Math.round(progress)}%</div>

                {/* Animated dots */}
                <div className="loading-dots">
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                    <span className="loading-dot" />
                </div>
            </div>

            {/* Medical cross animation */}
            <div className="loading-cross" />
        </div>
    );
}
