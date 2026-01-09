import React, { useState } from "react";
import { jsPDF } from "jspdf";
import {
    SpecialistConsultationLoader,
    ConsensusMeter,
    CaseComplexityMeter,
    ExpandableSpecialistCard,
    TreatmentComparisonTable,
    MDTNotes,
    CharacterCounter
} from "./MDTComponents";
import { TreatmentDetailCard } from "./TreatmentDetailCard";
import { ClinicalCommandCenter } from "./ClinicalCommandCenter";
import { EnhancedSafetyBanner } from "./EnhancedSafetyBanner";
import { SpecialistDetailModal } from "./SpecialistDetailModal";
import { ClinicalGovernanceFooter } from "./ClinicalGovernanceFooter";
import { RiskStratificationBlock } from "./RiskStratificationBlock";
import { RedFlagAlerts } from "./RedFlagAlerts";
import { AIRecommendationPanel } from "./AIRecommendationPanel";
import { InteractiveCaseTimeline } from "./InteractiveCaseTimeline";
import { CriticalAlertsCard } from "./CriticalAlertsBar";
import { AtAGlanceSummaryCard } from "./AtAGlanceSummary";
import { NextStepsCard } from "./TopActionsCard";
import { ExpandableSection } from "./ExpandableSection";
import { CaseStatusStrip } from "./CaseStatusStrip";
import { mockMDTData, simpleMDTData } from "./simpleMDTData";
import ConfidenceScore from "./ConfidenceScore";
import "../homepage-animations.css";

export default function MDTReviewPagePolished() {
    const [formData, setFormData] = useState({
        symptoms: "",
        history: "",
        reports: "",
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedSpecialist, setSelectedSpecialist] = useState(null);
    const [hasAcknowledged, setHasAcknowledged] = useState(false);
    const [showDisclaimerDetails, setShowDisclaimerDetails] = useState(false);
    const [showAcknowledgmentDetails, setShowAcknowledgmentDetails] = useState(false);

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
        const doc = new jsPDF();
        doc.setFontSize(22);
        doc.text("MedAura AI - MDT Case Review", 20, 20);
        doc.save("MedAura_MDT_Report.pdf");
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!hasAcknowledged) return;

        setLoading(true);
        setTimeout(() => {
            setResult(generateMockMDTResult(formData));
            setLoading(false);
        }, 2000);
    };

    const generateMockMDTResult = (data) => {
        return {
            coordinator: {
                department: "Cardiology & Internal Medicine",
                concerns: "Complex presentation with overlapping cardiac and metabolic risks.",
                redFlags: ["Elevated Troponin", "Unstable Angina signs"],
                tests: ["Coronary Angiography", "HbA1c", "Echo"],
                urgency: "High - Admit immediately",
                explanation: "The patient's symptoms combined with history suggest an acute coronary syndrome on top of uncontrolled diabetes. Immediate cardiac evaluation is priority."
            },
            specialists: [
                {
                    name: "General Medicine",
                    content: "Focus on glycemic control. Current history suggests diabetic ketoacidosis risk is low but needs monitoring.",
                    details: {
                        findings: ["HbA1c elevated at 8.2%", "No ketones in urine", "Blood glucose 180 mg/dL"],
                        recommendations: ["Continue metformin", "Add insulin if needed", "Monitor glucose q4h"]
                    }
                },
                {
                    name: "Cardiology",
                    content: "HIGH ALERT. Symptoms mimic unstable angina. Recommend immediate ECG and Trop series. Consider cath lab.",
                    details: {
                        findings: ["Troponin elevated", "ST changes on ECG", "Chest pain ongoing"],
                        recommendations: ["Immediate cath lab", "Aspirin + Heparin", "Cardiology consult STAT"]
                    }
                },
                {
                    name: "Neurology",
                    content: "Low suspicion for neurological cause. Dizziness likely secondary to cardiac output or hypotension.",
                    details: {
                        findings: ["No focal deficits", "Normal cranial nerves", "Orthostatic vitals negative"],
                        recommendations: ["No immediate neuro workup", "Reassess if symptoms persist"]
                    }
                },
                {
                    name: "Gastroenterology",
                    content: "Epigastric pain could be GERD but cardiac causes must be ruled out first. PPI trial recommended after cardiac clearance.",
                    details: {
                        findings: ["Epigastric tenderness", "No rebound", "No guarding"],
                        recommendations: ["Rule out cardiac first", "PPI trial if cardiac clear", "Consider EGD if persistent"]
                    }
                },
                {
                    name: "Psychiatry",
                    content: "Patient reports high anxiety. Likely reactive to physical symptoms. Supportive care recommended.",
                    details: {
                        findings: ["Anxiety present", "No suicidal ideation", "Reactive to medical condition"],
                        recommendations: ["Supportive therapy", "Anxiolytic PRN", "Reassess after medical stabilization"]
                    }
                }
            ],
            consensus: 85,
            complexity: 78
        };
    };

    const scrollToForm = () => {
        document.getElementById('case-intake-form')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
            <div className="max-w-6xl mx-auto px-6 py-12">

                {/* HERO SECTION */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-900/20 border border-sky-700/40 text-sky-400 text-xs font-bold uppercase tracking-wider mb-6">
                        Clinical Decision Support
                    </div>

                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        MDT Follow-Up Review
                    </h1>

                    <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
                        AI-powered multidisciplinary follow-up review to catch what single-specialty workflows miss.
                    </p>

                    {!result && (
                        <button
                            onClick={scrollToForm}
                            className="px-8 py-4 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white font-bold text-lg rounded-xl transition-all hover:-translate-y-1 shadow-xl"
                        >
                            Start MDT Review →
                        </button>
                    )}
                </div>

                {/* PROOF METRICS BAND */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-sky-400 mb-2">5</div>
                        <div className="text-sm font-semibold text-white mb-1">Specialist AI Agents</div>
                        <div className="text-xs text-slate-500">Cardiology, Neurology, GI, Psychiatry, General Medicine</div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-purple-400 mb-2">&lt;2 min</div>
                        <div className="text-sm font-semibold text-white mb-1">Analysis Time</div>
                        <div className="text-xs text-slate-500">Comprehensive multi-specialty review in minutes</div>
                    </div>

                    <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
                        <div className="text-4xl font-bold text-emerald-400 mb-2">24/7</div>
                        <div className="text-sm font-semibold text-white mb-1">Availability</div>
                        <div className="text-xs text-slate-500">Instant specialist consensus anytime, anywhere</div>
                    </div>
                </div>

                {/* COMPACT DISCLAIMER CARD */}
                <div className="bg-gradient-to-r from-amber-900/10 via-red-900/10 to-amber-900/10 border border-amber-500/30 rounded-xl p-5 mb-8">
                    <div className="flex items-start gap-3">
                        <span className="text-2xl">⚠️</span>
                        <div className="flex-1">
                            <h3 className="text-amber-400 font-bold text-sm mb-3">
                                Clinical Decision Support Only – Not a Medical Device
                            </h3>

                            <ul className="space-y-2 text-xs text-slate-300">
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-400 mt-0.5">•</span>
                                    <span><strong>Decision support only:</strong> This tool does not diagnose, treat, prevent, or cure any disease.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-400 mt-0.5">•</span>
                                    <span><strong>Physician responsibility:</strong> All AI recommendations must be independently verified. Final medical decisions rest solely with the treating physician.</span>
                                </li>
                                <li className="flex items-start gap-2">
                                    <span className="text-amber-400 mt-0.5">•</span>
                                    <span><strong>No liability:</strong> MedAuraAI is not responsible for clinical decisions, patient outcomes, or actions based on AI recommendations.</span>
                                </li>
                            </ul>

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

                {/* HOW IT WORKS */}
                {!result && (
                    <div className="bg-slate-900/30 border border-slate-800 rounded-xl p-8 mb-12">
                        <h2 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h2>

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
                )}

                {/* FORM SECTION */}
                {!result && (
                    <div id="case-intake-form" className="max-w-3xl mx-auto mb-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Case Data Card */}
                            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
                                <h2 className="text-2xl font-bold text-white mb-6">Case Data</h2>

                                {/* Step 1 */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500 flex items-center justify-center text-sky-400 text-sm font-bold flex-shrink-0">1</div>
                                        <label className="text-sm font-semibold text-white">Symptoms & Presentation</label>
                                    </div>
                                    <textarea
                                        name="symptoms"
                                        rows={4}
                                        className="block w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all resize-none"
                                        value={formData.symptoms}
                                        onChange={handleChange}
                                        placeholder="Describe the patient's current symptoms, chief complaint, and clinical presentation..."
                                        required
                                    />
                                    <div className="flex justify-between items-center mt-2">
                                        <p className="text-xs text-slate-500">Include onset, severity, and progression</p>
                                        <CharacterCounter value={formData.symptoms} maxLength={500} minRecommended={100} />
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="mb-8">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-purple-500/20 border border-purple-500 flex items-center justify-center text-purple-400 text-sm font-bold flex-shrink-0">2</div>
                                        <label className="text-sm font-semibold text-white">Medical History</label>
                                    </div>
                                    <textarea
                                        name="history"
                                        rows={3}
                                        className="block w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none transition-all resize-none"
                                        value={formData.history}
                                        onChange={handleChange}
                                        placeholder="Past medical conditions, surgeries, medications, allergies..."
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Include chronic conditions and relevant family history</p>
                                </div>

                                {/* Step 3 */}
                                <div>
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-400 text-sm font-bold flex-shrink-0">3</div>
                                        <label className="text-sm font-semibold text-white">Reports / Labs</label>
                                    </div>
                                    <textarea
                                        name="reports"
                                        rows={4}
                                        className="block w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-700 text-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none font-mono text-sm"
                                        value={formData.reports}
                                        onChange={handleChange}
                                        placeholder="Paste lab/imaging reports or summaries here..."
                                    />
                                    <p className="text-xs text-slate-500 mt-2">Copy and paste relevant test results, imaging reports, or clinical notes</p>
                                </div>
                            </div>

                            {/* Physician Acknowledgment Card */}
                            <div className="bg-slate-900/50 border-2 border-amber-500/30 rounded-xl p-6">
                                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-4">
                                    Physician Acknowledgment (Required)
                                </h3>

                                <div className="flex items-start gap-3 mb-4">
                                    <input
                                        type="checkbox"
                                        id="acknowledgment-checkbox"
                                        checked={hasAcknowledged}
                                        onChange={(e) => setHasAcknowledged(e.target.checked)}
                                        className="mt-1 w-5 h-5 rounded border-slate-600 text-sky-500 focus:ring-sky-500 focus:ring-offset-slate-900 flex-shrink-0"
                                    />
                                    <label htmlFor="acknowledgment-checkbox" className="text-sm text-slate-300 cursor-pointer">
                                        I am a licensed healthcare professional. I understand MedAuraAI provides <strong className="text-white">decision support only</strong> and I will independently verify all recommendations.
                                    </label>
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setShowAcknowledgmentDetails(!showAcknowledgmentDetails)}
                                    className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1"
                                >
                                    <span>{showAcknowledgmentDetails ? '▼' : '▶'}</span>
                                    <span>Read full details</span>
                                </button>

                                {showAcknowledgmentDetails && (
                                    <div className="mt-4 pt-4 border-t border-amber-500/20 text-xs text-slate-400 space-y-2">
                                        <p>By checking this box, you confirm that:</p>
                                        <ul className="list-disc list-inside space-y-1 ml-2">
                                            <li>You are a licensed healthcare professional authorized to use clinical decision support tools</li>
                                            <li>You understand this tool does not replace clinical judgment or standard of care</li>
                                            <li>You will independently verify all AI-generated recommendations before clinical use</li>
                                            <li>The final medical decision and patient responsibility rest solely with you as the treating physician</li>
                                            <li>This acknowledgment will be logged for audit and compliance purposes</li>
                                        </ul>
                                    </div>
                                )}

                                {!hasAcknowledged && (
                                    <div className="mt-3 flex items-center gap-2 text-xs text-amber-400">
                                        <span>⚠️</span>
                                        <span>Please acknowledge these terms before continuing</span>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!hasAcknowledged || loading}
                                className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all flex items-center justify-center gap-2 ${!hasAcknowledged || loading
                                        ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white hover:-translate-y-1'
                                    }`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Analyzing...</span>
                                    </>
                                ) : hasAcknowledged ? (
                                    <>
                                        <span>👥</span>
                                        <span>Run Multi-Specialist Review</span>
                                    </>
                                ) : (
                                    <>
                                        <span>⚠️</span>
                                        <span>Acknowledge Terms to Continue</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                )}

                {/* Loading State */}
                {loading && (
                    <SpecialistConsultationLoader
                        specialists={['General Medicine', 'Cardiology', 'Neurology', 'Gastroenterology', 'Psychiatry']}
                    />
                )}

                {/* Results Section */}
                {result && !loading && (
                    <div className="space-y-10">
                        <ClinicalCommandCenter
                            urgency={{
                                level: result.coordinator.urgency.includes('High') ? 'HIGH' :
                                    result.coordinator.urgency.includes('Medium') ? 'MEDIUM' : 'LOW',
                                action: result.coordinator.urgency,
                                department: result.coordinator.department
                            }}
                            consensus={result.consensus}
                            complexity={result.complexity}
                        />

                        <div className="max-w-[1400px] mx-auto px-8 space-y-8">
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2 space-y-6">
                                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
                                        <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
                                            <span>💊</span> Recommended Actions
                                        </h3>
                                        <p className="text-sm text-slate-400 mb-4">AI specialist perspectives for clinician review</p>
                                        <AIRecommendationPanel recommendations={mockMDTData.recommendations} />
                                    </div>

                                    <ExpandableSection title="Risk Breakdown" icon="⚠️">
                                        <RiskStratificationBlock riskData={mockMDTData.riskData} />
                                    </ExpandableSection>

                                    <ExpandableSection title="Specialist Perspectives (5)" icon="👥">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {result.specialists.map((spec, index) => (
                                                <div key={spec.name} className="space-y-3">
                                                    <ConfidenceScore
                                                        score={85 + Math.floor(Math.random() * 15)}
                                                        label={`${spec.name} Confidence`}
                                                        showExplanation={false}
                                                    />
                                                    <ExpandableSpecialistCard specialist={spec} index={index} />
                                                </div>
                                            ))}
                                        </div>
                                    </ExpandableSection>
                                </div>

                                <div className="lg:col-span-1">
                                    <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 sticky top-4">
                                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                            <span>📅</span> Case Timeline
                                        </h3>
                                        <div className="space-y-3 max-h-[800px] overflow-y-auto pr-2">
                                            {mockMDTData.timelineEvents.map((event, i) => (
                                                <div key={i} className="p-3 bg-slate-950 rounded-lg border border-slate-800 hover:border-sky-500 transition-all cursor-pointer">
                                                    <div className="flex items-start gap-2">
                                                        <span className="text-lg">{event.type === 'admission' ? '🏥' : event.type === 'labs' ? '🧪' : event.type === 'imaging' ? '📷' : event.type === 'ecg' ? '📈' : event.type === 'treatment' ? '💊' : event.type === 'consultation' ? '👨‍⚕️' : event.type === 'decision' ? '✓' : '📍'}</span>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="text-xs text-slate-500 mb-1">{event.time}</div>
                                                            <div className="text-sm font-semibold text-white">{event.title}</div>
                                                            <div className="text-xs text-slate-400 mt-1 line-clamp-2">{event.summary}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="max-w-6xl mx-auto">
                                <h3 className="text-2xl font-semibold text-white mb-8 text-center">Recommended Treatment Options</h3>
                                <TreatmentComparisonTable treatments={treatments} />
                            </div>

                            <div className="max-w-4xl mx-auto">
                                <MDTNotes />
                            </div>

                            <div className="max-w-3xl mx-auto pt-6 border-t border-slate-800">
                                <button
                                    onClick={generatePDF}
                                    className="w-full py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center gap-2 transition-colors shadow-lg"
                                >
                                    <span>📄</span> Download Comprehensive PDF Report
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {result && <ClinicalGovernanceFooter />}
            </div>

            {selectedSpecialist && (
                <SpecialistDetailModal
                    specialist={selectedSpecialist}
                    onClose={() => setSelectedSpecialist(null)}
                />
            )}
        </div>
    );
}
