import React, { useEffect, useState } from "react";
import fetchpatinentReportDeatilsByDate from "../utils/fetchpatinentReportDeatilsByDate";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components once
ChartJS.register(ArcElement, Tooltip, Legend);

const DashboardAnalyticsReportInfo = () => {
  const [data, setData] = useState({
    totalReport: 0,
    pendingReport: 0,
    completedReport: 0,
  });

  async function fetchData() {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const result = await fetchpatinentReportDeatilsByDate(formattedDate);
    const responseData = result.data.data;

    const pendingReports = responseData.filter(
      (report) => report.status === "pending"
    ).length;
    const completedReports = responseData.filter(
      (report) => report.status === "Complete"
    ).length;

    setData({
      totalReport: responseData.length,
      pendingReport: pendingReports,
      completedReport: completedReports,
    });
  }

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  const PieChartdata = {
    labels: ["Pending Reports", "Completed Reports"],
    datasets: [
      {
        label: "Report Status",
        data: [data.pendingReport, data.completedReport],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(68, 248, 85)"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div className="dashboardReportInfo">
      <div className="dateDisplay">
        <span>Date</span>
        <span>{new Date().toISOString().split("T")[0]}</span>
      </div>
      <div className="dateDisplay">
        <span>TotalReport : {data.totalReport}</span>
      </div>

      <div className="chartContainer">
        <Pie data={PieChartdata} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default DashboardAnalyticsReportInfo;
