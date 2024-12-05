import React from "react";
import "../../styles/Dashboard/dashboardMain.css";
import useRouteStore from "../../hooks/useRouteStore";
import DashboardTable from "../../features/Dashboard/components/DashboardTable";
import DashboardNotification from "../../features/Dashboard/components/DashboardNotification";

const Main = () => {
  const { setSelectedRoute } = useRouteStore();

  return (
    <main>
      <div className="Table" onClick={() => setSelectedRoute("ViewReports")}>
        <DashboardTable />
      </div>
      <div className="Notification">
        <DashboardNotification />
      </div>
    </main>
  );
};

export default Main;
