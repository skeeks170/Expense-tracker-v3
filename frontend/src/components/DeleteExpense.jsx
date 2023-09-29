import { useEffect } from "react";
import axios from "axios";
import { useUserId } from "../UserIdContext";

// eslint-disable-next-line react/prop-types
const DeleteExpense = ({ expenseId, onClose }) => {
  // Updated component name and prop name
  const { token } = useUserId();
  const storedToken = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/expense/delete/${expenseId}`, {
        // Updated URL
        headers: {
          Authorization: `Bearer ${token || storedToken}`,
        },
      });

      console.log("Expense deleted successfully!"); // Updated success message
      onClose();
    } catch (error) {
      console.error("Error deleting expense:", error); // Updated error message
    }
  };

  useEffect(() => {
    if (expenseId) {
      handleDelete();
    }
  }, [expenseId, token, storedToken]);

  return (
    <div>
      <h2>Delete Expense</h2> {/* Updated title */}
      <p>Deleting expense with ID: {expenseId}</p> {/* Updated variable name */}
    </div>
  );
};

export default DeleteExpense; // Updated export
