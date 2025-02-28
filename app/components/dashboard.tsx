// pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { Button, Container, Grid2 as Grid, Typography } from "@mui/material";
import { Link, useNavigate, useOutletContext } from "react-router";
import type { AuthContextType } from "~/context/auth";

export default function Dashboard() {
  const { authAxios, user, logout }: AuthContextType = useOutletContext();
  const [menus, setMenus] = useState<Menu[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    authAxios
      .get<Menu[]>("/menu")
      .then((res) => setMenus(res.data))
      .catch(console.error);
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
            to="/add-menu"
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
