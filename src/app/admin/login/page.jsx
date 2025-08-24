"use client";
import { useState } from "react";
import {Container,Box,Typography,TextField,Button,Paper,Avatar,} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";

const LoginPage = () => { 

  const [data, setData] = useState({ email: "", password: "" });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", data);
    
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", alignItems: "center", minHeight: "100vh"}}
    >
      <Paper elevation={3} sx={{ p: 4, width: "100%", borderRadius: 5, maxWidth: 460, bgcolor: "grey.50" }}>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar
            sx={{ bgcolor: "primary.main", mb: 2, width: 56, height: 56 }}
          >
            <Inventory2OutlinedIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" fontWeight="bold">
            Inventory Management Platform
          </Typography>
          <Typography variant="body2" color="text.secondary" align="center">
            Sign in to access your inventory
          </Typography>
        </Box>

        <form >
          <TextField
            label="Email"
            name="email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={data.password}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2 }}
            onSubmit={handleSubmit}
          >
            Sign In..
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
export default LoginPage;
