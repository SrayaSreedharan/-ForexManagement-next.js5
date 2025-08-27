"use client";
import { useState, useEffect } from "react";
import {Container,Box,Button,Typography,Card,CardContent,Chip,Table,TableHead,TableBody,TableRow,TableCell,TableContainer,TextField,Select,MenuItem,Grid,IconButton,} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InventoryAddModal from "./InventoryAddModals";
import InventoryEditModal from "./InventoryEditModals";

const Inventory = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

// ================================================INVENTORY FETCH ===========================================================
  const fetchItems = async () => {
    try {
      const res = await fetch("/api/inventory/get");
      const result = await res.json();
      if (res.ok) setItems(result.data || []);
      else console.error("GET error:", result.error);
    } catch (err) {
      console.error("Unexpected fetch error:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleAdded = (newItem) => setItems((prev) => [newItem, ...prev]);

// -------------EDIT SECTION----------------
  const handleEditClick = (item) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleUpdatedItem = (updatedItem) => {
    setItems((prev) =>
      prev.map((i) => (i.sku === updatedItem.sku ? updatedItem : i))
    );
  };

// =================================================INVENTORY DELETE============================================================
  const handleDelete = async (sku) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      const res = await fetch("/api/inventory/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sku }),
      });
      const data = await res.json();
      if (res.ok) setItems((prev) => prev.filter((item) => item.sku !== sku));
      else console.error("Delete failed:", data.error);
    } catch (err) {
      console.error("Unexpected error:", err);
    }
  };

// ------------------FILTER SECTION---------------------------
  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name
      ?.toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "" || item.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h5" fontWeight="bold">
          Inventory Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpen(true)}
        >
          Add Item
        </Button>
      </Box>
{/* ---------------SEARCH AND FILTER UI----------------- */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            🔍 Search & Filter
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search by name, SKU, or supplier..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <SearchIcon sx={{ mr: 1, color: "text.secondary" }} />
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Select
                fullWidth
                displayEmpty
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <MenuItem value="">All Categories</MenuItem>
                <MenuItem value="IT Equipment">IT Equipment</MenuItem>
                <MenuItem value="Office Furniture">Office Furniture</MenuItem>
                <MenuItem value="Office Supplies">Office Supplies</MenuItem>
              </Select>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
{/* ----------------------TABLE-------------------- */}
      <Card>
        <CardContent>
          <TableContainer sx={{ overflowX: "auto" }}>
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Item</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Stock</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Supplier</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredItems.map((item) => (
                  <TableRow key={item.sku}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.description}</TableCell>
                    <TableCell>
                      <Chip
                        label={item.category}
                        color="primary"
                        size="small"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    </TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>${item.price}</TableCell>
                    <TableCell>{item.supplier}</TableCell>
                    <TableCell align="center">
                      <Box display="flex" justifyContent="center" gap={1}>
                        <IconButton
                          color="primary"
                          size="small"
                          onClick={() => handleEditClick(item)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton
                          color="error"
                          size="small"
                          onClick={() => handleDelete(item.sku)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}

                {filteredItems.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No items found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
{/* ------------------MODAL ADD & EDIT------------------- */}
      <InventoryAddModal open={open} onClose={() => setOpen(false)} onAdded={handleAdded}/>

      <InventoryEditModal open={editOpen} onClose={() => setEditOpen(false)} item={selectedItem} onUpdated={handleUpdatedItem}/>
    </Container>
  );
};

export default Inventory;