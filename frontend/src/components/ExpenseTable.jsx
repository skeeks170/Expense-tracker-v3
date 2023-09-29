import { useEffect, useState } from "react";
import axios from "axios";
import { useUserId } from "../UserIdContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import ModifyExpense from "./ModifyExpense.jsx";
import Pagination from "react-bootstrap/Pagination";
import Container from "react-bootstrap/Container";

// eslint-disable-next-line react/prop-types
const ExpenseTable = ({ expenseData: initialExpenseData }) => {
  const { userId, token } = useUserId();
  const [expenseData, setExpenseData] = useState(initialExpenseData);
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);

  const storedUserId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem("token");

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedExpenseId(null);
  };

  const handleShowUpdateModal = (expenseId) => {
    setSelectedExpenseId(expenseId);
    setShowUpdateModal(true);
  };

  const fetchExpenseData = async (userId, token, page, pageSize) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:8080/expense/history/${userId}?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      setExpenseData(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching expense data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || !token) {
      if (storedUserId && storedToken) {
        console.log("Using stored token:", storedToken);
        fetchExpenseData(storedUserId, storedToken, currentPage, 5);
      }
    } else {
      console.log("Using current token:", token);
      fetchExpenseData(userId, token, currentPage, 5);
    }
  }, [userId, token, currentPage, storedUserId, storedToken]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <Container>
      <h3>Expense Table</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Category</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenseData.map((expense, index) => (
            <tr key={index}>
              <td>{expense.expenseCategory}</td>
              <td>{expense.expenseDescription}</td>
              <td>${expense.expenseAmount.toFixed(2)}</td>
              <td>{new Date(expense.expenseDate).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleShowUpdateModal(expense.expenseId)}
                >
                  Modify
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="pagination justify-content-center">
        <Pagination>
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          <Pagination.Item active>{currentPage}</Pagination.Item>
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
      <Modal show={showUpdateModal} onHide={handleCloseUpdateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Expense</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModifyExpense expenseId={selectedExpenseId} />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ExpenseTable;
