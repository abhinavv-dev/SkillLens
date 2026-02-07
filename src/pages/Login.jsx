import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, ArrowRight } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (role) => {
        localStorage.setItem('userRole', role);
        if (role === 'recruiter') {
            navigate('/recruiter-dashboard');
        } else {
            navigate('/candidate-dashboard');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#020617] text-slate-50 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center mb-12 z-10"
            >
                <h1 className="text-5xl font-extrabold mb-4 tracking-tight">
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        TalentAI
                    </span>
                </h1>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                    Intelligent, Fair, and Efficient Hiring Powered by AI
                </p>
            </motion.div>

            <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-2xl font-semibold mb-8 text-slate-200 z-10"
            >
                Choose your role to continue
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl z-10">
                {/* Recruiter Card */}
                <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative bg-[#0F172A] border border-slate-800 hover:border-blue-500/50 rounded-2xl p-8 cursor-pointer transition-all shadow-xl hover:shadow-blue-500/10"
                    onClick={() => handleLogin('recruiter')}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                        <Briefcase size={32} />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">Recruiter</h3>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                        Streamline your hiring process with AI-driven testing and candidate analysis.
                    </p>

                    <ul className="text-sm text-slate-500 mb-8 space-y-2">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Create assessments</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Analyze candidates</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-blue-500" /> View analytics</li>
                    </ul>

                    <button className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-transparent border border-blue-500/30 text-blue-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-transparent transition-all flex items-center justify-center gap-2">
                        Continue as Recruiter <ArrowRight size={16} />
                    </button>
                </motion.div>

                {/* Candidate Card */}
                <motion.div
                    whileHover={{ y: -8, transition: { duration: 0.3 } }}
                    className="group relative bg-[#0F172A] border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-8 cursor-pointer transition-all shadow-xl hover:shadow-emerald-500/10"
                    onClick={() => handleLogin('candidate')}
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                    <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                        <GraduationCap size={32} />
                    </div>

                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors">Candidate</h3>
                    <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                        Showcase your skills and unlock opportunities with fair, skill-based assessments.
                    </p>

                    <ul className="text-sm text-slate-500 mb-8 space-y-2">
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Take assessments</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Track performance</li>
                        <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Get hired</li>
                    </ul>

                    <button className="w-full py-3 px-4 rounded-xl font-semibold text-sm bg-transparent border border-emerald-500/30 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white group-hover:border-transparent transition-all flex items-center justify-center gap-2">
                        Continue as Candidate <ArrowRight size={16} />
                    </button>
                </motion.div>
            </div>

            <footer className="absolute bottom-6 text-slate-600 text-sm">
                © 2026 TalentAI Inc. All rights reserved.
            </footer>
        </div>
    );
};

export default Login;
