"use client";

import { useState } from "react";
import {Box,Typography,Card,CardContent,Grid,Chip,} from "@mui/material";

const StaffPurchaseOrders = () => {

  const [requests] = useState([
    { id: 1, item: "Printer Paper", quantity: 20, status: "Approved" },
    { id: 2, item: "Ink Cartridge", quantity: 5, status: "Pending" },
    { id: 3, item: "Stapler", quantity: 10, status: "Approved" },
    { id: 4, item: "Notebooks", quantity: 15, status: "Pending" },
  ]);

  return (
    <Box sx={{ mt: 4, ml: 4 }}>
      <Typography variant="h5" fontWeight="bold">
        Purchase Requests
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        Track your purchase requests and their approval status
      </Typography>

      <Grid container spacing={2}>
        {requests.map((req) => (
          <Grid item xs={12} md={6} key={req.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{req.item}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Quantity: {req.quantity}
                </Typography>
                <Chip
                  label={req.status}
                  sx={{
                    mt: 2,
                    bgcolor:
                      req.status === "Approved" ? "green" : "red",
                    color: "white",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StaffPurchaseOrders;
