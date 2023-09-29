import { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Typography,
  Box,
  MenuItem,
  Select,
  TextField,
  InputLabel,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

export default function ExpenseDialog({ expenseId, openModal, onDelete }) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    expenseDate: "",
    expenseAmount: "",
    expenseDescription: "",
    expenseCategory: "",
  });

  const token = localStorage.getItem("token");

  const handleClickOpen = () => {
    handleFetchData();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/expense/${expenseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedData = response.data;

      const formattedDate = new Date(fetchedData.expenseDate)
        .toISOString()
        .split("T")[0];
      fetchedData.expenseDate = formattedDate;

      console.log("API Response:", fetchedData);
      setFormData(fetchedData);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching expense data:", error);
    }
  };

  const handleUpdateData = async () => {
    try {
      await axios.put(
        `http://localhost:8080/expense/update/${expenseId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Expense updated successfully!");
      handleClose();
      onDelete();
    } catch (error) {
      console.error("Expense update failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/expense/delete/${expenseId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Expense deleted successfully!");
      handleClose();
      onDelete();
    } catch (error) {
      console.error("Expense deletion failed:", error);
    }
  };

  useEffect(() => {
    if (openModal) {
      handleFetchData();
    }
  }, [openModal, expenseId, token]);

  return (
    <div>
      <Button onClick={handleClickOpen} startIcon={<EditOutlinedIcon />}>
        Edit
      </Button>
      <Button onClick={handleDelete} color="error">
        Delete
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit your Expense</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          style={{
            position: "absolute",
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            Here you can edit the details of expense #{expenseId}.
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleUpdateData}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              type="date"
              name="expenseDate"
              value={formData.expenseDate}
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="expenseAmount"
              label="Expense Amount"
              value={formData.expenseAmount}
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-static"
              label="Expense Description"
              multiline
              rows={4}
              fullWidth
              name="expenseDescription"
              value={formData.expenseDescription}
              onChange={handleChange}
            />
            <InputLabel id="expense-category-label">Category</InputLabel>
            <Select
              labelId="expense-category-label"
              id="expense-category-select"
              name="expenseCategory"
              fullWidth
              value={formData.expenseCategory}
              onChange={handleChange}
            >
              <MenuItem value="furniture">Furniture</MenuItem>
              <MenuItem value="electronics">Electronics</MenuItem>
              <MenuItem value="clothing">Clothing</MenuItem>
              <MenuItem value="medicines">Medicines</MenuItem>
              <MenuItem value="bill payment">Bills</MenuItem>
              <MenuItem value="rent">Rent</MenuItem>
            </Select>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Save changes
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
}
