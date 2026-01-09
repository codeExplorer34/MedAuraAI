import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
    SidebarProvider, 
    Sidebar, 
    SidebarHeader, 
    SidebarContent, 
    SidebarFooter, 
    SidebarGroup, 
    SidebarGroupLabel, 
    SidebarMenu, 
    SidebarMenuItem, 
    SidebarMenuButton, 
    SidebarSeparator,
    SidebarToggle,
    SidebarCloseButton,
    SidebarContext,
    Icons
} from './Sidebar';
import { getStorageStats, getAllPatients } from '../utils/patientStorage';

function MainContentWrapper({ children }) {
    const { collapsed } = useContext(SidebarContext);
    return (
        <main style={{
            flex: 1,
            overflow: 'auto',
            background: 'linear-gradient(180deg, #020617 0%, #0f172a 100%)',
            paddingLeft: collapsed ? '70px' : '0',
            transition: 'padding-left 0.2s ease',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {children}
        </main>
    );
}

export default function MainLayout({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);
    const [stats, setStats] = useState({ total: 0, erCases: 0, mdtCases: 0 });
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        const auth = localStorage.getItem('medaura_auth');
        if (!auth) {
            navigate('/login');
            return;
        }
        const parsed = JSON.parse(auth);
        if (!parsed.isAuthenticated) {
            navigate('/login');
            return;
        }
        setUser(parsed.user);
        
        // Load initial stats and patients for sidebar
        setStats(getStorageStats());
        setPatients(getAllPatients());
    }, [navigate, location.pathname]);

    const handleLogout = () => {
        localStorage.removeItem('medaura_auth');
        navigate('/login');
    };

    if (!user) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <SidebarProvider>
            <div style={{ minHeight: '100vh', background: '#020617', display: 'flex', fontFamily: "'Inter', -apple-system, sans-serif" }}>
                <SidebarToggle />
                <Sidebar>
                    <SidebarHeader>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                            <button className="sidebar-header-button" style={{ flex: 1 }} onClick={() => navigate('/')}>
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
                        <SidebarGroup>
                            <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton active={isActive('/dashboard')} onClick={() => navigate('/dashboard')}>
                                        <Icons.Users />
                                        <span>Clinical Hub</span>
                                        {stats.total > 0 && <span className="sidebar-badge">{stats.total}</span>}
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton active={isActive('/er-copilot')} onClick={() => navigate('/er-copilot')}>
                                        <Icons.Ambulance />
                                        <span>ER Co-pilot</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                                <SidebarMenuItem>
                                    <SidebarMenuButton active={isActive('/mdt-review')} onClick={() => navigate('/mdt-review')}>
                                        <Icons.ClipboardList />
                                        <span>MDT Review</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>

                        <SidebarSeparator />

                        <SidebarGroup>
                            <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                            <div style={{ padding: '8px 12px', display: 'flex', gap: '8px' }}>
                                <button onClick={() => navigate('/er-copilot')} style={{ flex: 1, padding: '10px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.2)', borderRadius: '8px', cursor: 'pointer' }}>
                                    <div style={{ fontSize: '16px' }}>🚑</div>
                                    <div style={{ fontSize: '11px', color: '#fca5a5', marginTop: '4px' }}>New ER</div>
                                </button>
                                <button onClick={() => navigate('/mdt-review')} style={{ flex: 1, padding: '10px', background: 'rgba(14, 165, 233, 0.1)', border: '1px solid rgba(14, 165, 233, 0.2)', borderRadius: '8px', cursor: 'pointer' }}>
                                    <div style={{ fontSize: '16px' }}>👥</div>
                                    <div style={{ fontSize: '11px', color: '#7dd3fc', marginTop: '4px' }}>New MDT</div>
                                </button>
                            </div>
                        </SidebarGroup>
                        
                        <SidebarSeparator />
                        
                        <SidebarGroup>
                            <SidebarGroupLabel>General</SidebarGroupLabel>
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarMenuButton onClick={() => navigate('/')}>
                                        <Icons.Home />
                                        <span>Landing Page</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroup>
                    </SidebarContent>

                    <SidebarFooter>
                        <button className="sidebar-footer-button" onClick={handleLogout} title="Sign Out">
                            <div className="sidebar-avatar">{user.name?.split(' ').map(n => n[0]).join('') || 'DR'}</div>
                            <div className="sidebar-user-info">
                                <div className="sidebar-user-name">{user.name}</div>
                                <div className="sidebar-user-email">{user.email}</div>
                            </div>
                            <div style={{ color: '#64748b' }}><Icons.LogOut /></div>
                        </button>
                    </SidebarFooter>
                </Sidebar>
                <MainContentWrapper>
                    {children}
                </MainContentWrapper>
            </div>
        </SidebarProvider>
    );
}
