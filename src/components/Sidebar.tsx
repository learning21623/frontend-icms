import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const { user } = useAuth();

  return (
    <div className="d-flex flex-column p-3 bg-dark text-white"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4 className="mb-4">ICMS</h4>

      <ul className="nav nav-pills flex-column">
        <li>
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>

        {user?.role === "superAdmin" && (
          <li>
            <Link to="/users" className="nav-link text-white">
              Hospitals / Admins
            </Link>
          </li>
        )}

        {user?.role !== "superAdmin" && (
          <li>
            <Link to="/users/hospital-users" className="nav-link text-white">
              Users
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
