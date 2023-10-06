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

function IncomeAdd() {
  // Changed from ExpenseAdd to IncomeAdd
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    incomeDate: "", // Changed from expenseDate to incomeDate
    incomeAmount: "", // Changed from expenseAmount to incomeAmount
    incomeDescription: "", // Changed from expenseDescription to incomeDescription
    incomeCategory: "", // Changed from expenseCategory to incomeCategory
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/income/create/${userId}`, // Changed from expense/create to income/create
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Income added successfully!"); // Changed from Expense added successfully! to Income added successfully!
      setFormData({
        incomeDate: "", // Changed from expenseDate to incomeDate
        incomeAmount: "", // Changed from expenseAmount to incomeAmount
        incomeDescription: "", // Changed from expenseDescription to incomeDescription
        incomeCategory: "", // Changed from expenseCategory to incomeCategory
      });
      // You can add code here to refresh the graph and table
    } catch (error) {
      console.error("Income addition failed:", error); // Changed from Expense addition failed: to Income addition failed:
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Title>Add Income</Title> {/* Changed from Add Expense to Add Income */}
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
        name="incomeDate" // Changed from expenseDate to incomeDate
        value={formData.incomeDate} // Changed from formData.expenseDate to formData.incomeDate
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        type="number"
        label="Income Amount" // Changed from Expense Amount to Income Amount
        name="incomeAmount" // Changed from expenseAmount to incomeAmount
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
        <MenuItem value="Salary">Salary</MenuItem>
        <MenuItem value="Freelancing">Freelancing</MenuItem>
        <MenuItem value="Stock Market">Stock Market</MenuItem>
        <MenuItem value="Real Estate">Real Estate</MenuItem>

        <MenuItem value="Real Estate">Lottery</MenuItem>
      </Select>
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Add Income {/* Changed from Add Expense to Add Income */}
      </Button>
    </Box>
  );
}

export default IncomeAdd; // Changed from ExpenseAdd to IncomeAdd
