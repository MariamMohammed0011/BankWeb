import { IconButton } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { useTheme } from "@mui/material/styles";

export default function ThemeToggle({ setMode }) {
  const theme = useTheme();

  const toggle = () => {
    const newMode = theme.palette.mode === "light" ? "dark" : "light";
    localStorage.setItem("currentMode", newMode);
    setMode(newMode);
  };

  return (
    <IconButton onClick={toggle} color="inherit">
      {theme.palette.mode === "light" ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </IconButton>
  );
}
