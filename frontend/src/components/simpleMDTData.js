// Simple Mock Data for Clean MDT View

export const simpleMDTData = {
    // Critical Alerts (only truly critical)
    criticalAlerts: [
        {
            title: "Elevated Troponin with ST Changes",
            description: "STEMI pattern detected. Immediate cath lab activation required."
        },
        {
            title: "Acute Kidney Injury (Stage 2)",
            description: "Creatinine 2.8 mg/dL. Urgent nephrology consult needed."
        }
    ],

    // At-a-Glance Summary
    summary: {
        risk: "HIGH",
        urgency: "IMMEDIATE",
        department: "Cardiology",
        diagnosis: "Acute Anterior STEMI",
        action: "Immediate cath lab activation within 90 minutes"
    },

    // Top 3 Actions
    topActions: [
        {
            title: "Urgent Cardiac Catheterization",
            description: "Immediate cath lab activation for primary PCI",
            confidence: 95,
            why: "ST elevation in V2-V4, elevated troponin (12.5 ng/mL)"
        },
        {
            title: "Nephrology Consultation",
            description: "Urgent consult for AKI Stage 2 management",
            confidence: 90,
            why: "Creatinine 2.8 mg/dL (2.5x baseline), eGFR 28"
        },
        {
            title: "Intensive Insulin Therapy",
            description: "Initiate basal-bolus insulin regimen",
            confidence: 85,
            why: "HbA1c 8.2%, current glucose 285 mg/dL"
        }
    ]
};

// Keep existing detailed data for expandable sections
export { mockMDTData } from './mockMDTData';
