"use client";
import { useState, useEffect } from "react";
import {
  Container, Box, Button, Typography, Card, CardContent,
  Chip, Table, TableHead, TableBody, TableRow, TableCell, TableContainer,
  TextField, Select, MenuItem, Grid,
  IconButton} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import InventoryAddModal from "./InventoryAddModals";
import DeleteIcon from "@mui/icons-material/Delete";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/inventory/get");

      let result;
      try {
        result = await res.json();
      } catch (err) {
        console.error("Server returned invalid response:", err);
        return;
      }

      if (res.ok) setItems(result.data || []);
      else console.error("GET error:", result.error);
    } catch (err) {
      console.error("Unexpected fetch error:", err);
    }
  };

  useEffect(() => { fetchItems(); }, []);

  const handleAdded = (newItem) => {
    setItems(prev => [newItem, ...prev]); 
  };

  const filteredItems = items.filter(item => {
    const matchesSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.sku?.toLowerCase().includes(search.toLowerCase()) ||
      item.supplier?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === "" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">Inventory Management</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>Add Item</Button>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>🔍 Search & Filter</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth placeholder="Search by name, SKU, or supplier..."
                value={search} onChange={e => setSearch(e.target.value)}
                InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1, color: "text.secondary" }} /> }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select fullWidth displayEmpty value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="IT Equipment">IT Equipment</MenuItem>
                <MenuItem value="Office Furniture">Office Furniture</MenuItem>
                <MenuItem value="Office Supplies">Office Supplies</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Supplier</TableCell>
                   <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map(item => (
                  <TableRow key={item.sku}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell><Chip label={item.category} color="primary" /></TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                      <TableCell>
                      <IconButton color="error">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              
                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">No items found.</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>

      <InventoryAddModal open={open} onClose={() => setOpen(false)} onAdded={handleAdded} />
    </Container>
  );
};

export default Inventory;
