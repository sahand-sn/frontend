import {
  createContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import { Outlet, useNavigate } from "react-router";
import axios, { AxiosError, type AxiosInstance } from "axios";
import type { User } from "../types/user";
import type { TResponse } from "~/types/api";
import { useNotification } from "./notification";

export interface AuthContextType {
  user: User | null;
  logout: () => void;
  authAxios: AxiosInstance;
}

export const AuthContext = createContext<AuthContextType>(null!);

export default function AuthProvider() {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const authAxios = useMemo(() => {
    const instance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE,
    });
    instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    return instance;
  }, []);

  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      logout();
      return;
    }

    await authAxios
      .get<TResponse<{ user: User }>>("/auth/me")
      .then((res) => {
        setUser(res.data.data.user);
        showNotification(res.data.message, "success");
      })
      .catch((err: AxiosError<TResponse>) => {
        logout();
        showNotification(
          err.response?.data.message ?? "Some thing went wrong!",
          "error"
        );
      });
  }, [authAxios]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  }, [navigate]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = useMemo(
    () => ({
      user,
      logout,
      authAxios,
    }),
    [user, logout, authAxios]
  );

  return (
    <AuthContext.Provider value={value}>
      {user ? <Outlet context={value} /> : <p>Loading...</p>}
    </AuthContext.Provider>
  );
}
