"use client";

import { useState } from "react";
import {Box,Button,Card,CardContent,Chip,Container,Grid,IconButton,MenuItem,Select,Stack,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,TextField,Typography,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";

const Inventory = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");

  const items = [
    {
      name: "Dell Laptop XPS 13",
      sku: "DELL-XPS13-001",
      description: "13-inch ultrabook with Intel i7 processor",
      category: "IT Equipment",
      stock: 15,
      min: 5,
      price: 1299.99,
      supplier: "Dell Technologies, Warehouse A-1",
    },
    {
      name: "Office Chair Ergonomic",
      sku: "CHAIR-ERG-001",
      description: "Adjustable ergonomic office chair with lumbar support",
      category: "Office Furniture",
      stock: 3,
      min: 10,
      price: 299.99,
      supplier: "Office Depot, Warehouse B-2",
    },
    {
      name: "Printer Paper A4",
      sku: "PAPER-A4-500",
      description: "White A4 printer paper, 500 sheets per pack",
      category: "Office Supplies",
      stock: 0,
      min: 20,
      price: 8.99,
      supplier: "Staples, Storage Room C",
    },
    {
      name: "Wireless Mouse",
      sku: "MOUSE-BT-001",
      description: "Bluetooth wireless mouse with optical sensor",
      category: "IT Equipment",
      stock: 25,
      min: 15,
      price: 29.99,
      supplier: "Logitech, Warehouse A-2",
    },
  ];

  const getStatus = (stock, min) => {
    if (stock === 0) return { label: "Out of Stock", color: "error" };
    if (stock <= min) return { label: "Low Stock", color: "warning" };
    return { label: "In Stock", color: "success" };
  };

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Box>
          <Typography variant="h5" fontWeight="bold">Inventory Management</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage your inventory items and stock levels
          </Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />}>
          Add Item
        </Button>
      </Box>

      <Card sx={{ mb: 3}}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            🔍 Search & Filter
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Find and filter inventory items
          </Typography>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name, SKU, or supplier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                fullWidth
                displayEmpty
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="IT Equipment">IT Equipment</MenuItem>
                <MenuItem value="Office Furniture">Office Furniture</MenuItem>
                <MenuItem value="Office Supplies">Office Supplies</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                fullWidth
                displayEmpty
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              >
                <MenuItem value="">All Status</MenuItem>
                <MenuItem value="In Stock">In Stock</MenuItem>
                <MenuItem value="Low Stock">Low Stock</MenuItem>
                <MenuItem value="Out of Stock">Out of Stock</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            Inventory Items ({items.length})
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item Details</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Unit Price</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item, i) => {
                  const statusObj = getStatus(item.stock, item.min);
                  return (
                    <TableRow key={i}>
                      <TableCell>
                        <Typography fontWeight="bold">{item.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          SKU: {item.sku}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {item.description}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={item.category} color="warning" variant="filled" />
                      </TableCell>
                      <TableCell>
                        <Typography>{item.stock}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Min: {item.min}
                        </Typography>
                      </TableCell>
                      <TableCell>${item.price.toFixed(2)}</TableCell>
                      <TableCell>
                        <Typography>{item.supplier}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip label={statusObj.label} color={statusObj.color} />
                      </TableCell>
                      <TableCell>
                        <IconButton>
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Inventory;
