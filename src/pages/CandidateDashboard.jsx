import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileCheck, History, LogOut, PlayCircle } from 'lucide-react';

const CandidateDashboard = () => {
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
                    <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
                        <span className="font-bold text-white">T</span>
                    </div>
                    <span className="text-xl font-bold tracking-tight">TalentAI</span>
                </div>

                <nav className="flex-1 space-y-2">
                    <SidebarItem icon={<LayoutDashboard size={20} />} label="Dashboard" active />
                    <SidebarItem icon={<FileCheck size={20} />} label="Available Tests" />
                    <SidebarItem icon={<History size={20} />} label="My Results" />
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
                        <h1 className="text-2xl font-bold mb-1">Hello, Candidate</h1>
                        <p className="text-slate-400">Ready to showcase your skills?</p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700" />
                </header>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <StatCard label="Tests Completed" value="3" color="emerald" />
                    <StatCard label="Pending Enquiries" value="2" color="yellow" />
                    <StatCard label="Profile Score" value="85%" color="blue" />
                </div>

                {/* Available Tests Section */}
                <h3 className="text-lg font-semibold mb-4 text-slate-200">Recommended Assessments</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        { title: "Frontend React Developer", time: "45 mins", level: "Intermediate" },
                        { title: "Data Structures & Algos", time: "60 mins", level: "Hard" },
                        { title: "UI/UX Design Principals", time: "30 mins", level: "Beginner" }
                    ].map((test, i) => (
                        <div key={i} className="group bg-[#0F172A] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-6 transition-all hover:shadow-emerald-500/10">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-3 bg-slate-900 rounded-xl text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
                                    <FileCheck size={24} />
                                </div>
                                <span className={`text-xs px-2 py-1 rounded bg-slate-800 border border-slate-700 ${test.level === 'Hard' ? 'text-red-400' : 'text-slate-400'}`}>
                                    {test.level}
                                </span>
                            </div>
                            <h4 className="font-bold text-lg mb-2">{test.title}</h4>
                            <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                                <span>{test.time}</span>
                                <span>•</span>
                                <span>Multiple Choice</span>
                            </div>
                            <button className="w-full py-2.5 rounded-xl border border-emerald-500 text-emerald-400 font-medium hover:bg-emerald-600 hover:text-white hover:border-transparent transition-all flex items-center justify-center gap-2">
                                <PlayCircle size={18} />
                                Start Assessment
                            </button>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

// Sub-components (Reused or similar to Recruiter)
const SidebarItem = ({ icon, label, active }) => (
    <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${active ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
        {icon}
        <span className="font-medium text-sm">{label}</span>
    </button>
);

const StatCard = ({ label, value, color }) => {
    const colors = {
        emerald: "text-emerald-400",
        yellow: "text-yellow-400",
        blue: "text-blue-400"
    };

    return (
        <div className="bg-[#0F172A] border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-colors">
            <h3 className="text-slate-400 text-sm font-medium mb-2">{label}</h3>
            <div className={`text-3xl font-bold ${colors[color] || 'text-white'}`}>{value}</div>
        </div>
    );
};

export default CandidateDashboard;
