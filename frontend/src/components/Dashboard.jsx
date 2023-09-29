import "../styles/Dashboard.css";
import DashboardTable from "./DashboardTable";
import { useUserId } from "../UserIdContext";
function Dashboard() {
  const { userId } = useUserId();

  return (
    <>
      <div className="placement">
        <div className="table">
          <DashboardTable userId={userId} />
        </div>
        <div>
          <div className="content"></div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
