import { createContext, useMemo, useCallback } from "react";
import axios, { AxiosError, type AxiosInstance } from "axios";
import { Outlet, useNavigate } from "react-router";
import { useNotification } from "./notification";
import type { TResponse } from "~/types/api";

export interface NoAuthContextType {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  noAuthAxios: AxiosInstance;
}

const NoAuthContext = createContext<NoAuthContextType>(null!);

export default function NoAuthProvider() {
  const { showNotification } = useNotification();
  const router = useNavigate();
  const noAuthAxios = useMemo(
    () => axios.create({ baseURL: import.meta.env.VITE_API_BASE }),
    []
  );

  const login = useCallback(
    async (email: string, password: string) => {
      await noAuthAxios
        .post<TResponse<{ token: string }>>("/auth/login", {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.data.token);
          router("/");
          showNotification(res.data.message, "success");
        })
        .catch((e: AxiosError<TResponse>) => {
          showNotification(
            e.response?.data.message ?? "Some thing went wrong!",
            "error"
          );
        });
    },
    [noAuthAxios]
  );

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      await noAuthAxios
        .post<TResponse<{ token: string }>>("/auth/signup", {
          name,
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.data.token);
          router("/");
          showNotification(res.data.message, "success");
        })
        .catch((e: AxiosError<TResponse>) => {
          showNotification(
            e.response?.data.message ?? "Some thing went wrong!",
            "error"
          );
        });
    },
    [noAuthAxios]
  );

  const value = useMemo(
    () => ({
      login,
      signup,
      noAuthAxios,
    }),
    [login, signup, noAuthAxios]
  );

  return (
    <NoAuthContext.Provider value={value}>
      <Outlet context={value} />
    </NoAuthContext.Provider>
  );
}
