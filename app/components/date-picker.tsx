import { Box, Typography } from "@mui/material";

export const DatePicker = ({
  label,
  value,
  onChange,
  disabled,
}: {
  label: string;
  value: Date | string;
  onChange: (date: Date) => void;
  disabled: boolean;
}) => {
  const formattedDate = value
    ? new Date(value).toISOString().split("T")[0]
    : "";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        position: "relative",
        mb: 2,
      }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        {label}
      </Typography>
      <input
        type="date"
        value={formattedDate}
        onChange={(e) => onChange(new Date(e.target.value))}
        disabled={disabled}
        style={{
          width: "100%",
          padding: "12px 14px",
          borderRadius: 1,
          border: "1px solid #ccc",
          fontSize: "16px",
          backgroundColor: "#fff",
          outline: "none",
        }}
      />
    </Box>
  );
};
