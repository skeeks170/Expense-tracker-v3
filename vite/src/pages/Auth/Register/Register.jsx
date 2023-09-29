import { Box, Button, TextField, Avatar } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";

// eslint-disable-next-line react/prop-types
function Register({ onSuccessfulRegistration, onRegistrationError }) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    salary: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordsMatch(false);
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post("http://localhost:8080/register", {
        userEmail: formData.email,
        userFirstName: formData.firstName,
        userLastName: formData.lastName,
        userSalary: parseFloat(formData.salary),
        userUsername: formData.username,
        userPassword: formData.password,
      });

      console.log("Registration successful!");

      setRegistrationSuccess(true);
      setRegistrationError(false);

      // Call the callback function to handle successful registration
      onSuccessfulRegistration();

      // Optionally, you can set a timer to clear the success message
      setTimeout(() => {
        setRegistrationSuccess(false);
      }, 2000);
    } catch (error) {
      console.error("Registration failed:", error);

      setRegistrationSuccess(false);
      setRegistrationError(true);

      // Call the callback function to handle registration error
      onRegistrationError();
    }
  };

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
      />
      <Box
        sx={{
          display: "flex",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
      </Box>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Salary"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
      />
      {!passwordsMatch && (
        <p style={{ color: "red" }}>Passwords do not match.</p>
      )}
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Register
      </Button>

      {registrationSuccess && (
        <Alert severity="success">Registration Successful</Alert>
      )}

      {registrationError && (
        <Alert severity="warning">Username or Email is already in use</Alert>
      )}
    </Box>
  );
}

export default Register;
