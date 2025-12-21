// src/routes/AppRoutes.tsx
import { Routes, Route } from "react-router-dom";

// User & Admin Pages
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Dashboard from "../pages/user/Dashboard";
import AddHospital from "../pages/hospital/AddHospital";
import HospitalAdminList from "../pages/hospital/HospitalAdminList";
import HospitalDetail from "../pages/hospital/HospitalDetail";
import HospitalEdit from "../pages/hospital/HospitalEdit";

import AddDoctor from "../pages/doctor/AddDoctor";
import DoctorList from "../pages/doctor/DoctorList";
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
          <ProtectedRoute roles={["superAdmin"]}>
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

      <Route
        path="/hospital/add"
        element={
          <ProtectedRoute roles={["superAdmin"]}>
            <Layout>
              <AddHospital />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital/detail/:id"
        element={
          <ProtectedRoute roles={["superAdmin"]}>
            <Layout>
              <HospitalDetail />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/hospital/edit/:id"
        element={
          <ProtectedRoute roles={["superAdmin"]}>
            <Layout>
              <HospitalEdit />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor/add"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Layout>
              <AddDoctor />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/doctor"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Layout>
              <DoctorList />
            </Layout>
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;