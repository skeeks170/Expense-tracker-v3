import { useState } from "react";
import "../styles/HomePage.css";
import Button from "react-bootstrap/Button";
import Dashboard from "../components/Dashboard";
import Incomes from "../components/Income";
import Expenses from "../components/Expense";
import Profile from "../components/Profile";

function Home() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userFirstName");
    localStorage.removeItem("userLastName");
    window.location.href = "/";
  };

  const renderContent = () => {
    switch (activeTab) {
      case "Incomes":
        return <Incomes />;
      case "Expenses":
        return <Expenses />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="background">
      <div className="side-nav">
        <div className="profile">
          <Profile />
        </div>
        <div className="side-content">
          <Button
            variant={activeTab === "Dashboard" ? "red" : ""}
            onClick={() => handleTabClick("Dashboard")}
            className="button"
          >
            Dashboard
          </Button>
          <Button
            variant={activeTab === "Incomes" ? "" : ""}
            onClick={() => handleTabClick("Incomes")}
            className="button"
          >
            Incomes
          </Button>
          <Button
            variant={activeTab === "Expenses" ? "" : ""}
            onClick={() => handleTabClick("Expenses")}
            className="button"
          >
            Expenses
          </Button>
          {/* Sign-out button */}
          <Button variant="danger" onClick={handleSignOut} className="button">
            Sign Out
          </Button>
        </div>
      </div>
      <div className="main-div-content">{renderContent()}</div>
    </div>
  );
}

export default Home;
