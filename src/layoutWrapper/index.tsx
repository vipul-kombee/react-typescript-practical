import Sidebar from "./sidebar";
import DashboardHeader from "./dashboardHeader";
import { Outlet } from "react-router-dom";

const LayoutWrapper = () => {
  return (
    <div className="dashboard-container">
      {/* Top Header */}
      <DashboardHeader />

      <div className="dashboard-body">
        {/* Left Sidebar */}
        <Sidebar />

        <Outlet />
      </div>
    </div>
  );
};

export default LayoutWrapper;
