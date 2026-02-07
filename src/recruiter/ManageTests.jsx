import React, { useState } from 'react';
import { Edit, Trash2, Plus, Search, MoreVertical } from 'lucide-react';

const ManageTests = () => {
    const [tests, setTests] = useState([
        { id: 1, title: 'Senior Frontend Engineer', type: 'Coding', candidates: 45, status: 'Active', created: '2025-01-20' },
        { id: 2, title: 'Backend API Specialist', type: 'MCQ + Coding', candidates: 23, status: 'Active', created: '2025-02-01' },
        { id: 3, title: 'Data Scientist Role', type: 'Data Analysis', candidates: 12, status: 'Draft', created: '2025-02-05' },
        { id: 4, title: 'DevOps Engineer', type: 'Mixed', candidates: 8, status: 'Closed', created: '2024-12-15' },
    ]);

    const handleDelete = (id) => {
        if (confirm('Are you sure you want to delete this test?')) {
            setTests(tests.filter(t => t.id !== id));
        }
    };

    return (
        <div className="p-8 max-w-7xl mx-auto text-white">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Manage Tests</h1>
                    <p className="text-gray-400">View and edit your created assessments</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors font-medium">
                    <Plus size={20} /> Create New Test
                </button>
            </div>

            <div className="bg-[var(--bg-card)] rounded-2xl border border-gray-800 overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search tests..."
                            className="w-full bg-slate-800 border-none rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex gap-2">
                        <select className="bg-slate-800 border-none rounded-lg px-3 py-2 text-sm text-gray-300">
                            <option>All Status</option>
                            <option>Active</option>
                            <option>Draft</option>
                            <option>Closed</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-800/50 text-gray-400 text-sm">
                                <th className="p-4 font-medium">Test Title</th>
                                <th className="p-4 font-medium">Type</th>
                                <th className="p-4 font-medium">Candidates</th>
                                <th className="p-4 font-medium">Status</th>
                                <th className="p-4 font-medium">Created</th>
                                <th className="p-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tests.map((test) => (
                                <tr key={test.id} className="border-b border-gray-800 hover:bg-slate-800/30 transition-colors">
                                    <td className="p-4 font-medium text-white">{test.title}</td>
                                    <td className="p-4 text-gray-400">{test.type}</td>
                                    <td className="p-4 text-gray-300">{test.candidates}</td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold ${test.status === 'Active' ? 'bg-green-900/30 text-green-400 border border-green-500/20' :
                                                test.status === 'Draft' ? 'bg-gray-700 text-gray-300' :
                                                    'bg-red-900/20 text-red-400'
                                            }`}>
                                            {test.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-gray-500 text-sm">{test.created}</td>
                                    <td className="p-4 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors">
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(test.id)}
                                                className="p-2 text-gray-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-800 text-center text-xs text-gray-500">
                    Showing {tests.length} results
                </div>
            </div>
        </div>
    );
};

export default ManageTests;
