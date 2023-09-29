import { useState } from "react";
import axios from "axios";
import { useUserId } from "../UserIdContext";
import Form from "react-bootstrap/Form"; // Import Form component from React Bootstrap
import Button from "react-bootstrap/Button"; // Import Button component from React Bootstrap

const AddIncomeForm = () => {
  const { userId, token } = useUserId(); // Get userId and token from context

  const storedUserId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem("token");

  const [incomeData, setIncomeData] = useState({
    userIdJoin: userId || storedUserId, // Use userId from context or storedUserId
    incomeCategory: "",
    incomeDescription: "",
    incomeAmount: "",
    incomeDate: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/income/create/${userId || storedUserId}`, // Use userId from context or storedUserId
        incomeData,
        {
          headers: {
            Authorization: `Bearer ${token || storedToken}`, // Use token from context or storedToken
          },
        }
      );

      setIncomeData({
        userIdJoin: userId || storedUserId,
        incomeCategory: "",
        incomeDescription: "",
        incomeAmount: "",
        incomeDate: "",
      });

      console.log("Income added successfully!");
    } catch (error) {
      console.error("Error adding income:", error);
    }
  };

  return (
    <div>
      <h2>Add Income</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Income Category:</Form.Label>
          <Form.Control
            type="text"
            name="incomeCategory"
            value={incomeData.incomeCategory}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Income Description:</Form.Label>
          <Form.Control
            type="text"
            name="incomeDescription"
            value={incomeData.incomeDescription}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Income Amount:</Form.Label>
          <Form.Control
            type="number"
            name="incomeAmount"
            value={incomeData.incomeAmount}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Income Date:</Form.Label>
          <Form.Control
            type="date"
            name="incomeDate"
            value={incomeData.incomeDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Income
        </Button>
      </Form>
    </div>
  );
};

export default AddIncomeForm;
