import React, { useState } from "react";
import { FiFile, FiHome, FiUsers } from "react-icons/fi";
import { RiAdminLine } from "react-icons/ri";
import "../styles/sidebar.css";
import RouteButton from "../containers/SidebarRouteButton";

const Sidebar = ({ selectedRoute, setSelectedRoute }) => {
  const [dropdownStates, setDropdownStates] = useState({
    report: false,
    patient: false,
    admin: false,
    examination: false,
    reportType: false,
  });

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleOnClick = (route) => () => {
    setSelectedRoute(route); // Update global route state using Zustand
  };

  return (
    <div className="sidebar">
      <RouteButton
        Icon={FiHome}
        selected={selectedRoute === "Dashboard"}
        title="Dashboard"
        onClick={handleOnClick("Dashboard")}
      />

      <RouteButton
        Icon={FiFile}
        selected={selectedRoute === "Reports"}
        title="Reports"
        onClick={() => toggleDropdown("report")}
      />
      {dropdownStates.report && (
        <div className="dropdown">
          <RouteButton
            Icon={FiFile}
            selected={selectedRoute === "EditReports"}
            title="Edit Reports"
            onClick={handleOnClick("EditReports")}
          />
          <RouteButton
            Icon={FiFile}
            selected={selectedRoute === "ViewReports"}
            title="View Reports"
            onClick={handleOnClick("ViewReports")}
          />
          <RouteButton
            Icon={FiFile}
            selected={selectedRoute === "CreateReport"}
            title="Create Report"
            onClick={handleOnClick("CreateReport")}
          />
        </div>
      )}

      <RouteButton
        Icon={RiAdminLine}
        selected={selectedRoute === "Admin"}
        title="Admin"
        onClick={() => toggleDropdown("admin")}
      />
      {dropdownStates.admin && (
        <div className="dropdown">
          <RouteButton
            Icon={FiFile}
            selected={selectedRoute === "Examination"}
            title="Examination"
            onClick={() => toggleDropdown("examination")}
          />
          {dropdownStates.examination && (
            <div className="dropdown">
              <RouteButton
                Icon={FiFile}
                selected={selectedRoute === "CreateExamination"}
                title="Create Examination"
                onClick={handleOnClick("CreateExamination")}
              />
              <RouteButton
                Icon={FiFile}
                selected={selectedRoute === "ViewExaminations"}
                title="View Examinations"
                onClick={handleOnClick("ViewExaminations")}
              />
            </div>
          )}
          <RouteButton
            Icon={FiFile}
            selected={selectedRoute === "ReportType"}
            title="Report Type"
            onClick={() => toggleDropdown("reportType")}
          />
          {dropdownStates.reportType && (
            <div className="dropdown">
              <RouteButton
                Icon={FiFile}
                selected={selectedRoute === "CreateReportType"}
                title="Create Report Type"
                onClick={handleOnClick("CreateReportType")}
              />
              <RouteButton
                Icon={FiFile}
                selected={selectedRoute === "ViewReportTypes"}
                title="View Report Types"
                onClick={handleOnClick("ViewReportTypes")}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
