// src/auth/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // 👈 CHANGE THIS from ../hooks/useAuth

export const ProtectedRoute = ({ children, roles }: any) => {
  const { user, isAuth } = useAuth(); // 👈 Use the values from AuthContext

  if (!isAuth) {
    return <Navigate to="/" />; // Redirect to Login if not authenticated
  }

  if (roles && (!user || !roles.includes(user.role))) {
    return <Navigate to="/403" />;
  }

  return children;
};