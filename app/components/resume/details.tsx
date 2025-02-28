import { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router";
import {
  Container,
  Typography,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  CardContent,
} from "@mui/material";
import type { EditResume, ResumeFormData } from "../../types/resume";
import type { AuthContextType } from "~/context/auth";
import { useNotification } from "~/context/notification";
import type { TResponse } from "~/types/api";
import { AxiosError } from "axios";
import { ExperiencesSection } from "./experience";
import { EducationSection } from "./education";
import { SkillsSection } from "./skill";

export function ResumeView() {
  const { id } = useParams();
  const { authAxios }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [resume, setResume] = useState<ResumeFormData>({
    educations: [],
    experiences: [],
    id: -1,
    skills: [],
    summary: "",
    title: "",
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<ResumeFormData>({
    educations: [],
    experiences: [],
    id: -1,
    skills: [],
    summary: "",
    title: "",
  });

  useEffect(() => {
    const fetchResume = async () => {
      await authAxios
        .get<TResponse<ResumeFormData>>(`/resumes/${id}`)
        .then((res) => {
          console.log(res);
          setResume(res.data.data);
          setFormData(res.data.data);
          showNotification(res.data.message, "success");
        })
        .catch((error: AxiosError<TResponse>) => {
          console.log(error);
          showNotification(
            error.response?.data.message ?? "some thing went wrong!",
            "error"
          );
        });
    };
    fetchResume();
  }, [id, authAxios, showNotification]);

  const handleDelete = async () => {
    await authAxios
      .delete<TResponse>(`/resumes/${id}`)
      .then((res) => {
        showNotification(res.data.message, "success");
        navigate("/app/dashboard");
      })
      .catch((error: AxiosError<TResponse>) => {
        showNotification(
          error.response?.data.message ?? "some thing failed",
          "error"
        );
      });
    setDeleteDialogOpen(false);
  };

  const handleUpdate = async () => {
    const data: EditResume = {
      educations: [...formData.educations],
      experiences: formData.experiences,
      skills: formData.skills,
    };
    await authAxios
      .put<TResponse<ResumeFormData>>(`/resumes/${id}`, data)
      .then((response) => {
        setResume(response.data.data);
        setIsEditing(false);
        showNotification(response.data.message, "success");
      })
      .catch((error: AxiosError<TResponse<ResumeFormData>>) => {
        showNotification(
          error.response?.data.message ?? "An error occurred",
          "error"
        );
      });
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
          }}
        >
          <CardContent>
            <Typography variant="h3">{resume?.title}</Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
              {resume?.summary}
            </Typography>
          </CardContent>
          <Box>
            {!isEditing && (
              <Button
                variant="outlined"
                sx={{ mr: 2 }}
                onClick={() => navigate("/app/dashboard")}
              >
                Back to Dashboard
              </Button>
            )}
            {!isEditing ? (
              <>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setDeleteDialogOpen(true)}
                >
                  Delete
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="contained"
                  sx={{ mr: 2 }}
                  onClick={handleUpdate}
                >
                  Update
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => {
                    setFormData(resume);
                    setIsEditing(false);
                  }}
                >
                  Cancel
                </Button>
              </>
            )}
          </Box>
        </Box>

        <ExperiencesSection
          experiences={formData?.experiences ?? []}
          readOnly={!isEditing}
          onChange={(experiences) =>
            setFormData((v) => ({ ...v, experiences }))
          }
        />
        <EducationSection
          education={formData?.educations ?? []}
          readOnly={!isEditing}
          onChange={(educations) => setFormData((v) => ({ ...v, educations }))}
        />
        <SkillsSection
          skills={formData?.skills ?? []}
          readOnly={!isEditing}
          onChange={(skills) => setFormData((v) => ({ ...v, skills }))}
        />

        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
        >
          <DialogTitle>Delete Resume</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this resume? This action cannot be
              undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleDelete} color="error" variant="contained">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}
