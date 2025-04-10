// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (input, password) => {
    try {
      let username = input;

      // Step 1: If input is email, find the corresponding username
      if (input.includes("@")) {
        const { data } = await axios.get("https://dummyjson.com/users");
        const userByEmail = data.users.find(
          (u) => u.email.toLowerCase() === input.toLowerCase()
        );

        if (!userByEmail) {
          toast.error("Email not found");
          return false;
        }

        username = userByEmail.username;
      }

      // Step 2: Use DummyJSON auth API to log in with username
      const res = await fetch("https://dummyjson.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        toast.error("Invalid credentials");
        return false;
      }

      const userData = await res.json();
      setUser(userData);
      toast.success("Login successful!");
      return true;
    } catch (error) {
      toast.error("Login failed");
      console.error(error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    toast("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access auth
export const useAuth = () => useContext(AuthContext);
