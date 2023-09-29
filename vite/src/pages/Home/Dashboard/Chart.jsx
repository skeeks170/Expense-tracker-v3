import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import Title from "../Title";
import axios from "axios"; // Import Axios

export default function Chart() {
  const theme = useTheme();
  const [incomeData, setIncomeData] = React.useState([]);
  const [expenseData, setExpenseData] = React.useState([]);

  React.useEffect(() => {
    // Fetch userId and token from local storage
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    // Get the current month and year
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Define the first and last day of the current month
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    // Define the Axios configuration for the GET requests
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Make the GET request to fetch Income data for the current month
    axios
      .get(`http://localhost:8080/income/list/${userId}`, config)
      .then((response) => {
        // Filter and transform data for Income
        const transformedData = response.data
          .filter((income) => {
            const incomeDate = new Date(income.incomeDate);
            return incomeDate >= firstDay && incomeDate <= lastDay;
          })
          .map((income) => ({
            name: new Date(income.incomeDate).toLocaleDateString(),
            uv: income.incomeAmount,
            type: "Income",
          }));

        // Sort the data by date in ascending order
        transformedData.sort((a, b) => new Date(a.name) - new Date(b.name));

        setIncomeData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching income data:", error);
      });

    // Make the GET request to fetch Expense data for the current month
    axios
      .get(`http://localhost:8080/expense/list/${userId}`, config)
      .then((response) => {
        // Filter and transform data for Expense
        const transformedData = response.data
          .filter((expense) => {
            const expenseDate = new Date(expense.expenseDate);
            return expenseDate >= firstDay && expenseDate <= lastDay;
          })
          .map((expense) => ({
            name: new Date(expense.expenseDate).toLocaleDateString(),
            pv: -expense.expenseAmount, // Convert Expense to positive
            type: "Expense",
          }));

        // Sort the data by date in ascending order
        transformedData.sort((a, b) => new Date(a.name) - new Date(b.name));

        setExpenseData(transformedData);
      })
      .catch((error) => {
        console.error("Error fetching expense data:", error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>Your Spending</Title>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={incomeData.concat(expenseData)}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" name="Expense" fill={theme.palette.error.main} />
          <Bar dataKey="uv" name="Income" fill={theme.palette.primary.main} />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
