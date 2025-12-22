import { AppBarStyled } from "./TopBar.styles";
import MenuIcon from "@mui/icons-material/Menu";
import { Toolbar, IconButton, Box } from "@mui/material";
import SearchBox from "./SearchBox";
import ThemeToggle from "./ThemeToggle";
import UserActions from "./UserActions";

export default function TopBar({ open, toggle, setMode }) {
  return (
    <AppBarStyled position="fixed" open={open}>
      <Toolbar>

      
        {!open && (
          <IconButton color="inherit" onClick={toggle} edge="start" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
        )}

        <SearchBox />

        <Box flexGrow={1} />

        <ThemeToggle setMode={setMode} />

        <UserActions />

      </Toolbar>
    </AppBarStyled>
  );
}
