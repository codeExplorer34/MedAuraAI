import React from 'react';
import './EnhancedChatIcon.css';

/**
 * Simple Enhanced Chat Icon with Glow Effect
 */
export default function EnhancedChatIcon({ isOpen }) {
    return (
        <div className="enhanced-chat-icon">
            {/* Glowing background layers */}
            <div className="glow-layer glow-outer"></div>
            <div className="glow-layer glow-middle"></div>
            <div className="glow-layer glow-inner"></div>

            {/* Icon */}
            {isOpen ? (
                <svg
                    className="chat-icon-svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                >
                    <path d="M18 6L6 18M6 6l12 12" />
                </svg>
            ) : (
                <svg
                    className="chat-icon-svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
            )}
        </div>
    );
}
