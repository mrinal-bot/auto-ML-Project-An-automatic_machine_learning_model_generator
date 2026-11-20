import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './layouts/DashboardLayout';

// Public & Auth Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

// Dashboard Pages
import Dashboard from './pages/dashboard/Dashboard';
import Projects from './pages/dashboard/Projects';
import CreateProject from './pages/dashboard/CreateProject';
import Datasets from './pages/dashboard/Datasets';
import Results from './pages/dashboard/Results';
import Reports from './pages/dashboard/Reports';
import Settings from './pages/dashboard/Settings';

// Global Styles
import './styles/global.css';
import './styles/components.css';
import './styles/auth.css';
import './styles/dataset.css';
import './styles/dataset-components.css';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Public Landing Page */}
          <Route path="/" element={<Home />} />

          {/* Authentication Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Main Dashboard Module (Protected) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="create-project" element={<CreateProject />} />
            <Route path="datasets" element={<Datasets />} />
            <Route path="results" element={<Results />} />
            <Route path="reports" element={<Reports />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          {/* Catch-all redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}
