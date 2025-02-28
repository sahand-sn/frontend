import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Grid2,
} from "@mui/material";
import type { NoAuthContextType } from "~/context/no-auth";
import { useOutletContext } from "react-router";

export function Login() {
  const { login }:NoAuthContextType = useOutletContext();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } catch (error) {
      // Handle error with snackbar or alert
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          mt: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid2 container spacing={2}>
            <Grid2 size={{xs: 12}}>
              <TextField
                required
                fullWidth
                type="email"
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((v) => ({ ...v, email: e.target.value }))
                }
              />
            </Grid2>
            <Grid2 size={{xs: 12}}>
              <TextField
                required
                fullWidth
                type="password"
                label="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData((v) => ({ ...v, password: e.target.value }))
                }
              />
            </Grid2>
          </Grid2>
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid2 container justifyContent="flex-end">
            <Grid2>
              <Link href="/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid2>
          </Grid2>
        </Box>
      </Box>
    </Container>
  );
}
