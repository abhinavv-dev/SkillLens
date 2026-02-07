import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RoleGuard = ({ allowedRoles }) => {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        // Redirect to their appropriate dashboard if they try to access wrong role page
        const target = user.role === 'recruiter' ? '/recruiter/dashboard' : '/candidate/dashboard';
        return <Navigate to={target} replace />;
    }

    return <Outlet />;
};

export default RoleGuard;
