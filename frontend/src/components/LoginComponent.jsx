import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/LoginComponent.css";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

const LoginComponent = () => {
  const [formData, setFormData] = useState({
    userUsername: "",
    userPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSuccessfulLogin = (
    userId,
    token,
    userFirstName,
    userLastName
  ) => {
    alert("Logged in successfully");

    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("userFirstName", userFirstName);
    localStorage.setItem("userLastName", userLastName);
    navigate("/home");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        formData
      );
      const { userId, token } = response.data;

      handleSuccessfulLogin(userId, token);
    } catch (error) {
      if (error.response) {
        alert("Login failed: " + error.response.data.message);
      } else {
        console.error("Login failed:", error.message);
      }
    }
  };

  return (
    <div className="container-box">
      <h1 className="text">Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <FloatingLabel
            controlId="floatingInput"
            label="Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              name="userUsername" // Updated field name
              value={formData.userUsername}
              onChange={handleInputChange}
            />
          </FloatingLabel>

          <FloatingLabel
            controlId="floatingInput"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              type="password"
              name="userPassword" // Updated field name
              value={formData.userPassword}
              onChange={handleInputChange}
            />
          </FloatingLabel>
        </div>
        <Button
          type="submit"
          variant="info"
          className="button-login"
          size="mb-3"
        >
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginComponent;
