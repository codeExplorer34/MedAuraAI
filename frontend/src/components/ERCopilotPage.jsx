import React, { useState } from "react";
import Card from "./Card";
import SectionHeader from "./SectionHeader";
import VitalValue from "./VitalValue";
import {
    VitalSignInput,
    FormProgress,
    AnalysisLoader,
    CopyButton,
    ChiefComplaintInput,
    QuickTemplates,
    ConfidenceIndicator,
    FormattedClinicalNote,
    VitalsSummaryCard
} from "./ERCopilotComponents";
import { VoiceInput } from "./VoiceInput";
import { ClinicalCopier } from "./ClinicalCopier";
import { EMSModeToggle } from "./EMSModeToggle";
import ConfidenceScore from "./ConfidenceScore";
import { savePatient } from "../utils/patientStorage";
import "../homepage-animations.css";
import "../ems-mode.css";

export default function ERCopilotPage() {
    const [formData, setFormData] = useState({
        patientName: "",
        age: "",
        sex: "male",
        complaint: "",
        duration: "",
        bpSys: "",
        bpDia: "",
        hr: "",
        rr: "",
        spo2: "",
        temp: "",
        history: "",
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isEMSMode, setIsEMSMode] = useState(false);
    const [clinicianNotes, setClinicianNotes] = useState("");
    const [hasAcknowledged, setHasAcknowledged] = useState(false);
    const [showDisclaimerDetails, setShowDisclaimerDetails] = useState(false);
    const [showAcknowledgmentDetails, setShowAcknowledgmentDetails] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hasAcknowledged) return;

        setLoading(true);
        setTimeout(() => {
            const analysisResult = generateMockResult(formData);
            setResult(analysisResult);

            // Auto-save patient to localStorage
            try {
                const savedPatient = savePatient({
                    type: 'ER',
                    patientInfo: {
                        name: formData.patientName || undefined,
                        age: formData.age,
                        gender: formData.sex,
                        chiefComplaint: formData.complaint
                    },
                    vitals: {
                        bpSys: formData.bpSys,
                        bpDia: formData.bpDia,
                        hr: formData.hr,
                        rr: formData.rr,
                        spo2: formData.spo2,
                        temp: formData.temp
                    },
                    aiAnalysis: {
                        riskScore: analysisResult.riskLevel === 'High' ? 85 : 65,
                        redFlags: analysisResult.redFlags,
                        recommendations: analysisResult.suggestedTests
                    }
                });
                console.log('✓ Patient saved:', savedPatient.id);
            } catch (error) {
                console.error('Failed to save patient:', error);
            }

            setLoading(false);
        }, 1500);
    };

    const generateMockResult = (data) => {
        const isHighRisk = parseInt(data.hr) > 110 || parseInt(data.rr) > 24 || parseInt(data.spo2) < 92;

        return {
            summary: `Patient presents with ${data.complaint} for ${data.duration}. Vitals indicate ${isHighRisk ? "signs of instability" : "stability"}.`,
            riskLevel: isHighRisk ? "High" : "Medium",
            riskColor: isHighRisk ? "red" : "amber",
            redFlags: isHighRisk ? ["Tachycardia", "Hypoxia potential"] : ["Monitor for changes"],
            doNotMiss: ["Sepsis", "PE", "ACS"],
            suggestedTests: ["CBC", "BMP", "Lactate", "ECG", "CXR"],
            monitoring: "Continuous cardiac monitoring. Reassess vitals q1h.",
            note: `HISTORY OF PRESENT ILLNESS:
${data.age} year old ${data.sex} presenting with ${data.complaint} starting ${data.duration} ago.

ASSESSMENT:
Clinical picture suggests possible infectious or cardiac etiology. Risk stratification: ${isHighRisk ? "High" : "Medium"}.

PLAN:
1. Immediate IV access and fluids if hypotensive.
2. Send labs: CBC, BMP, Trop, Lactate.
3. Imaging: CXR.
4. Admit for observation if no improvement.`,
            aiSummary: `Based on the presentation, this ${data.age}-year-old ${data.sex} with ${data.complaint} requires immediate attention. Initial workup should focus on ruling out life-threatening conditions. Consider early consultation if patient deteriorates.`,
            confidence: isHighRisk ? 88 : 92
        };
    };

    const handleTemplateSelect = (template) => {
        setSelectedTemplate(template);
        if (template === 'chest_pain') {
            setFormData({
                ...formData,
                age: "55",
                sex: "male",
                complaint: "Chest pain - substernal, pressure-like",
                duration: "2 hours",
                bpSys: "145",
                bpDia: "90",
                hr: "95",
                rr: "18",
                spo2: "97",
                temp: "98.2",
                history: "HTN, DM, Smoker"
            });
        } else if (template === 'respiratory') {
            setFormData({
                ...formData,
                age: "68",
                sex: "female",
                complaint: "Shortness of breath, worse with exertion",
                duration: "3 days",
                bpSys: "130",
                bpDia: "85",
                hr: "110",
                rr: "28",
                spo2: "89",
                temp: "99.8",
                history: "COPD, ex-smoker"
            });
        } else if (template === 'trauma') {
            setFormData({
                ...formData,
                age: "32",
                sex: "male",
                complaint: "MVA - moderate speed collision, chest/abd pain",
                duration: "30 minutes",
                bpSys: "105",
                bpDia: "70",
                hr: "115",
                rr: "24",
                spo2: "95",
                temp: "98.0",
                history: "No significant PMH"
            });
        }
    };

    const calculateProgress = () => {
        const fields = ['age', 'sex', 'complaint', 'bpSys', 'hr', 'rr', 'spo2', 'temp'];
        const filled = fields.filter(f => formData[f] && formData[f].toString().trim() !== '').length;
        return Math.round((filled / fields.length) * 100);
    };

    const scrollToForm = () => {
        document.getElementById('er-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans page-animate-in">
            <div className="w-full px-6 py-12">

                {/* HERO SECTION with Image Background */}
                <div className="relative text-center mb-12 py-12 -mx-6 px-6 overflow-hidden">
                    {/* Image Background */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src="/images/Emergency.jpg"
                            alt="Emergency room background"
                            className="absolute w-full h-full object-cover"
                            style={{ opacity: 0.5 }}
                        />
                        {/* Dark gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-slate-950/60 to-slate-950" />
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-transparent to-slate-950/40" />
                    </div>

                    {/* Hero Content */}
                    <div className="relative z-10">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-900/20 border border-amber-600/40 text-amber-400 text-xs font-semibold mb-6">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                            </svg>
                            For licensed clinicians only - Clinical decision support, not autonomous care
                        </div>

                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Emergency Care
                        </h1>

                        <p className="text-xl text-slate-300 mb-8">
                            Real-time AI assistant for triage, risk stratification, and disposition support at the bedside.
                        </p>

                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {!result && (
                                <button
                                    onClick={scrollToForm}
                                    className="px-8 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-lg rounded-xl transition-all hover:-translate-y-1 shadow-xl"
                                >
                                    Run Emergency Care Analysis →
                                </button>
                            )}
                            <a
                                href="/patient-history"
                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium text-sm rounded-xl transition-all border border-slate-700 hover:border-slate-600 flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                                <span>View Patient History</span>
                            </a>
                        </div>
                    </div>
                </div>

                {/* WHAT YOU GET SECTION */}
                <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 mb-12">
                    <h2 className="text-lg font-bold text-white mb-6 text-center">What You Get</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="flex gap-3">
                            <svg className="w-6 h-6 text-sky-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                            </svg>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Risk flags within 30-60 seconds</h3>
                                <p className="text-sm text-slate-400">Immediate triage support for high-acuity presentations</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <svg className="w-6 h-6 text-purple-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Structured differential and red flags</h3>
                                <p className="text-sm text-slate-400">Don't-miss diagnoses highlighted for clinician review</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <svg className="w-6 h-6 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                                <h3 className="font-semibold text-white mb-1">Checklists aligned with ER pathways</h3>
                                <p className="text-sm text-slate-400">Evidence-based workup suggestions for common presentations</p>
                            </div>
                        </div>
                    </div>

                    <p className="text-center text-xs text-slate-500 mt-6 italic">
                        Designed to fit into existing triage and physician workflows; no EHR integration required to start.
                    </p>
                </div>

                {/* COMPACT DISCLAIMER CARD */}
                <div className="bg-gradient-to-r from-amber-900/10 via-red-900/10 to-amber-900/10 border border-amber-500/30 rounded-xl p-5 mb-8">
                    <div className="flex items-start gap-3">
                        <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                        </svg>
                        <div className="flex-1">
                            <h3 className="text-amber-400 font-bold text-sm mb-2">
                                Clinical Decision Support Only – Not a Medical Device
                            </h3>

                            <div className="text-xs text-slate-300 leading-relaxed space-y-1">
                                <p>This tool provides decision support only and does not diagnose, treat, prevent, or cure any disease. All AI recommendations must be independently verified by the treating physician, who retains sole responsibility for final medical decisions.</p>
                                <p className="text-slate-400 mt-2">MedAura AI assumes no responsibility for clinical decisions or patient outcomes.</p>
                            </div>

                            <button
                                onClick={() => setShowDisclaimerDetails(!showDisclaimerDetails)}
                                className="mt-3 text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1"
                            >
                                <span>{showDisclaimerDetails ? '▼' : '▶'}</span>
                                <span>{showDisclaimerDetails ? 'Hide' : 'View'} full terms</span>
                            </button>

                            {showDisclaimerDetails && (
                                <div className="mt-3 pt-3 border-t border-amber-500/20 text-xs text-slate-400 space-y-2">
                                    <p>By using this tool, you acknowledge that you are a licensed healthcare professional and understand these limitations.</p>
                                    <p>For complete terms and conditions, please review our <a href="/terms" className="text-amber-400 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-amber-400 hover:underline">Privacy Policy</a>.</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* FORM SECTION */}
                {!result && (
                    <div id="er-form" className="w-full mb-12">
                        {/* Progress Bar with Phase Labels */}
                        <div className="mb-6">
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-sm font-semibold text-slate-400">Form Completion</h2>
                                <span className="text-sky-400 font-semibold text-sm">{calculateProgress()}%</span>
                            </div>
                            <div className="h-2 bg-slate-800 rounded-full overflow-hidden mb-2">
                                <div
                                    className="h-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-all duration-300"
                                    style={{ width: `${calculateProgress()}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs text-slate-500">
                                <span className={calculateProgress() >= 25 ? 'text-sky-400' : ''}>Patient</span>
                                <span className={calculateProgress() >= 50 ? 'text-sky-400' : ''}>Vitals</span>
                                <span className={calculateProgress() >= 75 ? 'text-sky-400' : ''}>History</span>
                                <span className={calculateProgress() === 100 ? 'text-sky-400' : ''}>Workup</span>
                            </div>
                        </div>

                        {/* Quick Templates */}
                        <div className="mb-8">
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Quick Templates</h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                <button
                                    onClick={() => handleTemplateSelect('chest_pain')}
                                    className={`p-4 rounded-xl text-left transition-all group ${selectedTemplate === 'chest_pain'
                                        ? 'bg-sky-900/30 border-2 border-sky-500'
                                        : 'bg-slate-900/50 border border-slate-800 hover:border-sky-500'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <svg className="w-6 h-6 text-red-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                                        </svg>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1 group-hover:text-sky-400">Chest Pain</h4>
                                            <p className="text-xs text-slate-400">Rule-out ACS, PE, aortic dissection</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleTemplateSelect('respiratory')}
                                    className={`p-4 rounded-xl text-left transition-all group ${selectedTemplate === 'respiratory'
                                        ? 'bg-purple-900/30 border-2 border-purple-500'
                                        : 'bg-slate-900/50 border border-slate-800 hover:border-purple-500'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">🫑</span>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1 group-hover:text-purple-400">Respiratory</h4>
                                            <p className="text-xs text-slate-400">Hypoxia, dyspnea, respiratory distress</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => handleTemplateSelect('trauma')}
                                    className={`p-4 rounded-xl text-left transition-all group ${selectedTemplate === 'trauma'
                                        ? 'bg-red-900/30 border-2 border-red-500'
                                        : 'bg-slate-900/50 border border-slate-800 hover:border-red-500'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className="text-2xl">🚑</span>
                                        <div>
                                            <h4 className="font-semibold text-white mb-1 group-hover:text-red-400">Trauma</h4>
                                            <p className="text-xs text-slate-400">ATLS-focused assessment</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Three Column Layout - Patient, Vitals, History side by side */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

                                {/* Patient & Presentation Card */}
                                <div className="bg-[#0F1729] rounded-2xl p-6 border border-slate-800/50">
                                    <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-5 pb-3 border-b border-slate-800">
                                        Patient Information
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div>
                                                <label className="text-xs font-medium text-slate-300 mb-1.5 block">Age</label>
                                                <input
                                                    type="number"
                                                    name="age"
                                                    value={formData.age}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm"
                                                    placeholder="55"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-slate-300 mb-1.5 block">Sex</label>
                                                <select
                                                    name="sex"
                                                    value={formData.sex}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm cursor-pointer"
                                                >
                                                    <option value="male">Male</option>
                                                    <option value="female">Female</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-slate-300 mb-1.5 block">Duration</label>
                                                <input
                                                    type="text"
                                                    name="duration"
                                                    value={formData.duration}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm"
                                                    placeholder="2h"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-xs font-medium text-slate-300 mb-1.5 block">
                                                Patient Name (Optional)
                                            </label>
                                            <input
                                                type="text"
                                                name="patientName"
                                                value={formData.patientName}
                                                onChange={handleChange}
                                                className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm"
                                                placeholder="Full name or first name"
                                            />
                                            <p className="text-xs text-slate-500 mt-1">
                                                Optional - helps you find this patient later
                                            </p>
                                        </div>

                                        <div>
                                            <label className="text-xs font-medium text-slate-300 mb-1.5 block">Presenting Symptoms</label>
                                            <textarea
                                                name="complaint"
                                                value={formData.complaint}
                                                onChange={handleChange}
                                                rows={3}
                                                className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none resize-none transition-all text-sm"
                                                placeholder="Chest pain - substernal, pressure-like"
                                                required
                                            />
                                            <p className="text-xs text-slate-500 mt-1">
                                                e.g., "Severe headache - sudden onset"
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Vital Signs Card */}
                                <div className="bg-[#0F1729] rounded-2xl p-6 border border-slate-800/50">
                                    <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-5 pb-3 border-b border-slate-800">
                                        Vital Signs
                                    </h2>

                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <label className="text-xs font-medium text-slate-300 mb-1.5 block">BP Sys</label>
                                                <input
                                                    type="number"
                                                    name="bpSys"
                                                    value={formData.bpSys}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm"
                                                    placeholder="120"
                                                />
                                                <p className="text-xs text-slate-600 mt-0.5">90-130</p>
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-slate-300 mb-1.5 block">BP Dia</label>
                                                <input
                                                    type="number"
                                                    name="bpDia"
                                                    value={formData.bpDia}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm"
                                                    placeholder="80"
                                                />
                                                <p className="text-xs text-slate-600 mt-0.5">60-85</p>
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-slate-300 mb-1.5 block">HR</label>
                                                <input
                                                    type="number"
                                                    name="hr"
                                                    value={formData.hr}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm"
                                                    placeholder="75"
                                                />
                                                <p className="text-xs text-slate-600 mt-0.5">60-100</p>
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-slate-300 mb-1.5 block">RR</label>
                                                <input
                                                    type="number"
                                                    name="rr"
                                                    value={formData.rr}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm"
                                                    placeholder="16"
                                                />
                                                <p className="text-xs text-slate-600 mt-0.5">12-20</p>
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-slate-300 mb-1.5 block">SpO2 (%)</label>
                                                <input
                                                    type="number"
                                                    name="spo2"
                                                    value={formData.spo2}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm"
                                                    placeholder="98"
                                                />
                                                <p className="text-xs text-slate-600 mt-0.5">&gt;94%</p>
                                            </div>

                                            <div>
                                                <label className="text-xs font-medium text-slate-300 mb-1.5 block">Temp (°F)</label>
                                                <input
                                                    type="number"
                                                    step="0.1"
                                                    name="temp"
                                                    value={formData.temp}
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none transition-all text-sm"
                                                    placeholder="98.6"
                                                />
                                                <p className="text-xs text-slate-600 mt-0.5">97-99°F</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* History / Context Card */}
                                <div className="bg-[#0F1729] rounded-2xl p-6 border border-slate-800/50">
                                    <h2 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-5 pb-3 border-b border-slate-800">
                                        History / Context
                                    </h2>

                                    <div>
                                        <label className="text-xs font-medium text-slate-300 mb-1.5 block">
                                            Past Medical History & Medications
                                        </label>
                                        <textarea
                                            name="history"
                                            value={formData.history}
                                            onChange={handleChange}
                                            rows={10}
                                            className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none resize-none transition-all text-sm leading-relaxed"
                                            placeholder="HTN, DM2, Metformin, Lisinopril&#10;&#10;Allergies: None&#10;&#10;Family Hx: CAD"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            Chronic conditions, medications, allergies
                                        </p>
                                    </div>

                                    <div className="mt-4">
                                        <label className="text-xs font-medium text-slate-300 mb-1.5 block">
                                            Test Results & Workup
                                        </label>
                                        <textarea
                                            name="tests"
                                            value={formData.tests}
                                            onChange={handleChange}
                                            rows={6}
                                            className="w-full px-3 py-2.5 rounded-lg bg-[#1A2332] border border-slate-700 text-white placeholder-slate-500 focus:border-[#2DD4BF] focus:ring-2 focus:ring-[#2DD4BF]/20 outline-none resize-none transition-all text-sm leading-relaxed"
                                            placeholder="Labs: WBC 12, Troponin pending&#10;ECG: NSR&#10;CT: Negative for PE"
                                        />
                                        <p className="text-xs text-slate-500 mt-1">
                                            Lab results, imaging, diagnostic tests
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Clinical Acknowledgment & Submit - Below Cards */}
                            <div className="max-w-2xl mx-auto">
                                <div className="bg-[#0F1729] rounded-2xl p-6 border border-slate-800/50 mb-5">
                                    <div className="flex items-start gap-3">
                                        <input
                                            type="checkbox"
                                            id="er-acknowledgment"
                                            checked={hasAcknowledged}
                                            onChange={(e) => setHasAcknowledged(e.target.checked)}
                                            className="mt-0.5 w-5 h-5 rounded border-slate-600 text-[#2DD4BF] focus:ring-[#2DD4BF] focus:ring-offset-2 focus:ring-offset-[#0F1729] cursor-pointer"
                                        />
                                        <label htmlFor="er-acknowledgment" className="flex-1 cursor-pointer">
                                            <p className="text-sm text-white">
                                                I acknowledge that I am a licensed healthcare professional and understand this is a decision support tool only. I will independently verify all recommendations before making clinical decisions.
                                            </p>
                                        </label>
                                    </div>
                                </div>

                                {/* SUBMIT BUTTON */}
                                <div className="flex justify-center">
                                    <button
                                        type="submit"
                                        disabled={!hasAcknowledged || loading}
                                        className={`px-8 py-4 rounded-xl font-semibold text-sm transition-all shadow-xl min-w-[280px] ${!hasAcknowledged || loading
                                            ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                            : 'bg-gradient-to-r from-[#2DD4BF] to-[#38BDF8] text-white hover:shadow-2xl hover:shadow-[#2DD4BF]/30 hover:-translate-y-0.5 active:translate-y-0'
                                            }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                <span>Analyzing...</span>
                                            </div>
                                        ) : (
                                            hasAcknowledged ? 'Run ER Co-Pilot Analysis' : 'Please acknowledge to continue'
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {/* Loading State */}
                {
                    loading && (
                        <div className="max-w-2xl mx-auto text-center py-12">
                            <div className="inline-flex items-center gap-3 mb-4">
                                <svg className="animate-spin h-8 w-8 text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">Analyzing Case...</h3>
                            <p className="text-slate-400">Running AI risk stratification and clinical decision support</p>
                        </div>
                    )
                }

                {/* Results Section */}
                {
                    result && !loading && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            {/* Confidence Score */}
                            <ConfidenceScore score={result.confidence} />

                            {/* Risk Assessment */}
                            <div className={`p-6 rounded-xl border-2 ${result.riskLevel === 'High'
                                ? 'bg-red-900/20 border-red-500'
                                : 'bg-amber-900/20 border-amber-500'
                                }`}>
                                <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                                    <svg className="w-6 h-6 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                    </svg>
                                    Risk Assessment: {result.riskLevel}
                                </h3>
                                <p className="text-slate-300 mb-4">{result.summary}</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <h4 className="text-sm font-bold text-red-400 mb-2">Red Flags</h4>
                                        <ul className="space-y-1">
                                            {result.redFlags.map((flag, i) => (
                                                <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                                    <span className="text-red-400">•</span>
                                                    {flag}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div>
                                        <h4 className="text-sm font-bold text-amber-400 mb-2">Don't Miss</h4>
                                        <ul className="space-y-1">
                                            {result.doNotMiss.map((diagnosis, i) => (
                                                <li key={i} className="text-sm text-slate-300 flex items-center gap-2">
                                                    <span className="text-amber-400">•</span>
                                                    {diagnosis}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            {/* Suggested Tests */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span>🧪</span>
                                    Suggested Workup
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {result.suggestedTests.map((test, i) => (
                                        <span key={i} className="px-3 py-1.5 bg-sky-900/30 border border-sky-700/50 rounded-lg text-sm text-sky-300">
                                            {test}
                                        </span>
                                    ))}
                                </div>
                                <p className="text-sm text-slate-400 mt-4">{result.monitoring}</p>
                            </div>

                            {/* Clinical Note */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                    <span>📝</span>
                                    Generated Clinical Note
                                </h3>
                                <pre className="text-sm text-slate-300 whitespace-pre-wrap font-mono bg-slate-950 p-4 rounded-lg">
                                    {result.note}
                                </pre>
                            </div>

                            {/* Reset Button */}
                            <button
                                onClick={() => {
                                    setResult(null);
                                    setHasAcknowledged(false);
                                }}
                                className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl transition-colors"
                            >
                                ← Analyze Another Case
                            </button>
                        </div>
                    )
                }
            </div >
        </div >
    );
}
