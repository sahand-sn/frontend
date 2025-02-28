import { TextField, Typography } from "@mui/material";

interface FormFieldProps {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  readOnly?: boolean;
  [key: string]: any;
}

export const FormField = ({
  label,
  value,
  onChange,
  readOnly,
  ...props
}: FormFieldProps) => {
  return readOnly ? (
    <Typography variant="body1" mb={2}>
      <strong>{label}:</strong> {value || "-"}
    </Typography>
  ) : (
    <TextField
      label={label}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      fullWidth
      {...props}
    />
  );
};
