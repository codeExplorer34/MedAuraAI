import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import { getAllPatients, deletePatient, searchPatients, getStorageStats } from '../utils/patientStorage';
import { DashboardAppBar, CriticalAlertBanner } from './DashboardComponents';
import '../sidebar.css';

// Icons
const Icons = {
    ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>,
    ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>,
    ChevronLeft: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>,
    Users: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
    Ambulance: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 10H6M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" /><path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" /><path d="M8 8v4" /><circle cx="17" cy="18" r="2" /><circle cx="7" cy="18" r="2" /></svg>,
    ClipboardList: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" /><path d="M12 11h4M12 16h4M8 11h.01M8 16h.01" /></svg>,
    Search: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>,
    Home: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9,22 9,12 15,12 15,22" /></svg>,
    AlertTriangle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>,
    Plus: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>,
    Clock: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><polyline points="12,6 12,12 16,14" /></svg>,
    Trash: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3,6 5,6 21,6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>,
    Eye: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>,
};

// Sidebar Components
const SidebarContext = createContext();
function SidebarProvider({ children }) {
    const [collapsed, setCollapsed] = useState(false);
    return <SidebarContext.Provider value={{ collapsed, setCollapsed }}>{children}</SidebarContext.Provider>;
}
function Sidebar({ children }) {
    const { collapsed } = useContext(SidebarContext);
    return <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>{children}</aside>;
}
function SidebarHeader({ children }) { return <div className="sidebar-header">{children}</div>; }
function SidebarContent({ children }) { return <div className="sidebar-content">{children}</div>; }
function SidebarFooter({ children }) { return <div className="sidebar-footer">{children}</div>; }
function SidebarGroup({ children }) { return <div className="sidebar-group">{children}</div>; }
function SidebarGroupLabel({ children }) { return <div className="sidebar-group-label">{children}</div>; }
function SidebarMenu({ children }) { return <ul className="sidebar-menu">{children}</ul>; }
function SidebarMenuItem({ children }) { return <li className="sidebar-menu-item">{children}</li>; }
function SidebarMenuButton({ children, active, onClick, asChild, href }) {
    if (asChild && href) return <Link to={href} className={`sidebar-menu-button ${active ? 'active' : ''}`}>{children}</Link>;
    return <button className={`sidebar-menu-button ${active ? 'active' : ''}`} onClick={onClick}>{children}</button>;
}
function SidebarSeparator() { return <div className="sidebar-separator" />; }
function SidebarToggle() {
    const { collapsed, setCollapsed } = useContext(SidebarContext);

    // Only show floating button when collapsed
    if (!collapsed) return null;

    return (
        <button
            onClick={() => setCollapsed(false)}
            style={{
                position: 'fixed',
                top: '16px',
                left: '16px',
                width: '44px',
                height: '44px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                boxShadow: '0 4px 15px rgba(14, 165, 233, 0.4)',
                zIndex: 1000,
                transition: 'transform 0.2s, box-shadow 0.2s'
            }}
            title="Open sidebar"
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
        >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
        </button>
    );
}

// Sidebar close button (inside header)
function SidebarCloseButton() {
    const { setCollapsed } = useContext(SidebarContext);
    return (
        <button
            onClick={() => setCollapsed(true)}
            className="sidebar-trigger"
            title="Hide sidebar"
        >
            <Icons.ChevronLeft />
        </button>
    );
}

// Main content wrapper - adjusts padding when sidebar is collapsed
function MainContent({ children }) {
    const { collapsed } = useContext(SidebarContext);
    return (
        <main style={{
            flex: 1,
            overflow: 'auto',
            background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
            paddingLeft: collapsed ? '70px' : '0',
            transition: 'padding-left 0.2s ease'
        }}>
            {children}
        </main>
    );
}

// Collapsible Section
function CollapsibleSection({ title, icon, defaultOpen = true, children, badgeCount }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div style={{ background: 'rgba(15, 23, 42, 0.5)', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
            <button onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', background: 'transparent', border: 'none', cursor: 'pointer', color: '#f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '18px' }}>{icon}</span>
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>{title}</span>
                    {badgeCount !== undefined && <span style={{ padding: '2px 8px', background: '#0ea5e920', color: '#38bdf8', borderRadius: '12px', fontSize: '12px', fontWeight: '600' }}>{badgeCount}</span>}
                </div>
                <div style={{ transition: 'transform 0.2s', transform: isOpen ? 'rotate(0)' : 'rotate(-90deg)' }}><Icons.ChevronDown /></div>
            </button>
            <div style={{ maxHeight: isOpen ? '2000px' : '0', overflow: 'hidden', transition: 'max-height 0.3s ease', padding: isOpen ? '0 24px 24px' : '0 24px' }}>{children}</div>
        </div>
    );
}

// Toast
function Toast({ message, type = 'success', onClose }) {
    useEffect(() => { const timer = setTimeout(onClose, 3000); return () => clearTimeout(timer); }, [onClose]);
    const colors = { success: { bg: '#22c55e20', border: '#22c55e50', text: '#86efac' }, error: { bg: '#ef444420', border: '#ef444450', text: '#fca5a5' }, info: { bg: '#0ea5e920', border: '#0ea5e950', text: '#7dd3fc' } };
    const c = colors[type];
    return (
        <div style={{ position: 'fixed', bottom: '24px', right: '24px', padding: '14px 20px', background: c.bg, border: `1px solid ${c.border}`, borderRadius: '10px', color: c.text, fontSize: '14px', fontWeight: '500', zIndex: 1000, animation: 'slideIn 0.3s ease', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>{message}</div>
    );
}

// Main Dashboard
export default function ClinicalDashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [patients, setPatients] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [activeView, setActiveView] = useState('list');
    const [activeTab, setActiveTab] = useState('overview');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterType, setFilterType] = useState('ALL');
    const [stats, setStats] = useState({ total: 0, erCases: 0, mdtCases: 0 });
    const [toast, setToast] = useState(null);
    const [recentlyViewed, setRecentlyViewed] = useState([]);
    const [caseNotes, setCaseNotes] = useState({});
    const [newNote, setNewNote] = useState('');

    // CSS Keyframes
    useEffect(() => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
            @keyframes slideIn { from { transform: translateX(100px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
            @keyframes pulse-border { 0%, 100% { border-color: rgba(239, 68, 68, 0.3); } 50% { border-color: rgba(239, 68, 68, 0.6); } }
            @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        `;
        document.head.appendChild(style);
        return () => document.head.removeChild(style);
    }, []);

    // Load recently viewed from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('medaura_recent_patients');
        if (saved) setRecentlyViewed(JSON.parse(saved));
        const savedNotes = localStorage.getItem('medaura_case_notes');
        if (savedNotes) setCaseNotes(JSON.parse(savedNotes));
    }, []);

    useEffect(() => {
        const auth = localStorage.getItem('medaura_auth');
        if (!auth) { navigate('/login'); return; }
        const parsed = JSON.parse(auth);
        if (!parsed.isAuthenticated) { navigate('/login'); return; }
        setUser(parsed.user);
        loadPatients();
    }, [navigate]);

    const loadPatients = () => {
        const allPatients = getAllPatients();
        allPatients.sort((a, b) => {
            const aLatest = a.encounters?.length ? Math.max(...a.encounters.map(e => new Date(e.timestamp))) : 0;
            const bLatest = b.encounters?.length ? Math.max(...b.encounters.map(e => new Date(e.timestamp))) : 0;
            return bLatest - aLatest;
        });
        setPatients(allPatients);
        setStats(getStorageStats());
    };

    const handleLogout = () => { localStorage.removeItem('medaura_auth'); navigate('/login'); };
    const handleDeletePatient = (patientId, e) => {
        e?.stopPropagation();
        if (window.confirm('Delete this patient and all encounters?')) {
            deletePatient(patientId);
            loadPatients();
            if (selectedPatient?.id === patientId) { setSelectedPatient(null); setActiveView('list'); }
            setToast({ message: 'Patient deleted successfully', type: 'success' });
        }
    };

    const handleSelectPatient = (patient) => {
        setSelectedPatient(patient);
        setActiveView('detail');
        setActiveTab('overview');
        // Track recently viewed (keep last 5)
        const updated = [
            { id: patient.id, name: patient.patientInfo?.name || 'Unknown', timestamp: Date.now() },
            ...recentlyViewed.filter(p => p.id !== patient.id)
        ].slice(0, 5);
        setRecentlyViewed(updated);
        localStorage.setItem('medaura_recent_patients', JSON.stringify(updated));
    };

    const handleBackToList = () => {
        setActiveView('list');
        setSelectedPatient(null);
    };

    const addCaseNote = () => {
        if (!newNote.trim() || !selectedPatient) return;
        const patientId = selectedPatient.id;
        const note = {
            id: Date.now(),
            text: newNote.trim(),
            author: user?.name || 'Dr. Unknown',
            timestamp: new Date().toISOString()
        };
        const updated = { ...caseNotes, [patientId]: [...(caseNotes[patientId] || []), note] };
        setCaseNotes(updated);
        localStorage.setItem('medaura_case_notes', JSON.stringify(updated));
        setNewNote('');
        setToast({ message: 'Note added to case discussion', type: 'success' });
    };

    const getLatestEncounter = (patient) => {
        if (!patient?.encounters?.length) return null;
        return patient.encounters.reduce((latest, current) => new Date(current.timestamp) > new Date(latest.timestamp) ? current : latest);
    };

    const getTimeAgo = (dateString) => {
        if (!dateString) return '';
        const diff = Date.now() - new Date(dateString).getTime();
        const hours = Math.floor(diff / (1000 * 60 * 60));
        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

    const getRiskColor = (riskScore) => {
        if (riskScore >= 70) return { bg: 'rgba(239, 68, 68, 0.15)', text: '#fca5a5', dot: '#ef4444' };
        if (riskScore >= 40) return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fcd34d', dot: '#f59e0b' };
        return { bg: 'rgba(34, 197, 94, 0.15)', text: '#86efac', dot: '#22c55e' };
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    };

    // Generate Patient PDF Report
    const generatePatientPDF = (patient) => {
        if (!patient) return;

        const doc = new jsPDF();
        let yPos = 20;
        const pageHeight = 280;
        const leftMargin = 20;
        const rightMargin = 190;
        const latest = getLatestEncounter(patient);

        const checkPageBreak = (neededSpace) => {
            if (yPos + neededSpace > pageHeight) {
                doc.addPage();
                yPos = 20;
            }
        };

        // Header
        doc.setFillColor(15, 23, 42);
        doc.rect(0, 0, 210, 45, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.setFont('helvetica', 'bold');
        doc.text("MedAura AI - Patient Report", leftMargin, 25);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Generated: ${new Date().toLocaleString()}`, leftMargin, 35);
        doc.text(`Report ID: ${patient.id?.slice(0, 8) || 'N/A'}`, leftMargin, 40);

        yPos = 55;
        doc.setTextColor(0, 0, 0);

        // Patient Information
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text("Patient Information", leftMargin, yPos);
        yPos += 10;
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text(`Name: ${patient.patientInfo?.name || 'Anonymous'}`, leftMargin, yPos);
        yPos += 6;
        doc.text(`Age: ${patient.patientInfo?.age || 'Not specified'}`, leftMargin, yPos);
        doc.text(`Gender: ${patient.patientInfo?.gender || 'Not specified'}`, leftMargin + 60, yPos);
        yPos += 6;
        doc.text(`Total Encounters: ${patient.encounters?.length || 0}`, leftMargin, yPos);
        yPos += 15;

        // Risk Assessment (if available)
        if (latest?.aiAnalysis?.riskScore !== undefined) {
            checkPageBreak(30);
            const riskScore = latest.aiAnalysis.riskScore;
            const riskLevel = riskScore >= 70 ? 'HIGH' : riskScore >= 40 ? 'MODERATE' : 'LOW';
            const riskColor = riskScore >= 70 ? [239, 68, 68] : riskScore >= 40 ? [245, 158, 11] : [34, 197, 94];

            doc.setFillColor(...riskColor);
            doc.rect(leftMargin - 5, yPos - 5, rightMargin - leftMargin + 10, 25, 'F');
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(255, 255, 255);
            doc.text(`Risk Level: ${riskLevel} (${riskScore}%)`, leftMargin, yPos + 5);
            doc.setFontSize(10);
            doc.setFont('helvetica', 'normal');
            doc.text(`Based on latest ${latest.type || 'encounter'} assessment`, leftMargin, yPos + 15);
            doc.setTextColor(0, 0, 0);
            yPos += 35;
        }

        // Red Flags
        if (latest?.aiAnalysis?.redFlags?.length > 0) {
            checkPageBreak(30);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(220, 38, 38);
            doc.text("[!] RED FLAGS", leftMargin, yPos);
            doc.setTextColor(0, 0, 0);
            yPos += 8;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            latest.aiAnalysis.redFlags.forEach(flag => {
                checkPageBreak(8);
                const flagLines = doc.splitTextToSize(`• ${flag}`, rightMargin - leftMargin - 5);
                doc.text(flagLines, leftMargin + 5, yPos);
                yPos += flagLines.length * 5;
            });
            yPos += 8;
        }

        // AI Recommendations
        if (latest?.aiAnalysis?.recommendations?.length > 0) {
            checkPageBreak(30);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'bold');
            doc.text("AI Recommendations", leftMargin, yPos);
            yPos += 8;
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(10);
            latest.aiAnalysis.recommendations.forEach((rec, i) => {
                checkPageBreak(10);
                const recLines = doc.splitTextToSize(`${i + 1}. ${rec}`, rightMargin - leftMargin - 5);
                doc.text(recLines, leftMargin + 5, yPos);
                yPos += recLines.length * 5 + 3;
            });
            yPos += 8;
        }

        // Encounter History
        checkPageBreak(20);
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text("Encounter History", leftMargin, yPos);
        yPos += 12;

        const sortedEncounters = [...(patient.encounters || [])].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        sortedEncounters.forEach((encounter, index) => {
            checkPageBreak(45);

            // Encounter header
            doc.setFillColor(241, 245, 249);
            doc.rect(leftMargin - 5, yPos - 3, rightMargin - leftMargin + 10, 35, 'F');

            doc.setFontSize(11);
            doc.setFont('helvetica', 'bold');
            const typeLabel = encounter.type === 'ER' ? 'ER Visit' : 'MDT Review';
            doc.text(`${typeLabel} ${index === 0 ? '(Latest)' : ''}`, leftMargin, yPos + 3);

            doc.setFontSize(9);
            doc.setFont('helvetica', 'normal');
            doc.text(`Date: ${formatDate(encounter.timestamp)}`, leftMargin + 100, yPos + 3);

            if (encounter.chiefComplaint) {
                const complaintLines = doc.splitTextToSize(`Chief Complaint: ${encounter.chiefComplaint}`, rightMargin - leftMargin - 10);
                doc.text(complaintLines.slice(0, 2), leftMargin, yPos + 12);
            }

            if (encounter.aiAnalysis?.riskScore !== undefined) {
                doc.text(`Risk Score: ${encounter.aiAnalysis.riskScore}%`, leftMargin, yPos + 25);
            }

            yPos += 42;

            // Specialist perspectives for this encounter
            if (encounter.specialists?.length > 0) {
                checkPageBreak(20);
                doc.setFontSize(10);
                doc.setFont('helvetica', 'bold');
                doc.text("Specialist Perspectives:", leftMargin + 5, yPos);
                yPos += 6;
                doc.setFont('helvetica', 'normal');
                doc.setFontSize(9);

                encounter.specialists.forEach(spec => {
                    checkPageBreak(15);
                    doc.setFont('helvetica', 'bold');
                    doc.text(`• ${spec.name}:`, leftMargin + 10, yPos);
                    doc.setFont('helvetica', 'normal');
                    const specContent = spec.content || spec.perspective || 'No details';
                    const contentLines = doc.splitTextToSize(specContent, rightMargin - leftMargin - 25);
                    doc.text(contentLines.slice(0, 2), leftMargin + 15, yPos + 5);
                    yPos += 12 + (Math.min(contentLines.length, 2) - 1) * 4;
                });
                yPos += 5;
            }
        });

        // Footer on all pages
        const pageCount = doc.internal.getNumberOfPages();
        for (let i = 1; i <= pageCount; i++) {
            doc.setPage(i);
            doc.setFontSize(8);
            doc.setTextColor(128, 128, 128);
            doc.text("CLINICAL DECISION SUPPORT ONLY - NOT A MEDICAL DEVICE", leftMargin, 290);
            doc.text("All recommendations must be independently verified by treating physician.", leftMargin, 294);
            doc.text(`Page ${i} of ${pageCount}`, 180, 290);
        }

        const patientName = (patient.patientInfo?.name || 'Patient').replace(/[^a-zA-Z0-9]/g, '_');
        doc.save(`MedAura_Patient_Report_${patientName}_${new Date().toISOString().split('T')[0]}.pdf`);
        setToast({ message: 'Patient report downloaded!', type: 'success' });
    };

    const filteredPatients = patients.filter(p => {
        const matchesSearch = !searchQuery.trim() || p.patientInfo?.name?.toLowerCase().includes(searchQuery.toLowerCase()) || p.encounters?.some(e => e.chiefComplaint?.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = filterType === 'ALL' || p.encounters?.some(e => e.type === filterType);
        return matchesSearch && matchesType;
    });

    const erCount = patients.filter(p => p.encounters?.some(e => e.type === 'ER')).length;
    const mdtCount = patients.filter(p => p.encounters?.some(e => e.type === 'MDT')).length;
    const criticalPatients = patients.filter(p => {
        const latest = getLatestEncounter(p);
        return latest?.aiAnalysis?.riskScore >= 70 || (latest?.aiAnalysis?.redFlags?.length || 0) >= 2;
    });
    const todayStr = new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    if (!user) return null;
    const latestEncounter = selectedPatient ? getLatestEncounter(selectedPatient) : null;
    const riskInfo = latestEncounter?.aiAnalysis?.riskScore !== undefined ? getRiskColor(latestEncounter.aiAnalysis.riskScore) : null;

    return (
        <SidebarProvider>
            <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', fontFamily: "'Inter', -apple-system, sans-serif" }}>
                {/* Floating toggle button when sidebar is hidden */}
                <SidebarToggle />

                {/* Compact Sidebar - Navigation Only */}
                <Sidebar>
                    <SidebarHeader>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <button className="sidebar-header-button" style={{ flex: 1 }}>
                                <div className="sidebar-header-icon" style={{ background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)' }}>
                                    <img src="/MedAuraAI Logo.png" alt="" style={{ width: '20px', height: '20px' }} />
                                </div>
                                <div className="sidebar-header-info">
                                    <div className="sidebar-header-title">MedAura AI</div>
                                    <div className="sidebar-header-subtitle">Doctor Portal</div>
                                </div>
                            </button>
                            <SidebarCloseButton />
                        </div>
                    </SidebarHeader>

                    <SidebarContent>
                        {/* Today's Date */}
                        <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <div style={{ fontSize: '12px', color: '#64748b', marginBottom: '2px' }}>Today</div>
                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#f1f5f9' }}>{todayStr}</div>
                        </div>

                        {/* Critical Alerts */}
                        {criticalPatients.length > 0 && (
                            <div style={{ padding: '12px 16px', background: 'rgba(239, 68, 68, 0.08)', borderBottom: '1px solid rgba(239, 68, 68, 0.15)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '14px' }}>⚠️</span>
                                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#fca5a5', textTransform: 'uppercase' }}>Critical ({criticalPatients.length})</span>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                    {criticalPatients.slice(0, 3).map(p => (
                                        <button key={p.id} onClick={() => handleSelectPatient(p)} style={{ background: 'none', border: 'none', textAlign: 'left', padding: '6px 8px', borderRadius: '6px', cursor: 'pointer', color: '#f1f5f9', fontSize: '13px' }}>
                                            • {p.patientInfo?.name || 'Unknown'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <SidebarGroup>
                            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild href="/">
                                        <Icons.Home />
                                        <span>Home</span>
                                        <Icons.ChevronRight />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton active={activeView === 'list'} onClick={() => setActiveView('list')}>
                                        <Icons.Users />
                                        <span>Patients</span>
                                        {stats.total > 0 && <span className="sidebar-badge">{stats.total}</span>}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild href="/er-copilot">
                                        <Icons.Ambulance />
                                        <span>Emergency Care</span>
                                        <Icons.ChevronRight />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton asChild href="/mdt-review">
                                        <Icons.ClipboardList />
                                        <span>Team Coordination</span>
                                        <Icons.ChevronRight />
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>

                        <SidebarSeparator />

                        {/* Quick Actions */}
                        <SidebarGroup>
                            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                            <div style={{ padding: '4px 12px', display: 'flex', gap: '8px' }}>
                                <Link to="/er-copilot" style={{ flex: 1, padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', textDecoration: 'none', textAlign: 'center' }}>
                                    <div style={{ fontSize: '16px' }}>🚑</div>
                                    <div style={{ fontSize: '11px', color: '#fca5a5', marginTop: '4px' }}>New ER</div>
                                </Link>
                                <Link to="/mdt-review" style={{ flex: 1, padding: '10px', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: '8px', textDecoration: 'none', textAlign: 'center' }}>
                                    <div style={{ fontSize: '16px' }}>👥</div>
                                    <div style={{ fontSize: '11px', color: '#7dd3fc', marginTop: '4px' }}>New MDT</div>
                                </Link>
                            </div>
                        </SidebarGroup>

                        <SidebarSeparator />

                        {/* Quick Stats */}
                        <SidebarGroup>
                            <SidebarGroupLabel>Case Summary</SidebarGroupLabel>
                            <div style={{ padding: '8px 12px' }}>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                                    <div style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', borderRadius: '10px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#fca5a5' }}>{erCount}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>ER Cases</div>
                                    </div>
                                    <div style={{ padding: '12px', background: 'rgba(14,165,233,0.1)', borderRadius: '10px', textAlign: 'center' }}>
                                        <div style={{ fontSize: '20px', fontWeight: '700', color: '#7dd3fc' }}>{mdtCount}</div>
                                        <div style={{ fontSize: '11px', color: '#94a3b8' }}>MDT Cases</div>
                                    </div>
                                </div>
                            </div>
                        </SidebarGroup>

                        <SidebarSeparator />

                        {/* Recently Viewed */}
                        {recentlyViewed.length > 0 && (
                            <SidebarGroup>
                                <SidebarGroupLabel>Recently Viewed</SidebarGroupLabel>
                                <div style={{ padding: '4px 12px' }}>
                                    {recentlyViewed.slice(0, 3).map(p => {
                                        const patient = patients.find(pt => pt.id === p.id);
                                        return patient ? (
                                            <button key={p.id} onClick={() => handleSelectPatient(patient)} style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', padding: '8px', borderRadius: '6px', cursor: 'pointer', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(14, 165, 233, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: '#7dd3fc' }}>{p.name?.charAt(0) || '?'}</div>
                                                <div>
                                                    <div style={{ fontSize: '13px', color: '#f1f5f9' }}>{p.name}</div>
                                                    <div style={{ fontSize: '11px', color: '#64748b' }}>{getTimeAgo(new Date(p.timestamp).toISOString())}</div>
                                                </div>
                                            </button>
                                        ) : null;
                                    })}
                                </div>
                            </SidebarGroup>
                        )}

                    </SidebarContent>

                    <SidebarFooter>
                        <button className="sidebar-footer-button" onClick={handleLogout} title="Sign Out">
                            <div className="sidebar-avatar">{user.name?.split(' ').map(n => n[0]).join('') || 'DR'}</div>
                            <div className="sidebar-user-info">
                                <div className="sidebar-user-name">{user.name}</div>
                                <div className="sidebar-user-email">{user.email}</div>
                            </div>
                            <Icons.ChevronDown />
                        </button>
                    </SidebarFooter>
                </Sidebar>

                {/* Main Content */}
                <MainContent>
                    {/* Top App Bar */}
                    <DashboardAppBar userName={user.name} userRole={user.role} />

                    {/* Critical Alert Banner - show if there are high-risk patients */}
                    {patients.filter(p => p.aiAnalysis?.riskScore >= 80).length > 0 && (
                        <CriticalAlertBanner
                            count={patients.filter(p => p.aiAnalysis?.riskScore >= 80).length}
                            onViewAll={() => setActiveView('list')}
                        />
                    )}

                    {/* === PATIENT LIST VIEW === */}
                    {activeView === 'list' && (
                        <div style={{ padding: '32px' }}>
                            {/* Header */}
                            <div style={{ marginBottom: '32px' }}>
                                <h1 style={{ fontSize: '32px', fontWeight: '700', color: '#f8fafc', margin: '0 0 8px' }}>Patients</h1>
                                <p style={{ fontSize: '15px', color: '#94a3b8', margin: 0 }}>Manage and view all patient records</p>
                            </div>

                            {/* Search & Filters */}
                            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                                <div style={{ flex: 1, minWidth: '280px', display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', background: 'rgba(30,41,59,0.5)', borderRadius: '12px', border: '1px solid rgba(56,189,248,0.15)' }}>
                                    <Icons.Search />
                                    <input
                                        type="text"
                                        placeholder="Search by name or complaint..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#f1f5f9', fontSize: '14px' }}
                                    />
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    {['ALL', 'ER', 'MDT'].map(type => (
                                        <button
                                            key={type}
                                            onClick={() => setFilterType(type)}
                                            style={{
                                                padding: '12px 20px',
                                                borderRadius: '10px',
                                                border: filterType === type ? `1px solid ${type === 'ER' ? '#ef4444' : type === 'MDT' ? '#0ea5e9' : '#64748b'}50` : '1px solid rgba(100,116,139,0.2)',
                                                background: filterType === type ? (type === 'ER' ? 'rgba(239,68,68,0.15)' : type === 'MDT' ? 'rgba(14,165,233,0.15)' : 'rgba(100,116,139,0.15)') : 'transparent',
                                                color: filterType === type ? (type === 'ER' ? '#fca5a5' : type === 'MDT' ? '#7dd3fc' : '#f1f5f9') : '#64748b',
                                                fontSize: '14px',
                                                fontWeight: '500',
                                                cursor: 'pointer',
                                                transition: 'all 0.15s'
                                            }}
                                        >
                                            {type === 'ALL' ? 'All' : type === 'ER' ? '🚑 ER' : '👥 MDT'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Patient Cards Grid */}
                            {filteredPatients.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '80px 20px' }}>
                                    <div style={{ fontSize: '64px', marginBottom: '20px' }}>📋</div>
                                    <h2 style={{ fontSize: '24px', color: '#f8fafc', marginBottom: '8px' }}>No Patients Found</h2>
                                    <p style={{ fontSize: '15px', color: '#94a3b8', marginBottom: '24px' }}>
                                        {patients.length === 0 ? 'Start by analyzing a patient in ER Co-Pilot or MDT Review' : 'Try adjusting your search or filters'}
                                    </p>
                                    {patients.length === 0 && (
                                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                                            <Link to="/er-copilot" style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #ef4444, #dc2626)', borderRadius: '12px', color: 'white', fontWeight: '600', textDecoration: 'none' }}>Go to ER Co-Pilot</Link>
                                            <Link to="/mdt-review" style={{ padding: '14px 28px', background: 'linear-gradient(135deg, #0ea5e9, #0284c7)', borderRadius: '12px', color: 'white', fontWeight: '600', textDecoration: 'none' }}>Go to MDT Review</Link>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
                                    {filteredPatients.map((patient, index) => {
                                        const latest = getLatestEncounter(patient);
                                        const risk = getRiskColor(latest?.aiAnalysis?.riskScore || 0);
                                        const timeAgo = getTimeAgo(latest?.timestamp);
                                        const erVisits = patient.encounters?.filter(e => e.type === 'ER').length || 0;
                                        const mdtReviews = patient.encounters?.filter(e => e.type === 'MDT').length || 0;

                                        return (
                                            <div
                                                key={patient.id}
                                                onClick={() => handleSelectPatient(patient)}
                                                style={{
                                                    padding: '16px',
                                                    background: '#111A2E',
                                                    borderRadius: '12px',
                                                    border: '1px solid rgba(255,255,255,0.06)',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.2s',
                                                    animation: 'fadeInUp 0.5s ease forwards',
                                                    animationDelay: `${index * 0.06}s`,
                                                    opacity: 0
                                                }}
                                                onMouseOver={(e) => { e.currentTarget.style.borderColor = '#2DD4BF'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                                                onMouseOut={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                                            >
                                                {/* Header: Name + Status Pill */}
                                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                                                    <div>
                                                        <h3 style={{ fontSize: '15px', fontWeight: '600', color: '#E5E7EB', margin: 0 }}>
                                                            {patient.patientInfo?.name || 'Unknown'}, {patient.patientInfo?.age}{patient.patientInfo?.gender ? patient.patientInfo.gender.charAt(0).toUpperCase() : ''}
                                                        </h3>
                                                    </div>
                                                    {latest?.aiAnalysis?.riskScore && (
                                                        <span style={{
                                                            padding: '4px 10px',
                                                            borderRadius: '12px',
                                                            background: risk.bg,
                                                            color: risk.text,
                                                            fontSize: '10px',
                                                            fontWeight: '600',
                                                            letterSpacing: '0.5px'
                                                        }}>
                                                            {latest.aiAnalysis.riskScore >= 80 ? 'CRITICAL' : latest.aiAnalysis.riskScore >= 60 ? 'HIGH RISK' : latest.aiAnalysis.riskScore >= 40 ? 'MEDIUM' : 'LOW'}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Chief Complaint */}
                                                {latest?.chiefComplaint && (
                                                    <p style={{ fontSize: '13px', color: '#9CA3AF', margin: '0 0 12px', lineHeight: '1.5' }}>
                                                        {latest.chiefComplaint.length > 60 ? latest.chiefComplaint.slice(0, 60) + '...' : latest.chiefComplaint}
                                                    </p>
                                                )}

                                                {/* Footer: Tags + Time */}
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                    <div style={{ display: 'flex', gap: '6px' }}>
                                                        {erVisits > 0 && <span style={{ padding: '3px 8px', background: 'rgba(239,68,68,0.1)', color: '#EF4444', borderRadius: '6px', fontSize: '11px' }}>🚑 ER</span>}
                                                        {mdtReviews > 0 && <span style={{ padding: '3px 8px', background: 'rgba(45,212,191,0.1)', color: '#2DD4BF', borderRadius: '6px', fontSize: '11px' }}>👥 MDT</span>}
                                                    </div>
                                                    {timeAgo && (
                                                        <span style={{ fontSize: '11px', color: '#6B7280' }}>
                                                            {timeAgo}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    )}

                    {/* === PATIENT DETAIL VIEW === */}
                    {activeView === 'detail' && selectedPatient && (
                        <>
                            {/* Header */}
                            <header style={{ position: 'sticky', top: 0, zIndex: 20, background: 'rgba(2, 6, 23, 0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '20px 32px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                                    <button onClick={handleBackToList} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', background: 'rgba(100,116,139,0.15)', border: 'none', borderRadius: '6px', color: '#94a3b8', fontSize: '14px', cursor: 'pointer' }}>
                                        <Icons.ChevronLeft /> Back to List
                                    </button>
                                    <button
                                        onClick={() => generatePatientPDF(selectedPatient)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            padding: '8px 16px',
                                            background: 'rgba(14, 165, 233, 0.12)',
                                            border: '1px solid rgba(14, 165, 233, 0.25)',
                                            borderRadius: '4px',
                                            color: '#7dd3fc',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        📄 Download Report
                                    </button>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                                    <div>
                                        <h1 style={{ fontSize: '28px', fontWeight: '700', color: '#f8fafc', margin: '0 0 4px' }}>{selectedPatient.patientInfo?.name || 'Patient'}</h1>
                                        <p style={{ fontSize: '14px', color: '#94a3b8', margin: 0 }}>
                                            {selectedPatient.patientInfo?.age} {selectedPatient.patientInfo?.gender} • {selectedPatient.encounters?.length || 0} encounters
                                            {latestEncounter?.chiefComplaint && ` • ${latestEncounter.chiefComplaint}`}
                                        </p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                                        {riskInfo && <span style={{ padding: '8px 16px', background: riskInfo.bg, color: riskInfo.text, borderRadius: '10px', fontSize: '14px', fontWeight: '600' }}>Risk: {latestEncounter.aiAnalysis.riskScore}%</span>}
                                        <button onClick={(e) => handleDeletePatient(selectedPatient.id, e)} style={{ padding: '8px 16px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', color: '#fca5a5', fontSize: '13px', cursor: 'pointer' }}>Delete</button>
                                    </div>
                                </div>
                                {/* Tabs */}
                                <div style={{ display: 'flex', gap: '4px', marginTop: '20px' }}>
                                    {['overview', 'encounters', 'timeline', 'discussion', 'actions'].map(tab => (
                                        <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '10px 20px', background: activeTab === tab ? 'rgba(14,165,233,0.15)' : 'transparent', border: activeTab === tab ? '1px solid rgba(14,165,233,0.3)' : '1px solid transparent', borderRadius: '10px', color: activeTab === tab ? '#7dd3fc' : '#64748b', fontSize: '14px', fontWeight: '500', cursor: 'pointer', textTransform: 'capitalize' }}>{tab}</button>
                                    ))}
                                </div>
                            </header>

                            {/* Critical Alert */}
                            {(latestEncounter?.aiAnalysis?.riskScore >= 70 || latestEncounter?.aiAnalysis?.redFlags?.length >= 2) && (
                                <div style={{ margin: '24px 32px 0', padding: '16px 20px', background: 'linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', animation: 'pulse-border 2s infinite' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Icons.AlertTriangle />
                                        <span style={{ fontSize: '14px', fontWeight: '700', color: '#fca5a5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CRITICAL PATIENT</span>
                                        {latestEncounter?.aiAnalysis?.redFlags?.length > 0 && <span style={{ padding: '4px 10px', background: '#ef444420', color: '#fca5a5', borderRadius: '6px', fontSize: '13px' }}>{latestEncounter.aiAnalysis.redFlags.length} Red Flags</span>}
                                    </div>
                                </div>
                            )}

                            {/* Content */}
                            <div style={{ padding: '32px' }}>
                                {activeTab === 'overview' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px' }}>
                                        <CollapsibleSection title="Patient Information" icon="👤">
                                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                                {[{ label: 'NAME', value: selectedPatient.patientInfo?.name || 'N/A' }, { label: 'AGE', value: selectedPatient.patientInfo?.age || 'N/A' }, { label: 'GENDER', value: selectedPatient.patientInfo?.gender || 'N/A' }, { label: 'ENCOUNTERS', value: selectedPatient.encounters?.length || 0 }].map((item, i) => (
                                                    <div key={i}><p style={{ fontSize: '11px', fontWeight: '500', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>{item.label}</p><p style={{ fontSize: '15px', fontWeight: '500', color: '#f1f5f9', margin: 0 }}>{item.value}</p></div>
                                                ))}
                                            </div>
                                        </CollapsibleSection>
                                        {latestEncounter?.aiAnalysis && (
                                            <CollapsibleSection title="AI Analysis" icon="🤖">
                                                {latestEncounter.aiAnalysis.riskScore !== undefined && (
                                                    <div style={{ marginBottom: '16px' }}>
                                                        <p style={{ fontSize: '11px', fontWeight: '500', color: '#64748b', textTransform: 'uppercase', marginBottom: '8px' }}>RISK SCORE</p>
                                                        <span style={{ display: 'inline-block', padding: '10px 20px', background: riskInfo?.bg, color: riskInfo?.text, borderRadius: '10px', fontSize: '20px', fontWeight: '700' }}>{latestEncounter.aiAnalysis.riskScore}%</span>
                                                    </div>
                                                )}
                                                {latestEncounter.aiAnalysis.recommendations?.length > 0 && (
                                                    <div><p style={{ fontSize: '11px', fontWeight: '500', color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>RECOMMENDATIONS</p>
                                                        {latestEncounter.aiAnalysis.recommendations.map((rec, i) => <div key={i} style={{ padding: '12px 16px', background: 'rgba(30,41,59,0.5)', borderRadius: '10px', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px' }}>→ {rec}</div>)}
                                                    </div>
                                                )}
                                            </CollapsibleSection>
                                        )}
                                        {latestEncounter?.aiAnalysis?.redFlags?.length > 0 && (
                                            <CollapsibleSection title="Red Flags" icon="⚠️" badgeCount={latestEncounter.aiAnalysis.redFlags.length}>
                                                {latestEncounter.aiAnalysis.redFlags.map((flag, i) => <div key={i} style={{ padding: '14px 18px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', borderRadius: '10px', color: '#fca5a5', fontSize: '14px', marginBottom: '10px' }}>{flag}</div>)}
                                            </CollapsibleSection>
                                        )}
                                        <CollapsibleSection title="Encounter Summary" icon="📊">
                                            <div style={{ display: 'flex', gap: '16px' }}>
                                                <div style={{ flex: 1, padding: '20px', background: 'rgba(239,68,68,0.1)', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: '700', color: '#fca5a5' }}>{selectedPatient.encounters?.filter(e => e.type === 'ER').length || 0}</div><div style={{ fontSize: '13px', color: '#94a3b8' }}>ER Visits</div></div>
                                                <div style={{ flex: 1, padding: '20px', background: 'rgba(14,165,233,0.1)', borderRadius: '12px', textAlign: 'center' }}><div style={{ fontSize: '32px', fontWeight: '700', color: '#7dd3fc' }}>{selectedPatient.encounters?.filter(e => e.type === 'MDT').length || 0}</div><div style={{ fontSize: '13px', color: '#94a3b8' }}>MDT Reviews</div></div>
                                            </div>
                                        </CollapsibleSection>
                                    </div>
                                )}

                                {activeTab === 'encounters' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                        {selectedPatient.encounters?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((encounter, i) => (
                                            <CollapsibleSection key={encounter.id || i} title={encounter.type === 'ER' ? 'ER Visit' : 'MDT Review'} icon={encounter.type === 'ER' ? '🚑' : '👥'} defaultOpen={i === 0}>
                                                <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                                                    <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', background: encounter.type === 'ER' ? 'rgba(239,68,68,0.15)' : 'rgba(14,165,233,0.15)', color: encounter.type === 'ER' ? '#fca5a5' : '#7dd3fc' }}>{encounter.type}</span>
                                                    {i === 0 && <span style={{ padding: '6px 12px', background: 'rgba(34,197,94,0.15)', color: '#86efac', borderRadius: '8px', fontSize: '12px' }}>Latest</span>}
                                                    <span style={{ padding: '6px 12px', background: 'rgba(100,116,139,0.15)', color: '#94a3b8', borderRadius: '8px', fontSize: '12px' }}>{formatDate(encounter.timestamp)}</span>
                                                </div>
                                                {encounter.chiefComplaint && <div style={{ marginBottom: '16px' }}><p style={{ fontSize: '11px', fontWeight: '500', color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>CHIEF COMPLAINT</p><p style={{ fontSize: '15px', color: '#f1f5f9', margin: 0 }}>{encounter.chiefComplaint}</p></div>}
                                                {encounter.aiAnalysis && (
                                                    <div style={{ padding: '16px', background: 'rgba(30,41,59,0.5)', borderRadius: '12px', marginBottom: '16px' }}>
                                                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                                                            {encounter.aiAnalysis.riskScore !== undefined && <span style={{ padding: '6px 14px', borderRadius: '8px', fontWeight: '600', background: getRiskColor(encounter.aiAnalysis.riskScore).bg, color: getRiskColor(encounter.aiAnalysis.riskScore).text }}>Risk: {encounter.aiAnalysis.riskScore}%</span>}
                                                            {encounter.aiAnalysis.redFlags?.length > 0 && <span style={{ color: '#fca5a5', fontSize: '13px' }}>⚠️ {encounter.aiAnalysis.redFlags.length} red flag(s)</span>}
                                                        </div>
                                                        {encounter.aiAnalysis.recommendations?.length > 0 && <div style={{ marginTop: '14px' }}>{encounter.aiAnalysis.recommendations.map((rec, j) => <div key={j} style={{ fontSize: '13px', color: '#cbd5e1', padding: '4px 0' }}>→ {rec}</div>)}</div>}
                                                    </div>
                                                )}
                                                {encounter.specialists?.length > 0 && (
                                                    <div><p style={{ fontSize: '11px', fontWeight: '500', color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>SPECIALIST PERSPECTIVES</p>
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>{encounter.specialists.map((spec, j) => <div key={j} style={{ padding: '14px', background: 'rgba(30,41,59,0.5)', borderRadius: '10px' }}><p style={{ fontSize: '13px', fontWeight: '600', color: '#7dd3fc', marginBottom: '6px' }}>{spec.name}</p><p style={{ fontSize: '12px', color: '#94a3b8', margin: 0 }}>{spec.content || spec.perspective || 'No details'}</p></div>)}</div>
                                                    </div>
                                                )}
                                            </CollapsibleSection>
                                        ))}
                                    </div>
                                )}

                                {activeTab === 'timeline' && (
                                    <CollapsibleSection title="Patient Timeline" icon="📅">
                                        <div style={{ position: 'relative', paddingLeft: '24px' }}>
                                            <div style={{ position: 'absolute', left: '8px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(180deg, #0ea5e9 0%, #1e293b 100%)' }} />
                                            {selectedPatient.encounters?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).map((encounter, i) => (
                                                <div key={i} style={{ position: 'relative', paddingBottom: '24px', paddingLeft: '24px' }}>
                                                    <div style={{ position: 'absolute', left: '-1px', top: '4px', width: '20px', height: '20px', borderRadius: '50%', background: encounter.type === 'ER' ? '#ef4444' : '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', boxShadow: `0 0 10px ${encounter.type === 'ER' ? '#ef444460' : '#0ea5e960'}` }}>{encounter.type === 'ER' ? '🚑' : '👥'}</div>
                                                    <div><p style={{ fontSize: '15px', fontWeight: '600', color: '#f1f5f9', margin: '0 0 4px' }}>{encounter.type === 'ER' ? 'ER Visit' : 'MDT Review'}</p><p style={{ fontSize: '13px', color: '#94a3b8', margin: '0 0 6px' }}>{encounter.chiefComplaint || 'No complaint'}</p><p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{formatDate(encounter.timestamp)}</p></div>
                                                </div>
                                            ))}
                                        </div>
                                    </CollapsibleSection>
                                )}

                                {activeTab === 'actions' && (
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                                        {[
                                            { icon: '📄', title: 'Download PDF Report', desc: 'Generate comprehensive patient report', color: '#22c55e', onClick: () => generatePatientPDF(selectedPatient) },
                                            { icon: '👥', title: 'Send to MDT Review', desc: 'Request multidisciplinary team review', color: '#0ea5e9', onClick: () => { const params = new URLSearchParams({ patientId: selectedPatient.id, patientName: selectedPatient.patientInfo?.name || '', age: selectedPatient.patientInfo?.age || '', gender: selectedPatient.patientInfo?.gender || '' }); navigate(`/mdt-review?${params.toString()}`); } },
                                            { icon: '🚑', title: 'New ER Assessment', desc: 'Create new ER encounter', color: '#ef4444', href: '/er-copilot' },
                                            { icon: '🗑️', title: 'Delete Patient', desc: 'Permanently remove patient data', onClick: (e) => handleDeletePatient(selectedPatient.id, e) },
                                            { icon: '📋', title: 'Back to Patient List', desc: 'View all patients', onClick: handleBackToList }
                                        ].map((action, i) => {
                                            const Comp = action.href ? Link : 'button';
                                            return <Comp key={i} to={action.href} onClick={action.onClick} style={{ padding: '24px', background: 'rgba(15,23,42,0.5)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', textAlign: 'left', cursor: 'pointer', textDecoration: 'none', display: 'block' }}><div style={{ fontSize: '28px', marginBottom: '12px' }}>{action.icon}</div><h3 style={{ fontSize: '16px', fontWeight: '600', color: '#f1f5f9', margin: '0 0 6px' }}>{action.title}</h3><p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>{action.desc}</p></Comp>;
                                        })}
                                    </div>
                                )}

                                {activeTab === 'discussion' && (
                                    <div>
                                        <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#f1f5f9', marginBottom: '20px' }}>💬 Case Discussion</h2>
                                        <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '24px' }}>Leave notes for other doctors on the care team. All notes are saved locally.</p>

                                        {/* Add Note Input */}
                                        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                                            <input
                                                type="text"
                                                value={newNote}
                                                onChange={(e) => setNewNote(e.target.value)}
                                                placeholder="Add a note about this case..."
                                                onKeyPress={(e) => e.key === 'Enter' && addCaseNote()}
                                                style={{
                                                    flex: 1,
                                                    padding: '14px 18px',
                                                    background: 'rgba(30, 41, 59, 0.5)',
                                                    border: '1px solid rgba(56, 189, 248, 0.15)',
                                                    borderRadius: '10px',
                                                    color: '#f1f5f9',
                                                    fontSize: '14px',
                                                    outline: 'none'
                                                }}
                                            />
                                            <button
                                                onClick={addCaseNote}
                                                style={{
                                                    padding: '14px 24px',
                                                    background: 'linear-gradient(135deg, #0ea5e9, #0284c7)',
                                                    border: 'none',
                                                    borderRadius: '10px',
                                                    color: 'white',
                                                    fontSize: '14px',
                                                    fontWeight: '600',
                                                    cursor: 'pointer'
                                                }}
                                            >
                                                Add Note
                                            </button>
                                        </div>

                                        {/* Notes List */}
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                            {(caseNotes[selectedPatient.id] || []).slice().reverse().map(note => (
                                                <div key={note.id} style={{ padding: '16px', background: 'rgba(15, 23, 42, 0.6)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                                                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'white', fontWeight: '600' }}>
                                                            {note.author?.split(' ').map(n => n[0]).join('') || 'DR'}
                                                        </div>
                                                        <div>
                                                            <div style={{ fontSize: '14px', fontWeight: '600', color: '#f1f5f9' }}>{note.author}</div>
                                                            <div style={{ fontSize: '11px', color: '#64748b' }}>{formatDate(note.timestamp)}</div>
                                                        </div>
                                                    </div>
                                                    <p style={{ fontSize: '14px', color: '#cbd5e1', margin: 0, lineHeight: '1.5' }}>{note.text}</p>
                                                </div>
                                            ))}
                                            {(!caseNotes[selectedPatient.id] || caseNotes[selectedPatient.id].length === 0) && (
                                                <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>
                                                    <div style={{ fontSize: '32px', marginBottom: '12px' }}>💬</div>
                                                    <p style={{ margin: 0 }}>No notes yet. Be the first to add one!</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    )}

                    {/* Welcome (when no view) */}
                    {activeView !== 'list' && activeView !== 'detail' && (
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px' }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '64px', marginBottom: '20px' }}>👨‍⚕️</div>
                                <h2 style={{ fontSize: '28px', fontWeight: '700', color: '#f8fafc', marginBottom: '8px' }}>Welcome, {user.name}</h2>
                                <p style={{ fontSize: '15px', color: '#94a3b8' }}>Select "Patients" from the sidebar to get started</p>
                            </div>
                        </div>
                    )}
                </MainContent>

                {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            </div>
        </SidebarProvider >
    );
}
