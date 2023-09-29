import { useState } from "react";
import axios from "axios";
import { useUserId } from "../UserIdContext";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

// eslint-disable-next-line react/prop-types
const AddExpenseForm = ({ updateExpenseData }) => {
  const { userId, token } = useUserId();
  const storedUserId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem("token");

  const [expenseData, setExpenseData] = useState({
    userIdJoin: userId || storedUserId,
    expenseCategory: "",
    expenseDescription: "",
    expenseAmount: "",
    expenseDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:8080/expense/create/${userId || storedUserId}`,
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${token || storedToken}`,
          },
        }
      );

      const newExpense = response.data;
      updateExpenseData(newExpense);

      setExpenseData({
        userIdJoin: userId || storedUserId,
        expenseCategory: "",
        expenseDescription: "",
        expenseAmount: "",
        expenseDate: "",
      });

      console.log("Expense added successfully!");
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  return (
    <Container>
      <h2>Add Expense</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Expense Category:</Form.Label>
          <Form.Control
            type="text"
            name="expenseCategory"
            value={expenseData.expenseCategory}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Expense Description:</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={expenseData.expenseDescription}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Expense Amount:</Form.Label>
          <Form.Control
            type="number"
            name="expenseAmount"
            value={expenseData.expenseAmount}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Expense Date:</Form.Label>
          <Form.Control
            type="date"
            name="expenseDate"
            value={expenseData.expenseDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Expense
        </Button>
      </Form>
    </Container>
  );
};

export default AddExpenseForm;
