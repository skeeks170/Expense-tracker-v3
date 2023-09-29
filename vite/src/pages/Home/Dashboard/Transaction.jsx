import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination"; // Import TablePagination
import Title from "../Title";
import axios from "axios"; // Import Axios

export default function Transaction() {
  const [transactions, setTransactions] = React.useState([]);
  const [page, setPage] = React.useState(0); // Current page
  const [rowsPerPage, setRowsPerPage] = React.useState(5); // Rows per page

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
      .get(`http://localhost:8080/dashboard/lastFive/${userId}`, config)
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
    setPage(0); // Reset to the first page when changing rows per page
  };

  return (
    <React.Fragment>
      <Title>Transactions</Title>
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
          {transactions
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
                  ${transaction.transactionAmount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={transactions.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage} // Enable changing rows per page
      />
    </React.Fragment>
  );
}
