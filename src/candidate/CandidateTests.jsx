import React from 'react';
import { Search, Briefcase } from 'lucide-react';

const CandidateTests = () => {
    const tests = [
        { id: 1, company: 'Google', role: 'Full Stack Developer', type: 'Coding + Sys Design', difficulty: 'Hard' },
        { id: 2, company: 'Amazon', role: 'Data Scientist', type: 'Python + ML', difficulty: 'Hard' },
        { id: 3, company: 'Infosys', role: 'CQA Engineer', type: 'Aptitude + Basic Coding', difficulty: 'Easy' },
        { id: 4, company: 'Microsoft', role: 'Backend Developer', type: 'C# + Azure', difficulty: 'Medium' },
        { id: 5, company: 'TCS', role: 'DevOps Engineer', type: 'Jenkins + Docker', difficulty: 'Medium' },
        { id: 6, company: 'Wipro', role: 'UI-UX Designer', type: 'Figma + CSS', difficulty: 'Easy' },
        { id: 7, company: 'Accenture', role: 'Cyber Security Analyst', type: 'Network + Sec', difficulty: 'Medium' },
        { id: 8, company: 'Oracle', role: 'AI-ML Specialist', type: 'Python + Algo', difficulty: 'Hard' },
    ];

    return (
        <div className="p-8 max-w-7xl mx-auto">
            <header className="mb-8">
                <h1 className="text-3xl font-bold mb-2 text-white">Available Tests</h1>
                <p className="text-gray-400">Choose a test to start your assessment process</p>
            </header>

            {/* Search Bar */}
            <div className="relative mb-8 max-w-xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                    type="text"
                    placeholder="Search by company or role..."
                    className="w-full bg-[var(--bg-card)] border border-gray-700 text-white pl-12 pr-4 py-3 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {tests.map((test) => (
                    <div key={test.id} className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800 hover:border-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-xl group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="text-xl font-bold text-gray-200">{test.company}</div>
                            <Briefcase size={18} className="text-gray-500" />
                        </div>

                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-white mb-1">{test.role}</h3>
                            <div className="text-sm text-gray-400">{test.type}</div>
                        </div>

                        <div className="flex items-center justify-between mt-auto">
                            <span className={`px-2 py-1 text-xs rounded border ${test.difficulty === 'Hard' ? 'bg-red-900/20 text-red-400 border-red-900/30' :
                                    test.difficulty === 'Medium' ? 'bg-orange-900/20 text-orange-400 border-orange-900/30' :
                                        'bg-green-900/20 text-green-400 border-green-900/30'
                                }`}>
                                {test.difficulty}
                            </span>

                            <button
                                onClick={() => alert(`Starting test for ${test.company}`)}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                            >
                                Start Test
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CandidateTests;
