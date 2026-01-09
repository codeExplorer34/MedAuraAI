import React, { useState } from 'react';
import { ExpandableSection } from './ExpandableSection';
import { RiskStratificationBlock } from './RiskStratificationBlock';
import { RedFlagAlerts } from './RedFlagAlerts';
import { ExpandableSpecialistCard } from './MDTComponents';
import { TreatmentComparisonTable } from './MDTComponents';
import { mockMDTData } from './simpleMDTData';

/**
 * Medical Icons - Outline style, consistent stroke
 */
const MedicalIcons = {
    Overview: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
        </svg>
    ),
    ClinicalFlags: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
    ),
    Assessment: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
    ),
    RiskAnalysis: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
    ),
    Actions: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
    ),
    Treatment: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23-.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A48.309 48.309 0 0112 21c-2.773 0-5.491-.235-8.135-.687-1.718-.293-2.3-2.379-1.067-3.61L5 14.5" />
        </svg>
    ),
    Compliance: () => (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
    )
};

/**
 * Premium Enterprise Clinical Dashboard
 * Hospital-grade interface for MDT Review
 */
export default function MDTClinicalSections({ result, formData, generatePDF }) {
    const [activeSection, setActiveSection] = useState('overview');

    const navigationItems = [
        { id: 'overview', label: 'Overview', Icon: MedicalIcons.Overview },
        { id: 'flags', label: 'Clinical Flags', Icon: MedicalIcons.ClinicalFlags },
        { id: 'assessment', label: 'Assessment', Icon: MedicalIcons.Assessment },
        { id: 'risk', label: 'Risk Analysis', Icon: MedicalIcons.RiskAnalysis },
        { id: 'actions', label: 'Actions', Icon: MedicalIcons.Actions },
        { id: 'treatment', label: 'Treatment', Icon: MedicalIcons.Treatment },
        { id: 'compliance', label: 'Compliance', Icon: MedicalIcons.Compliance }
    ];

    const getRiskLevel = () => {
        const urgency = result.coordinator?.urgency || '';
        if (urgency.includes('High')) return { level: 'High', color: 'text-red-600 bg-red-50 border-red-200' };
        if (urgency.includes('Medium')) return { level: 'Moderate', color: 'text-amber-600 bg-amber-50 border-amber-200' };
        return { level: 'Low', color: 'text-emerald-600 bg-emerald-50 border-emerald-200' };
    };

    const riskInfo = getRiskLevel();

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#0F1729', fontFamily: 'Inter, system-ui, sans-serif' }}>

            {/* PATIENT SNAPSHOT BAR */}
            <div style={{ backgroundColor: '#1A2332', borderBottom: '1px solid #2D3748' }}>
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <div>
                                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Patient</div>
                                <div className="mt-1 text-base font-semibold text-slate-100">{formData.patientName || 'N/A'}</div>
                            </div>
                            <div className="h-8 w-px bg-slate-700"></div>
                            <div>
                                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Age</div>
                                <div className="mt-1 text-base font-semibold text-slate-100">{formData.age || 'N/A'} yrs</div>
                            </div>
                            <div className="h-8 w-px bg-slate-700"></div>
                            <div>
                                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Gender</div>
                                <div className="mt-1 text-base font-semibold text-slate-100 capitalize">{formData.gender || 'N/A'}</div>
                            </div>
                            <div className="h-8 w-px bg-slate-700"></div>
                            <div>
                                <div className="text-xs font-medium text-slate-400 uppercase tracking-wider">Consensus</div>
                                <div className="mt-1 text-base font-semibold text-emerald-400">{result.consensus || "95%"}</div>
                            </div>
                        </div>
                        <div>
                            <div className={`px-4 py-2 rounded-lg border ${riskInfo.color}`}>
                                <div className="text-xs font-medium uppercase tracking-wider">Risk Level</div>
                                <div className="mt-0.5 text-base font-semibold">{riskInfo.level}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex">
                {/* SIDEBAR NAVIGATION */}
                <aside style={{ width: '16rem', backgroundColor: '#1A2332', borderRight: '1px solid #2D3748', minHeight: '100vh' }} className="flex flex-col">
                    <div className="px-4 py-6" style={{ borderBottom: '1px solid #2D3748' }}>
                        <h1 className="text-sm font-semibold text-slate-100 uppercase tracking-wide">
                            MDT Clinical Review
                        </h1>
                        <p className="text-xs text-slate-400 mt-1">
                            Multi-Disciplinary Assessment
                        </p>
                    </div>

                    <nav className="flex-1 px-3 py-4">
                        <div className="space-y-1">
                            {navigationItems.map(({ id, label, Icon }) => (
                                <button
                                    key={id}
                                    onClick={() => setActiveSection(id)}
                                    className={`w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-colors ${activeSection === id
                                        ? 'bg-slate-700/50 text-slate-100'
                                        : 'text-slate-400 hover:bg-slate-700/30 hover:text-slate-200'
                                        }`}
                                >
                                    <Icon />
                                    <span>{label}</span>
                                </button>
                            ))}
                        </div>
                    </nav>

                    <div className="px-3 py-4" style={{ borderTop: '1px solid #2D3748' }}>
                        <button
                            onClick={generatePDF}
                            className="w-full px-4 py-3 text-sm font-medium text-slate-100 rounded-lg transition-colors"
                            style={{ backgroundColor: '#2D3748' }}
                            onMouseEnter={(e) => e.target.style.backgroundColor = '#374151'}
                            onMouseLeave={(e) => e.target.style.backgroundColor = '#2D3748'}
                        >
                            Export Report
                        </button>
                    </div>
                </aside>

                {/* MAIN CONTENT */}
                <main className="flex-1 overflow-auto">
                    <div className="max-w-5xl mx-auto px-8 py-8">

                        {/* OVERVIEW SECTION */}
                        {activeSection === 'overview' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-100">Case Overview</h2>
                                    <p className="text-sm text-slate-400 mt-1">Clinical summary and key metrics</p>
                                </div>

                                <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
                                    <div className="p-6">
                                        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">Patient Demographics</h3>
                                        <dl className="grid grid-cols-4 gap-6">
                                            <div>
                                                <dt className="text-xs font-medium text-slate-500 uppercase">Full Name</dt>
                                                <dd className="mt-1 text-sm text-slate-200">{formData.patientName || 'N/A'}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-xs font-medium text-slate-500 uppercase">Age</dt>
                                                <dd className="mt-1 text-sm text-slate-200">{formData.age || 'N/A'} years</dd>
                                            </div>
                                            <div>
                                                <dt className="text-xs font-medium text-slate-500 uppercase">Gender</dt>
                                                <dd className="mt-1 text-sm text-slate-200 capitalize">{formData.gender || 'N/A'}</dd>
                                            </div>
                                            <div>
                                                <dt className="text-xs font-medium text-slate-500 uppercase">Review Date</dt>
                                                <dd className="mt-1 text-sm text-slate-200">{new Date().toLocaleDateString()}</dd>
                                            </div>
                                        </dl>
                                    </div>
                                    <div className="p-6">
                                        <dt className="text-xs font-medium text-slate-500 uppercase">Chief Complaint</dt>
                                        <dd className="mt-2 text-sm text-slate-300 leading-relaxed">{formData.symptoms || 'No symptoms recorded'}</dd>
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-6">
                                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Team Consensus</div>
                                        <div className="mt-3 text-3xl font-semibold text-emerald-400">{result.consensus || "95%"}</div>
                                        <div className="mt-1 text-xs text-slate-400">Specialist agreement</div>
                                    </div>
                                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Urgency</div>
                                        <div className="mt-3 text-xl font-semibold text-slate-200">
                                            {result.coordinator?.urgency?.includes('High') ? 'High' :
                                                result.coordinator?.urgency?.includes('Medium') ? 'Medium' : 'Routine'}
                                        </div>
                                        <div className="mt-1 text-xs text-slate-400">Priority level</div>
                                    </div>
                                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                                        <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">Complexity</div>
                                        <div className="mt-3 text-xl font-semibold text-slate-200">{result.complexity || "Moderate"}</div>
                                        <div className="mt-1 text-xs text-slate-400">Case assessment</div>
                                    </div>
                                </div>

                                <div className="bg-slate-800 rounded-xl border border-slate-700">
                                    <div className="p-6 border-b border-slate-700">
                                        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Clinical Summary</h3>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            {result.coordinator?.summary || "Based on multi-specialist review, immediate urological evaluation with prostate biopsy is recommended to rule out malignancy given elevated PSA (9.5 ng/mL) and palpable prostatic nodules."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CLINICAL FLAGS SECTION */}
                        {activeSection === 'flags' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-100">Clinical Flags</h2>
                                    <p className="text-sm text-slate-400 mt-1">Critical alerts requiring attention</p>
                                </div>

                                <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
                                    {(mockMDTData.redFlags || [
                                        { severity: 'high', flag: 'Elevated PSA (9.5 ng/mL) with palpable nodules', action: 'Urgent urology referral' },
                                        { severity: 'medium', flag: 'Family history of prostate cancer', action: 'Enhanced monitoring' },
                                        { severity: 'medium', flag: 'Progressive urinary symptoms', action: 'Symptom management' }
                                    ]).map((flag, i) => (
                                        <div key={i} className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className={`px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-md ${flag.severity === 'high' ? 'bg-red-900/30 text-red-400 border border-red-800' :
                                                    flag.severity === 'medium' ? 'bg-amber-900/30 text-amber-400 border border-amber-800' :
                                                        'bg-slate-700 text-slate-400'
                                                    }`}>
                                                    {flag.severity}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="text-sm font-medium text-slate-200">{flag.flag}</div>
                                                    {flag.action && (
                                                        <div className="mt-2 text-sm text-slate-400">Recommended: {flag.action}</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* ASSESSMENT SECTION */}
                        {activeSection === 'assessment' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-100">Clinical Assessment</h2>
                                    <p className="text-sm text-slate-400 mt-1">Multi-specialist analysis</p>
                                </div>

                                <div className="bg-slate-800 rounded-xl border border-slate-700">
                                    <div className="p-6 border-b border-slate-700">
                                        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Consensus Recommendation</h3>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-sm text-slate-300 leading-relaxed">
                                            {result.coordinator?.summary || "Based on multi-specialist review, immediate urological evaluation with prostate biopsy is recommended to rule out malignancy given elevated PSA (9.5 ng/mL) and palpable prostatic nodules."}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-4">Specialist Perspectives</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {result.specialists.map((spec, index) => (
                                            <div key={spec.name} className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h4 className="text-sm font-semibold text-slate-200">{spec.name}</h4>
                                                    <span className="text-xs font-medium text-emerald-400">
                                                        {85 + Math.floor(Math.random() * 15)}%
                                                    </span>
                                                </div>
                                                <p className="text-sm text-slate-400 leading-relaxed">
                                                    {spec.assessment || spec.differential || 'Assessment in progress'}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* RISK ANALYSIS SECTION */}
                        {activeSection === 'risk' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-100">Risk Analysis</h2>
                                    <p className="text-sm text-slate-400 mt-1">Patient risk stratification</p>
                                </div>

                                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                                    <RiskStratificationBlock riskData={mockMDTData.riskData} />
                                </div>
                            </div>
                        )}

                        {/* RECOMMENDED ACTIONS SECTION */}
                        {activeSection === 'actions' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-100">Recommended Actions</h2>
                                    <p className="text-sm text-slate-400 mt-1">Prioritized interventions</p>
                                </div>

                                <div className="bg-slate-800 rounded-xl border border-slate-700 divide-y divide-slate-700">
                                    {(result.recommendations || [
                                        { action: "Order urgent urology referral for prostate biopsy", priority: "immediate", timeframe: "Within 48 hours" },
                                        { action: "Initiate alpha-blocker therapy for urinary symptoms", priority: "today", timeframe: "Today" },
                                        { action: "Schedule PSA monitoring every 3 months", priority: "routine", timeframe: "Ongoing" },
                                        { action: "Patient education on prostate health", priority: "routine", timeframe: "This week" }
                                    ]).map((rec, i) => (
                                        <div key={i} className="p-6">
                                            <div className="flex items-start gap-4">
                                                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-400">
                                                    {i + 1}
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between gap-4">
                                                        <div className="text-sm font-medium text-slate-200">
                                                            {rec.action || rec.recommendation || rec.title || (typeof rec === 'string' ? rec : 'Action item')}
                                                        </div>
                                                        {rec.priority && (
                                                            <span className={`flex-shrink-0 px-3 py-1 text-xs font-semibold uppercase tracking-wide rounded-md ${rec.priority === 'immediate' ? 'bg-red-900/30 text-red-400 border border-red-800' :
                                                                rec.priority === 'today' ? 'bg-amber-900/30 text-amber-400 border border-amber-800' :
                                                                    'bg-slate-700 text-slate-400'
                                                                }`}>
                                                                {rec.priority}
                                                            </span>
                                                        )}
                                                    </div>
                                                    {rec.timeframe && (
                                                        <div className="mt-2 text-sm text-slate-400">
                                                            Timeframe: {rec.timeframe}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* TREATMENT SECTION */}
                        {activeSection === 'treatment' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-100">Treatment Plan</h2>
                                    <p className="text-sm text-slate-400 mt-1">Evidence-based options</p>
                                </div>

                                <div className="bg-slate-800 rounded-xl border border-slate-700 p-6">
                                    <TreatmentComparisonTable treatments={result.treatments || []} />
                                </div>
                            </div>
                        )}

                        {/* COMPLIANCE SECTION */}
                        {activeSection === 'compliance' && (
                            <div className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-semibold text-slate-100">Compliance & Audit</h2>
                                    <p className="text-sm text-slate-400 mt-1">Quality assurance and regulatory compliance</p>
                                </div>

                                <div className="bg-amber-900/20 border border-amber-800 rounded-xl p-6">
                                    <div className="flex gap-4">
                                        <svg className="w-6 h-6 text-amber-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                        </svg>
                                        <div>
                                            <h4 className="text-sm font-semibold text-amber-200">Clinical Decision Support Tool</h4>
                                            <p className="mt-2 text-sm text-amber-100 leading-relaxed">
                                                This AI-generated review is for decision support only. All recommendations must be independently verified by the treating physician. Final clinical decisions and patient care responsibility rest solely with licensed healthcare providers.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                                        <dt className="text-xs font-medium text-slate-500 uppercase">Data Sources</dt>
                                        <dd className="mt-2 text-sm text-slate-300">EHR, Laboratory Results, Diagnostic Imaging</dd>
                                    </div>
                                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                                        <dt className="text-xs font-medium text-slate-500 uppercase">AI Model</dt>
                                        <dd className="mt-2 text-sm text-slate-300">MedAura MDT v2.1.0</dd>
                                    </div>
                                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                                        <dt className="text-xs font-medium text-slate-500 uppercase">Timestamp</dt>
                                        <dd className="mt-2 text-sm text-slate-300">{new Date().toLocaleString()}</dd>
                                    </div>
                                    <div className="bg-slate-800 rounded-xl border border-slate-700 p-5">
                                        <dt className="text-xs font-medium text-slate-500 uppercase">Compliance</dt>
                                        <dd className="mt-2 text-sm font-medium text-emerald-400">HIPAA Compliant</dd>
                                    </div>
                                </div>

                                <div className="bg-slate-800 rounded-xl border border-slate-700">
                                    <div className="p-6 border-b border-slate-700">
                                        <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Quality Assurance</h3>
                                    </div>
                                    <div className="p-6">
                                        <ul className="space-y-3">
                                            {[
                                                'HIPAA-compliant data handling and storage',
                                                'Physician acknowledgment logged',
                                                'All patient data validated and sanitized',
                                                'Clinical review logged for audit trail'
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                                    <svg className="w-5 h-5 text-emerald-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                    </svg>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </main>
            </div>
        </div>
    );
}
