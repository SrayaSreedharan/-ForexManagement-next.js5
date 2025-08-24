"use client";
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import SecurityIcon from "@mui/icons-material/Security";

const Navbar = () => { 

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
              Administrator Dashboard
            </Typography>
          </Box>
        </Box>

        {/* Center: Navigation Menu */}
        <Box display="flex" alignItems="center" gap={2} ml={4}>
          <Button
            variant="contained"
            startIcon={<DashboardIcon />}
            sx={{
              bgcolor: "orange",
              color: "black",
              "&:hover": { bgcolor: "darkorange" },
              borderRadius: 2,
              textTransform: "none",
            }}
          >
            Dashboard
          </Button>
          <Button startIcon={<Inventory2OutlinedIcon />} sx={{ textTransform: "none" }}>
            Inventory
          </Button>
          <Button startIcon={<ListAltIcon />} sx={{ textTransform: "none" }}>
            Purchase Orders
          </Button>
          <Button startIcon={<AssessmentIcon />} sx={{ textTransform: "none" }}>
            Reports
          </Button>
          <Button startIcon={<ReceiptLongIcon />} sx={{ textTransform: "none" }}>
            Reconciliation
          </Button>
          <Button startIcon={<SecurityIcon />} sx={{ textTransform: "none" }}>
            Admin
          </Button>
        </Box>

        <Avatar sx={{ bgcolor: "teal" }}>SJ</Avatar>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
