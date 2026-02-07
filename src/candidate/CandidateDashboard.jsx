import React from 'react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, Play, AlertCircle, FileCode } from 'lucide-react';

const CandidateDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    // Mock assigned assessments
    const assessments = [
        {
            id: 101,
            title: 'Senior Full Stack Developer Assessment',
            duration: '60 min',
            questions: 15,
            status: 'pending',
            dueDate: '2025-02-10',
            skills: ['React', 'Node.js', 'System Design']
        },
        {
            id: 102,
            title: 'Frontend React Quiz',
            duration: '45 min',
            questions: 20,
            status: 'completed',
            score: 87,
            date: '2025-01-15'
        }
    ];

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] text-white font-sans">


            <main className="p-8 max-w-5xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name.split(' ')[0]}!</h1>
                    <p className="text-gray-400">Track your assessments and view your progress</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800">
                        <div className="text-gray-400 text-xs uppercase mb-1">Total Assessments</div>
                        <div className="text-3xl font-bold">1</div>
                    </div>
                    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800">
                        <div className="text-gray-400 text-xs uppercase mb-1">Completed</div>
                        <div className="text-3xl font-bold text-blue-500">1</div>
                    </div>
                    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800">
                        <div className="text-gray-400 text-xs uppercase mb-1">Passed</div>
                        <div className="text-3xl font-bold text-green-500">1</div>
                    </div>
                    <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800">
                        <div className="text-gray-400 text-xs uppercase mb-1">Pending</div>
                        <div className="text-3xl font-bold text-orange-500">0</div>
                    </div>
                </div>

                <div className="space-y-6">
                    <h2 className="text-xl font-bold border-b border-gray-800 pb-4">Your Assessments</h2>

                    {assessments.map((assessment) => (
                        <div
                            key={assessment.id}
                            className={`bg-[var(--bg-card)] p-6 rounded-2xl border ${assessment.status === 'pending' ? 'border-blue-500/30' : 'border-gray-800'} relative overflow-hidden group hover:border-blue-500/50 transition-colors animate-fade-in-up`}
                        >
                            {assessment.status === 'pending' && <div className="absolute top-0 right-0 p-2 bg-blue-600 text-[10px] font-bold uppercase tracking-wider text-white rounded-bl-xl">Action Required</div>}

                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-white">{assessment.title}</h3>
                                        {assessment.status === 'completed' && <CheckCircle size={16} className="text-green-500" />}
                                    </div>

                                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                                        <div className="flex items-center gap-1"><Clock size={16} /> {assessment.duration}</div>
                                        <div className="flex items-center gap-1"><FileCode size={16} /> {assessment.questions} Questions</div>
                                        {assessment.status === 'pending' && <div className="text-orange-400">Due: {assessment.dueDate}</div>}
                                    </div>

                                    <div className="flex gap-2">
                                        {assessment.skills.map && assessment.skills.map(skill => (
                                            <span key={skill} className="px-2 py-1 bg-slate-800 text-gray-300 text-xs rounded border border-slate-700">{skill}</span>
                                        ))}
                                        {assessment.status === 'completed' && <span className="px-2 py-1 bg-green-900/30 text-green-400 text-xs rounded border border-green-500/30">Score: {assessment.score}%</span>}
                                    </div>
                                </div>

                                <div>
                                    {assessment.status === 'pending' ? (
                                        <button
                                            onClick={() => navigate(`/candidate/assessment/${assessment.id}`)}
                                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 flex items-center gap-2 transition-all hover:scale-105"
                                        >
                                            Start Assessment <Play size={18} />
                                        </button>
                                    ) : (
                                        <button
                                            onClick={() => navigate(`/candidate/results/${assessment.id}`, { state: { score: assessment.score } })}
                                            className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-gray-300 font-semibold rounded-xl border border-slate-700 transition-colors"
                                        >
                                            View Results
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Empty State / Coming Soon */}
                    {assessments.length === 0 && (
                        <div className="text-center py-12 text-gray-500 border-2 border-dashed border-gray-800 rounded-2xl">
                            <AlertCircle size={48} className="mx-auto mb-4 opacity-50" />
                            <p>No assessments assigned yet.</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default CandidateDashboard;
