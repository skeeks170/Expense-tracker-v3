import { useState } from "react";
import MiniDrawer from "./MiniDrawer";
import Dashboard from "./Dashboard/Dashboard";
import Expense from "./Expense/Expense";
import Income from "./Income/Income";

function Home() {
  const [selectedItem, setSelectedItem] = useState("dashboard"); // Initialize with 'dashboard' as the default selected item

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Define the content for each item
  const getContentForItem = (item) => {
    switch (item) {
      case "dashboard":
        return (
          <div>
            {/* Your dashboard content */}
            <Dashboard />
          </div>
        );
      case "expenses":
        return (
          <div>
            {/* Your expenses content */}
            <Expense />
          </div>
        );
      case "income":
        return (
          <div>
            {/* Your income content */}
            <Income />
          </div>
        );
      case "project":
        return (
          <div>
            {/* Your project content */}
            <h2>Project Content</h2>
          </div>
        );
      case "members":
        return (
          <div>
            {/* Your members content */}
            <h2>Members Content</h2>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <MiniDrawer selected={selectedItem} onItemClick={handleItemClick} />
      <div className="content">
        {/* Display the content based on the selected item */}
        {getContentForItem(selectedItem)}
      </div>
    </div>
  );
}

export default Home;
