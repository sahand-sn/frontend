import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { Container, Box, Typography, TextField, Button } from "@mui/material";
import type { ResumeFormData } from "../../types/resume";
import type { AuthContextType } from "~/context/auth";
import { ExperiencesSection } from "./experience";
import { EducationSection } from "./education";
import { SkillsSection } from "./skill";
import { useNotification } from "~/context/notification";
import type { TResponse } from "~/types/api";
import type { AxiosError } from "axios";

export function ResumeForm() {
  const { authAxios }: AuthContextType = useOutletContext();
  const { showNotification } = useNotification();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<ResumeFormData, "id">>({
    title: "",
    summary: "",
    experiences: [],
    educations: [],
    skills: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await authAxios
      .post<TResponse<{ resume: Omit<ResumeFormData, "id"> }>>(
        "/resumes",
        formData
      )
      .then((res) => {
        showNotification(res.data.message, "success");
        navigate("/app/dashboard");
      })
      .catch((err: AxiosError<TResponse>) => {
        showNotification(
          err.response?.data.message ?? "Some thing went wrong!",
          "error"
        );
      });
  };

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create New Resume
        </Typography>

        <TextField
          fullWidth
          label="Title"
          value={formData.title}
          onChange={(e) =>
            setFormData((v) => ({ ...v, title: e.target.value }))
          }
          sx={{ mb: 3 }}
        />

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Summary"
          value={formData.summary}
          onChange={(e) =>
            setFormData((v) => ({ ...v, summary: e.target.value }))
          }
          sx={{ mb: 3 }}
        />

        <ExperiencesSection
          experiences={formData.experiences}
          onChange={(experiences) =>
            setFormData((v) => ({ ...v, experiences }))
          }
          readOnly={false}
        />
        <EducationSection
          education={formData.educations}
          onChange={(educations) => setFormData((v) => ({ ...v, educations }))}
          readOnly={false}
        />
        <SkillsSection
          skills={formData.skills}
          onChange={(skills) => setFormData((v) => ({ ...v, skills }))}
          readOnly={false}
        />
        <Button
          type="reset"
          variant="outlined"
          size="large"
          sx={{ mt: 3 }}
          className="!mr-2"
          onClick={() => navigate("/app/dashboard")}
        >
          Back to Dashboard
        </Button>
        <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }}>
          Create Resume
        </Button>
      </Box>
    </Container>
  );
}
