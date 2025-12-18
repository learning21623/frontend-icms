// src/components/layout/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();
  const location = useLocation();

  // Helper to highlight active menu item
  const isActive = (path: string) => location.pathname === path ? "active bg-primary" : "";

  return (
    <div className="d-flex flex-column p-3 bg-dark text-white shadow"
      style={{ width: "260px", minHeight: "100vh", flexShrink: 0 }}
    >
      <h3 className="mb-4 ps-2 fw-bold text-uppercase tracking-wider">ICMS</h3>

      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item mb-2">
          <Link to="/dashboard" className={`nav-link text-white ${isActive("/dashboard")}`}>
            Dashboard
          </Link>
        </li>

        {user?.role === "superAdmin" && (
          <li className="nav-item mb-2">
            <Link to="/users" className={`nav-link text-white ${isActive("/users")}`}>
              Hospitals / Admins
            </Link>
          </li>
        )}

        {user?.role !== "superAdmin" && (
          <li className="nav-item mb-2">
            <Link to="/users/hospital-users" className={`nav-link text-white ${isActive("/users/hospital-users")}`}>
              Users
            </Link>
          </li>
        )}
      </ul>
      <hr />
      <div className="small text-muted ps-2">Logged in as: {user?.role}</div>
    </div>
  );
};

export default Sidebar;