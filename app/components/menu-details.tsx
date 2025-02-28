import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useParams, useNavigate, useOutletContext } from "react-router";
import { useNotification } from "../context/notification";
import type { AuthContextType } from "~/context/auth";

export default function MenuDetails() {
  const { id } = useParams();
  const { authAxios }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu>();
  const [editMode, setEditMode] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    authAxios
      .get(`/menu/${id}`)
      .then((res) => setMenu(res.data))
      .catch(() => showNotification("Menu not found", "error"));
  }, [id]);

  const handleDelete = async () => {
    try {
      await authAxios.delete(`/menu/${id}`);
      showNotification("Menu deleted", "success");
      navigate("/");
    } catch (error) {
      showNotification("Error deleting menu", "error");
    }
  };

  if (!menu) return <div>Loading...</div>;

  return (
    <Container maxWidth="md">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <Typography variant="h4">{menu.name}</Typography>

        <div>
          <Button
            variant="contained"
            onClick={() => setEditMode(!editMode)}
            sx={{ mr: 2 }}
          >
            {editMode ? "Cancel" : "Edit"}
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => setDeleteConfirmOpen(true)}
          >
            Delete
          </Button>
        </div>
      </header>

      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Delete this menu permanently?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
