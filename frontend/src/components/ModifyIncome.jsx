import { useState, useEffect } from "react";
import axios from "axios";
import { useUserId } from "../UserIdContext";
import Modal from "react-bootstrap/Modal"; // Import Modal component from React Bootstrap
import Form from "react-bootstrap/Form"; // Import Form component from React Bootstrap
import Button from "react-bootstrap/Button"; // Import Button component from React Bootstrap
import DeleteIncome from "./DeleteIncome";

// eslint-disable-next-line react/prop-types
const ModifyIncome = ({ incomeId }) => {
  const { token } = useUserId();
  const storedToken = localStorage.getItem("token");
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [incomeData, setIncomeData] = useState({
    incomeCategory: "",
    incomeDescription: "",
    incomeAmount: "",
    incomeDate: "",
  });

  useEffect(() => {
    async function fetchIncomeData() {
      try {
        const response = await axios.get(
          `http://localhost:8080/income/${incomeId}`,
          {
            headers: {
              Authorization: `Bearer ${token || storedToken}`,
            },
          }
        );

        setIncomeData(response.data);
      } catch (error) {
        console.error("Error fetching income data:", error);
      }
    }

    if (incomeId) {
      fetchIncomeData();
    }
  }, [incomeId, token, storedToken]);

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
      await axios.put(
        `http://localhost:8080/income/update/${incomeId}`,
        incomeData,
        {
          headers: {
            Authorization: `Bearer ${token || storedToken}`,
          },
        }
      );

      console.log("Income updated successfully!");
    } catch (error) {
      console.error("Error updating income:", error);
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
          Update Income
        </Button>
      </Form>
      <Button variant="danger" onClick={handleDeleteClick}>
        Delete Income
      </Button>

      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DeleteIncome incomeId={incomeId} onClose={handleCloseDeleteModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModifyIncome;
