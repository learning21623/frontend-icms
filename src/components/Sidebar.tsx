import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="d-flex flex-column p-3 bg-dark text-white"
      style={{ width: "250px", minHeight: "100vh" }}
    >
      <h4 className="mb-4">ICMS</h4>
      <ul className="nav nav-pills flex-column mb-auto">
        <li className="nav-item">
          <Link to="/dashboard" className="nav-link text-white">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/policies" className="nav-link text-white">
            Policies
          </Link>
        </li>
        <li>
          <Link to="/claims" className="nav-link text-white">
            Claims
          </Link>
        </li>

        <li>
          <Link to="/users" className="nav-link text-white">
            Users
          </Link>
        </li>
        <li>
          <Link to="/reports" className="nav-link text-white">
            Reports
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
