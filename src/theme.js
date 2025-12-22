// src/theme.js
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976D2", // الأزرق المستخدم في AddEmpl
    },
    secondary: {
      main: "#455A64",
    },
    background: {
      default: "#F5F7FA",
      paper: "#FFFFFF",
    },
    success: { main: "#2E7D32" },
    warning: { main: "#F9A825" },
    error: { main: "#C62828" },
  },

  shape: { borderRadius: 10 },

  typography: {
    fontFamily: "Tajawal, sans-serif",
    h6: { fontWeight: 700 },
    body1: { color: "#37474F" },
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: "20px",
        },
      },
    },

    MuiAccordion: {
      styleOverrides: {
        root: {
          border: "1px solid #E3EAF3",
          boxShadow: "0 3px 10px rgba(0,0,0,0.05)",
          borderRadius: "12px !important",
        },
      },
    },
  },
});

export default theme;
