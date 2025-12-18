// src/components/layout/Layout.tsx
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Topbar from "../Topbar";
import { Box } from "@mui/material";

interface AppLayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: AppLayoutProps) => {
  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* 1. Sidebar: Stays on the left with fixed width */}
      <Box sx={{ width: 260, flexShrink: 0, height: "100vh" }}>
        <Sidebar />
      </Box>

      {/* 2. Main Area: Covers everything on the right */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          display: "flex", 
          flexDirection: "column", 
          bgcolor: "#f4f7fe", // Professional light background
          overflowY: "auto" 
        }}
      >
        <Topbar />
        <Box component="main" sx={{ p: 4 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;