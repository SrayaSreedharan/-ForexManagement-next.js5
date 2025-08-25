"use client";

import { useState } from "react";
import {Box,Typography,Card,CardContent,Button,Grid,Dialog,DialogTitle,DialogContent,DialogActions,TextField,} from "@mui/material";

const StaffInventory = () => {
  const [open, setOpen] = useState(false);
  const [purchaseItem, setPurchaseItem] = useState("");

  const items = [
    { id: 1, name: "Printer Paper", stock: 50 },
    { id: 2, name: "Ink Cartridge", stock: 10 },
    { id: 3, name: "Stapler", stock: 25 },
  ];

  const handleRequest = (itemName) => {
    setPurchaseItem(itemName);
    setOpen(true);
  };

  const handleSubmit = () => {
    console.log("Purchase request submitted for:", purchaseItem);
    setOpen(false);
  };

  return (
    <Box sx={{ mt: 4, ml: 4 }}>
      <Typography variant="h5" fontWeight="bold" >
        Inventory
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        View available stock and request purchases
      </Typography>
     
      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} md={4} key={item.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  Stock: {item.stock}
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleRequest(item.name)}
                >
                  Request Purchase
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Purchase Request</DialogTitle>
        <DialogContent>
          <Typography mb={2}>
            Requesting purchase for: <b>{purchaseItem}</b>
          </Typography>
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Reason"
            multiline
            rows={3}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSubmit}>
            Submit Request
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default StaffInventory;
