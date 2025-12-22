import Login from "./Auth/Login";
import SideBar from "./components/sideBar/SideBar";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import { getDesignTokens } from "./theme.jsx";
import * as React from "react";
import TopBar from "./components/topBar/TopBar.jsx";
import { Outlet } from "react-router-dom";
import { DrawerHeader } from "./components/DrawerHeader.jsx";
import { Box } from "@mui/material";

function App() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState(
    Boolean(localStorage.getItem("currentMode"))
      ? localStorage.getItem("currentMode")
      : "light"
  );

  const theme = React.useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  return (
    
  
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex" }}>
          <SideBar open={open} toggle={toggle} />
          <TopBar open={open} toggle={toggle} setMode={setMode} />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            <Outlet /> 
          </Box>
        </Box>
      </ThemeProvider>
   
  );
}

export default App;
