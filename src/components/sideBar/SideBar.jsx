import { DrawerHeader, Drawer } from "./DrawerStyles";
import { Avatar, Divider, List, IconButton, Typography } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useAuth } from "../../context/AuthContext";
import { sidebarManager, sidebarAdmin, sidebarTeller } from "./sidebar-items.js";
import { useTheme } from "@mui/material/styles";
import SideBaraItem from "./SideBaraItem.jsx";

export default function Sidebar({ open, toggle }) {
  const theme = useTheme();
  const { role, user } = useAuth(); 

  const sidebars = {
    Admin: sidebarAdmin,
    Manager: sidebarManager,
    Teller: sidebarTeller,
  };

  const activeSidebar = sidebars[role] || []; 

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        <IconButton onClick={toggle}>
          {open ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </DrawerHeader>

      <Divider />

      <Avatar
        sx={{
          mx: "auto",
          width: open ? 80 : 40,
          height: open ? 80 : 40,
          my: 1,
          transition: "0.2s",
        }}
        src="/public/images/image.png"
      />


      <Typography
        align="center"
        sx={{
          opacity: open ? 1 : 0,
          transition: "0.2s",
          color: theme.palette.info.main,
        }}
      >
        {role || "Guest"} 
      </Typography>

      <Divider />

      {activeSidebar.map((section) => (
        <div key={section.id}>
          <List>
            {section.items.map((item) => (
              <SideBaraItem key={item.path} item={item} open={open} />
            ))}
          </List>
          <Divider />
        </div>
      ))}
    </Drawer>
  );
}
