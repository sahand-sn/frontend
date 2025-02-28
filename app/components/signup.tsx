import { useState } from "react";
import { Button, Container, TextField, Typography, Link } from "@mui/material";
import { Link as RouterLink, useOutletContext } from "react-router";
import type { NoAuthContextType } from "~/context/no-auth";

export default function Signup() {
  const { signup }: NoAuthContextType = useOutletContext();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await signup(credentials.username, credentials.password);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>
        Signup
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Username"
          margin="normal"
          value={credentials.username}
          onChange={(e) =>
            setCredentials({ ...credentials, username: e.target.value })
          }
        />
        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />
        <Button fullWidth type="submit" variant="contained" sx={{ mt: 3 }}>
          Login
        </Button>
      </form>
      <Typography variant="body2" sx={{ mt: 2 }}>
        Do you have an account?{" "}
        <Link component={RouterLink} to="/login">
          Login here
        </Link>
      </Typography>
    </Container>
  );
}
