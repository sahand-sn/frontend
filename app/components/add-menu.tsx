import { useNavigate, useOutletContext } from "react-router";
import { useNotification } from "../context/notification";
import type { AuthContextType } from "~/context/auth";
import type { AxiosError } from "axios";
import type { IError } from "~/types/api";
import { MenuForm } from "./menu/menu-form";

export default function AddMenu() {
  const { authAxios }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (data: Menu) => {
    await authAxios
      .post<{ message: string; id: string }>("/menu", data, {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        showNotification(res.data.message, "success");
        navigate(`/menu/details/${res.data.id}`);
      })
      .catch((error: AxiosError<IError>) => {
        showNotification(
          error.response?.data.error ?? "Could not add menu",
          "error"
        );
      });
  };

  return <MenuForm onSubmit={handleSubmit} />;
}
