import { useState } from "react";
import ExpenseTable from "./ExpenseTable";
import AddExpenseForm from "./AddExpenseForm";
import ExpenseGraph from "./ExpenseGraph";
import "../styles/Transaction.css";

function Expenses() {
  const [expenseData, setExpenseData] = useState([]);
  const updateExpenseData = (newExpense) => {
    setExpenseData((prevExpenseData) => [...prevExpenseData, newExpense]);
  };

  return (
    <>
      <div className="placement">
        <div className="graph">
          <ExpenseTable expenseData={expenseData} />
          <ExpenseGraph expenseData={expenseData} />
        </div>
        <div className="add-data">
          <AddExpenseForm updateExpenseData={updateExpenseData} />
        </div>
      </div>
    </>
  );
}

export default Expenses;
