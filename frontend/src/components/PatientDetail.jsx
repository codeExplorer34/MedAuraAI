import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatient, deletePatient } from '../utils/patientStorage';

export default function PatientDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const patientData = getPatient(id);
        if (patientData) {
            setPatient(patientData);
        }
        setLoading(false);
    }, [id]);

    const handleDelete = () => {
        if (window.confirm('Are you sure you want to delete this patient and all their encounters?')) {
            deletePatient(id);
            navigate('/patient-history');
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-slate-400">Loading patient data...</div>
            </div>
        );
    }

    if (!patient) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center">
                <div className="text-center">
                    <div className="text-6xl mb-4">❌</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Patient Not Found</h2>
                    <p className="text-slate-400 mb-6">This patient record doesn't exist or has been deleted.</p>
                    <button
                        onClick={() => navigate('/patient-history')}
                        className="px-6 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition-colors"
                    >
                        Back to Patient History
                    </button>
                </div>
            </div>
        );
    }

    const getRiskColor = (riskScore) => {
        if (riskScore >= 70) return 'text-red-400 bg-red-500/20';
        if (riskScore >= 40) return 'text-amber-400 bg-amber-500/20';
        return 'text-green-400 bg-green-500/20';
    };

    // Check if patient has ER encounter
    const hasEREncounter = patient.encounters?.some(e => e.type === 'ER');

    // Sort encounters by most recent first
    const sortedEncounters = [...(patient.encounters || [])].sort((a, b) =>
        new Date(b.timestamp) - new Date(a.timestamp)
    );

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <button
                            onClick={() => navigate('/patient-history')}
                            className="text-sky-400 hover:text-sky-300 mb-2 flex items-center gap-2"
                        >
                            ← Back to History
                        </button>
                        <h1 className="text-3xl font-bold text-white">
                            {patient.patientInfo?.name || 'Patient Record'}
                        </h1>
                        <div className="text-slate-400 text-sm mt-1">
                            {patient.encounters?.length || 0} encounter{patient.encounters?.length !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div className="flex gap-3">
                        {/* Send to MDT button for patients with ER encounter */}
                        {hasEREncounter && (
                            <button
                                onClick={() => {
                                    const params = new URLSearchParams({
                                        patientId: patient.id,
                                        patientName: patient.patientInfo?.name || '',
                                        age: patient.patientInfo?.age || '',
                                        gender: patient.patientInfo?.gender || '',
                                        symptoms: ''
                                    });
                                    navigate(`/mdt-review?${params.toString()}`);
                                }}
                                className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition-colors flex items-center gap-2"
                            >
                                👥 Send to MDT Review
                            </button>
                        )}
                        <button
                            onClick={handleDelete}
                            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                        >
                            Delete Patient
                        </button>
                    </div>
                </div>

                {/* Patient Demographics */}
                <div className="mb-6 p-6 rounded-lg bg-slate-900 border border-slate-800">
                    <h2 className="text-xl font-bold text-white mb-4">Patient Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {patient.patientInfo?.name && (
                            <div>
                                <div className="text-xs text-slate-500 mb-1">Name</div>
                                <div className="text-white font-medium">{patient.patientInfo.name}</div>
                            </div>
                        )}
                        <div>
                            <div className="text-xs text-slate-500 mb-1">Age</div>
                            <div className="text-white font-medium">{patient.patientInfo?.age || 'N/A'}</div>
                        </div>
                        <div>
                            <div className="text-xs text-slate-500 mb-1">Gender</div>
                            <div className="text-white font-medium">{patient.patientInfo?.gender || 'N/A'}</div>
                        </div>
                    </div>
                </div>

                {/* Encounters Timeline */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-4">Encounter Timeline</h2>
                    <div className="space-y-6">
                        {sortedEncounters.map((encounter, index) => (
                            <div key={encounter.id} className="p-6 rounded-lg bg-slate-900 border border-slate-800">
                                {/* Encounter Header */}
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <div className="flex items-center gap-3 mb-2">
                                            <span className={`px-3 py-1 rounded font-semibold ${encounter.type === 'ER'
                                                    ? 'bg-red-500/20 text-red-400'
                                                    : 'bg-sky-500/20 text-sky-400'
                                                }`}>
                                                {encounter.type === 'ER' ? 'ER Visit' : 'MDT Review'}
                                            </span>
                                            {index === 0 && (
                                                <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">
                                                    Latest
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-slate-400 text-sm">{formatDate(encounter.timestamp)}</div>
                                    </div>
                                </div>

                                {/* Chief Complaint */}
                                {encounter.chiefComplaint && (
                                    <div className="mb-4">
                                        <div className="text-xs text-slate-500 mb-1">Chief Complaint</div>
                                        <div className="text-white font-medium">{encounter.chiefComplaint}</div>
                                    </div>
                                )}

                                {/* AI Analysis */}
                                {encounter.aiAnalysis && (
                                    <div className="mb-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
                                        <h3 className="text-lg font-bold text-white mb-3">AI Analysis</h3>

                                        {/* Risk Score */}
                                        {encounter.aiAnalysis.riskScore !== undefined && (
                                            <div className="mb-3">
                                                <div className="text-xs text-slate-500 mb-2">Risk Score</div>
                                                <div className={`inline-block px-4 py-2 rounded-lg font-bold text-xl ${getRiskColor(encounter.aiAnalysis.riskScore)}`}>
                                                    {encounter.aiAnalysis.riskScore}%
                                                </div>
                                            </div>
                                        )}

                                        {/* Red Flags */}
                                        {encounter.aiAnalysis.redFlags && encounter.aiAnalysis.redFlags.length > 0 && (
                                            <div className="mb-3">
                                                <div className="text-xs text-slate-500 mb-2">Red Flags</div>
                                                <div className="space-y-2">
                                                    {encounter.aiAnalysis.redFlags.map((flag, idx) => (
                                                        <div key={idx} className="p-2 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                                                            ⚠️ {flag}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Recommendations */}
                                        {encounter.aiAnalysis.recommendations && encounter.aiAnalysis.recommendations.length > 0 && (
                                            <div>
                                                <div className="text-xs text-slate-500 mb-2">Recommendations</div>
                                                <div className="space-y-1">
                                                    {encounter.aiAnalysis.recommendations.map((rec, idx) => (
                                                        <div key={idx} className="p-2 rounded bg-slate-700 text-slate-300 text-sm">
                                                            • {rec}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Vitals (if available) */}
                                {encounter.vitals && (
                                    <div className="mb-4 p-4 rounded-lg bg-slate-800 border border-slate-700">
                                        <h3 className="text-lg font-bold text-white mb-3">Vital Signs</h3>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                            {Object.entries(encounter.vitals).map(([key, value]) => (
                                                <div key={key}>
                                                    <div className="text-xs text-slate-500 mb-1 capitalize">
                                                        {key.replace(/([A-Z])/g, ' $1')}
                                                    </div>
                                                    <div className="text-white font-medium">{value}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* MDT Specialist Perspectives */}
                                {encounter.type === 'MDT' && encounter.specialists && (
                                    <div className="p-4 rounded-lg bg-slate-800 border border-slate-700">
                                        <h3 className="text-lg font-bold text-white mb-3">Specialist Perspectives</h3>
                                        <div className="space-y-2">
                                            {encounter.specialists.map((specialist, idx) => (
                                                <div key={idx} className="p-3 rounded-lg bg-slate-700 border border-slate-600">
                                                    <div className="font-semibold text-sky-400 mb-1 text-sm">{specialist.name}</div>
                                                    <div className="text-xs text-slate-300">
                                                        {specialist.content || specialist.perspective || 'No details available'}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
