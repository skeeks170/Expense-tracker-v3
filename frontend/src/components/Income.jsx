import "../styles/Transaction.css";
import IncomeTable from "./IncomeTable";
import AddIncomeForm from "./AddIncomeForm";
import IncomeGraph from "./IncomeGraph";

function Incomes() {
  return (
    <>
      <div className="placement">
        <div className="add-data">
          <AddIncomeForm />
        </div>
        <div className="data-table">
          <IncomeTable />
          <IncomeGraph />
        </div>
      </div>
    </>
  );
}

export default Incomes;
