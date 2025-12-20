// src/components/layout/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import exp from "constants";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "active bg-primary" : "";

  return (
    <div className="d-flex flex-column p-3 bg-dark text-white shadow" style={{ width: "260px", minHeight: "100vh" }}>
      <h3 className="mb-4 ps-2 fw-bold text-uppercase">ICMS</h3>
      <ul className="nav nav-pills flex-column mb-auto">
        
        {/* SUPER ADMIN VIEW */}
        {user?.role === "superAdmin" && (
          <>
          <li className="nav-item mb-2">
            <Link to="/dashboard" className={`nav-link text-white ${isActive("/dashboard")}`}>Dashboard</Link>
          </li>
          <li className="nav-item mb-2">
            <Link to="/users" className={`nav-link text-white ${isActive("/users")}`}>Hospitals List</Link>
          </li>
          </>
          
        )}

        {/* ADMIN VIEW */}
        {user?.role === "admin" && (
          <>
            <li className="nav-item mb-2">
              <Link to="/doctor" className={`nav-link text-white ${isActive("/doctor")}`}>Doctor List</Link>
            </li>
            <li className="nav-item mb-2">
              <Link to="/staff" className={`nav-link text-white ${isActive("/staff")}`}>Staff List</Link>
            </li>
          </>
        )}

      </ul>
      <div className="mt-auto small text-muted ps-2">Role: {user?.role}</div>
    </div>
  );
};

export default Sidebar;