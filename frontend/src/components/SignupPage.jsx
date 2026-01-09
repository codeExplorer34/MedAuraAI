import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Aurora from './Aurora';
import tokenService from '../services/tokenService';

// Generate a mock JWT token for demo purposes
function generateMockJWT(user) {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(JSON.stringify({
        sub: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours from now
    }));
    const signature = btoa('mock-signature');
    return `${header}.${payload}.${signature}`;
}

export default function SignupPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'Emergency Physician',
        department: 'Emergency Medicine'
    });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        // Validate passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setIsLoading(false);
            return;
        }

        // Validate password strength
        if (formData.password.length < 6) {
            setError('Password must be at least 6 characters long');
            setIsLoading(false);
            return;
        }

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Create user object
        const user = {
            id: `doc-${Date.now()}`,
            name: `Dr. ${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            role: formData.role,
            department: formData.department,
            avatar: null
        };

        // Generate mock JWT tokens
        const accessToken = generateMockJWT(user);
        const refreshToken = generateMockJWT({ ...user, exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60) });

        // Store tokens using tokenService (compatible with ProtectedRoute)
        tokenService.setTokens(accessToken, refreshToken);

        // Store user data
        localStorage.setItem('medaura_user', JSON.stringify(user));

        // Navigate to dashboard
        navigate('/dashboard');

        setIsLoading(false);
    };

    return (
        <div style={{ background: '#0B1220' }} className="min-h-screen flex items-center justify-center px-6 py-12">
            {/* Aurora Background */}
            <div className="absolute inset-0 z-0">
                <Aurora
                    colorStops={["#2DD4BF", "#38BDF8", "#3A29FF"]}
                    blend={0.6}
                    amplitude={1.0}
                    speed={0.2}
                />
            </div>
            {/* Dark Overlay for readability */}
            <div className="absolute inset-0 z-0 bg-[#0B1220]/70 backdrop-blur-[2px]" />

            <div className="relative z-10 w-full max-w-md">
                {/* Back to Home Button */}
                <button
                    onClick={() => navigate('/')}
                    className="mb-6 flex items-center gap-2 text-[#9CA3AF] hover:text-white transition-colors text-sm"
                >
                    <span>←</span>
                    <span>Back to Home</span>
                </button>

                {/* Logo & Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-3 mb-4">
                        <img
                            src="/MedAuraAI Logo.png"
                            alt="MedAura"
                            className="h-12 w-auto"
                            style={{ filter: 'drop-shadow(0 0 20px rgba(45, 212, 191, 0.4))' }}
                        />
                        <span className="text-2xl font-bold text-[#E5E7EB]">MedAura AI</span>
                    </div>
                    <h1 className="text-3xl font-bold text-[#E5E7EB] mb-2">Create Account</h1>
                    <p className="text-[#9CA3AF]">Join the clinical platform</p>
                </div>

                {/* Signup Card */}
                <div style={{ background: '#111A2E', border: '1px solid rgba(255,255,255,0.06)' }} className="rounded-2xl p-8 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name Row */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    First Name
                                </label>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    placeholder="John"
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    Last Name
                                </label>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    placeholder="Doe"
                                    className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="doctor@hospital.com"
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                                required
                            />
                        </div>

                        {/* Role */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Role
                            </label>
                            <select
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                                required
                            >
                                <option value="Emergency Physician">Emergency Physician</option>
                                <option value="Surgeon">Surgeon</option>
                                <option value="Oncologist">Oncologist</option>
                                <option value="Radiologist">Radiologist</option>
                                <option value="Cardiologist">Cardiologist</option>
                                <option value="General Practitioner">General Practitioner</option>
                                <option value="Resident">Resident</option>
                                <option value="Nurse Practitioner">Nurse Practitioner</option>
                            </select>
                        </div>

                        {/* Department */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Department
                            </label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                                required
                            >
                                <option value="Emergency Medicine">Emergency Medicine</option>
                                <option value="Surgery">Surgery</option>
                                <option value="Oncology">Oncology</option>
                                <option value="Radiology">Radiology</option>
                                <option value="Cardiology">Cardiology</option>
                                <option value="Internal Medicine">Internal Medicine</option>
                                <option value="Pediatrics">Pediatrics</option>
                            </select>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                                required
                            />
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-all"
                                required
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-3 px-6 bg-[#2DD4BF] hover:bg-[#26b8a5] text-[#0B1220] font-semibold rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                    </svg>
                                    Creating Account...
                                </>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-slate-400">
                            Already have an account?{' '}
                            <button
                                onClick={() => navigate('/login')}
                                className="text-[#2DD4BF] hover:text-[#26b8a5] font-medium transition-colors"
                            >
                                Sign in
                            </button>
                        </p>
                    </div>

                    {/* Demo Note */}
                    <div className="mt-6 p-4 bg-slate-800/50 border border-slate-700 rounded-xl">
                        <p className="text-xs text-slate-400 text-center">
                            This is a demo environment. Use any email and password to create an account.
                        </p>
                    </div>
                </div>

                {/* Footer */}
                <p className="text-center text-slate-500 text-xs mt-6">
                    For demonstration purposes only. Not for clinical use.
                </p>
            </div>
        </div>
    );
}
