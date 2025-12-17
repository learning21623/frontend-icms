// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";

// User & Admin Pages
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Dashboard from "../pages/user/Dashboard";
import HospitalAdminList from "../pages/hospital/HospitalAdminList"; //

// Layout & Auth
import { ProtectedRoute } from "../auth/ProtectedRoute"; // Keep this one
import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

      {/* Protected Routes - All follow the same pattern */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* FIX: Properly formatted Hospital/Admin route */}
      <Route
        path="/users"
        element={
          <ProtectedRoute>
            <Layout>
              <HospitalAdminList />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;