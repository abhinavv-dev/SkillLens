import React, { useState } from 'react';
import { useAuth } from './AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserCircle, Briefcase, ChevronLeft } from 'lucide-react';

const Login = () => {
    const [role, setRole] = useState(null); // 'recruiter' | 'candidate' | null
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || (role === 'recruiter' ? '/recruiter/dashboard' : '/candidate/dashboard');

    const handleLogin = (e) => {
        e.preventDefault();
        // Simulate login - in a real app, validate credentials
        const demoName = role === 'recruiter' ? 'Alex Recruiter' : 'Sarah Candidate';
        const demoEmail = e.target.email.value;

        login(role, demoEmail, demoName);
        navigate(from, { replace: true });
    };

    // Role Selection View
    if (!role) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--bg-dark)] px-4">
                <div className="text-center mb-12">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <span className="text-3xl">🧠</span>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-2">TalentAI</h1>
                    <p className="text-gray-400">Intelligent, Fair, and Efficient Hiring Powered by AI</p>
                </div>

                <h2 className="text-2xl font-semibold mb-8">Select Your Role</h2>

                <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl">
                    <RoleCard
                        icon={<Briefcase size={32} />}
                        title="Recruiter"
                        description="Hire smarter with AI-powered assessments"
                        features={['Analyze job descriptions', 'View analytics', 'Detect anomalies']}
                        onClick={() => setRole('recruiter')}
                        color="border-blue-500 hover:shadow-blue-500/20"
                    />
                    <RoleCard
                        icon={<UserCircle size={32} />}
                        title="Candidate"
                        description="Take assessments and showcase your skills"
                        features={['Access assigned assessments', 'Track performance', 'Get feedback']}
                        onClick={() => setRole('candidate')}
                        color="border-green-500 hover:shadow-green-500/20"
                    />
                </div>
            </div>
        );
    }

    // Login Form View
    return (
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-dark)] relative overflow-hidden">
            <div className="w-full max-w-md p-8 bg-[var(--bg-card)] rounded-2xl shadow-2xl z-10 border border-slate-700/50">
                <button
                    onClick={() => setRole(null)}
                    className="flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ChevronLeft size={16} className="mr-1" /> Back to role selection
                </button>

                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">
                        {role === 'recruiter' ? 'Recruiter Login' : 'Candidate Login'}
                    </h2>
                    <p className="text-gray-400">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            type="email"
                            name="email"
                            defaultValue={role === 'recruiter' ? 'recruiter@talentai.com' : 'candidate@email.com'}
                            className="w-full bg-slate-800 border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                        <input
                            type="password"
                            name="password"
                            defaultValue="password"
                            className="w-full bg-slate-800 border-slate-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-blue-500 transition-all"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-blue-500/25 mt-4"
                    >
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    For demo purposes, use the pre-filled credentials.
                </div>
            </div>
        </div>
    );
};

const RoleCard = ({ icon, title, description, features, onClick, color }) => {
    return (
        <div
            onClick={onClick}
            className={`bg-[var(--bg-card)] p-8 rounded-2xl border-2 border-transparent ${color} cursor-pointer transition-all shadow-xl flex flex-col items-center text-center group hover:scale-[1.02]`}
        >
            <div className="mb-6 p-4 bg-slate-800 rounded-full group-hover:bg-slate-700 transition-colors">
                {icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-gray-400 mb-6">{description}</p>
            <div className="space-y-2 w-full text-left">
                {features.map((feature, idx) => (
                    <div key={idx} className="flex items-center text-sm text-gray-300">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2" />
                        {feature}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Login;
