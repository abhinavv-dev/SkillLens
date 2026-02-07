import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, FileText, Users, LogOut } from 'lucide-react';

const RecruiterDashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userRole');
        navigate('/login');
    };

    return (
        <div className="flex min-h-screen bg-[#020617] text-slate-100">
            {/* Sidebar */}
            <aside className="w-64 bg-[#0F172A] border-r border-slate-800 p-6 flex flex-col">
                <div className="mb-10 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <span className="font-bold text-white">T</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">TalentAI</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <SidebarItem icon={<PlusCircle size={20} />} label="Create Test" />
                    <SidebarItem icon={<FileText size={20} />} label="Manage Tests" />
                    <SidebarItem icon={<Users size={20} />} label="Applications" />
                </nav>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors mt-auto"
                >
                    <LogOut size={20} />
                    <span className="font-medium">Logout</span>
                </button>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto">
                <header className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Welcome back, Recruiter</h1>
                        <p className="text-slate-400">Here's what's happening today.</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700" />
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard label="Total Job Posts" value="12" color="blue" />
                    <StatCard label="Total Applicants" value="148" color="emerald" />
                    <StatCard label="Shortlisted" value="24" color="purple" />
                </div>

                {/* Placeholders for Charts/Tables */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 h-80">
                        <h3 className="font-semibold mb-4 text-slate-300">Application Trends</h3>
                        <div className="w-full h-full flex items-center justify-center text-slate-600 bg-slate-900/50 rounded-xl">
                            Chart Placeholder
                        </div>
                    </div>
                    <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 h-80">
                        <h3 className="font-semibold mb-4 text-slate-300">Recent Candidates</h3>
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-800" />
                                        <div>
                                            <div className="font-medium text-sm">Candidate #{100 + i}</div>
                                            <div className="text-xs text-slate-500">Applied for Frontend Dev</div>
                                        </div>
                                    </div>
                                    <span className="text-xs font-medium px-2 py-1 rounded bg-blue-500/10 text-blue-400">Review</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Sub-components
const SidebarItem = ({ icon, label, active }) => (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
        {icon}
        <span className="font-medium text-sm">{label}</span>
    </button>
);

const StatCard = ({ label, value, color }) => {
    const colors = {
        blue: "text-blue-400",
        emerald: "text-emerald-400",
        purple: "text-purple-400"
    };

    return (
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
            <h3 className="text-slate-400 text-sm font-medium mb-2">{label}</h3>
            <div className={`text-3xl font-bold ${colors[color] || 'text-white'}`}>{value}</div>
        </div>
    );
};

export default RecruiterDashboard;
