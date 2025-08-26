import { ReactNode } from "react";
import { Card } from "react-bootstrap";

interface AuthLayoutProps {
  title?: string;
  children: ReactNode;
}

const AuthLayout = ({ title = "Insurance- CMS", children }: AuthLayoutProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <Card className="shadow p-4" style={{ width: "400px", borderRadius: "15px" }}>
        <h3 className="text-center mb-4" style={{ fontWeight: "bold", letterSpacing: "2px" }}>
          {title}
        </h3>
        {children}
      </Card>
    </div>
  );
};

export default AuthLayout;
