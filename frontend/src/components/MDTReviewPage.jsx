import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import { savePatient } from "../utils/patientStorage";
import { useSearchParams } from "react-router-dom";
import { SkeletonMDTResults } from "./SkeletonLoaders";
import MDTClinicalSections from "./MDTClinicalSections";
import { mockMDTData } from "./simpleMDTData";

export default function MDTReviewPage() {
    const [searchParams] = useSearchParams();

    const [formData, setFormData] = useState({
        patientName: "",
        age: "",
        gender: "",
        symptoms: "",
        history: "",
        reports: "",
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [hasAcknowledged, setHasAcknowledged] = useState(false);
    const [fromERPatient, setFromERPatient] = useState(null);

    // Pre-fill form if coming from ER patient
    useEffect(() => {
        const patientId = searchParams.get('patientId');
        if (patientId) {
            setFormData({
                patientName: searchParams.get('patientName') || '',
                age: searchParams.get('age') || '',
                gender: searchParams.get('gender') || '',
                symptoms: searchParams.get('symptoms') || '',
                history: '',
                reports: ''
            });
            setFromERPatient(patientId);
        }
    }, [searchParams]);

    const treatments = [
        {
            "option_number": 1,
            "match_percentage": 95,
            "primary_name": "Urgent Urological Evaluation and Prostate Biopsy",
            "overview": "This intervention aims to definitively diagnose the nature of the prostatic pathology. Given the elevated PSA (9.5 ng/mL), enlarged firm prostate with nodules on ultrasound, and a family history of prostate cancer, an urgent urological evaluation and prostate biopsy are critical to rule out or confirm malignancy.",
            "modality": "Diagnostic (Interventional/Surgical)",
            "success_rate": 95,
            "duration": "Initial consult: 30-60 min; Biopsy procedure: 30-60 min",
            "recovery_time": "1-3 days for mild discomfort; avoid strenuous activity for 1 week",
            "cost_estimate": "Moderate (consultation, procedure, pathology fees)",
            "side_effects": [
                "Pain or discomfort at biopsy site",
                "Rectal bleeding (hematochezia)",
                "Blood in urine (hematuria)",
                "Blood in semen (hematospermia)",
                "Urinary tract infection (UTI)",
                "Acute urinary retention (rare)"
            ]
        }
    ];

    const generatePDF = () => {
        if (!result) return;

        const doc = new jsPDF();
        let yPos = 20;

        doc.setFontSize(18);
        doc.text("MDT Clinical Review Report", 20, yPos);
        yPos += 10;

        doc.setFontSize(12);
        doc.text(`Patient: ${formData.patientName}`, 20, yPos);
        yPos += 7;
        doc.text(`Age: ${formData.age} | Gender: ${formData.gender}`, 20, yPos);
        yPos += 10;

        doc.text("Clinical Summary:", 20, yPos);
        yPos += 7;
        doc.setFontSize(10);
        const summary = result.coordinator?.summary || "";
        const splitSummary = doc.splitTextToSize(summary, 170);
        doc.text(splitSummary, 20, yPos);

        doc.save('mdt-clinical-review.pdf');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!hasAcknowledged) return;

        setLoading(true);

        await new Promise(resolve => setTimeout(resolve, 3000));

        const mockResult = {
            ...mockMDTData,
            treatments
        };

        setResult(mockResult);
        setLoading(false);

        savePatient({
            ...formData,
            date: new Date().toLocaleDateString(),
            diagnosis: mockResult.coordinator?.summary || 'MDT Review Completed'
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
            {!result && !loading && (
                <>
                    {/* HERO HEADER */}
                    <div className="bg-slate-900/50 border-b border-slate-800">
                        <div className="max-w-4xl mx-auto px-6 py-12 text-center">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-medium uppercase tracking-wider mb-4">
                                Clinical Decision Support
                            </div>
                            <h1 className="text-4xl font-semibold text-slate-100 mb-3">
                                MDT Follow-Up Review
                            </h1>
                            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                                AI-powered multidisciplinary follow-up review to catch what single-specialty workflows miss
                            </p>
                        </div>
                    </div>

                    {/* STATS BAR */}
                    <div className="bg-slate-900/50 border-b border-slate-800">
                        <div className="max-w-5xl mx-auto px-6 py-6">
                            <div className="grid grid-cols-3 gap-8">
                                <div className="text-center">
                                    <div className="text-3xl font-semibold text-sky-400 mb-1">5</div>
                                    <div className="text-sm font-medium text-slate-300">Specialist AI Agents</div>
                                    <div className="text-xs text-slate-500 mt-1">Cardiology, Neurology, GI, Psychiatry, General Medicine</div>
                                </div>
                                <div className="text-center border-l border-r border-slate-700">
                                    <div className="text-3xl font-semibold text-purple-400 mb-1">&lt;2 min</div>
                                    <div className="text-sm font-medium text-slate-300">Analysis Time</div>
                                    <div className="text-xs text-slate-500 mt-1">Comprehensive multi-specialty review in minutes</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-semibold text-emerald-400 mb-1">24/7</div>
                                    <div className="text-sm font-medium text-slate-300">Availability</div>
                                    <div className="text-xs text-slate-500 mt-1">Instant specialist consensus, anywhere</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* DISCLAIMER */}
                    <div className="max-w-4xl mx-auto px-6 py-8">
                        <div style={{ backgroundColor: 'rgba(217, 119, 6, 0.1)', border: '1px solid rgba(217, 119, 6, 0.3)' }} className="rounded-xl p-6">
                            <div className="flex gap-4">
                                <svg className="w-6 h-6 text-amber-400 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                                <div className="flex-1">
                                    <h3 className="text-sm font-semibold text-amber-200 mb-3">
                                        Clinical Decision Support Only – Not a Medical Device
                                    </h3>
                                    <ul className="space-y-2 text-sm text-amber-100/90">
                                        <li className="flex gap-2">
                                            <span className="text-amber-400">•</span>
                                            <span><strong>Decision support only:</strong> This tool does not diagnose, treat, prevent, or cure any disease.</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-amber-400">•</span>
                                            <span><strong>Physician responsibility:</strong> All AI recommendations must be independently verified. Final medical decisions rest solely with the treating physician.</span>
                                        </li>
                                        <li className="flex gap-2">
                                            <span className="text-amber-400">•</span>
                                            <span><strong>No liability:</strong> MedAuraAI is not responsible for clinical decisions, patient outcomes, or actions based on AI recommendations.</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* HOW IT WORKS */}
                    <div className="max-w-4xl mx-auto px-6 py-8">
                        <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8">
                            <h2 className="text-2xl font-semibold text-white mb-6 text-center">How It Works</h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-sky-500/20 border-2 border-sky-500 flex items-center justify-center text-sky-400 font-bold">1</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Submit Case Data</h3>
                                        <p className="text-sm text-slate-400">Provide symptoms, medical history, and test results</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-purple-500/20 border-2 border-purple-500 flex items-center justify-center text-purple-400 font-bold">2</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">AI Specialists Review</h3>
                                        <p className="text-sm text-slate-400">5 AI agents analyze across multiple disciplines</p>
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <div className="flex-shrink-0">
                                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 font-bold">3</div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-white mb-1">Receive Consensus</h3>
                                        <p className="text-sm text-slate-400">Get recommendations and key red flags</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* QUICK TEMPLATES */}
                    <div className="max-w-4xl mx-auto px-6 pb-8">
                        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Quick Templates</h3>
                                <span className="text-xs text-slate-500">Click to auto-fill demo cases</span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        patientName: 'John Smith',
                                        age: '62',
                                        gender: 'male',
                                        symptoms: 'Severe chest pain radiating to left arm, diaphoresis, shortness of breath. Pain started 2 hours ago while at rest.',
                                        history: 'Hypertension x 10 years, Type 2 Diabetes, Hyperlipidemia. Previous MI 5 years ago.',
                                        reports: 'ECG: ST elevation V2-V4, Troponin I: 2.4 ng/mL, BP: 145/92'
                                    })}
                                    className="p-3 rounded-lg bg-red-900/20 border border-red-500/30 hover:border-red-400 transition-all text-left"
                                >
                                    <div className="text-sm font-semibold text-red-400 mb-1">Cardiac Case</div>
                                    <div className="text-xs text-slate-500">STEMI presentation</div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        patientName: 'Mary Johnson',
                                        age: '58',
                                        gender: 'female',
                                        symptoms: 'Sudden onset severe headache "worst of my life", neck stiffness, photophobia, nausea and vomiting.',
                                        history: 'Uncontrolled hypertension, smoker 30 pack-years, family history of aneurysm.',
                                        reports: 'CT Head: Subarachnoid hemorrhage in basal cisterns. BP: 185/110, GCS: 14'
                                    })}
                                    className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/30 hover:border-purple-400 transition-all text-left"
                                >
                                    <div className="text-sm font-semibold text-purple-400 mb-1">Neuro Case</div>
                                    <div className="text-xs text-slate-500">SAH presentation</div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        patientName: 'Robert Chen',
                                        age: '45',
                                        gender: 'male',
                                        symptoms: 'Acute severe abdominal pain RLQ, nausea, vomiting x2, fever 38.5°C.',
                                        history: 'No significant PMH, No prior surgeries, NKDA.',
                                        reports: 'WBC: 15,200, CRP: 145 mg/L, CT: Enlarged appendix 12mm with fat stranding'
                                    })}
                                    className="p-3 rounded-lg bg-amber-900/20 border border-amber-500/30 hover:border-amber-400 transition-all text-left"
                                >
                                    <div className="text-sm font-semibold text-amber-400 mb-1">GI Case</div>
                                    <div className="text-xs text-slate-500">Acute appendicitis</div>
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setFormData({
                                        patientName: 'Susan Williams',
                                        age: '72',
                                        gender: 'female',
                                        symptoms: 'Progressive urinary frequency, urgency, nocturia x4. Pelvic discomfort.',
                                        history: 'Family history prostate cancer (father), HTN, elevated PSA trend.',
                                        reports: 'PSA: 9.5 ng/mL, DRE: Enlarged firm prostate with nodules'
                                    })}
                                    className="p-3 rounded-lg bg-emerald-900/20 border border-emerald-500/30 hover:border-emerald-400 transition-all text-left"
                                >
                                    <div className="text-sm font-semibold text-emerald-400 mb-1">Urology Case</div>
                                    <div className="text-xs text-slate-500">Elevated PSA</div>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* FORM SECTION */}
                    <div className="max-w-4xl mx-auto px-6 pb-12">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Patient Information */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-xl">
                                <div className="px-6 py-4 border-b border-slate-800">
                                    <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Patient Information</h3>
                                </div>
                                <div className="p-6 space-y-5">
                                    <div className="grid grid-cols-3 gap-5">
                                        <div>
                                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                                                Patient Name <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={formData.patientName}
                                                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                                                className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                placeholder="Enter patient name"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                                                Age <span className="text-red-400">*</span>
                                            </label>
                                            <input
                                                type="number"
                                                required
                                                value={formData.age}
                                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                                className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                                placeholder="Age"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                                                Gender <span className="text-red-400">*</span>
                                            </label>
                                            <select
                                                required
                                                value={formData.gender}
                                                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                                className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                                            >
                                                <option value="">Select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                                <option value="other">Other</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                                            Presenting Symptoms <span className="text-red-400">*</span>
                                        </label>
                                        <textarea
                                            required
                                            value={formData.symptoms}
                                            onChange={(e) => setFormData({ ...formData, symptoms: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                                            placeholder="Detailed description of symptoms, onset, duration, severity..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                                            Medical History
                                        </label>
                                        <textarea
                                            value={formData.history}
                                            onChange={(e) => setFormData({ ...formData, history: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                                            placeholder="Past medical history, medications, allergies, surgical history..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-slate-400 uppercase tracking-wide mb-2">
                                            Test Results & Reports
                                        </label>
                                        <textarea
                                            value={formData.reports}
                                            onChange={(e) => setFormData({ ...formData, reports: e.target.value })}
                                            rows={4}
                                            className="w-full px-4 py-2.5 bg-slate-950/50 border border-slate-700 rounded-lg text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent resize-none"
                                            placeholder="Lab results, imaging findings, ECG, vital signs..."
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Physician Acknowledgment */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={hasAcknowledged}
                                        onChange={(e) => setHasAcknowledged(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded border-slate-600 bg-slate-950/50 text-sky-500 focus:ring-2 focus:ring-sky-500"
                                    />
                                    <span className="text-sm text-slate-300">
                                        <strong className="text-slate-200">I acknowledge</strong> that I am a licensed healthcare professional and understand this is a decision support tool only. I will independently verify all recommendations before making clinical decisions.
                                    </span>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!hasAcknowledged}
                                className="w-full py-4 px-6 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-semibold text-base transition-colors"
                            >
                                {hasAcknowledged ? 'Generate MDT Review' : 'Please acknowledge to continue'}
                            </button>
                        </form>
                    </div>
                </>
            )}

            {/* Loading State */}
            {loading && (
                <div className="max-w-4xl mx-auto px-6 py-20">
                    <SkeletonMDTResults />
                </div>
            )}

            {/* Results Section - Full Page Navigation Layout */}
            {result && !loading && (
                <MDTClinicalSections result={result} formData={formData} generatePDF={generatePDF} />
            )}
        </div>
    );
}
