import { Alert } from "@mui/material";

export default function ReusableAlert({ message, severity = "success", sx = {} }) {
  if (!message) return null;
  return (
    <Alert severity={severity} sx={{ mb: 2, fontSize: "16px", ...sx }}>
      {message}
    </Alert>
  );
}
