// src/auth/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children, roles }: any) => {
  const auth = useAuth();
  const token = auth.token;
  const user = (auth as any).user;

  if (!token) return <Navigate to="/login" />;
  if (roles && (!user || !roles.includes(user.role))) return <Navigate to="/403" />;

  return children;
};
