import { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

// eslint-disable-next-line react/prop-types
const ExpenseGraph = ({ expenseData }) => {
  const [dataPoints, setDataPoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedToken = localStorage.getItem("token");

    if (!storedUserId || !storedToken) {
      setError("User ID or token not found in local storage.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:8080/expense/list/${storedUserId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
      .then((response) => {
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Invalid response data");
        }

        const data = response.data;
        const aggregatedData = {};

        data.forEach((item) => {
          const dateKey = new Date(item.expenseDate).toDateString();
          if (aggregatedData[dateKey]) {
            aggregatedData[dateKey].sum += item.expenseAmount;
          } else {
            aggregatedData[dateKey] = {
              date: new Date(item.expenseDate),
              sum: item.expenseAmount,
            };
          }
        });

        const expenseDataPoints = Object.values(aggregatedData).map(
          (aggItem) => ({
            x: aggItem.date,
            y: aggItem.sum,
          })
        );

        // Sort expenseDataPoints array by date in ascending order
        expenseDataPoints.sort((a, b) => a.x - b.x);

        setDataPoints(expenseDataPoints);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [expenseData]);

  const options = {
    animationEnabled: true,
    title: {
      text: "Expense Graph",
    },
    axisX: {
      title: "Date",
      valueFormatString: "MMM YYYY",
    },
    axisY: {
      title: "Expense Amount",
    },
    data: [
      {
        type: "spline",
        name: "Expense",
        showInLegend: true,
        dataPoints: dataPoints,
      },
    ],
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Expense Graph</h3>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default ExpenseGraph;
