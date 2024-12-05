import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import fetchpatinentReportDeatilsByDate from "../utils/fetchpatinentReportDeatilsByDate";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registering the necessary components from Chart.js
ChartJS.register(
  // Register the required components
  CategoryScale, // register category scale
  LinearScale, // register linear scale
  PointElement, // register point element (for scatter/line)
  LineElement, // register line element
  Title, // register title
  Tooltip, // register tooltip
  Legend // register legend
);

const DashboardAnalyticsReportChart = () => {
  const [chartData, setChartData] = useState({
    totalReports: [],
    pendingReports: [],
    completedReports: [],
  });

  async function fetchData() {
    const date = new Date();
    const formattedDate = date.toISOString().split("T")[0];
    const result = await fetchpatinentReportDeatilsByDate(formattedDate);
    const timeRange = Array.from({ length: 17 }, (_, i) => i + 6); // labels from 6 to 22

    if (result && result.data) {
      const formattedData = result.data.data.map((item) => ({
        date: new Date(item.created_at).toISOString().split("T")[0],
        hour: new Date(item.created_at).getHours(),
        status: item.status,
      }));

      let cumulativeTotalReports = 0;
      let cumulativePendingReports = 0;
      let cumulativeCompletedReports = 0;

      const totalReportsArray = [];
      const pendingReportsArray = [];
      const completedReportsArray = [];

      timeRange.forEach((hour) => {
        const reportsForHour = formattedData.filter(
          (report) => report.hour === hour
        );

        const reportsCount = reportsForHour.length;
        const pendingReports = reportsForHour.filter(
          (report) => report.status === "pending"
        ).length;
        const completedReports = reportsForHour.filter(
          (report) => report.status === "Complete"
        ).length;

        cumulativeTotalReports += reportsCount;
        cumulativePendingReports += pendingReports;
        cumulativeCompletedReports += completedReports;

        totalReportsArray.push(cumulativeTotalReports);
        pendingReportsArray.push(cumulativePendingReports);
        completedReportsArray.push(cumulativeCompletedReports);
      });

      setChartData({
        totalReports: totalReportsArray,
        pendingReports: pendingReportsArray,
        completedReports: completedReportsArray,
      });
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const AreaChartData = {
    labels: Array.from({ length: 17 }, (_, i) => i + 6), // 6 to 22 hours
    datasets: [
      {
        label: "Total Reports",
        data: chartData.totalReports,
        fill: true,
        borderColor: "rgb(70,104,246)",
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: "Completed Reports",
        data: chartData.completedReports,
        fill: true,
        borderColor: "rgb(75, 192, 75)", // Green color for completed
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 3,
      },
      {
        label: "Pending Reports",
        data: chartData.pendingReports,
        fill: false,
        borderColor: "rgb(255, 99, 132)", // Red color for pending
        tension: 0.1,
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  return (
    <div style={{ height: "100%" }}>
      <Line data={AreaChartData} options={{ responsive: true }} />
    </div>
  );
};

export default DashboardAnalyticsReportChart;
