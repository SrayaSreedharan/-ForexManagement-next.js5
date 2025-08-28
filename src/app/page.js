"use client";
import {AppBar,Toolbar,Typography,Button,Box,Container,Grid,} from "@mui/material";
import { useRouter } from "next/navigation"; 

export default function HomePage() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/admin/login"); 
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(180deg,#f9f9ff,#ffffff)",
        minHeight: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#6a11cb,#2575fc)",
          position: "absolute",
          top: -100,
          left: -120,
          filter: "blur(80px)",
          opacity: 0.6,
        }}
      />
      <Box
        sx={{
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#ff6a88,#ff99ac)",
          position: "absolute",
          bottom: -120,
          right: -100,
          filter: "blur(90px)",
          opacity: 0.5,
        }}
      />

      <Container sx={{ mt: 14, position: "relative", zIndex: 5 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 3,
                background: "linear-gradient(90deg,#6a11cb,#2575fc)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Inventory Management
            </Typography>

            <Box
              sx={{
                width: 80,
                height: 5,
                background: "linear-gradient(90deg,#6a11cb,#2575fc)",
                borderRadius: "10px",
                mb: 3,
              }}
            />

            <Typography
              variant="body1"
              sx={{
                color: "gray",
                fontSize: "1.15rem",
                lineHeight: 1.8,
                maxWidth: "600px",
                mb: 4,
              }}
            >
              sssssssssssssssssssssssssssssssssssssssssssss...
            </Typography>

            <Button
              variant="contained"
              onClick={handleGetStarted} 
              sx={{
                borderRadius: "25px",
                background: "linear-gradient(90deg,#ff6a88,#ff99ac)",
                textTransform: "none",
                px: 5,
                py: 1.5,
                fontSize: "1rem",
                fontWeight: 600,
                boxShadow: "0 6px 16px rgba(255,106,136,0.3)",
                ":hover": {
                  background: "linear-gradient(90deg,#ff99ac,#ff6a88)",
                },
              }}
            >
              Get Started
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
