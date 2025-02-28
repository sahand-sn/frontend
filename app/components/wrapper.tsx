import { theme } from "theme";
import {
  AppBar,
  Container,
  CssBaseline,
  ThemeProvider,
  Toolbar,
  Typography,
} from "@mui/material";
import { Outlet } from "react-router";
import { NotificationProvider } from "../context/notification";

export default function Layout() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <AppBar position="static">
          <Toolbar>
            <Typography
              textAlign="left"
              variant="h6"
              component="p"
              sx={{ flexGrow: 1 }}
            >
              Menu Generator
            </Typography>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Outlet />
        </Container>
      </NotificationProvider>
    </ThemeProvider>
  );
}
