import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Title from "../Title";
import axios from "axios"; // Import Axios

export default function ExpenseGraph() {
  const theme = useTheme();
  const [expenseData, setExpenseData] = React.useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  React.useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const fetchDataAndUpdateGraph = () => {
      axios
        .get(`http://localhost:8080/expense/list/${userId}`, config)
        .then((response) => {
          const transformedData = response.data.map((expense) => ({
            date: new Date(expense.expenseDate).toLocaleDateString(),
            amount: -expense.expenseAmount,
            type: "Expense",
          }));

          transformedData.sort((a, b) => new Date(a.date) - new Date(b.date));

          setExpenseData(transformedData);
        })
        .catch((error) => {
          console.error("Error fetching expense data:", error);
        });
    };

    fetchDataAndUpdateGraph(); // Call the function initially
  }, [userId, token]);

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>
        <LineChart
          data={expenseData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        >
          <XAxis
            dataKey="date"
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            label={{ value: "Dates", position: "insideBottomRight", dy: 10 }}
          />
          <YAxis
            type="number"
            domain={[0, "dataMax"]}
            stroke={theme.palette.text.secondary}
            style={theme.typography.body2}
            label={{ value: "Amount", angle: -90, position: "insideLeft" }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="amount"
            name="Expense"
            stroke={theme.palette.error.main}
            dot={false}
            animationDuration={500}
            animationEasing="linear"
            connectNulls
          />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
