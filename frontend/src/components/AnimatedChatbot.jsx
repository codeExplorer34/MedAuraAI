import React, { useState, useEffect } from 'react';
import './AnimatedChatbot.css';

const AnimatedChatbot = () => {
    const [showWelcome, setShowWelcome] = useState(false);
    const [showOptions, setShowOptions] = useState([false, false, false, false, false]);

    useEffect(() => {
        // Show welcome message after 500ms
        const welcomeTimer = setTimeout(() => {
            setShowWelcome(true);
        }, 500);

        // Show options one by one after welcome message
        const optionTimers = [1200, 1500, 1800, 2100, 2400].map((delay, index) =>
            setTimeout(() => {
                setShowOptions(prev => {
                    const newState = [...prev];
                    newState[index] = true;
                    return newState;
                });
            }, delay)
        );

        return () => {
            clearTimeout(welcomeTimer);
            optionTimers.forEach(timer => clearTimeout(timer));
        };
    }, []);

    const quickResponses = [
        "What is ER Co-Pilot?",
        "How does MDT Review work?",
        "See pricing & implementation",
        "Request a demo",
        "Talk to our team"
    ];

    return (
        <div className="animated-chatbot-container">
            {/* Welcome Message */}
            <div className={`chatbot-welcome ${showWelcome ? 'show' : ''}`}>
                <div className="chatbot-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                </div>
                <div className="chatbot-message">
                    <p className="chatbot-text">
                        Welcome! 👋 Thanks for stopping by. How can we help your practice?
                    </p>
                    <p className="chatbot-meta">MedAura Support Chatbot • Just now</p>
                </div>
            </div>

            {/* Quick Response Options */}
            <div className="chatbot-options">
                {quickResponses.map((option, index) => (
                    <button
                        key={index}
                        className={`chatbot-option ${showOptions[index] ? 'show' : ''}`}
                        onClick={() => {
                            // Handle option click - you can customize this
                            console.log('Selected:', option);
                        }}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AnimatedChatbot;
