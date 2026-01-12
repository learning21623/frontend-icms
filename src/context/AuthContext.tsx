// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const login = (token: string, navigate: any) => {
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    setUser(decoded);

    // ✅ Expanded Role-Based Navigation
    // Check for role string or roleId based on your JWT structure
    if (decoded.role === "superAdmin" || decoded.roleId === 1) {
      navigate("/dashboard");
    } else if (decoded.role === "admin" || decoded.roleId === 2) {
      navigate("/doctor");
    } else if (decoded.role === "doctor" || decoded.roleId === 3 || decoded.role === "staff" || decoded.roleId === 4) {
      // Redirect Staff and Doctors to the Patient List
      navigate("/patient");
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setUser(decoded);
      } catch (e) {
        localStorage.clear();
      }
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuth: !!user, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);