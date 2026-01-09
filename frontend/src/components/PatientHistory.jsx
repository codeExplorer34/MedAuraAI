import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllPatients, deletePatient, searchPatients, getStorageStats, mergeDuplicatePatients } from '../utils/patientStorage';

export default function PatientHistory() {
    const navigate = useNavigate();
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    const [stats, setStats] = useState({ total: 0, maxRecords: 50, remaining: 50 });

    // Load patients on mount
    useEffect(() => {
        loadPatients();
    }, []);

    // Load patients from storage
    const loadPatients = () => {
        const allPatients = getAllPatients();
        // Sort by most recent encounter
        allPatients.sort((a, b) => {
            const aLatest = Math.max(...a.encounters.map(e => new Date(e.timestamp)));
            const bLatest = Math.max(...b.encounters.map(e => new Date(e.timestamp)));
            return bLatest - aLatest;
        });
        setPatients(allPatients);
        setFilteredPatients(allPatients);
        setStats(getStorageStats());
    };

    // Apply type filter
    const applyFilters = (patientList) => {
        if (filterType === 'ALL') {
            setFilteredPatients(patientList);
        } else {
            // Filter patients who have at least one encounter of the selected type
            setFilteredPatients(patientList.filter(p =>
                p.encounters.some(e => e.type === filterType)
            ));
        }
    };

    // Handle search
    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            applyFilters(patients);
        } else {
            const results = searchPatients(searchQuery);
            applyFilters(results);
        }
    };

    // Re-apply filters when filter type changes
    useEffect(() => {
        handleSearch();
    }, [filterType, patients]);

    // Handle delete
    const handleDelete = (patientId, e) => {
        e.stopPropagation();
        if (window.confirm('Are you sure you want to delete this patient and all their encounters?')) {
            deletePatient(patientId);
            loadPatients();
        }
    };

    // Handle view patient
    const handleViewPatient = (patientId) => {
        navigate(`/patient/${patientId}`);
    };

    // Format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get encounter counts
    const getEncounterCounts = (patient) => {
        const erCount = patient.encounters.filter(e => e.type === 'ER').length;
        const mdtCount = patient.encounters.filter(e => e.type === 'MDT').length;
        return { erCount, mdtCount, total: patient.encounters.length };
    };

    // Get latest encounter
    const getLatestEncounter = (patient) => {
        return patient.encounters.reduce((latest, current) => {
            return new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest;
        });
    };

    // Get risk badge color
    const getRiskColor = (riskScore) => {
        if (riskScore >= 70) return 'bg-red-500';
        if (riskScore >= 40) return 'bg-amber-500';
        return 'bg-green-500';
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex items-end justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">Patient History</h1>
                        <p className="text-slate-400">
                            View and manage saved patient records
                            {stats.total > 0 && (
                                <span className="ml-2 text-sky-400">
                                    ({stats.total}/{stats.maxRecords} patients)
                                </span>
                            )}
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            const result = mergeDuplicatePatients();
                            if (result.merged > 0) {
                                alert(`✓ Merged ${result.merged} duplicate records!\n${result.before} → ${result.after} patients`);
                                loadPatients();
                            } else {
                                alert('No duplicates found to merge.');
                            }
                        }}
                        className="px-4 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-600 text-white font-medium transition-colors text-sm"
                    >
                        🔗 Merge Duplicates
                    </button>
                </div>

                {/* Stats Bar */}
                {stats.total > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                            <div className="text-xs text-slate-500 mb-1">Total Patients</div>
                            <div className="text-2xl font-bold text-white">{stats.total}</div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                            <div className="text-xs text-slate-500 mb-1">ER Encounters</div>
                            <div className="text-2xl font-bold text-red-400">{stats.erCases}</div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                            <div className="text-xs text-slate-500 mb-1">MDT Encounters</div>
                            <div className="text-2xl font-bold text-sky-400">{stats.mdtCases}</div>
                        </div>
                        <div className="p-4 rounded-lg bg-slate-900 border border-slate-800">
                            <div className="text-xs text-slate-500 mb-1">Remaining Slots</div>
                            <div className="text-2xl font-bold text-green-400">{stats.remaining}</div>
                        </div>
                    </div>
                )}

                {/* Search and Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 flex gap-2">
                        <input
                            type="text"
                            placeholder="Search by name, age, complaint, or ID..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                            className="flex-1 px-4 py-2 rounded-lg bg-slate-900 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-sky-500"
                        />
                        <button
                            onClick={handleSearch}
                            className="px-6 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition-colors flex items-center gap-2"
                        >
                            🔍 Search
                        </button>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setFilterType('ALL')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'ALL'
                                ? 'bg-sky-500 text-white'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                                }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterType('ER')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'ER'
                                ? 'bg-red-500 text-white'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                                }`}
                        >
                            ER
                        </button>
                        <button
                            onClick={() => setFilterType('MDT')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${filterType === 'MDT'
                                ? 'bg-sky-500 text-white'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                                }`}
                        >
                            MDT
                        </button>
                    </div>
                </div>

                {/* Patient List */}
                {filteredPatients.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="text-6xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold text-white mb-2">No Patients Found</h3>
                        <p className="text-slate-400 mb-6">
                            {searchQuery ? 'Try a different search query' : 'Start by analyzing a patient in ER Co-Pilot or MDT Review'}
                        </p>
                        <div className="flex gap-4 justify-center">
                            <button
                                onClick={() => navigate('/er-copilot')}
                                className="px-6 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white font-medium transition-colors"
                            >
                                Go to ER Co-Pilot
                            </button>
                            <button
                                onClick={() => navigate('/mdt-review')}
                                className="px-6 py-2 rounded-lg bg-sky-500 hover:bg-sky-600 text-white font-medium transition-colors"
                            >
                                Go to MDT Review
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4">
                        {filteredPatients.map((patient) => {
                            const counts = getEncounterCounts(patient);
                            const latestEncounter = getLatestEncounter(patient);

                            return (
                                <div
                                    key={patient.id}
                                    onClick={() => handleViewPatient(patient.id)}
                                    className="p-5 rounded-lg bg-slate-900 border border-slate-800 hover:border-sky-500/50 transition-all cursor-pointer group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            {/* Patient Name */}
                                            {patient.patientInfo?.name && (
                                                <div className="text-lg font-bold text-white mb-2">
                                                    {patient.patientInfo.name}
                                                </div>
                                            )}

                                            <div className="flex items-center gap-3 mb-2 flex-wrap">
                                                {/* Encounter Badges */}
                                                {counts.erCount > 0 && (
                                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-red-500/20 text-red-400">
                                                        {counts.erCount} ER
                                                    </span>
                                                )}
                                                {counts.mdtCount > 0 && (
                                                    <span className="px-2 py-1 rounded text-xs font-semibold bg-sky-500/20 text-sky-400">
                                                        {counts.mdtCount} MDT
                                                    </span>
                                                )}

                                                {/* Patient Demographics */}
                                                <span className="text-white font-medium">
                                                    {patient.patientInfo?.age}
                                                    {patient.patientInfo?.gender ? ` ${patient.patientInfo.gender}` : ''}
                                                </span>

                                                {/* Latest Risk Score */}
                                                {latestEncounter.aiAnalysis?.riskScore && (
                                                    <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${getRiskColor(latestEncounter.aiAnalysis.riskScore)}`}>
                                                        Risk: {latestEncounter.aiAnalysis.riskScore}%
                                                    </span>
                                                )}
                                            </div>

                                            {/* Latest Chief Complaint */}
                                            <div className="text-white font-semibold mb-1">
                                                {latestEncounter.chiefComplaint || 'No chief complaint recorded'}
                                            </div>

                                            {/* Latest Timestamp */}
                                            <div className="text-sm text-slate-500">
                                                Latest: {formatDate(latestEncounter.timestamp)}
                                            </div>
                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={(e) => handleDelete(patient.id, e)}
                                                className="px-3 py-1 rounded text-xs font-medium bg-slate-800 text-slate-400 hover:bg-red-500 hover:text-white transition-colors"
                                            >
                                                Delete
                                            </button>
                                            <div className="text-sky-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                                                View →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
