import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography"; // Import Typography for displaying error message
import Title from "../Title";
import axios from "axios";
import Grid from "@mui/material/Grid";

export default function Transaction() {
  const [transactions, setTransactions] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [categoryFilter, setCategoryFilter] = React.useState(""); // Category filter
  const [startDate, setStartDate] = React.useState(null); // Start date for date range filter
  const [endDate, setEndDate] = React.useState(null); // End date for date range filter

  React.useEffect(() => {
    // Fetch userId and token from local storage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Define the Axios configuration for the GET request
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the GET request to fetch data
    axios
      .get(
        `http://localhost:8080/dashboard/transactionHistory/${userId}`,
        config
      )
      .then((response) => {
        setTransactions(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filter transactions based on category and type
  const filteredTransactions = transactions.filter((transaction) => {
    return transaction.transactionCategory
      .toLowerCase()
      .includes(categoryFilter.toLowerCase());
  });

  // Filter transactions based on date range
  const filteredByDateTransactions = filteredTransactions.filter(
    (transaction) => {
      if (!startDate || !endDate) {
        return true; // No date range selected, show all transactions
      }
      const transactionDate = new Date(transaction.transactionDate);
      const startDateTime = startDate.getTime();
      const endDateTime = endDate.getTime();

      // Check if the transaction date is within the selected date range
      return transactionDate >= startDateTime && transactionDate <= endDateTime;
    }
  );

  return (
    <React.Fragment>
      <Title>Transactions</Title>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            size="small"
            label="Category Filter"
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={2}>
          <TextField
            size="small"
            label="Start Date"
            type="date"
            value={startDate ? startDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setStartDate(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            size="small"
            label="End Date"
            type="date"
            value={endDate ? endDate.toISOString().split("T")[0] : ""}
            onChange={(e) => setEndDate(new Date(e.target.value))}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
      {/* Validation for date range */}
      {startDate && endDate && startDate > endDate && (
        <Typography variant="body2" color="error">
          Start date cannot be later than end date.
        </Typography>
      )}
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Type</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredByDateTransactions
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((transaction, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(transaction.transactionDate).toLocaleDateString()}
                </TableCell>
                <TableCell>{transaction.transactionDescription}</TableCell>
                <TableCell>{transaction.transactionCategory}</TableCell>
                <TableCell>{transaction.transactionType}</TableCell>
                <TableCell align="right">
                  INR {transaction.transactionAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={filteredByDateTransactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
