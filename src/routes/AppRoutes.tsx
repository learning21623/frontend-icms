import { Routes, Route } from "react-router-dom";

// User & Admin Pages
import Login from "../pages/user/Login";
import Register from "../pages/user/Register";
import Dashboard from "../pages/user/Dashboard";
import AddHospital from "../pages/hospital/AddHospital";
import HospitalAdminList from "../pages/hospital/HospitalAdminList";
import HospitalDetail from "../pages/hospital/HospitalDetail";
import HospitalEdit from "../pages/hospital/HospitalEdit";

// Doctor Pages
import AddDoctor from "../pages/doctor/AddDoctor";
import DoctorList from "../pages/doctor/DoctorList";
import EditDoctor from "../pages/doctor/EditDoctor";

// Staff Pages (Import these new components)
import StaffList from "../pages/staff/StaffList";
import AddStaff from "../pages/staff/AddStaff";
import EditStaff from "../pages/staff/EditStaff";

// Layout & Auth
import { ProtectedRoute } from "../auth/ProtectedRoute";
import Layout from "../components/layout/Layout";
import AuthLayout from "../components/layout/AuthLayout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<AuthLayout><Login /></AuthLayout>} />
      <Route path="/register" element={<AuthLayout><Register /></AuthLayout>} />

      {/* SuperAdmin Routes */}
      <Route path="/dashboard" element={<ProtectedRoute roles={["superAdmin"]}><Layout><Dashboard /></Layout></ProtectedRoute>} />
      <Route path="/hospital/add" element={<ProtectedRoute roles={["superAdmin"]}><Layout><AddHospital /></Layout></ProtectedRoute>} />
      <Route path="/hospital/detail/:id" element={<ProtectedRoute roles={["superAdmin"]}><Layout><HospitalDetail /></Layout></ProtectedRoute>} />
      <Route path="/hospital/edit/:id" element={<ProtectedRoute roles={["superAdmin"]}><Layout><HospitalEdit /></Layout></ProtectedRoute>} />

      {/* Admin Protected Routes - Doctor Module */}
      <Route path="/doctor" element={<ProtectedRoute roles={["admin"]}><Layout><DoctorList /></Layout></ProtectedRoute>} />
      <Route path="/doctor/add" element={<ProtectedRoute roles={["admin"]}><Layout><AddDoctor /></Layout></ProtectedRoute>} />
      <Route path="/doctor/edit/:id" element={<ProtectedRoute roles={["admin"]}><Layout><EditDoctor /></Layout></ProtectedRoute>} />

      {/* Admin Protected Routes - Staff Module */}
      <Route
        path="/staff"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Layout>
              <StaffList />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/add"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Layout>
              <AddStaff />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff/edit/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <Layout>
              <EditStaff />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* General Protected Routes */}
      <Route path="/users" element={<ProtectedRoute><Layout><HospitalAdminList /></Layout></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRoutes;