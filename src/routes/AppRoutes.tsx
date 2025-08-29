// src/routes/AppRoutes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
// import CreateUser from "../pages/user/CreateUser";
import Dashboard from "../pages/Dashboard";
import PrivateRoute from "../components/PrivateRoute";
import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";

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
      </Routes>
    </Router>
  );
};

export default AppRoutes;
