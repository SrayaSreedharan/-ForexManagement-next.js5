"use client";
import {Box,Typography,Paper,Chip,Grid,Container,} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Landing = () => {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh" }}>
     
      <Box sx={{ width: "100%", py: 4 }}>
        <Box display="flex" justifyContent="flex-end" mb={3} px={2}>
          <Chip label="Administrator" color="warning" variant="outlined" />
        </Box>
        <Grid container spacing={2} justifyContent="center">
        <Grid item>
            <Paper sx={{ p: 3, borderRadius: 2, width: 350 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                Total Inventory Items
                </Typography>
                <Inventory2OutlinedIcon color="primary" />
            </Box>
            <Typography variant="h5" fontWeight="bold" mt={2}>
                1,247
            </Typography>
            <Typography variant="body2" color="success.main">
                +8.3% from last month
            </Typography>
            </Paper>
        </Grid>

        <Grid item>
            <Paper sx={{ p: 3, borderRadius: 2, width: 350 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                Pending Purchase Orders
                </Typography>
                <AccessTimeIcon color="warning" />
            </Box>
            <Typography variant="h5" fontWeight="bold" mt={2}>
                18
            </Typography>
            <Typography variant="body2" color="error.main">
                -5.2% from last month
            </Typography>
            </Paper>
        </Grid>

        <Grid item>
            <Paper sx={{ p: 3, borderRadius: 2, width: 350 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                Orders Delivered Today
                </Typography>
                <CheckCircleOutlineIcon color="success" />
            </Box>
            <Typography variant="h5" fontWeight="bold" mt={2}>
                32
            </Typography>
            <Typography variant="body2" color="success.main">
                +12.1% from last month
            </Typography>
            </Paper>
        </Grid>

        <Grid item>
            <Paper sx={{ p: 3, borderRadius: 2, width: 350 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="subtitle1" fontWeight="bold">
                Low Stock Alerts
                </Typography>
                <WarningAmberIcon color="error" />
            </Box>
            <Typography variant="h5" fontWeight="bold" mt={2}>
                9
            </Typography>
            <Typography variant="body2" color="success.main">
                +2.3% from last month
            </Typography>
            </Paper>
        </Grid>
        </Grid>
        <Grid container spacing={2} justifyContent="center" mt={3}>
        <Grid item>
            <Paper sx={{ p: 3, borderRadius: 3, width: { xs: "100%", sm: 500, md: 720 }, height: 250 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
                Recent Activity
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
                Latest inventory updates and purchase orders
            </Typography>

            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Box>
                <Typography variant="body1" fontWeight="500">
                    Office Supplies Purchase
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    $2,450 • Pending approval
                </Typography>
                </Box>
                <Chip label="Pending" color="warning" size="small" />
            </Box>

            <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                <Typography variant="body1" fontWeight="500">
                    IT Equipment Delivery
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    15 laptops • Delivered
                </Typography>
                </Box>
                <Chip label="Complete" color="success" size="small" />
            </Box>
            </Paper>
        </Grid>

        <Grid item>
            <Paper sx={{ p: 3, borderRadius: 3, width: { xs: "100%", sm: 500, md: 720 }, height: 250 }}>
            <Typography variant="h6" fontWeight="bold" mb={1}>
                Team Overview
            </Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
                Monitor team performance and approvals
            </Typography>

            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Purchase orders requiring approval</Typography>
                <Chip label="18" color="warning" />
            </Box>

            <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Active staff members</Typography>
                <Chip label="8" color="warning" />
            </Box>

            <Box display="flex" justifyContent="space-between">
                <Typography>Low stock alerts</Typography>
                <Chip label="9" color="error" />
            </Box>
            </Paper>
        </Grid>
        </Grid>
        </Box>
    </Box>
   );
}
export default Landing
