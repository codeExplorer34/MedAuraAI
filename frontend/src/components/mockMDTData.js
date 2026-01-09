// Mock Data for MDT Review Core Components

// 1. RISK STRATIFICATION DATA
export const mockRiskData = {
    overall: 75,
    mortality: 65,
    complication: 80,
    readmission: 70,
    factorsCount: 12,
    calculation: "Risk score derived from patient demographics (age 68, male), comorbidities (diabetes, hypertension, prior MI), vital signs (elevated BP, tachycardia), lab values (elevated troponin, BNP), and presenting symptoms (chest pain, dyspnea). Validated against 50,000+ similar cardiac cases in our database."
};

// 2. RED FLAG ALERTS DATA
export const mockRedFlags = [
    {
        id: 1,
        severity: 'critical',
        title: 'Elevated Troponin with ST-Segment Changes',
        description: 'Patient shows STEMI pattern on ECG with troponin level of 12.5 ng/mL (normal <0.04). ST elevation in leads V2-V4 suggests anterior wall MI.',
        action: 'Immediate cath lab activation. Door-to-balloon time target <90 minutes. Dual antiplatelet therapy initiated.'
    },
    {
        id: 2,
        severity: 'critical',
        title: 'Acute Kidney Injury (Stage 2)',
        description: 'Creatinine elevated to 2.8 mg/dL (baseline 1.1). eGFR dropped from 65 to 28 mL/min. Oliguria noted (urine output <400mL/24h).',
        action: 'Nephrology consult urgent. Hold nephrotoxic agents. Monitor fluid balance closely. Consider dialysis if worsening.'
    },
    {
        id: 3,
        severity: 'high',
        title: 'Uncontrolled Diabetes (HbA1c 8.2%)',
        description: 'Poor glycemic control contributing to cardiovascular risk. Random glucose 285 mg/dL. Patient non-compliant with insulin regimen.',
        recommendation: 'Endocrine consult for insulin optimization. Diabetes education. Consider continuous glucose monitoring.'
    },
    {
        id: 4,
        severity: 'high',
        title: 'Potential Drug Interaction',
        description: 'Patient on warfarin (INR 3.2) with planned clopidogrel. Increased bleeding risk.',
        recommendation: 'Cardiology to assess bleeding vs thrombotic risk. Consider bridging strategy or alternative antiplatelet agent.'
    }
];

// 3. AI RECOMMENDATIONS DATA
export const mockRecommendations = [
    {
        icon: '🫀',
        title: 'Urgent Cardiac Catheterization',
        category: 'Diagnostic Procedure',
        recommendation: 'Immediate cath lab activation for primary PCI. Patient presents with STEMI (anterior wall) with ongoing chest pain and hemodynamic stability. Door-to-balloon time critical.',
        confidence: 95,
        whyFactors: [
            'ST elevation >2mm in leads V2-V4 (anterior STEMI pattern)',
            'Elevated troponin I: 12.5 ng/mL (highly specific for MI)',
            'Ongoing chest pain despite nitroglycerin',
            'Hemodynamically stable (BP 145/90, no shock)'
        ],
        evidence: 'ACC/AHA STEMI Guidelines 2021 - Class I recommendation for primary PCI within 90 minutes for STEMI presentation'
    },
    {
        icon: '💊',
        title: 'Intensive Insulin Therapy',
        category: 'Medical Management',
        recommendation: 'Initiate basal-bolus insulin regimen with close glucose monitoring. Target glucose 140-180 mg/dL during acute phase. Transition to outpatient regimen with endocrine follow-up.',
        confidence: 85,
        whyFactors: [
            'HbA1c 8.2% indicates chronic poor control',
            'Current glucose 285 mg/dL (acute hyperglycemia)',
            'Diabetes increases post-MI complications by 2-3x',
            'Patient non-compliant with oral agents'
        ],
        evidence: 'ADA Standards of Care 2024 - Intensive glucose control in acute MI reduces cardiovascular events'
    },
    {
        icon: '🩺',
        title: 'Nephrology Consultation',
        category: 'Specialist Consult',
        recommendation: 'Urgent nephrology consult for acute kidney injury management. Assess need for renal replacement therapy. Optimize fluid balance and avoid nephrotoxic contrast if possible.',
        confidence: 90,
        whyFactors: [
            'Creatinine 2.8 mg/dL (2.5x baseline) = Stage 2 AKI',
            'eGFR dropped from 65 to 28 mL/min',
            'Oliguria (<400mL/24h) suggests pre-renal or intrinsic cause',
            'Contrast-induced nephropathy risk with planned cath'
        ],
        evidence: 'KDIGO AKI Guidelines - Early nephrology involvement improves outcomes in Stage 2+ AKI'
    },
    {
        icon: '🔬',
        title: 'Serial Cardiac Biomarkers',
        category: 'Diagnostic Workup',
        recommendation: 'Repeat troponin and BNP at 6 and 12 hours. Monitor for peak troponin to assess infarct size. BNP trending helps assess heart failure development.',
        confidence: 75,
        whyFactors: [
            'Initial troponin 12.5 ng/mL (highly elevated)',
            'BNP 450 pg/mL suggests volume overload',
            'Serial markers guide prognosis and treatment intensity'
        ],
        evidence: 'ESC Guidelines - Serial biomarkers recommended for risk stratification in ACS'
    },
    {
        icon: '⚠️',
        title: 'Anticoagulation Bridge Strategy',
        category: 'Treatment Plan',
        recommendation: 'Hold warfarin temporarily. Bridge with unfractionated heparin for PCI. Resume warfarin post-procedure with careful INR monitoring. Consider DOAC transition if appropriate.',
        confidence: 55,
        whyFactors: [
            'Current INR 3.2 (elevated bleeding risk)',
            'Need for dual antiplatelet therapy post-PCI',
            'Warfarin indication unclear from history'
        ],
        evidence: 'Limited evidence - requires individualized assessment of bleeding vs thrombotic risk. Low confidence due to incomplete medication history.'
    }
];

// 4. CASE TIMELINE DATA
export const mockTimelineEvents = [
    {
        id: 1,
        type: 'admission',
        title: 'ED Presentation',
        time: 'Day 1, 08:30 AM',
        summary: 'Patient presented with acute chest pain, diaphoresis, and dyspnea',
        details: '68-year-old male with history of diabetes, hypertension, and prior MI (2019) presented to ED via EMS with crushing substernal chest pain radiating to left arm. Pain started 2 hours ago while at rest. Associated with diaphoresis, nausea, and shortness of breath. Denies recent trauma or exertion.',
        badge: 'Chief Complaint',
        data: {
            'BP': '145/90 mmHg',
            'HR': '105 bpm',
            'RR': '22/min',
            'SpO2': '94% on RA',
            'Temp': '37.2°C'
        },
        actions: [
            'Aspirin 325mg PO given',
            'IV access established',
            'Oxygen 2L NC started',
            'Continuous cardiac monitoring'
        ],
        responsible: 'Dr. Sarah Chen (EM Attending)'
    },
    {
        id: 2,
        type: 'ecg',
        title: 'Initial ECG',
        time: 'Day 1, 08:35 AM',
        summary: 'ST elevation in anterior leads (V2-V4)',
        details: 'ECG shows sinus tachycardia at 105 bpm with ST elevation >2mm in leads V2, V3, V4. Reciprocal ST depression in inferior leads. Q waves not yet formed. Findings consistent with acute anterior STEMI.',
        badge: 'STEMI Alert',
        data: {
            'Heart Rate': '105 bpm',
            'QRS Duration': '98 ms',
            'QTc': '445 ms',
            'ST Elevation': 'V2-V4 (2-3mm)'
        },
        actions: [
            'STEMI alert activated',
            'Cardiology paged STAT',
            'Cath lab team notified'
        ],
        responsible: 'Dr. Sarah Chen (EM Attending)'
    },
    {
        id: 3,
        type: 'labs',
        title: 'Initial Labs Drawn',
        time: 'Day 1, 08:40 AM',
        summary: 'Comprehensive metabolic panel, cardiac biomarkers, CBC',
        details: 'Blood drawn for troponin, BNP, CMP, CBC, coags. Results pending.',
        data: {
            'Troponin I': '12.5 ng/mL (↑↑)',
            'BNP': '450 pg/mL (↑)',
            'Creatinine': '2.8 mg/dL (↑)',
            'Glucose': '285 mg/dL (↑)',
            'WBC': '12.5 K/µL',
            'Hemoglobin': '13.2 g/dL',
            'Platelets': '245 K/µL',
            'INR': '3.2 (↑)'
        },
        actions: [
            'Critical values called to physician',
            'Nephrology consult requested',
            'Insulin sliding scale initiated'
        ],
        responsible: 'Lab Team'
    },
    {
        id: 4,
        type: 'imaging',
        title: 'Portable Chest X-Ray',
        time: 'Day 1, 09:00 AM',
        summary: 'Mild pulmonary edema, cardiomegaly',
        details: 'Portable AP chest x-ray shows cardiomegaly (CTR 0.58), mild pulmonary vascular congestion, and small bilateral pleural effusions. No pneumothorax or acute infiltrate.',
        data: {
            'CTR': '0.58 (enlarged)',
            'Findings': 'Pulmonary edema',
            'Effusions': 'Small bilateral'
        },
        actions: [
            'Furosemide 40mg IV given',
            'Strict I/O monitoring'
        ],
        responsible: 'Dr. James Liu (Radiology)'
    },
    {
        id: 5,
        type: 'consultation',
        title: 'Cardiology Consult',
        time: 'Day 1, 09:15 AM',
        summary: 'Interventional cardiology evaluated patient',
        details: 'Dr. Martinez (interventional cardiology) evaluated patient at bedside. Confirmed STEMI diagnosis. Patient hemodynamically stable. Discussed risks/benefits of primary PCI with patient and family. Consent obtained.',
        actions: [
            'Consent for cardiac catheterization obtained',
            'Dual antiplatelet therapy: Aspirin 325mg + Ticagrelor 180mg',
            'Heparin bolus 60 units/kg + infusion',
            'Patient transferred to cath lab'
        ],
        responsible: 'Dr. Robert Martinez (Cardiology)'
    },
    {
        id: 6,
        type: 'treatment',
        title: 'Cardiac Catheterization',
        time: 'Day 1, 10:30 AM',
        summary: 'Primary PCI with stent placement to LAD',
        details: 'Successful primary PCI performed. 99% occlusion of proximal LAD identified. Drug-eluting stent (3.0 x 18mm) deployed with excellent result. TIMI 3 flow restored. No complications. Door-to-balloon time: 122 minutes.',
        data: {
            'Vessel': 'LAD (proximal)',
            'Stenosis': '99% occlusion',
            'Stent': '3.0 x 18mm DES',
            'Final TIMI': 'Grade 3',
            'Door-to-Balloon': '122 minutes'
        },
        actions: [
            'Stent deployed successfully',
            'Post-PCI medications adjusted',
            'Transfer to CCU for monitoring'
        ],
        responsible: 'Dr. Robert Martinez (Cardiology)'
    },
    {
        id: 7,
        type: 'decision',
        title: 'MDT Discussion',
        time: 'Day 1, 02:00 PM',
        summary: 'Multidisciplinary team reviewed case',
        details: 'Team including cardiology, nephrology, endocrinology, and pharmacy reviewed case. Consensus on treatment plan: continue dual antiplatelet therapy, optimize diabetes management, nephrology to manage AKI, cardiac rehab referral.',
        actions: [
            'Treatment plan finalized',
            'Family meeting scheduled',
            'Discharge planning initiated'
        ],
        responsible: 'MDT Team'
    },
    {
        id: 8,
        type: 'current',
        title: 'Current Status',
        time: 'Day 2, 10:00 AM',
        summary: 'Patient stable in CCU, awaiting further management decisions',
        details: 'Patient currently in CCU, chest pain resolved. Hemodynamically stable. Repeat troponin trending down. Creatinine stable at 2.7. Awaiting nephrology recommendations and diabetes optimization.',
        badge: 'Current',
        data: {
            'Location': 'CCU Bed 3',
            'Status': 'Stable',
            'Pain': '0/10',
            'Latest Troponin': '8.2 ng/mL (↓)',
            'Latest Creatinine': '2.7 mg/dL (stable)'
        },
        responsible: 'Dr. Emily Wong (CCU Attending)'
    }
];

// EXPORT ALL MOCK DATA
export const mockMDTData = {
    riskData: mockRiskData,
    redFlags: mockRedFlags,
    recommendations: mockRecommendations,
    timelineEvents: mockTimelineEvents
};
