import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import type { Experience } from "../../types/resume";
import { DatePicker } from "../date-picker";

// Custom DatePicker component with a label

interface ExperiencesSectionProps {
  experiences: Omit<Experience, "id">[];
  onChange: (experiences: Omit<Experience, "id">[]) => void;
  readOnly?: boolean;
}

export function ExperiencesSection({
  experiences = [],
  onChange,
  readOnly = false,
}: ExperiencesSectionProps) {
  const handleAdd = () => {
    onChange([
      ...experiences,
      {
        position: "",
        company: "",
        description: "",
        endDate: new Date(),
        startDate: new Date(),
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(experiences.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Omit<Experience, "id">,
    value: string | Date
  ) => {
    const updated = [...experiences];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>
      {experiences.map((exp, index) => (
        <Box
          key={index}
          sx={{
            mb: 2,
            border: 1,
            borderColor: "grey.300",
            p: 2,
            borderRadius: 1,
          }}
        >
          <TextField
            label="Position"
            value={exp.position}
            onChange={(e) => handleChange(index, "position", e.target.value)}
            fullWidth
            margin="normal"
            disabled={readOnly}
          />
          <TextField
            label="Description"
            value={exp.description}
            onChange={(e) => handleChange(index, "description", e.target.value)}
            fullWidth
            margin="normal"
            disabled={readOnly}
          />
          <TextField
            label="Company"
            value={exp.company}
            onChange={(e) => handleChange(index, "company", e.target.value)}
            fullWidth
            margin="normal"
            disabled={readOnly}
          />

          <DatePicker
            label="Start Date"
            value={exp.startDate}
            onChange={(date) => handleChange(index, "startDate", date)}
            disabled={readOnly}
          />

          <DatePicker
            label="End Date"
            value={exp.endDate}
            onChange={(date) => handleChange(index, "endDate", date)}
            disabled={readOnly}
          />

          {!readOnly && (
            <IconButton onClick={() => handleRemove(index)}>Remove</IconButton>
          )}
        </Box>
      ))}
      {!readOnly && (
        <Button onClick={handleAdd} variant="outlined" sx={{ mt: 2 }}>
          Add Experience
        </Button>
      )}
    </Box>
  );
}
