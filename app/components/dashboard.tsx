import { useEffect, useState } from "react";
import { Button, Container, Grid2 as Grid, Typography } from "@mui/material";
import { Link, useOutletContext } from "react-router";
import type { AuthContextType } from "~/context/auth";
import { useNotification } from "~/context/notification";
import type { AxiosError } from "axios";
import type { IError } from "~/types/api";

export default function Dashboard() {
  const { authAxios, user, logout }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const [menus, setMenus] = useState<Menu[]>([]);

  useEffect(() => {
    authAxios
      .get<Menu[]>("/menu")
      .then((res) => setMenus(res.data))
      .catch((error: AxiosError<IError>) => {
        showNotification(
          error.response?.data.error ?? "Menu list could not be fetched",
          "error"
        );
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "20px 0",
        }}
      >
        <Typography variant="h4">Welcome {user?.username}</Typography>
        <div>
          <Button
            component={Link}
            to="/menu/add"
            variant="contained"
            sx={{ mr: 2 }}
          >
            Add Menu
          </Button>
          <Button onClick={logout} variant="outlined">
            Logout
          </Button>
        </div>
      </header>

      <Grid container spacing={3}>
        {menus.map((menu) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={menu.name}>
            {/* <MenuCard menu={menu} onView={() => navigate(`/menu/${menu.id}`)} /> */}
            <p>{menu.name}</p>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
