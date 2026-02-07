import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Plus, Trash2, Save, ArrowLeft, Clock, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const AssessmentBuilder = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const initialQuestions = location.state?.analysis?.generatedQuestions || [];

    const [title, setTitle] = useState('New Assessment');
    const [duration, setDuration] = useState(60);
    const [questions, setQuestions] = useState(initialQuestions);

    const addQuestion = (type) => {
        setQuestions([...questions, {
            id: Date.now(),
            type,
            question: '',
            options: type === 'mcq' ? ['', '', '', ''] : undefined,
            correct: type === 'mcq' ? '' : undefined
        }]);
    };

    const removeQuestion = (id) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const updateQuestion = (id, field, value) => {
        setQuestions(questions.map(q => q.id === id ? { ...q, [field]: value } : q));
    };

    const handleSave = () => {
        // Logic to save assessment would go here
        alert('Assessment Saved Successfully!');
        navigate('/recruiter/dashboard');
    };

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] text-white p-8">
            <div className="max-w-4xl mx-auto">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-400 hover:text-white mb-6 transition-colors"
                >
                    <ArrowLeft size={20} className="mr-2" /> Back
                </button>

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="bg-transparent text-3xl font-bold focus:outline-none border-b border-transparent focus:border-blue-500 transition-colors w-full"
                        />
                        <p className="text-gray-400 mt-1">Customize your assessment questions and settings.</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className="flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl font-semibold shadow-lg shadow-green-500/20 transition-all"
                    >
                        <Save size={20} />
                        Save Assessment
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="col-span-2 space-y-6">
                        {questions.map((q, idx) => (
                            <motion.div
                                key={q.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-[var(--bg-card)] p-6 rounded-xl border border-gray-800 relative group"
                            >
                                <button
                                    onClick={() => removeQuestion(q.id)}
                                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                    <Trash2 size={18} />
                                </button>

                                <div className="mb-4">
                                    <span className="text-xs font-mono uppercase bg-slate-800 text-gray-400 px-2 py-1 rounded mb-2 inline-block">
                                        Question {idx + 1} - {q.type}
                                    </span>
                                    <input
                                        type="text"
                                        value={q.question}
                                        onChange={(e) => updateQuestion(q.id, 'question', e.target.value)}
                                        placeholder="Enter question text..."
                                        className="w-full bg-slate-800/50 border-none text-lg font-medium p-2 rounded focus:ring-1 focus:ring-blue-500"
                                    />
                                </div>

                                {q.type === 'mcq' && (
                                    <div className="space-y-2 pl-4 border-l-2 border-slate-700">
                                        {q.options?.map((opt, i) => (
                                            <div key={i} className="flex items-center gap-2">
                                                <div className="w-4 h-4 rounded-full border border-gray-500"></div>
                                                <input
                                                    type="text"
                                                    value={opt}
                                                    onChange={(e) => {
                                                        const newOptions = [...q.options];
                                                        newOptions[i] = e.target.value;
                                                        updateQuestion(q.id, 'options', newOptions);
                                                    }}
                                                    placeholder={`Option ${i + 1}`}
                                                    className="flex-1 bg-transparent border-b border-gray-700 text-sm py-1 focus:border-blue-500"
                                                />
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </motion.div>
                        ))}

                        <div className="flex justify-center gap-4 py-8 border-t border-gray-800 border-dashed">
                            <button onClick={() => addQuestion('mcq')} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-blue-400">
                                <Plus size={16} /> Add MCQ
                            </button>
                            <button onClick={() => addQuestion('text')} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-purple-400">
                                <Plus size={16} /> Add Subjective
                            </button>
                            <button onClick={() => addQuestion('code')} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm text-yellow-400">
                                <Plus size={16} /> Add Code
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="bg-[var(--bg-card)] p-6 rounded-xl border border-gray-800 sticky top-8">
                            <h3 className="text-lg font-semibold mb-4">Settings</h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                                        <Clock size={16} /> Duration (minutes)
                                    </label>
                                    <input
                                        type="number"
                                        value={duration}
                                        onChange={(e) => setDuration(Number(e.target.value))}
                                        className="w-full"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2">
                                        <Award size={16} /> Passing Score (%)
                                    </label>
                                    <input
                                        type="number"
                                        defaultValue={70}
                                        className="w-full"
                                    />
                                </div>
                                <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 text-sm text-blue-300">
                                    <p>Total Questions: {questions.length}</p>
                                    <p>Est. Time: {questions.length * 5} mins</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssessmentBuilder;
