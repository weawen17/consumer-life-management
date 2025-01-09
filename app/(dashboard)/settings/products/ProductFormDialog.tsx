import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  Stack,
} from "@mui/material";

const ProductFormDialog = ({ open, onClose, onSubmit, product }) => {
  const [formData, setFormData] = useState(
    product || { productCode: "", name: "", price: "", discount: "", status: "" }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Product Code"
            name="productCode"
            value={formData.productCode}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Discount"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
            fullWidth
          />
          <Select
            name="status"
            value={formData.status}
            onChange={handleChange}
            fullWidth
          >
            <MenuItem value="AVAILABLE">Available</MenuItem>
            <MenuItem value="OUT_OF_STOCK">Out of Stock</MenuItem>
          </Select>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {product ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;
