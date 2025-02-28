import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Grid2 as Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
} from "@mui/material";
import { Link, useOutletContext } from "react-router";
import type { AuthContextType } from "~/context/auth";
import { useNotification } from "~/context/notification";
import type { AxiosError } from "axios";
import type { IError } from "~/types/api";

interface IMenu extends Menu {
  id: string;
}

export default function Dashboard() {
  const { authAxios, user, logout }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const [menus, setMenus] = useState<IMenu[]>([]);

  useEffect(() => {
    authAxios
      .get<IMenu[]>("/menu")
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
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  {menu.name}
                </Typography>
                <Typography sx={{ color: "text.secondary", mb: 1.5 }}>
                  {menu.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  component={Link}
                  to={`/menu/details/${menu.id}`}
                  size="small"
                >
                  Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
