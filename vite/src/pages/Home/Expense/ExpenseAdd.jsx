import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import Title from "../Title";

function ExpenseAdd() {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    expenseDate: "",
    expenseAmount: "",
    expenseDescription: "",
    expenseCategory: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/expense/create/${userId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Expense added successfully!");
      setFormData({
        expenseDate: "",
        expenseAmount: "",
        expenseDescription: "",
        expenseCategory: "",
      });
      // You can add code here to refresh the graph and table
    } catch (error) {
      console.error("Expense addition failed:", error);
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Title>Add Expense</Title>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      ></Box>
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
        label="Expense Amount"
        name="expenseAmount"
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

      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Expense
      </Button>
    </Box>
  );
}

export default ExpenseAdd;
