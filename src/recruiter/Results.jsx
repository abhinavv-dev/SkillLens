import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Filter, AlertTriangle, Check, X, Eye } from 'lucide-react';
import { mockCandidates } from '../services/mockData';

const Results = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const filteredCandidates = mockCandidates.filter(c => {
        const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.role.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filter === 'all' || c.status === filter;
        return matchesSearch && matchesFilter;
    });

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] text-white p-8">
            <div className="max-w-6xl mx-auto">
                <button
                    onClick={() => navigate('/recruiter/dashboard')}
                    className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </button>

                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">Candidate Results</h1>
                        <p className="text-gray-400">View rankings, scores, and anti-cheat flags.</p>
                    </div>

                    <div className="flex gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <input
                                type="text"
                                placeholder="Search candidates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-slate-800 border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
                            />
                        </div>
                        <div className="relative">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-slate-800 border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 appearance-none"
                            >
                                <option value="all">All Status</option>
                                <option value="qualified">Qualified</option>
                                <option value="disqualified">Disqualified</option>
                                <option value="pending">Pending</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="bg-[var(--bg-card)] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-800/50 text-gray-400 text-sm">
                                    <th className="p-4 font-medium">Rank</th>
                                    <th className="p-4 font-medium">Candidate</th>
                                    <th className="p-4 font-medium">Role</th>
                                    <th className="p-4 font-medium">Score</th>
                                    <th className="p-4 font-medium">Status</th>
                                    <th className="p-4 font-medium">Flags</th>
                                    <th className="p-4 font-medium text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredCandidates.map((candidate, idx) => (
                                    <tr key={candidate.id} className="border-b border-gray-800 hover:bg-slate-800/30 transition-colors">
                                        <td className="p-4 font-mono text-gray-500">#{idx + 1}</td>
                                        <td className="p-4">
                                            <div className="font-semibold text-white">{candidate.name}</div>
                                            <div className="text-xs text-gray-500">{candidate.email || 'candidate@email.com'}</div>
                                        </td>
                                        <td className="p-4 text-sm text-gray-300">{candidate.role}</td>
                                        <td className="p-4">
                                            {candidate.score > 0 ? (
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 bg-slate-700 h-2 rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${candidate.score >= 70 ? 'bg-green-500' : 'bg-red-500'}`}
                                                            style={{ width: `${candidate.score}%` }}
                                                        ></div>
                                                    </div>
                                                    <span className="text-sm font-bold">{candidate.score}%</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500 text-sm">-</span>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${candidate.status === 'qualified' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                    candidate.status === 'disqualified' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                                }`}>
                                                {candidate.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {candidate.score < 50 && candidate.status === 'disqualified' ? (
                                                <div className="flex items-center text-red-400 text-xs gap-1" title="Low Score">
                                                    <AlertTriangle size={14} />
                                                    <span>Performance</span>
                                                </div>
                                            ) : candidate.id % 4 === 0 ? ( // Fake logic for flags
                                                <div className="flex items-center text-yellow-400 text-xs gap-1" title="Suspicious Activity">
                                                    <AlertTriangle size={14} />
                                                    <span>Tab Switch</span>
                                                </div>
                                            ) : (
                                                <span className="text-green-500/50 text-xs flex items-center gap-1"><Check size={12} /> Clean</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button className="text-blue-400 hover:text-white p-2 hover:bg-slate-700 rounded transition-colors">
                                                <Eye size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
