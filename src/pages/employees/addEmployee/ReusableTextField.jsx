import { TextField } from "@mui/material";

export default function ReusableTextField({ label, value, onChange, error, helperText, type = "text", select, children }) {
  return (
    <TextField
      label={label}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      fullWidth
      type={type}
      select={select}
    >
      {children}
    </TextField>
  );
}
