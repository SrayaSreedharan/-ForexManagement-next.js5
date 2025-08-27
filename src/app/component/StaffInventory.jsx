"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
} from "@mui/material";
import StaffRequestModal from "./StaffRequestModal";

const StaffInventory = () => {
  const [open, setOpen] = useState(false);
  const [purchaseItem, setPurchaseItem] = useState(null); // store full item
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/inventory/get");
      const result = await res.json();
      if (res.ok) setItems(result.data || []);
      else console.error("Fetch error:", result.error);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleRequest = (item) => {
    setPurchaseItem(item); // ✅ store full object
    setOpen(true);
  };

  return (
    <Box sx={{ mt: 4, ml: 4 }}>
      <Typography variant="h5" fontWeight="bold">
        Inventory
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={3}>
        View available stock and request purchases
      </Typography>

      <Grid container spacing={2}>
        {items.map((item) => (
          <Grid item xs={12} md={4} key={item.sku || item.id}>
            <Card
              variant="outlined"
              sx={{
                height: 200, // ✅ fixed height
                width: "100%", // responsive width
                display: "flex",
                flexDirection: "column",
              }}
            >
              <CardContent
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between", // keeps button at bottom
                }}
              >
                <Box>
                  <Typography sx={{ color: "blue" }}>
                    {item.category}
                  </Typography>
                  <Typography variant="h6" noWrap>
                    {item.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2, // ✅ max 2 lines
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {item.description}
                  </Typography>
                  <Typography sx={{ color: "#2e7d32" }}>
                    Supplier: {item.supplier}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Stock: {item.stock}
                  </Typography>
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mt: 2 }}
                  onClick={() => handleRequest(item)}
                >
                  Request Purchase
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Staff Request Modal */}
      <StaffRequestModal
        open={open}
        onClose={() => setOpen(false)}
        item={purchaseItem} // ✅ pass whole object
      />
    </Box>
  );
};

export default StaffInventory;
