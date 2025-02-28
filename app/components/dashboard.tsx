import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid2,
  Card,
  CardContent,
  CardActions,
} from "@mui/material";
import { type AuthContextType } from "../context/auth";
import type { ResumeFormData } from "../types/resume";
import { AxiosError } from "axios";
import type { TResponse } from "~/types/api";
import { useNotification } from "~/context/notification";

export function Dashboard() {
  const { authAxios, user, logout }: AuthContextType = useOutletContext();
  const [resumes, setResumes] = useState<ResumeFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const { showNotification } = useNotification();

  useEffect(() => {
    const fetchResumes = async () => {
      await authAxios
        .get<TResponse<ResumeFormData[]>>("/resumes")
        .then((res) => {
          setResumes(res.data.data);
          showNotification(res.data.message, "success");
        })
        .catch((error: AxiosError<TResponse<ResumeFormData[]>>) => {
          showNotification(
            error.response?.data.message ?? "List was not retrieved",
            "error"
          );
        })
        .finally(() => {
          setLoading(false);
        });
    };
    fetchResumes();
  }, [authAxios]);

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h4">My Resumes</Typography>

        <Button variant="contained" component={Link} to="/app/resume/add">
          Create New Resume
        </Button>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}>
        <Typography variant="h6">
          {user?.name} ({user?.email})
        </Typography>
        <Button onClick={logout} variant="outlined">
          Logout
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading...</Typography>
      ) : (
        <Grid2 container spacing={3}>
          {resumes.map((resume) => (
            <Grid2 key={resume.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{resume.title}</Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                  >
                    {resume.summary}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    to={`/app/resume/details/${resume.id}`}
                  >
                    Details
                  </Button>
                </CardActions>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      )}
    </Container>
  );
}
