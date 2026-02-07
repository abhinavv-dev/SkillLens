import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import {
    LayoutDashboard,
    FileText,
    LogOut,
    Briefcase,
    Users,
    PlusCircle,
    Settings
} from 'lucide-react';

const SidebarLayout = ({ role }) => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const candidateLinks = [
        { to: '/candidate/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/candidate/tests', icon: <FileText size={20} />, label: 'Tests' },
    ];

    const recruiterLinks = [
        { to: '/recruiter/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
        { to: '/recruiter/build-assessment', icon: <PlusCircle size={20} />, label: 'Create Job / Test' },
        { to: '/recruiter/manage-tests', icon: <Settings size={20} />, label: 'Manage Tests' }, // Placeholder route
        { to: '/recruiter/results', icon: <Users size={20} />, label: 'Applications' },
    ];

    const links = role === 'candidate' ? candidateLinks : recruiterLinks;
    const roleColor = role === 'candidate' ? 'text-green-400' : 'text-blue-400';
    const roleBorder = role === 'candidate' ? 'border-green-500/20' : 'border-blue-500/20';
    const roleBg = role === 'candidate' ? 'bg-green-900/30' : 'bg-blue-900/30';

    return (
        <div className="flex h-screen bg-[var(--bg-dark)] text-white font-sans overflow-hidden">
            {/* Sidebar */}
            <aside className="w-64 bg-[var(--bg-card)] border-r border-gray-800 flex flex-col flex-shrink-0">
                <div className="p-6 border-b border-gray-800">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-xl">🧠</span>
                        </div>
                        <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            TalentAI
                        </span>
                    </div>
                    <div className={`inline-block px-2 py-0.5 ${roleBg} ${roleColor} text-xs rounded-full border ${roleBorder} mt-2`}>
                        {role.charAt(0).toUpperCase() + role.slice(1)} Workspace
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                                    : 'text-gray-400 hover:bg-slate-800 hover:text-white'
                                }`
                            }
                        >
                            {link.icon}
                            <span className="font-medium">{link.label}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-gray-800">
                    <div className="flex items-center gap-3 px-4 py-3 mb-2">
                        <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <div className="text-sm font-medium truncate">{user?.name}</div>
                            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
                        </div>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto bg-[var(--bg-dark)]">
                <Outlet />
            </main>
        </div>
    );
};

export default SidebarLayout;
