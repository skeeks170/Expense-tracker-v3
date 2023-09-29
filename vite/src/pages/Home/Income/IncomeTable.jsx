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
import IncomeDialog from "./IncomeDialog"; // Changed from ExpenseDialog to IncomeDialog

export default function IncomeTable() {
  // Changed from ExpenseTable to IncomeTable
  const [incomes, setIncomes] = useState([]); // Changed from expenses to incomes
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
      .get(`http://localhost:8080/income/history/${userId}`, {
        // Changed from expense to income
        ...config,
        params: {
          page: page, // Use the page state variable
          pageSize: pageSize,
        },
      })
      .then((response) => {
        const { content, totalPages } = response.data;
        setIncomes(content); // Changed from setExpenses to setIncomes
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
    // Fetch data again and update incomes
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
      <Title>Incomes</Title> {/* Changed from Expenses to Incomes */}
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
          {incomes.map(
            (
              income,
              index // Changed from expenses to incomes
            ) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(income.incomeDate).toLocaleDateString()}{" "}
                  {/* Changed from expenseDate to incomeDate */}
                </TableCell>
                <TableCell>{income.incomeDescription}</TableCell>{" "}
                {/* Changed from expenseDescription to incomeDescription */}
                <TableCell>{income.incomeCategory}</TableCell>{" "}
                {/* Changed from expenseCategory to incomeCategory */}
                <TableCell align="right">
                  INR {income.incomeAmount.toFixed(2)}{" "}
                  {/* Changed from expenseAmount to incomeAmount */}
                </TableCell>
                <TableCell>
                  <IncomeDialog // Changed from ExpenseDialog to IncomeDialog
                    incomeId={income.incomeId} // Changed from expenseId to incomeId
                    onDelete={handleRefreshTable}
                  />
                </TableCell>
              </TableRow>
            )
          )}
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
