import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import RecruiterDashboard from './pages/RecruiterDashboard';
import CandidateDashboard from './pages/CandidateDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRole }) => {
  const role = localStorage.getItem('userRole');
  const location = useLocation();

  if (!role) {
    // Not logged in -> Redirect to Login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRole && role !== allowedRole) {
    // Wrong role -> Redirect to correct dashboard
    if (role === 'recruiter') return <Navigate to="/recruiter-dashboard" replace />;
    if (role === 'candidate') return <Navigate to="/candidate-dashboard" replace />;
  }

  return children;
};

// Login Route Wrapper (Redirects if already logged in)
const LoginRoute = () => {
  const role = localStorage.getItem('userRole');
  if (role === 'recruiter') return <Navigate to="/recruiter-dashboard" replace />;
  if (role === 'candidate') return <Navigate to="/candidate-dashboard" replace />;
  return <Login />;
}

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<LoginRoute />} />
        <Route path="/login" element={<LoginRoute />} />

        <Route
          path="/recruiter-dashboard"
          element={
            <ProtectedRoute allowedRole="recruiter">
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/candidate-dashboard"
          element={
            <ProtectedRoute allowedRole="candidate">
              <CandidateDashboard />
            </ProtectedRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
