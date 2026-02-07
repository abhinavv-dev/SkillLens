import React from 'react';
import { useAuth } from '../auth/AuthContext';
import {
    Users, CheckCircle, XCircle, Clock, FileText, BarChart2, Search, Bell
} from 'lucide-react';
import { Bar, Doughnut } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';
import { mockDashboardStats, skillsDistribution, statusDistribution, mockCandidates } from '../services/mockData';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

const RecruiterDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] text-white font-sans">
            {/* Header */}


            <main className="p-8 max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
                    <p className="text-gray-400">Overview of all assessments and candidates</p>
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <DashboardAction
                        icon={<FileText size={24} />}
                        title="JD Analyzer"
                        desc="Analyze job descriptions"
                        onClick={() => navigate('/recruiter/jd-analyzer')}
                    />
                    <DashboardAction
                        icon={<BarChart2 size={24} />}
                        title="Build Assessment"
                        desc="Create new assessments"
                        onClick={() => navigate('/recruiter/build-assessment')}
                    />
                    <DashboardAction
                        icon={<CheckCircle size={24} />}
                        title="View Results"
                        desc="Candidate rankings"
                        onClick={() => navigate('/recruiter/results')}
                    />
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <StatCard
                        title="Total Job Posts"
                        value="12"
                        icon={<FileText size={20} />}
                        color="text-indigo-400"
                        subtext="3 Active, 9 Closed"
                    />
                    <StatCard
                        title="Total Applicants"
                        value={mockDashboardStats.totalApplicants}
                        icon={<Users size={20} />}
                        color="text-blue-500"
                        subtext="9 completed assessments"
                    />
                    <StatCard
                        title="Qualified"
                        value={mockDashboardStats.qualified}
                        icon={<CheckCircle size={20} />}
                        color="text-green-500"
                        subtext="77.8% qualification rate"
                    />
                    <StatCard
                        title="Disqualified"
                        value={mockDashboardStats.disqualified}
                        icon={<XCircle size={20} />}
                        color="text-red-500"
                        subtext="Below passing threshold"
                    />
                </div>

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800">
                        <h3 className="text-lg font-semibold mb-1">Candidate Status Distribution</h3>
                        <p className="text-xs text-gray-500 mb-6">Overview of candidate assessment status</p>
                        <div className="h-64 flex items-center justify-center">
                            <Doughnut
                                data={statusDistribution}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    plugins: { legend: { position: 'bottom' } }
                                }}
                            />
                        </div>
                    </div>
                    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800">
                        <h3 className="text-lg font-semibold mb-1">Average Skill Performance</h3>
                        <p className="text-xs text-gray-500 mb-6">Top 5 skills by average candidate score</p>
                        <div className="h-64">
                            <Bar
                                data={skillsDistribution}
                                options={{
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    scales: {
                                        y: { beginAtZero: true, max: 100, grid: { color: '#334155' } },
                                        x: { grid: { display: false } }
                                    },
                                    plugins: { legend: { display: false } }
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Recent Candidates (Mini List) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-semibold">Recent Submissions</h3>
                            <button className="text-sm text-blue-400 hover:text-blue-300">View All</button>
                        </div>
                        <div className="space-y-4">
                            {mockCandidates.slice(0, 4).map(candidate => (
                                <div key={candidate.id} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold text-gray-400">
                                            {candidate.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="font-medium text-sm">{candidate.name}</div>
                                            <div className="text-xs text-gray-500">{candidate.role}</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <div className="text-sm font-bold">{candidate.score > 0 ? `${candidate.score}%` : '-'}</div>
                                            <div className={`text-xs ${candidate.status === 'qualified' ? 'text-green-400' : candidate.status === 'disqualified' ? 'text-red-400' : 'text-gray-500'}`}>
                                                {candidate.status}
                                            </div>
                                        </div>
                                        <button className="p-2 hover:bg-slate-700 rounded-full text-gray-400">
                                            <Search size={16} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Anti-Cheat & Alerts */}
                    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800">
                        <h3 className="text-lg font-semibold mb-4 text-yellow-500 flex items-center gap-2">
                            ⚠️ Anti-Cheat Alerts
                        </h3>
                        <div className="space-y-3">
                            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                                <div className="text-sm font-semibold text-red-400 mb-1">Tab Switch Detected</div>
                                <p className="text-xs text-gray-400">Candidate <b>#12 (Benjamin Blue)</b> switched tabs 14 times during the assessment.</p>
                            </div>
                            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                                <div className="text-sm font-semibold text-orange-400 mb-1">Completion Time Anomaly</div>
                                <p className="text-xs text-gray-400">Candidate <b>#6 (Sophia Tie)</b> completed the Hard section in 2 minutes ( Avg: 15 mins).</p>
                            </div>
                        </div>
                        <button className="w-full mt-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-gray-300">View All Flags</button>
                    </div>
                </div>
            </main>
        </div>
    );
};

const DashboardAction = ({ icon, title, desc, onClick }) => (
    <motion.button
        whileHover={{ scale: 1.02, backgroundColor: 'rgba(59, 130, 246, 0.1)' }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="flex items-center gap-4 p-6 bg-[var(--bg-card)] border border-gray-800 rounded-2xl text-left transition-colors group"
    >
        <div className="p-3 bg-blue-500/20 text-blue-400 rounded-lg group-hover:bg-blue-500 group-hover:text-white transition-colors">
            {icon}
        </div>
        <div>
            <div className="font-semibold text-lg">{title}</div>
            <div className="text-sm text-gray-500">{desc}</div>
        </div>
    </motion.button>
);

const StatCard = ({ title, value, icon, color, subtext, progress }) => (
    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800">
        <div className="flex justify-between items-start mb-4">
            <div>
                <div className="text-gray-400 text-sm mb-1">{title}</div>
                <div className="text-3xl font-bold">{value}</div>
            </div>
            <div className={`p-2 bg-slate-800 rounded-lg ${color}`}>
                {icon}
            </div>
        </div>
        {progress ? (
            <div className="w-full bg-slate-700 h-2 rounded-full mt-2">
                <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${progress}%` }}
                ></div>
            </div>
        ) : (
            <div className="text-xs text-gray-500">
                {subtext}
            </div>
        )}
    </div>
);

export default RecruiterDashboard;
