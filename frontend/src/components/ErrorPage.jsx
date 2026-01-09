import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Error configurations for different error types
const errorConfigs = {
    404: {
        icon: '🔍',
        title: 'Page Not Found',
        message: "The page you're looking for doesn't exist or has been moved."
    },
    403: {
        icon: '🔒',
        title: 'Access Denied',
        message: "You don't have permission to access this page."
    },
    500: {
        icon: '⚠️',
        title: 'Server Error',
        message: "Something went wrong on our end. Please try again."
    },
    503: {
        icon: '🔧',
        title: 'Service Unavailable',
        message: "We're currently performing maintenance. Please try again shortly."
    },
    default: {
        icon: '❌',
        title: 'Something Went Wrong',
        message: "An unexpected error occurred. Please try again."
    }
};

export default function ErrorPage({ errorCode = 404, customMessage }) {
    const navigate = useNavigate();
    const config = errorConfigs[errorCode] || errorConfigs.default;
    const displayMessage = customMessage || config.message;

    return (
        <div style={{
            minHeight: '100vh',
            background: '#0B1220',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
        }}>
            {/* Centered Card */}
            <div style={{
                background: '#111A2E',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                padding: '48px 40px',
                textAlign: 'center',
                maxWidth: '420px',
                width: '100%'
            }}>
                {/* Icon */}
                <div style={{ fontSize: '64px', marginBottom: '24px' }}>
                    {config.icon}
                </div>

                {/* Error Code */}
                <div style={{
                    display: 'inline-block',
                    padding: '6px 16px',
                    borderRadius: '20px',
                    background: 'rgba(45, 212, 191, 0.1)',
                    border: '1px solid rgba(45, 212, 191, 0.2)',
                    color: '#2DD4BF',
                    fontSize: '13px',
                    fontWeight: '600',
                    marginBottom: '20px'
                }}>
                    Error {errorCode}
                </div>

                {/* Title */}
                <h1 style={{
                    fontSize: '28px',
                    fontWeight: '700',
                    color: '#E5E7EB',
                    margin: '0 0 12px 0',
                    letterSpacing: '-0.02em'
                }}>
                    {config.title}
                </h1>

                {/* Message */}
                <p style={{
                    fontSize: '15px',
                    color: '#9CA3AF',
                    margin: '0 0 32px 0',
                    lineHeight: '1.6'
                }}>
                    {displayMessage}
                </p>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    <button
                        onClick={() => navigate('/')}
                        style={{
                            padding: '12px 28px',
                            borderRadius: '10px',
                            background: '#2DD4BF',
                            color: '#0B1220',
                            fontSize: '14px',
                            fontWeight: '600',
                            border: 'none',
                            cursor: 'pointer'
                        }}
                    >
                        Go Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        style={{
                            padding: '12px 28px',
                            borderRadius: '10px',
                            background: 'transparent',
                            color: '#9CA3AF',
                            fontSize: '14px',
                            fontWeight: '500',
                            border: '1px solid rgba(255,255,255,0.1)',
                            cursor: 'pointer'
                        }}
                    >
                        Go Back
                    </button>
                </div>

                {/* Help Link */}
                <p style={{ marginTop: '24px', fontSize: '13px', color: '#6B7280' }}>
                    Need help?{' '}
                    <a href="mailto:support@medaura.ai" style={{ color: '#2DD4BF', textDecoration: 'none' }}>
                        Contact Support
                    </a>
                </p>
            </div>
        </div>
    );
}

// Convenience exports
export function NotFoundPage() {
    return <ErrorPage errorCode={404} />;
}

export function ServerErrorPage() {
    return <ErrorPage errorCode={500} />;
}

export function AccessDeniedPage() {
    return <ErrorPage errorCode={403} />;
}
