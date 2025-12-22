import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useTheme } from "@mui/material/styles";

export default function SideBaraItem({ item, open }) {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const Icon = item.icon;

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <Tooltip title={open ? "" : item.text} placement="right">
        <ListItemButton
          onClick={() => navigate(item.path)}
          sx={{
            minHeight: 48,
            justifyContent: open ? "initial" : "center",
            bgcolor:
              location.pathname === item.path
                ? theme.palette.mode === "dark"
                  ? grey[800]
                  : grey[300]
                : "",
            px: 2.5,
            transition: "0.2s",
          }}
        >
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 0,
              justifyContent: "center",
            }}
          >
            <Icon />
          </ListItemIcon>

          <ListItemText
            primary={item.text}
            sx={{
              opacity: open ? 1 : 0,
              transition: "0.2s",
            }}
          />
        </ListItemButton>
      </Tooltip>
    </ListItem>
  );
}
