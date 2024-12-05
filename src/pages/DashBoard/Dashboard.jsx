import React from "react";
import Header from "../../components/Dashboard/Header";
import DashboardAnalytics from "../../components/Dashboard/DashboardAnalytics";
import Main from "../../components/Dashboard/Main";

const Dashboard = () => {
  return (
    <>
      <Header />
      <DashboardAnalytics />
      <Main />
    </>
  );
};

export default Dashboard;
