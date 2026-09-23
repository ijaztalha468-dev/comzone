import { createContext, useContext, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("adminUser");
    return saved ? JSON.parse(saved) : null;
  });

  async function login(email, password) {
    const response = await api.post("/auth/login", { email, password });

    localStorage.setItem("adminToken", response.data.token);
    localStorage.setItem("adminUser", JSON.stringify(response.data.user));

    setAdmin(response.data.user);

    return response.data;
  }

  function logout() {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
