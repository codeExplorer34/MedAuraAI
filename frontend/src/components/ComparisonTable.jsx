import React from 'react';

export default function ComparisonTable() {
    const features = [
        { feature: 'Multi-Specialty AI', medaura: true, traditional: false, other: false },
        { feature: 'Voice Dictation', medaura: true, traditional: false, other: 'Some' },
        { feature: 'EMS Mode', medaura: true, traditional: false, other: false },
        { feature: 'HIPAA Compliant', medaura: true, traditional: true, other: 'Varies' },
        { feature: 'Setup Time', medaura: '<1 day', traditional: '6-12mo', other: '2-4wk' },
        { feature: 'Monthly Cost', medaura: '$3-15K', traditional: '$50-200K', other: '$20-50K' },
        { feature: 'EMR Integration', medaura: 'Epic, Cerner', traditional: 'Built-in', other: 'Limited' }
    ];

    const renderCell = (value) => {
        if (value === true) return <span style={{ color: '#2DD4BF', fontSize: '18px' }}>✓</span>;
        if (value === false) return <span style={{ color: '#EF4444', fontSize: '18px' }}>✗</span>;
        return <span style={{ color: '#9CA3AF', fontSize: '13px' }}>{value}</span>;
    };

    return (
        <section style={{ background: '#0B1220', padding: '64px 0' }}>
            <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px' }}>
                {/* Table - No separate header since it's part of a larger section */}
                <div style={{
                    background: '#111A2E',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.06)',
                    overflow: 'hidden'
                }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                                <th style={{ textAlign: 'left', padding: '14px 16px', color: '#6B7280', fontSize: '12px', fontWeight: '600', textTransform: 'uppercase' }}>Feature</th>
                                <th style={{ textAlign: 'center', padding: '14px 16px', color: '#2DD4BF', fontSize: '13px', fontWeight: '600' }}>MedAura</th>
                                <th style={{ textAlign: 'center', padding: '14px 16px', color: '#6B7280', fontSize: '13px', fontWeight: '500' }}>EMR</th>
                                <th style={{ textAlign: 'center', padding: '14px 16px', color: '#6B7280', fontSize: '13px', fontWeight: '500' }}>Others</th>
                            </tr>
                        </thead>
                        <tbody>
                            {features.map((row, i) => (
                                <tr
                                    key={i}
                                    style={{
                                        background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.02)',
                                        borderBottom: i < features.length - 1 ? '1px solid rgba(255,255,255,0.04)' : 'none'
                                    }}
                                >
                                    <td style={{ padding: '12px 16px', color: '#E5E7EB', fontSize: '14px' }}>{row.feature}</td>
                                    <td style={{ textAlign: 'center', padding: '12px 16px', background: 'rgba(45,212,191,0.05)' }}>{renderCell(row.medaura)}</td>
                                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>{renderCell(row.traditional)}</td>
                                    <td style={{ textAlign: 'center', padding: '12px 16px' }}>{renderCell(row.other)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* CTA */}
                <div style={{ textAlign: 'center', marginTop: '32px' }}>
                    <button style={{
                        padding: '14px 32px',
                        background: '#2DD4BF',
                        color: '#0B1220',
                        fontSize: '14px',
                        fontWeight: '600',
                        borderRadius: '10px',
                        border: 'none',
                        cursor: 'pointer'
                    }}>
                        Schedule Demo →
                    </button>
                </div>
            </div>
        </section>
    );
}

