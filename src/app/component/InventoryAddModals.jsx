import { useState } from "react";
import { Modal, Box, TextField, Button, Typography, Grid, CircularProgress, MenuItem } from "@mui/material";

const InventoryAddModal = ({ open, onClose, onAdded }) => {
  const [formData, setFormData] = useState({name: "", sku: "", description: "", category: "",stock: 0, min: 0, price: 0, supplier: ""});
  const [loading, setLoading] = useState(false);

  const handleNumberChange = (field, value) => {
    const num = value === "" ? 0 : Number(value);
    setFormData({ ...formData, [field]: num });
  };

// ===========================================INVENTORY INSERT==========================================
const handleAdd = async () => {
  setLoading(true);
  try {
    const res = await fetch("/api/inventory/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    let result;
    try {
      result = await res.json(); 
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      alert("Server returned invalid response");
      setLoading(false);
      return;
    }

    if (!res.ok) {
      alert("Failed to add item: " + result.error);
    } else {
      onAdded(result.data);
      setFormData({name: "", sku: "", description: "", category: "",stock: 0, min: 0, price: 0, supplier: "", warehouse: ""});
      onClose();
    }
  } catch (err) {
    console.error("Unexpected error:", err);
    alert("Unexpected error: " + err.message);
  }
  setLoading(false);
};


return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)', width: 600,
        bgcolor: 'background.paper', p: 4, borderRadius: 2
      }}>
        <Typography variant="h6" fontWeight="bold" mb={2}>Add Item</Typography>
        <Grid container spacing={2}>
          {['name','sku','description','supplier'].map(field => (
            <Grid item xs={4} key={field}>
              <TextField
                fullWidth
                label={field.charAt(0).toUpperCase() + field.slice(1)}
                value={formData[field]}
                onChange={e => setFormData({ ...formData, [field]: e.target.value })}
              />
            </Grid>
          ))}
          <Grid item xs={4}>
            <TextField
              select
              fullWidth
              label="Category"
              value={formData.category}
              onChange={e => setFormData({ ...formData, category: e.target.value })}>
              <MenuItem value="">Select Category</MenuItem>
              <MenuItem value="IT Equipment">IT Equipment</MenuItem>
              <MenuItem value="Office Furniture">Office Furniture</MenuItem>
              <MenuItem value="Office Supplies">Office Supplies</MenuItem>
            </TextField>
          </Grid>

          <Grid item xs={4}>
            <TextField
              fullWidth label="Stock" type="number"
              value={formData.stock} onChange={e => handleNumberChange('stock', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth label="Min Stock" type="number"
              value={formData.min} onChange={e => handleNumberChange('min', e.target.value)}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              fullWidth label="Price" type="number"
              value={formData.price} onChange={e => handleNumberChange('price', e.target.value)}
            />
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="outlined" onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default InventoryAddModal;
