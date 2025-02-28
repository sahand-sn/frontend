import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router";
import { useNotification } from "../context/notification";
import type { AuthContextType } from "~/context/auth";
import type { AxiosError } from "axios";
import type { IError } from "~/types/api";

export default function AddMenu() {
  const { authAxios }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Menu>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await authAxios
      .post<{ message: string; id: string }>("/menu", formData, {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        showNotification(res.data.message, "success");
        navigate(`/menu/${res.data.id}`);
      })
      .catch((error: AxiosError<IError>) => {
        showNotification(
          error.response?.data.error ?? "Could not add menu",
          "error"
        );
      });
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Create New Menu
      </Typography>
      <form onSubmit={handleSubmit}>
        {/* Form fields for menu details */}
        <Button type="submit" variant="contained">
          Save Menu
        </Button>
      </form>
    </Container>
  );
}
