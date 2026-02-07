import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Cpu, ChevronRight, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { mockAIService } from '../services/mockAI';
import { useNavigate } from 'react-router-dom';

const JDAnalyzer = () => {
    const [jdText, setJdText] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysis, setAnalysis] = useState(null);
    const navigate = useNavigate();

    const handleAnalyze = async () => {
        if (!jdText.trim()) return;
        setIsAnalyzing(true);
        setAnalysis(null);

        try {
            const result = await mockAIService.parseJD(jdText);
            setAnalysis(result);
        } catch (error) {
            console.error(error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] text-white p-8">
            <div className="max-w-5xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back to Dashboard
                </button>

                <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
                    <FileText className="text-blue-500" /> Job Description Analyzer
                </h1>
                <p className="text-gray-400 mb-8">Paste a job description to extract skills and generate relevant assessment questions using AI.</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Input Section */}
                    <div className="space-y-4">
                        <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800 shadow-lg">
                            <label className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
                            <textarea
                                className="w-full h-80 bg-slate-800 border-slate-700 text-white rounded-xl p-4 focus:ring-2 focus:ring-blue-500 transition-all resize-none font-mono text-sm leading-relaxed"
                                placeholder="Paste job description here... (e.g. We are looking for a Senior React Developer...)"
                                value={jdText}
                                onChange={(e) => setJdText(e.target.value)}
                            ></textarea>

                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing || !jdText.trim()}
                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all shadow-lg ${isAnalyzing || !jdText.trim() ? 'bg-slate-700 text-gray-500 cursor-not-allowed' : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-blue-500/25'}`}
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Analyzing...
                                        </>
                                    ) : (
                                        <>
                                            <Cpu size={20} />
                                            Analyze with AI
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Results Section */}
                    <div className="space-y-4">
                        <AnimatePresence mode="wait">
                            {analysis ? (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800 shadow-lg h-full"
                                >
                                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                                        <CheckCircle className="text-green-500" size={24} />
                                        Analysis Results
                                    </h2>

                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-sm text-gray-500 mb-2 uppercase tracking-wide font-semibold">Detected Skills</h3>
                                            <div className="flex flex-wrap gap-2">
                                                {analysis.skills.map(skill => (
                                                    <span key={skill} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30">
                                                        {skill}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 bg-slate-800 rounded-xl">
                                                <div className="text-xs text-gray-500 mb-1">Experience Level</div>
                                                <div className="font-semibold text-lg">{analysis.experienceLevel}</div>
                                            </div>
                                            <div className="p-4 bg-slate-800 rounded-xl">
                                                <div className="text-xs text-gray-500 mb-1">Estimated Difficulty</div>
                                                <div className={`font-semibold text-lg ${analysis.difficulty === 'Hard' ? 'text-red-400' : 'text-yellow-400'}`}>
                                                    {analysis.difficulty}
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-sm text-gray-500 mb-3 uppercase tracking-wide font-semibold">Recommended Questions</h3>
                                            <div className="space-y-3">
                                                {analysis.generatedQuestions.map((q, idx) => (
                                                    <div key={idx} className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
                                                        <div className="flex justify-between items-start mb-1">
                                                            <span className="text-xs font-mono text-purple-400 bg-purple-900/30 px-2 py-0.5 rounded">{q.type.toUpperCase()}</span>
                                                        </div>
                                                        <p className="text-sm text-gray-300">{q.question}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => navigate('/recruiter/build-assessment', { state: { analysis } })}
                                            className="w-full mt-4 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg shadow-green-600/20"
                                        >
                                            Proceed to Assessment Builder
                                            <ChevronRight size={20} />
                                        </button>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="bg-[var(--bg-card)] p-6 rounded-2xl border border-gray-800 border-dashed h-full flex flex-col items-center justify-center text-center opacity-50">
                                    <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                                        <Cpu size={32} className="text-gray-500" />
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-300">Waiting for input</h3>
                                    <p className="text-sm text-gray-500 mt-2 max-w-xs">Analysis results and AI suggestions will appear here after processing.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JDAnalyzer;
