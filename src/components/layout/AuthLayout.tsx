// src/components/layout/AuthLayout.tsx
import { ReactNode } from "react";
import { Card } from "react-bootstrap";

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#f5f7fa" }}
    >
      <Card className="p-4 shadow-sm" style={{ minWidth: "400px", borderRadius: "12px" }}>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
