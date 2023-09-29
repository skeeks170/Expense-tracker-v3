import { useEffect, useState } from "react";
import CanvasJSReact from "@canvasjs/react-charts";
import axios from "axios";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const IncomeGraph = () => {
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
      .get(`http://localhost:8080/income/list/${storedUserId}`, {
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
          const dateKey = new Date(item.incomeDate).toDateString();
          if (aggregatedData[dateKey]) {
            aggregatedData[dateKey].sum += item.incomeAmount;
          } else {
            aggregatedData[dateKey] = {
              date: new Date(item.incomeDate),
              sum: item.incomeAmount,
            };
          }
        });

        const incomeDataPoints = Object.values(aggregatedData).map(
          (aggItem) => ({
            x: aggItem.date,
            y: aggItem.sum,
          })
        );

        // Sort incomeDataPoints array by date in ascending order
        incomeDataPoints.sort((a, b) => a.x - b.x);

        setDataPoints(incomeDataPoints);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const options = {
    animationEnabled: true,
    title: {
      text: "Income Graph",
    },
    axisX: {
      title: "Date",
      valueFormatString: "MMM YYYY",
    },
    axisY: {
      title: "Income Amount",
    },
    data: [
      {
        type: "spline",
        name: "Income",
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
      <h3>Income Graph</h3>
      <CanvasJSChart options={options} />
    </div>
  );
};

export default IncomeGraph;
