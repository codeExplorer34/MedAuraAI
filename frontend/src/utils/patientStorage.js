/**
 * Patient Data Storage Utility - Encounter-Based System
 * Uses localStorage for demo - max 50 patients
 * Each patient can have multiple encounters (ER, MDT)
 */

const STORAGE_KEY = 'medaura_patients';
const MAX_RECORDS = 50;

/**
 * Generate unique patient ID
 */
export function generatePatientId() {
    return `patient_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Generate unique encounter ID
 */
function generateEncounterId() {
    return `encounter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get all patients from localStorage
 */
export function getAllPatients() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        const patients = JSON.parse(data);

        // Migrate old format to new format if needed
        return patients.map(patient => {
            if (!patient.encounters) {
                // Old format - convert to new format
                return {
                    id: patient.id,
                    patientInfo: patient.patientInfo,
                    encounters: [{
                        id: generateEncounterId(),
                        type: patient.type,
                        timestamp: patient.timestamp,
                        chiefComplaint: patient.patientInfo?.chiefComplaint,
                        vitals: patient.vitals,
                        aiAnalysis: patient.aiAnalysis,
                        specialists: patient.specialists
                    }]
                };
            }
            return patient;
        });
    } catch (error) {
        console.error('Error reading patients:', error);
        return [];
    }
}

/**
 * Find patient by name and demographics
 */
function findPatientByDemographics(name, age, gender) {
    const patients = getAllPatients();
    if (!name) return null;

    const nameLower = name.toLowerCase().trim();

    return patients.find(p => {
        const patientNameLower = (p.patientInfo?.name || '').toLowerCase().trim();
        const nameMatch = patientNameLower === nameLower;

        // If name matches, optionally check age/gender for better accuracy
        if (nameMatch) {
            if (age && p.patientInfo?.age && p.patientInfo.age !== age) return false;
            if (gender && p.patientInfo?.gender && p.patientInfo.gender !== gender) return false;
            return true;
        }
        return false;
    });
}

/**
 * Save a new patient encounter
 */
export function savePatient(encounterData) {
    try {
        const patients = getAllPatients();

        const { type, patientInfo, vitals, aiAnalysis, specialists } = encounterData;

        // Try to find existing patient
        const existingPatient = findPatientByDemographics(
            patientInfo?.name,
            patientInfo?.age,
            patientInfo?.gender
        );

        if (existingPatient) {
            // Add encounter to existing patient
            const newEncounter = {
                id: generateEncounterId(),
                type,
                timestamp: new Date().toISOString(),
                chiefComplaint: patientInfo?.chiefComplaint,
                vitals,
                aiAnalysis,
                specialists
            };

            existingPatient.encounters.push(newEncounter);

            // Save updated patients list
            localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));

            console.log(`✓ Added ${type} encounter to existing patient:`, existingPatient.id);
            return existingPatient;
        } else {
            // Create new patient with first encounter
            // Enforce 50 patient limit
            if (patients.length >= MAX_RECORDS) {
                patients.sort((a, b) => {
                    const aLatest = Math.max(...a.encounters.map(e => new Date(e.timestamp)));
                    const bLatest = Math.max(...b.encounters.map(e => new Date(e.timestamp)));
                    return aLatest - bLatest;
                });
                patients.shift(); // Remove oldest patient
            }

            const newPatient = {
                id: generatePatientId(),
                patientInfo: {
                    name: patientInfo?.name,
                    age: patientInfo?.age,
                    gender: patientInfo?.gender
                },
                encounters: [{
                    id: generateEncounterId(),
                    type,
                    timestamp: new Date().toISOString(),
                    chiefComplaint: patientInfo?.chiefComplaint,
                    vitals,
                    aiAnalysis,
                    specialists
                }]
            };

            patients.push(newPatient);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));

            console.log(`✓ Created new patient with ${type} encounter:`, newPatient.id);
            return newPatient;
        }
    } catch (error) {
        console.error('Error saving patient:', error);
        throw error;
    }
}

/**
 * Get a specific patient by ID
 */
export function getPatient(patientId) {
    const patients = getAllPatients();
    return patients.find(p => p.id === patientId);
}

/**
 * Delete a patient record
 */
export function deletePatient(patientId) {
    try {
        const patients = getAllPatients();
        const filtered = patients.filter(p => p.id !== patientId);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
        return true;
    } catch (error) {
        console.error('Error deleting patient:', error);
        return false;
    }
}

/**
 * Search patients by query
 */
export function searchPatients(query) {
    const patients = getAllPatients();
    const lowerQuery = query.toLowerCase();

    return patients.filter(patient => {
        const searchFields = [
            patient.patientInfo?.name,
            patient.patientInfo?.age?.toString(),
            patient.patientInfo?.gender,
            patient.id
        ];

        // Also search in encounter data
        patient.encounters?.forEach(enc => {
            searchFields.push(enc.type);
            searchFields.push(enc.chiefComplaint);
        });

        return searchFields.some(field =>
            field?.toLowerCase().includes(lowerQuery)
        );
    });
}

/**
 * Get storage stats
 */
export function getStorageStats() {
    const patients = getAllPatients();
    let erCount = 0;
    let mdtCount = 0;

    patients.forEach(patient => {
        patient.encounters?.forEach(enc => {
            if (enc.type === 'ER') erCount++;
            if (enc.type === 'MDT') mdtCount++;
        });
    });

    return {
        total: patients.length,
        maxRecords: MAX_RECORDS,
        remaining: MAX_RECORDS - patients.length,
        erCases: erCount,
        mdtCases: mdtCount
    };
}

/**
 * Clear all patient data (for demo reset)
 */
export function clearAllPatients() {
    try {
        localStorage.removeItem(STORAGE_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing patients:', error);
        return false;
    }
}

/**
 * Merge duplicate patients by name/age/gender
 * Combines separate records into one patient with multiple encounters
 */
export function mergeDuplicatePatients() {
    try {
        const patients = getAllPatients();
        const merged = new Map();

        patients.forEach(patient => {
            // Create a key based on patient demographics
            const name = (patient.patientInfo?.name || '').toLowerCase().trim();
            const age = patient.patientInfo?.age;
            const gender = patient.patientInfo?.gender;

            if (!name) {
                // Skip patients without names
                return;
            }

            const key = `${name}_${age}_${gender}`;

            if (merged.has(key)) {
                // Patient already exists - merge encounters
                const existing = merged.get(key);
                existing.encounters.push(...patient.encounters);
            } else {
                // New patient
                merged.set(key, patient);
            }
        });

        // Convert map back to array and add back patients without names
        const mergedPatients = Array.from(merged.values());
        const patientsWithoutNames = patients.filter(p => !(p.patientInfo?.name || '').trim());

        const finalPatients = [...mergedPatients, ...patientsWithoutNames];

        // Save merged data
        localStorage.setItem(STORAGE_KEY, JSON.stringify(finalPatients));

        const savedCount = patients.length - finalPatients.length;
        console.log(`✓ Merged ${patients.length} records into ${finalPatients.length} patients (saved ${savedCount} duplicates)`);
        return { before: patients.length, after: finalPatients.length, merged: savedCount };
    } catch (error) {
        console.error('Error merging patients:', error);
        throw error;
    }
}
