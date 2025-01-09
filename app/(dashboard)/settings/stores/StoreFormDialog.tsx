import React, { useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Stack,
} from "@mui/material";

const StoreFormDialog = ({ open, onClose, onSubmit, mart }) => {
  const [formData, setFormData] = useState(
    mart || { name: "", remark: "" }
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
      <DialogTitle>{mart ? "Edit Mart" : "Add Mart"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2}>
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Remark"
            name="remark"
            value={formData.remark}
            onChange={handleChange}
            fullWidth
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {mart ? "Save" : "Add"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StoreFormDialog;
