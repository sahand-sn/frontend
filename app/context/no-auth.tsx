import { createContext, useMemo, useCallback } from "react";
import axios, { AxiosError, type AxiosInstance } from "axios";
import { Outlet, useNavigate } from "react-router";
import { useNotification } from "./notification";
import type { IError } from "~/types/api";

export interface NoAuthContextType {
  login: (username: string, password: string) => Promise<void>;
  signup: (username: string, password: string) => Promise<void>;
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
    async (username: string, password: string) => {
      await noAuthAxios
        .post<{ token: string }>("/token/login", {
          username,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          router("/");
        })
        .catch((e: AxiosError<IError>) => {
          showNotification(
            e.response?.data.error ?? "Some thing went wrong!",
            "error"
          );
        });
    },
    [noAuthAxios]
  );

  const signup = useCallback(
    async (username: string, password: string) => {
      await noAuthAxios
        .post<{ token: string }>("/token/signup", {
          username,
          password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.token);
          router("/");
        })
        .catch((e: AxiosError<IError>) => {
          showNotification(
            e.response?.data.error ?? "Some thing went wrong!",
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
