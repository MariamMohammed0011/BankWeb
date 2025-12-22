import { IconButton, Stack } from "@mui/material";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import Person2OutlinedIcon from "@mui/icons-material/Person2Outlined";

export default function UserActions() {
  return (
    <Stack direction="row">
      <IconButton color="inherit"><NotificationsOutlinedIcon /></IconButton>
      <IconButton color="inherit"><SettingsOutlinedIcon /></IconButton>
      <IconButton color="inherit"><Person2OutlinedIcon /></IconButton>
    </Stack>
  );
}
