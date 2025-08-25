"use client";

import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";

const StaffNavbar = ({ activeContent, setActiveContent }) => {
  const navItems = [
    { label: "Dashboard", id: "dashboard", icon: <DashboardIcon /> },
    { label: "Inventory", id: "inventory", icon: <Inventory2OutlinedIcon /> },
    { label: "Purchase", id: "purchaseOrders", icon: <ListAltIcon /> },
    { label: "Reports", id: "reports", icon: <AssessmentIcon /> },
  ];

  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={1}
      sx={{ bgcolor: "#fafafa", color: "text.primary" }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box display="flex" alignItems="center" gap={1}>
          <Inventory2OutlinedIcon sx={{ fontSize: 32, color: "primary.main" }} />
          <Box>
            <Typography variant="h6" fontWeight="bold">
              Inventory Management Platform
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Staff Dashboard
            </Typography>
          </Box>
        </Box>

        <Box display="flex" alignItems="center" gap={2} ml={4}>
          {navItems.map(({ label, id, icon }) => {
            const active = activeContent === id;
            return (
              <Button
                key={id}
                startIcon={icon}
                variant={active ? "contained" : "text"}
                onClick={() => setActiveContent(id)}
                sx={{
                  textTransform: "none",
                  ...(active
                    ? {
                        bgcolor: "orange",
                        color: "black",
                        "&:hover": { bgcolor: "darkorange" },
                      }
                    : {}),
                }}
              >
                {label}
              </Button>
            );
          })}
        </Box>

        <Avatar sx={{ bgcolor: "teal" }}>ST</Avatar>
      </Toolbar>
    </AppBar>
  );
};

export default StaffNavbar;
