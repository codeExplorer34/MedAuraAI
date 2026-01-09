import React from 'react';

// Dashboard Top App Bar Component
export function DashboardAppBar({ userName = "Dr. Sarah Chen", userRole = "Emergency Physician" }) {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <div style={{
            background: '#111A2E',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding: '12px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px'
        }}>
            {/* Left: Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                    src="/MedAuraAI Logo.png"
                    alt="MedAura"
                    style={{ height: '32px', width: 'auto' }}
                />
                <span style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#E5E7EB',
                    letterSpacing: '-0.02em'
                }}>
                    MedAura
                </span>
            </div>

            {/* Center: Date */}
            <div style={{
                flex: 1,
                textAlign: 'center',
                color: '#9CA3AF',
                fontSize: '13px'
            }}>
                {today}
            </div>

            {/* Right: Search + User */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {/* Search */}
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 14px',
                    background: 'rgba(255,255,255,0.05)',
                    borderRadius: '8px',
                    border: '1px solid rgba(255,255,255,0.06)'
                }}>
                    <span style={{ color: '#6B7280' }}>🔍</span>
                    <input
                        type="text"
                        placeholder="Search patients..."
                        style={{
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#E5E7EB',
                            fontSize: '13px',
                            width: '150px'
                        }}
                    />
                </div>

                {/* User Avatar */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2DD4BF, #38BDF8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#0B1220',
                        fontWeight: '600',
                        fontSize: '14px'
                    }}>
                        {userName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                        <div style={{ fontSize: '13px', fontWeight: '500', color: '#E5E7EB' }}>
                            {userName}
                        </div>
                        <div style={{ fontSize: '11px', color: '#6B7280' }}>
                            {userRole}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Critical Alert Card Component
export function CriticalAlertBanner({ count = 6, onViewAll }) {
    return (
        <div style={{
            background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.15), rgba(220, 38, 38, 0.1))',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            borderRadius: '12px',
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            margin: '16px 24px'
        }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontSize: '24px' }}>🚨</span>
                <div>
                    <div style={{ fontSize: '15px', fontWeight: '600', color: '#EF4444' }}>
                        CRITICAL: {count} patients require immediate attention
                    </div>
                    <div style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '2px' }}>
                        High-risk cases flagged by AI analysis
                    </div>
                </div>
            </div>
            <button
                onClick={onViewAll}
                style={{
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: '#EF4444',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: '600',
                    border: 'none',
                    cursor: 'pointer'
                }}
            >
                View All →
            </button>
        </div>
    );
}

// Clean Patient Card Component
export function PatientCard({
    name = "John Doe",
    age = 52,
    gender = "M",
    complaint = "Chest pain - substernal",
    status = "high",
    updatedAt = "5 min ago"
}) {
    const statusColors = {
        critical: { bg: 'rgba(239, 68, 68, 0.15)', text: '#EF4444', label: 'CRITICAL' },
        high: { bg: 'rgba(245, 158, 11, 0.15)', text: '#F59E0B', label: 'HIGH RISK' },
        medium: { bg: 'rgba(59, 130, 246, 0.15)', text: '#3B82F6', label: 'MEDIUM' },
        low: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22C55E', label: 'LOW RISK' },
        stable: { bg: 'rgba(107, 114, 128, 0.15)', text: '#6B7280', label: 'STABLE' }
    };

    const statusStyle = statusColors[status] || statusColors.medium;

    return (
        <div style={{
            background: '#111A2E',
            borderRadius: '12px',
            border: '1px solid rgba(255,255,255,0.06)',
            padding: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#2DD4BF';
                e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                e.currentTarget.style.transform = 'translateY(0)';
            }}
        >
            {/* Header: Name + Status */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '10px'
            }}>
                <div style={{ fontSize: '15px', fontWeight: '600', color: '#E5E7EB' }}>
                    {name}, {age}{gender}
                </div>
                <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    background: statusStyle.bg,
                    color: statusStyle.text,
                    fontSize: '10px',
                    fontWeight: '600',
                    letterSpacing: '0.5px'
                }}>
                    {statusStyle.label}
                </span>
            </div>

            {/* Complaint */}
            <div style={{ fontSize: '13px', color: '#9CA3AF', marginBottom: '12px' }}>
                {complaint}
            </div>

            {/* Footer: Updated time */}
            <div style={{ fontSize: '11px', color: '#6B7280' }}>
                Updated {updatedAt}
            </div>
        </div>
    );
}

export default DashboardAppBar;
