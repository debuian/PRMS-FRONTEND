import React from "react";
import "../../styles/Dashboard/dashboardAnalytics.css";
import DashboardAnalyticsReportInfo from "../../features/Dashboard/components/DashboardAnalyticsReportInfo";
import DashboardAnalyticsReportChart from "../../features/Dashboard/components/DashboardAnalyticsReportChart";

const DashboardAnalytics = () => {
  return (
    <>
      <div className="analyticsContainer">
        <div className="DsiplayTotalReport">
          <DashboardAnalyticsReportInfo />
        </div>
        <div className="ReportChart">
          <DashboardAnalyticsReportChart />
        </div>
      </div>
    </>
  );
};

export default DashboardAnalytics;
