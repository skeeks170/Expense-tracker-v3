import { useState } from "react";
import "../styles/LoginPage.css";
import LoginComponent from "../components/LoginComponent";
import RegisterComponent from "../components/RegisterComponent";

function LoginPage() {
  const [showLogin, setShowLogin] = useState(true);

  const toggleComponent = () => {
    setShowLogin(!showLogin);
  };

  return (
    <div className="container-fill">
      {showLogin ? (
        <div className="login-box">
          <LoginComponent />
          <p className="font-big">
            Do not have an account?{" "}
            <span className="toggle-link" onClick={toggleComponent}>
              Register
            </span>
          </p>
        </div>
      ) : (
        <div className="login-box">
          <RegisterComponent />
          <p className="font-big">
            Already have an account?{" "}
            <span className="toggle-link" onClick={toggleComponent}>
              Login
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
