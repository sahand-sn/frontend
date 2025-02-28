import { Box, Typography, TextField, Button, IconButton } from "@mui/material";
import type { Education } from "../../types/resume";
import { DatePicker } from "../date-picker";

interface EducationSectionProps {
  education: Omit<Education, "id">[];
  onChange: (education: Omit<Education, "id">[]) => void;
  readOnly?: boolean;
}

export function EducationSection({
  education = [],
  onChange,
  readOnly = false,
}: EducationSectionProps) {
  const handleAdd = () => {
    onChange([
      ...education,
      {
        endDate: new Date(),
        startDate: new Date(),
        degree: "",
        field: "",
        institution: "",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(education.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Omit<Education, "id">,
    value: string | Date
  ) => {
    const updated = [...education];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      {education.map((exp, index) => (
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
            label="Degree"
            value={exp.degree}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
            fullWidth
            margin="normal"
            disabled={readOnly}
          />
          <TextField
            label="Field of Study"
            value={exp.field}
            onChange={(e) => handleChange(index, "field", e.target.value)}
            fullWidth
            margin="normal"
            disabled={readOnly}
          />
          <TextField
            label="Institution"
            value={exp.institution}
            onChange={(e) => handleChange(index, "institution", e.target.value)}
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
