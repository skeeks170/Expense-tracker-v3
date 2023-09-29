import { useEffect, useState } from "react";
import axios from "axios";
import { useUserId } from "../UserIdContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import ModifyIncome from "./ModifyIncome";

const IncomeTable = () => {
  const { userId, token } = useUserId();
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null);

  const storedUserId = localStorage.getItem("userId");
  const storedToken = localStorage.getItem("token");

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedIncomeId(null);
  };

  const handleShowUpdateModal = (incomeId) => {
    setSelectedIncomeId(incomeId);
    setShowUpdateModal(true);
  };

  const fetchIncomeData = async (userId, token, page, pageSize) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/income/history/${userId}?page=${page}&pageSize=${pageSize}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);

      setIncomeData(response.data.content);
      setTotalPages(response.data.totalPages);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching income data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userId || !token) {
      if (storedUserId && storedToken) {
        console.log("Using stored token:", storedToken);
        fetchIncomeData(storedUserId, storedToken, currentPage, 5);
      }
    } else {
      console.log("Using current token:", token);
      fetchIncomeData(userId, token, currentPage, 5);
    }
  }, [userId, token, currentPage, storedUserId, storedToken]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <h3>Income Table</h3>
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
          {incomeData.map((income, index) => (
            <tr key={index}>
              <td>{income.incomeCategory}</td>
              <td>{income.incomeDescription}</td>
              <td>INR {income.incomeAmount.toFixed(2)}</td>
              <td>{new Date(income.incomeDate).toLocaleDateString()}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleShowUpdateModal(income.incomeId)}
                >
                  Modify
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-center">
        {" "}
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
          <Modal.Title>Modify Income</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ModifyIncome incomeId={selectedIncomeId} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default IncomeTable;
