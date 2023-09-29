import { useState, useEffect } from "react";
import axios from "axios";
import { useUserId } from "../UserIdContext";
import DeleteExpense from "./DeleteExpense.jsx";
import Modal from "react-bootstrap/Modal"; // Import Bootstrap Modal
import Form from "react-bootstrap/Form"; // Import Bootstrap Form
import Button from "react-bootstrap/Button"; // Import Bootstrap Button

// eslint-disable-next-line react/prop-types
const ModifyExpense = ({ expenseId }) => {
  const { token } = useUserId();
  const storedToken = localStorage.getItem("token");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [expenseData, setExpenseData] = useState({
    expenseCategory: "",
    expenseDescription: "",
    expenseAmount: "",
    expenseDate: "",
  });

  useEffect(() => {
    async function fetchExpenseData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/expense/${expenseId}`,
          {
            headers: {
              Authorization: `Bearer ${token || storedToken}`,
            },
          }
        );

        setExpenseData(response.data);
      } catch (error) {
        console.error("Error fetching expense data:", error);
      }
    }

    if (expenseId) {
      fetchExpenseData();
    }
  }, [expenseId, token, storedToken]);

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
      await axios.put(
        `http://localhost:8080/expense/update/${expenseId}`,
        expenseData,
        {
          headers: {
            Authorization: `Bearer ${token || storedToken}`,
          },
        }
      );

      console.log("Expense updated successfully!");
    } catch (error) {
      console.error("Error updating expense:", error);
    }
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Expense Category</Form.Label>
          <Form.Control
            type="text"
            name="expenseCategory"
            value={expenseData.expenseCategory}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Expense Description</Form.Label>
          <Form.Control
            type="text"
            name="expenseDescription"
            value={expenseData.expenseDescription}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Expense Amount</Form.Label>
          <Form.Control
            type="number"
            name="expenseAmount"
            value={expenseData.expenseAmount}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Expense Date</Form.Label>
          <Form.Control
            type="date"
            name="expenseDate"
            value={expenseData.expenseDate}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Update Expense
        </Button>
      </Form>
      <Button variant="danger" onClick={handleDeleteClick}>
        Delete Expense
      </Button>

      {/* DeleteExpense Modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteExpense
            expenseId={expenseId}
            onClose={handleCloseDeleteModal}
          />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModifyExpense;
