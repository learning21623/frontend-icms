// src/components/layout/Sidebar.tsx
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { sidebarConfig } from "../../config/sidebarConfig";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!user) return null;

  const menuItems =
    sidebarConfig[user.role as keyof typeof sidebarConfig] || [];

  return (
    <Drawer variant="permanent">
      <List sx={{ width: 240 }}>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.path}
            onClick={() => navigate(item.path)}
          >
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
