import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useParams, useNavigate, useOutletContext, Link } from "react-router";
import { useNotification } from "../context/notification";
import type { AuthContextType } from "~/context/auth";
import { MenuForm } from "./menu/menu-form";
import type { AxiosError } from "axios";
import type { IError } from "~/types/api";

export default function MenuDetails() {
  const { id } = useParams();
  const { authAxios }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [menu, setMenu] = useState<Menu>();
  const [key, setKey] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

  useEffect(() => {
    authAxios
      .get<Menu>(`/menu/${id}`)
      .then((res) => {
        setMenu(res.data);
      })
      .catch((error: AxiosError<IError>) =>
        showNotification(
          error.response?.data.error ?? "Menu not found",
          "error"
        )
      );
  }, [id]);

  const handleDelete = async () => {
    await authAxios
      .delete<{ message: string }>(`/menu/${id}`)
      .then((res) => {
        showNotification(res.data.message, "success");
        navigate("/");
      })
      .catch((error: AxiosError<IError>) => {
        showNotification(
          error.response?.data.error ?? "Error deleting menu",
          "error"
        );
      });
  };

  const handleEdit = async (menu: Menu) => {
    authAxios
      .put<{ message: string; menu: Menu }>(`/menu/${id}`, menu, {
        headers: {
          accept: "application/json",
          "Content-Type": `multipart/form-data`,
        },
      })
      .then((res) => {
        showNotification(res.data.message, "success");
        setMenu(res.data.menu);
        setEditMode(false);
      })
      .catch((error: AxiosError<IError>) => {
        showNotification(
          error.response?.data.error ?? "Could not edit the menu",
          "error"
        );
      });
  };

  if (!menu) return <div>Loading...</div>;

  return (
    <main className="space-y-4">
      <MenuForm
        onSubmit={handleEdit}
        initialData={menu}
        readOnly={!editMode}
        key={key}
      />
      <div className="flex gap-2">
        <Button component={Link} to="/" variant="outlined">
          Back to List
        </Button>
        {editMode ? (
          <Button
            variant="outlined"
            onClick={() => {
              setEditMode(false);
              setKey((prev) => prev + 1);
            }}
          >
            Cancel
          </Button>
        ) : (
          <>
            <Button variant="contained" onClick={() => setEditMode(true)}>
              Edit
            </Button>
            <Button
              variant="outlined"
              onClick={() => setDeleteConfirmOpen(true)}
              color="error"
            >
              Delete
            </Button>
          </>
        )}
      </div>
      <Dialog
        open={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
      >
        <DialogTitle>Delete Menu</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Deleting a menu cannot be reverted. Do you want to proceed?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </main>
  );
}
