import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { createContext, useContext, useEffect, useState } from "react";
import { firebaseLogin, logout as firebaseLogout, firebaseRegister } from "../hooks/auth";

interface AuthContextType {
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("");

  // Load user session from SecureStore on app start
  useEffect(() => {
    const loadUser = async () => {
      try {
        const email = await SecureStore.getItemAsync("email");
        const uid = await SecureStore.getItemAsync("userId");

        if (email && uid) {
          setUser({ email, uid });
        }
      } catch (e) {
        console.error("Failed to load user:", e);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      const userCredential = await firebaseLogin(email, password);
      setUser({ email: userCredential.email, uid: userCredential.uid });
      setError(null);
      router.replace("/");
    } catch (e: any) {
      setError(e);
      console.error("Login failed:", e);
    }
  };

  // Register
  const register = async (email: string, password: string) => {
    try {
      const userCredential: any = await firebaseRegister(email, password);
      setUser({ email: userCredential.email, uid: userCredential.uid });
      setError(null);
      router.replace("/");
    } catch (e: any) {
      setError(e);
      console.error("Registration failed:", e);
    }
  };

  // Logout
  const logout = async () => {
    try {
      await firebaseLogout();
      setUser(null);
      router.replace("/auth");
    } catch (e) {
      console.error("Logout failed:", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
