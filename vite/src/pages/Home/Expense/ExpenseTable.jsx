import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Box,
  Pagination,
  Button,
} from "@mui/material";
import Title from "../Title";
import ExpenseDialog from "./ExpenseDialog";

export default function ExpenseTable() {
  const [expenses, setExpenses] = useState([]);
  const [page, setPage] = useState(1); // Start with page 1
  const [totalPages, setTotalPages] = useState(1); // Total pages
  const rowsPerPage = 5;

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch data when the component mounts
    fetchData(userId, page, rowsPerPage, config);
  }, [page]);

  const fetchData = (userId, page, pageSize, config) => {
    axios
      .get(`http://localhost:8080/expense/history/${userId}`, {
        ...config,
        params: {
          page: page, // Use the page state variable
          pageSize: pageSize,
        },
      })
      .then((response) => {
        const { content, totalPages } = response.data;
        setExpenses(content);
        setTotalPages(totalPages);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);

    // Call fetchData to fetch data for the new page
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetchData(userId, newPage, rowsPerPage, config);
  };

  const handleRefreshTable = () => {
    // Fetch data again and update expenses
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    fetchData(userId, page, rowsPerPage, config);
  };

  return (
    <React.Fragment>
      <Title>Expenses</Title>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Button variant="outlined" onClick={handleRefreshTable}>
          R
        </Button>
      </Box>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="left">Edit</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {expenses.map((expense, index) => (
            <TableRow key={index}>
              <TableCell>
                {new Date(expense.expenseDate).toLocaleDateString()}
              </TableCell>
              <TableCell>{expense.expenseDescription}</TableCell>
              <TableCell>{expense.expenseCategory}</TableCell>
              <TableCell align="right">
                INR {expense.expenseAmount.toFixed(2)}
              </TableCell>
              <TableCell>
                <ExpenseDialog
                  expenseId={expense.expenseId}
                  onDelete={handleRefreshTable}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handleChangePage}
          color="primary"
        />
      </Box>
    </React.Fragment>
  );
}
