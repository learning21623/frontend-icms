// src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//User Management
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
// import CreateUser from "../pages/user/CreateUser";
import Dashboard from "../pages/user/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";

// Policy Management
import PolicyDashboard from "../pages/policy/PolicyDashboard";
import CreatePolicy from "../pages/policy/CreatePolicy";
import EditPolicy from "../pages/policy/EditPolicy";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* Public Auth Pages */}
        <Route
          path="/"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />

        {/* Protected Dashboard with Sidebar + Topbar */}
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
        {/* Policy Management */}
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
    </Router>
  );
};

export default AppRoutes;
