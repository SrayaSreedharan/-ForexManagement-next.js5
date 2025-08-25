"use client";

import {Box,Card,CardContent,Typography,Grid,Button,IconButton,LinearProgress,useMediaQuery,useTheme,} from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import FilterListIcon from "@mui/icons-material/FilterList";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

const  ReportsAnalytics = () => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
        <Box>
          <Typography variant="h5" fontWeight="bold">
            Reports & Analytics
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Comprehensive insights into transaction performance and risk metrics
          </Typography>
        </Box>

        <Box display="flex" gap={1} flexWrap="wrap">
          <Button startIcon={<CalendarTodayIcon />} variant="outlined" size="small">
            Last 7 days
          </Button>
          <IconButton>
            <FilterListIcon />
          </IconButton>
          <Button variant="contained" color="primary" startIcon={<DownloadIcon />}>
            Export
          </Button>
        </Box>
      </Box>

      <Grid container spacing={2} justifyContent="flex-start" mb={3}>
        {[
          { title: "Total Volume", value: "$3,600,000", change: "↓ -12.2% from yesterday", color: "error" },
          { title: "Transactions", value: "64", change: "↓ -11.1% from yesterday", color: "error" },
          { title: "Avg Approval Time", value: "2.3h", change: "↑ +9.5% slower", color: "error" },
          { title: "Reconciliation Rate", value: "95%", change: "↓ -1.0% from yesterday", color: "error" },
        ].map((card, i) => (
          <Grid item xs={12} sm={6} md={"auto"} key={i}>
            <Card sx={{ width: isMobile ? "100%" : 350 }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {card.title}
                </Typography>
                <Typography variant="h5" fontWeight="bold">
                  {card.value}
                </Typography>
                <Typography color={card.color} variant="body2">
                  {card.change}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2} justifyContent="flex-start">
        <Grid item xs={12} md={"auto"}>
          <Card sx={{ width: isMobile ? "100%" : 710, height: 230 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="error">
                Risk Overview
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Current risk exposure and utilization
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Total Exposure</Typography>
                <Typography variant="body2" fontWeight="bold">
                  $15,600,000
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Value at Risk</Typography>
                <Typography variant="body2" fontWeight="bold" color="error">
                  $780,000
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">Risk Utilization</Typography>
                <Typography variant="body2" fontWeight="bold">
                  65%
                </Typography>
              </Box>

              <LinearProgress
                variant="determinate"
                value={65}
                sx={{ mt: 1, height: 8, borderRadius: 5 }}
                color="primary"
              />
              <Box display="flex" justifyContent="space-between" mt={1}>
                <Typography variant="caption">Conservative</Typography>
                <Typography variant="caption">Aggressive</Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={"auto"}>
          <Card sx={{ width: isMobile ? "100%" : 710, height: 230 }}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" color="success.main">
                System Health
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={2}>
                Current system status and performance indicators
              </Typography>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Error Rate</Typography>
                <Typography variant="body2" fontWeight="bold" color="success.main">
                  2.5%
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Settlement Time</Typography>
                <Typography variant="body2" fontWeight="bold" color="warning.main">
                  23.1h
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography variant="body2">Throughput</Typography>
                <Typography variant="body2" fontWeight="bold" color="primary">
                  64/day
                </Typography>
              </Box>

              <Box display="flex" justifyContent="space-between">
                <Typography variant="body2">System Status</Typography>
                <Typography
                  variant="body2"
                  fontWeight="bold"
                  sx={{ color: "white", bgcolor: "green", px: 1.5, borderRadius: 1 }}
                >
                  Operational
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
export default  ReportsAnalytics;
