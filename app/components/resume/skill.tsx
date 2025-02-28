import {
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import type { Skill } from "../../types/resume";

interface SkillsSectionProps {
  skills: Omit<Skill, "id">[];
  onChange: (skills: Omit<Skill, "id">[]) => void;
  readOnly?: boolean;
}

export function SkillsSection({
  skills = [],
  onChange,
  readOnly = false,
}: SkillsSectionProps) {
  const handleAdd = () => {
    onChange([
      ...skills,
      {
        name: "",
        level: "Beginner",
      },
    ]);
  };

  const handleRemove = (index: number) => {
    onChange(skills.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Omit<Skill, "id">,
    value: string
  ) => {
    const updated = [...skills];
    updated[index] = { ...updated[index], [field]: value };
    onChange(updated);
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      {skills.map((skill, index) => (
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
            label="Skill Name"
            value={skill.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            fullWidth
            margin="normal"
            disabled={readOnly}
          />

          <FormControl component="fieldset" sx={{ mt: 2 }}>
            <FormLabel component="legend">Proficiency Level</FormLabel>
            <RadioGroup
              row
              value={skill.level}
              onChange={(e) => handleChange(index, "level", e.target.value)}
            >
              <FormControlLabel
                value="Beginner"
                control={<Radio />}
                label="Beginner"
                disabled={readOnly}
              />
              <FormControlLabel
                value="Intermediate"
                control={<Radio />}
                label="Intermediate"
                disabled={readOnly}
              />
              <FormControlLabel
                value="Expert"
                control={<Radio />}
                label="Expert"
                disabled={readOnly}
              />
            </RadioGroup>
          </FormControl>

          {!readOnly && (
            <IconButton onClick={() => handleRemove(index)}>Delete</IconButton>
          )}
        </Box>
      ))}
      {!readOnly && (
        <Button onClick={handleAdd} variant="outlined" sx={{ mt: 2 }}>
          Add Skill
        </Button>
      )}
    </Box>
  );
}
