// src/auth/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type User = {
  id: number;
  email: string;
  role: "superAdmin" | "admin" | "doctor" | "staff";
  hospitalId?: number;
};

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) logout();
      else setUser(decoded);
    } catch {
      logout();
    }
  }, []);

  const logout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, isAuth: !!user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
