import { useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useNavigate, useOutletContext } from "react-router";
import { useNotification } from "../context/notification";
import type { AuthContextType } from "~/context/auth";

export default function AddMenu() {
  const { authAxios }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Menu>({
    name: "",
    description: "",
    location: "",
    contact: "",
    sections: [
      {
        name: "",
        items: [
          {
            name: "",
            description: "",
            ingredients: [""],
            image: undefined,
          },
        ],
      },
    ],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const menu = await authAxios.post("/menu", formData);
      showNotification("Menu created successfully!", "success");
      navigate(`/menu/${menu.data.id}`);
    } catch (error) {
      showNotification("Error creating menu", "error");
    }
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
