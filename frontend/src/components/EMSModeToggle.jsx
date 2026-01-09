import React from 'react';
import '../ems-mode-toggle.css';

export function EMSModeToggle({ isEMSMode, setIsEMSMode }) {
    return (
        <div className="ems-toggle-container">
            <input
                type="checkbox"
                id="ems-mode-checkbox"
                checked={isEMSMode}
                onChange={(e) => setIsEMSMode(e.target.checked)}
            />
            <label htmlFor="ems-mode-checkbox" className="ems-switch">
                <span className="ems-slider"></span>
            </label>
            <span className={`ems-label ${isEMSMode ? 'active' : ''}`}>
                {isEMSMode ? (
                    <>
                        <span className="ems-icon">☀️</span>
                        <span className="ems-text">EMS</span>
                    </>
                ) : (
                    <>
                        <span className="ems-icon">🌙</span>
                        <span className="ems-text">Standard</span>
                    </>
                )}
            </span>
        </div>
    );
}
