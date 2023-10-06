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
import axios from "axios";

export default function Chart() {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // eslint-disable-next-line no-unused-vars
    const firstDay = new Date(currentYear, currentMonth, 1);
    // eslint-disable-next-line no-unused-vars
    const lastDay = new Date(currentYear, currentMonth + 1, 0);

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(
        `http://localhost:8080/dashboard/transactionHistory/${userId}`,
        config
      )
      .then((response) => {
        const transactionData = response.data;

        // Divide data into income and expense categories
        const incomeData = transactionData
          .filter((transaction) => transaction.transactionType === "Income")
          .map((income) => ({
            name: new Date(income.transactionDate).toLocaleDateString(),
            uv: income.transactionAmount,
            type: "Income",
          }));

        const expenseData = transactionData
          .filter((transaction) => transaction.transactionType === "Expense")
          .map((expense) => ({
            name: new Date(expense.transactionDate).toLocaleDateString(),
            pv: expense.transactionAmount,
            type: "Expense",
          }));

        // Combine and sort both income and expense data
        const combinedData = [...incomeData, ...expenseData].sort(
          (a, b) => new Date(a.name) - new Date(b.name)
        );

        setData(combinedData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <React.Fragment>
      <Title>Your Spending</Title>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" name="Expense" fill="red" />
          <Bar dataKey="uv" name="Income" fill="blue" />
        </BarChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
