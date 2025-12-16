// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";

// User & Admin Pages
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Dashboard from "../pages/user/Dashboard";
import HospitalAdminList from "../pages/hospital/HospitalAdminList"; //

// Policy Pages
import PolicyDashboard from "../pages/policy/PolicyDashboard";
import CreatePolicy from "../pages/policy/CreatePolicy";
import EditPolicy from "../pages/policy/EditPolicy";

// Layout & Auth
import PrivateRoute from "../components/PrivateRoute";
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
          <PrivateRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* FIX: Properly formatted Hospital/Admin route */}
      <Route
        path="/users"
        element={
          <PrivateRoute>
            <Layout>
              <HospitalAdminList />
            </Layout>
          </PrivateRoute>
        }
      />

      {/* Policies */}
      <Route
        path="/policies"
        element={
          <PrivateRoute>
            <Layout>
              <PolicyDashboard />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/policies/create"
        element={
          <PrivateRoute>
            <Layout>
              <CreatePolicy />
            </Layout>
          </PrivateRoute>
        }
      />

      <Route
        path="/policies/edit/:id"
        element={
          <PrivateRoute>
            <Layout>
              <EditPolicy />
            </Layout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;