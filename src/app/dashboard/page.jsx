"use client";
import React, { useState } from "react";
import {
  AppBar, Toolbar, Typography, CssBaseline, Box, IconButton, Drawer,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText,
  Divider, Badge, TextField, InputAdornment, Tabs, Tab, Button
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import RuleFolderIcon from "@mui/icons-material/RuleFolder";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SettingsIcon from "@mui/icons-material/Settings";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";

import OverviewPage from "../components/OverviewPage";
import JournalPage from "../components/JournalPage";
import ReconciliationPage from "../components/ReconciliationPage";
import ReportsPage from "../components/ReportsPage";

const drawerWidth = 260;

// ✅ Light theme with white bg + black text
const theme = createTheme({
  palette: {
    mode: "light",
    background: { default: "#ffffff", paper: "#ffffff" },
    primary: { main: "#000000" },   // black
    secondary: { main: "#333333" }, // dark gray
    text: { primary: "#000000" }    // force black text
  },
  shape: { borderRadius: 16 },
  typography: { fontFamily: "Inter, system-ui, sans-serif" },
});

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [tab, setTab] = useState(0);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  // ---------------------------
  // Sidebar (commented section)
  // ---------------------------
  // const drawer = (
  //   <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
  //     <Box sx={{ p: 2 }}>
  //       <Typography variant="h6">FX Ops</Typography>
  //       <Typography variant="body2" color="text.secondary">Internal Platform</Typography>
  //     </Box>
  //     <Divider />
  //     <List>
  //       {[
  //         { text: "Dashboard", icon: <DashboardIcon /> },
  //         { text: "Transactions", icon: <SwapHorizIcon /> },
  //         { text: "Reconciliation", icon: <RuleFolderIcon /> },
  //         { text: "Statements", icon: <ReceiptLongIcon /> },
  //         { text: "Reports", icon: <AssessmentIcon /> },
  //         { text: "Accounts", icon: <AccountBalanceIcon /> },
  //         { text: "Settings", icon: <SettingsIcon /> },
  //       ].map((item) => (
  //         <ListItem key={item.text} disablePadding>
  //           <ListItemButton>
  //             <ListItemIcon>{item.icon}</ListItemIcon>
  //             <ListItemText primary={item.text} />
  //           </ListItemButton>
  //         </ListItem>
  //       ))}
  //     </List>
  //     <Box sx={{ mt: "auto", p: 2 }}>
  //       <Button fullWidth variant="outlined" startIcon={<CloudUploadIcon />}>
  //         Import Statement
  //       </Button>
  //     </Box>
  //   </Box>
  // );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", minHeight: "100vh" }}>
        
        {/* Top AppBar */}
        <AppBar 
          position="fixed" 
          sx={{ 
            zIndex: 1201, 
            bgcolor: "white", 
            borderBottom: "1px solid #000" 
          }}
        >
          <Toolbar>
            {/* Menu button only on mobile */}
            <IconButton 
              edge="start" 
              onClick={handleDrawerToggle} 
              sx={{ mr: 2, display: { md: "none" }, color: "black" }}
            >
              <MenuIcon />
            </IconButton>

            {/* Title */}
            <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: "bold", color:'black' }}>
              FX Operations
            </Typography>

            {/* Search only visible on sm+ */}
            <TextField
              size="small"
              placeholder="Search deals, refs, counterparties"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start"><SearchIcon /></InputAdornment>
                )
              }}
              sx={{
                width: { sm: 250, md: 300 },
                display: { xs: "none", sm: "block" }
              }}
            />

            {/* Notifications */}
            <IconButton sx={{ ml: 2, color: "black" }}>
              <Badge badgeContent={3} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Sidebar Drawer (commented out) */}
        {/* 
        <Box component="nav" sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}>
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{ keepMounted: true }}
            sx={{ display: { xs: "block", md: "none" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{ display: { xs: "none", md: "block" }, "& .MuiDrawer-paper": { width: drawerWidth } }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        */}

        {/* Main Content */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            p: { xs: 2, sm: 3 }, 
            width: { md: `calc(100% - ${drawerWidth}px)` } 
          }}
        >
          <Toolbar />
          
          {/* Responsive Tabs */}
          <Box sx={{ borderBottom: "1px solid #000", mb: 2 }}>
            <Tabs
              value={tab}
              onChange={(_, v) => setTab(v)}
              textColor="primary"
              indicatorColor="primary"
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="Overview" sx={{ fontWeight: "bold", fontSize: { xs: "0.9rem", md: "1rem" } }} />
              <Tab label="Transaction Journal" sx={{ fontWeight: "bold", fontSize: { xs: "0.9rem", md: "1rem" } }} />
              <Tab label="Reconciliation" sx={{ fontWeight: "bold", fontSize: { xs: "0.9rem", md: "1rem" } }} />
              <Tab label="Reports" sx={{ fontWeight: "bold", fontSize: { xs: "0.9rem", md: "1rem" } }} />
            </Tabs>
          </Box>

          {tab === 0 && <OverviewPage />}
          {tab === 1 && <JournalPage />}
          {tab === 2 && <ReconciliationPage />}
          {tab === 3 && <ReportsPage />}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
