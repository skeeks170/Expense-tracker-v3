import { useEffect } from "react";
import axios from "axios";
import { useUserId } from "../UserIdContext";

// eslint-disable-next-line react/prop-types
const DeleteIncome = ({ incomeId, onClose }) => {
  const { token } = useUserId();
  const storedToken = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/income/delete/${incomeId}`, {
        headers: {
          Authorization: `Bearer ${token || storedToken}`,
        },
      });

      console.log("Income deleted successfully!");
      onClose();
    } catch (error) {
      console.error("Error deleting income:", error);
    }
  };

  useEffect(() => {
    if (incomeId) {
      handleDelete();
    }
  }, [incomeId, token, storedToken]);

  return (
    <div>
      <h2>Delete Income</h2>
      <p>Deleting income with ID: {incomeId}</p>
    </div>
  );
};

export default DeleteIncome;
