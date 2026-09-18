import { createContext, useContext, useState } from "react";

import { loginUser, registerUser } from "../services/authService";

const AuthContext = createContext();


export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser || savedUser === "undefined") return null;
    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  });


  // LOGIN — backend ko call karta hai, saath mein localStorage bhi update hota hai (authService ke andar)
  async function login(email, password) {
    try {
      const result = await loginUser({ email, password });
      setUser(result.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  }


  // REGISTER — backend ko call karta hai, saath mein localStorage bhi update hota hai
  async function register(userData) {
    try {
      await registerUser(userData);

      // Register ke baad seedha login bhi kar dete hain (token lene ke liye)
      const loginResult = await loginUser({
        email: userData.email,
        password: userData.password,
      });

      setUser(loginResult.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  }


  // LOGOUT
  function logout() {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}


export function useAuth() {
  return useContext(AuthContext);
}