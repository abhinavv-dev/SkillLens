import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockAIService } from '../services/mockAI';
import { Clock, AlertTriangle, CheckCircle, Code, Save } from 'lucide-react';

const Assessment = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 mins
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Mock questions for the assessment
    const questions = [
        { id: 1, type: 'mcq', question: 'Which of the following is NOT a React Hook?', options: ['useState', 'useFetch', 'useEffect', 'useMemo'] },
        { id: 2, type: 'mcq', question: 'What is the purpose of the virtual DOM?', options: ['Directly update HTML', 'Optimize DOM updates', 'Store database records', 'None of the above'] },
        { id: 3, type: 'code', question: 'Write a function that checks if a string is a palindrome.', starterCode: '// Write your code here\nfunction isPalindrome(str) {\n  \n}' },
        { id: 4, type: 'text', question: 'Explain the concept of "Lifting State Up" in React.' }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) {
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleAnswer = (val) => {
        setAnswers({ ...answers, [currentQuestion]: val });
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        // Simulate submission
        await new Promise(r => setTimeout(r, 1000));
        // In a real app, calculate score here or on backend
        // We will redirect to results with a mock score
        navigate(`/candidate/results/${id}`, { state: { score: 85 } });
    };

    const question = questions[currentQuestion];

    return (
        <div className="min-h-screen bg-[var(--bg-dark)] text-white flex flex-col">
            {/* Top Bar */}
            <div className="h-16 bg-[var(--bg-card)] border-b border-gray-800 flex justify-between items-center px-8 fixed w-full top-0 z-50">
                <div className="font-bold text-lg">Senior Full Stack Developer Assessment</div>
                <div className={`flex items-center gap-2 font-mono text-xl font-bold ${timeLeft < 300 ? 'text-red-500 animate-pulse' : 'text-blue-400'}`}>
                    <Clock size={20} />
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="flex-1 flex mt-16">
                {/* Sidebar / Question Navigator */}
                <div className="w-64 bg-[var(--bg-card)] border-r border-gray-800 p-6 hidden md:block overflow-y-auto">
                    <h3 className="text-sm font-bold text-gray-500 uppercase mb-4">Questions</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {questions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentQuestion(idx)}
                                className={`aspect-square rounded-lg flex items-center justify-center text-sm font-semibold transition-all ${currentQuestion === idx ? 'bg-blue-600 text-white ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0F172A]' :
                                        answers[idx] ? 'bg-blue-900/30 text-blue-400 border border-blue-500/30' :
                                            'bg-slate-800 text-gray-400 hover:bg-slate-700'
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    <div className="mt-8 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-xs text-yellow-400">
                        <div className="flex items-center gap-2 mb-2 font-bold"><AlertTriangle size={14} /> Anti-Cheat Active</div>
                        Full-screen mode enforced. Tab switching is monitored.
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-8 overflow-y-auto">
                    <div className="max-w-3xl mx-auto">
                        <div className="mb-6 flex justify-between items-center">
                            <span className="text-sm text-gray-500 font-mono">Question {currentQuestion + 1} of {questions.length}</span>
                            <span className="text-sm bg-slate-800 px-2 py-1 rounded text-gray-300 uppercase">{question.type}</span>
                        </div>

                        <h2 className="text-2xl font-bold mb-8 leading-relaxed">{question.question}</h2>

                        {question.type === 'mcq' && (
                            <div className="space-y-3">
                                {question.options.map((opt, i) => (
                                    <button
                                        key={i}
                                        onClick={() => handleAnswer(opt)}
                                        className={`w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between group ${answers[currentQuestion] === opt
                                                ? 'border-blue-500 bg-blue-500/10 text-white'
                                                : 'border-slate-700 bg-slate-800/50 text-gray-300 hover:border-slate-500'
                                            }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs ${answers[currentQuestion] === opt ? 'border-blue-500 bg-blue-500' : 'border-gray-500'}`}>
                                                {String.fromCharCode(65 + i)}
                                            </span>
                                            {opt}
                                        </span>
                                        {answers[currentQuestion] === opt && <CheckCircle size={20} className="text-blue-500" />}
                                    </button>
                                ))}
                            </div>
                        )}

                        {(question.type === 'text' || question.type === 'code') && (
                            <div className="relative">
                                {question.type === 'code' && <div className="absolute top-0 right-0 p-2 text-xs text-gray-500 flex items-center gap-1"><Code size={12} /> JavaScript</div>}
                                <textarea
                                    className={`w-full h-64 bg-[#1E1E1E] text-gray-300 p-4 rounded-xl border border-gray-700 font-mono text-sm leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none ${question.type === 'code' ? 'pl-4' : ''}`}
                                    value={answers[currentQuestion] || (question.starterCode || '')}
                                    onChange={(e) => handleAnswer(e.target.value)}
                                    placeholder="Type your answer here..."
                                    spellCheck={false}
                                />
                            </div>
                        )}

                        {/* Navigation Buttons */}
                        <div className="mt-12 flex justify-between">
                            <button
                                disabled={currentQuestion === 0}
                                onClick={() => setCurrentQuestion(c => c - 1)}
                                className="px-6 py-3 bg-slate-800 hover:bg-slate-700 rounded-lg disabled:opacity-50 transition-colors"
                            >
                                Previous
                            </button>

                            {currentQuestion < questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentQuestion(c => c + 1)}
                                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-semibold shadow-lg shadow-blue-500/20 transition-all"
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className="px-8 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-bold shadow-lg shadow-green-500/20 transition-all flex items-center gap-2"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Assessment'}
                                    <Save size={18} />
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Assessment;
