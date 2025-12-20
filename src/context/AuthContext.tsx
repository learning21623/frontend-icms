// src/context/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Function to set user and handle strict navigation
  const login = (token: string, navigate: any) => {
    localStorage.setItem("token", token);
    const decoded: any = jwtDecode(token);
    setUser(decoded);

    // ✅ Strict Role-Based Navigation
    if (decoded.role === "admin") {
      navigate("/doctor");
    } else if (decoded.role === "superAdmin") {
      navigate("/dashboard");
    }
    // No "else" redirect here to prevent unauthorized access to dashboard
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