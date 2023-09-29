import { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useUserId } from "../UserIdContext"; // Import the useUserId hook
import "../styles/RegisterComponent.css";

const RegisterComponent = () => {
  const { userId, token } = useUserId(); // Get userId and token from context
  const [formData, setFormData] = useState({
    userEmail: "",
    userFirstName: "",
    userLastName: "",
    userSalary: "",
    userUsername: "",
    userPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if any field is empty
    for (const key in formData) {
      if (!formData[key]) {
        setError(`"${key}" cannot be empty.`);
        return;
      }
    }

    // Clear any previous error messages
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/register",
        formData
      );

      // Handle successful registration here
      console.log("Registration successful:", response.data);
      alert("Registration Successful");

      // Optionally, you can redirect the user to a login page or other page.
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration Failed");
    }
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Check if the user is logged in using the userId and token
        if (userId && token) {
          const response = await axios.get(
            `http://localhost:8080/dashboard/${userId}`, // Use the userId
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          // Handle dashboard data retrieval here
          console.log("Dashboard data:", response.data);

          // Optionally, you can update your component state with the fetched data.
        } else {
          // If not logged in, you can decide how to handle this case.
          console.log("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    // Call the fetchDashboardData function
    fetchDashboardData();
  }, [userId, token]);

  return (
    <div className="container-box">
      <h1 className="text">Register</h1>
      {error && <div className="error">{error}</div>}
      <Form onSubmit={handleSubmit}>
        <FloatingLabel controlId="userEmail" label="Email" className="mb-3">
          <Form.Control
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleInputChange}
          />
        </FloatingLabel>
        <Row>
          <Col>
            <FloatingLabel
              controlId="userFirstName"
              label="First Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="userFirstName"
                value={formData.userFirstName}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Col>
          <Col>
            <FloatingLabel
              controlId="userLastName"
              label="Last Name"
              className="mb-3"
            >
              <Form.Control
                type="text"
                name="userLastName"
                value={formData.userLastName}
                onChange={handleInputChange}
              />
            </FloatingLabel>
          </Col>
        </Row>
        <FloatingLabel controlId="userSalary" label="Salary" className="mb-3">
          <Form.Control
            type="number"
            name="userSalary"
            value={formData.userSalary}
            onChange={handleInputChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="userUsername"
          label="Username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            name="userUsername"
            value={formData.userUsername}
            onChange={handleInputChange}
          />
        </FloatingLabel>
        <FloatingLabel
          controlId="userPassword"
          label="Password"
          className="mb-3"
        >
          <Form.Control
            type="password"
            name="userPassword"
            value={formData.userPassword}
            onChange={handleInputChange}
          />
        </FloatingLabel>
        <Button type="submit" variant="success" className="button-register">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default RegisterComponent;
