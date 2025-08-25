import { useState } from 'react';

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setToken(token);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return { token, login, logout };
};

export {};
