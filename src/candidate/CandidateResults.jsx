import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, BarChart2 } from 'lucide-react';

const CandidateResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const score = location.state?.score || 0; // Default or from state

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] text-white p-8 flex items-center justify-center">
            <div className="max-w-2xl w-full bg-[var(--bg-card)] p-12 rounded-3xl border border-gray-800 shadow-2xl text-center relative overflow-hidden">
                {/* Background Glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-blue-500/10 blur-[100px] pointer-events-none"></div>

                <div className="relative z-10">
                    <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 ring-8 ring-green-500/10">
                        <CheckCircle size={48} />
                    </div>

                    <h1 className="text-3xl font-bold mb-2">Assessment Completed!</h1>
                    <p className="text-gray-400 mb-8">Thank you for completing the assessment. Your results have been submitted.</p>

                    <div className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700 mb-8 max-w-sm mx-auto">
                        <div className="text-sm text-gray-400 uppercase tracking-widest mb-2 font-semibold">Your Score</div>
                        <div className="text-6xl font-black text-white mb-2">{score}%</div>
                        <div className={`text-sm py-1 px-3 rounded-full inline-block ${score >= 70 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                            {score >= 70 ? 'Passed' : 'Needs Improvement'}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                        <div className="p-4 bg-slate-800 rounded-xl">
                            <div className="text-xs text-gray-500 mb-1">Strongest Skill</div>
                            <div className="font-bold text-blue-400">React Hooks</div>
                        </div>
                        <div className="p-4 bg-slate-800 rounded-xl">
                            <div className="text-xs text-gray-500 mb-1">Time Taken</div>
                            <div className="font-bold text-gray-300">45 mins</div>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/candidate/dashboard')}
                        className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                    >
                        <ArrowLeft size={20} /> Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CandidateResults;
