import { ReactNode } from "react";
import Sidebar from "../Sidebar";
import Topbar from "../Topbar";

interface AppLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: AppLayoutProps) => {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-grow-1 d-flex flex-column bg-light">
        <Topbar />
        <main className="flex-grow-1 p-4">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
