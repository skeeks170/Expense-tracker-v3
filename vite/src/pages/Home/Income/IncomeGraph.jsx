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

export default function IncomeGraph() {
  // Changed from ExpenseGraph to IncomeGraph
  const theme = useTheme();
  const [incomeData, setIncomeData] = React.useState([]); // Changed from expenseData to incomeData
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
        .get(`http://localhost:8080/income/list/${userId}`, config) // Changed from expense to income
        .then((response) => {
          const transformedData = response.data.map((income) => ({
            // Changed from expense to income
            date: new Date(income.incomeDate).toLocaleDateString(), // Changed from expenseDate to incomeDate
            amount: income.incomeAmount, // Changed from -income.incomeAmount to income.incomeAmount
            type: "Income", // Changed from "Expense" to "Income"
          }));

          transformedData.sort((a, b) => new Date(a.date) - new Date(b.date));

          setIncomeData(transformedData); // Changed from setExpenseData to setIncomeData
        })
        .catch((error) => {
          console.error("Error fetching income data:", error); // Changed from Error fetching expense data: to Error fetching income data:
        });
    };

    fetchDataAndUpdateGraph(); // Call the function initially
  }, [userId, token]);

  return (
    <React.Fragment>
      <Title>Today</Title> {/* You can adjust the title here */}
      <ResponsiveContainer>
        <LineChart
          data={incomeData} // Changed from expenseData to incomeData
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
            name="Income" // Changed from "Expense" to "Income"
            stroke={theme.palette.success.main} // Changed from theme.palette.error.main to theme.palette.success.main
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
