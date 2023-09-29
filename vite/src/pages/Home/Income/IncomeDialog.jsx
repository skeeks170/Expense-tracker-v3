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

export default function IncomeDialog({ incomeId, openModal, onDelete }) {
  // Changed from ExpenseDialog to IncomeDialog
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    incomeDate: "", // Changed from expenseDate to incomeDate
    incomeAmount: "", // Changed from expenseAmount to incomeAmount
    incomeDescription: "", // Changed from expenseDescription to incomeDescription
    incomeCategory: "", // Changed from expenseCategory to incomeCategory
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
        `http://localhost:8080/income/${incomeId}`, // Changed from expense to income
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedData = response.data;

      const formattedDate = new Date(fetchedData.incomeDate) // Changed from expenseDate to incomeDate
        .toISOString()
        .split("T")[0];
      fetchedData.incomeDate = formattedDate;

      console.log("API Response:", fetchedData);
      setFormData(fetchedData);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching income data:", error); // Changed from Error fetching expense data: to Error fetching income data:
    }
  };

  const handleUpdateData = async () => {
    try {
      await axios.put(
        `http://localhost:8080/income/update/${incomeId}`, // Changed from expense to income
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Income updated successfully!"); // Changed from Expense updated successfully! to Income updated successfully!
      handleClose();
      onDelete();
    } catch (error) {
      console.error("Income update failed:", error); // Changed from Expense update failed: to Income update failed:
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/income/delete/${incomeId}`, {
        // Changed from expense to income
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Income deleted successfully!"); // Changed from Expense deleted successfully! to Income deleted successfully!
      handleClose();
      onDelete();
    } catch (error) {
      console.error("Income deletion failed:", error); // Changed from Expense deletion failed: to Income deletion failed:
    }
  };

  useEffect(() => {
    if (openModal) {
      handleFetchData();
    }
  }, [openModal, incomeId, token]);

  return (
    <div>
      <Button onClick={handleClickOpen} startIcon={<EditOutlinedIcon />}>
        Edit
      </Button>
      <Button onClick={handleDelete} color="error">
        Delete
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Edit your Income</DialogTitle>{" "}
        {/* Changed from Edit your Expense to Edit your Income */}
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
            Here you can edit the details of income #{incomeId}.{" "}
            {/* Changed from expense to income */}
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
              name="incomeDate" // Changed from expenseDate to incomeDate
              value={formData.incomeDate} // Changed from formData.expenseDate to formData.incomeDate
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              type="number"
              name="incomeAmount" // Changed from expenseAmount to incomeAmount
              label="Income Amount" // Changed from Expense Amount to Income Amount
              value={formData.incomeAmount} // Changed from formData.expenseAmount to formData.incomeAmount
              onChange={handleChange}
            />
            <TextField
              id="outlined-multiline-static"
              label="Income Description" // Changed from Expense Description to Income Description
              multiline
              rows={4}
              fullWidth
              name="incomeDescription" // Changed from expenseDescription to incomeDescription
              value={formData.incomeDescription} // Changed from formData.expenseDescription to formData.incomeDescription
              onChange={handleChange}
            />
            <InputLabel id="income-category-label">Category</InputLabel>{" "}
            {/* Changed from expense-category-label to income-category-label */}
            <Select
              labelId="income-category-label" // Changed from expense-category-label to income-category-label
              id="income-category-select" // Changed from expense-category-select to income-category-select
              name="incomeCategory" // Changed from expenseCategory to incomeCategory
              fullWidth
              value={formData.incomeCategory} // Changed from formData.expenseCategory to formData.incomeCategory
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
