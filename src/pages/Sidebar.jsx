import React, { useEffect, useState } from "react";
import { FiFile, FiHome } from "react-icons/fi";
import { CiUser } from "react-icons/ci";

import { RiAdminLine } from "react-icons/ri";
import { LuUsers } from "react-icons/lu";
import "../styles/sidebar.css";
import RouteButton from "../containers/SidebarRouteButton";
import getCookieValue from "../utlis/Cookies.js/getCookieValue";
import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ selectedRoute, setSelectedRoute }) => {
  const [dropdownStates, setDropdownStates] = useState({
    report: false,
    admin: false,
    examination: false,
    reportType: false,
  });
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = getCookieValue("user");
    setUser(userRole);
  }, []);

  const toggleDropdown = (dropdown) => {
    setDropdownStates((prev) => ({
      ...prev,
      [dropdown]: !prev[dropdown],
    }));
  };

  const handleOnClick = (route) => () => {
    setSelectedRoute(route);
  };

  return (
    <>
      <div className="SidebbarContainer">
        <div className="sidebar">
          <RouteButton
            Icon={CiUser}
            selected={selectedRoute === "Profile"}
            title="Profile"
            onClick={handleOnClick("Profile")}
          />

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
              {user == "Pathology" ? (
                <RouteButton
                  Icon={FiFile}
                  selected={selectedRoute === "EditReports"}
                  title="Edit Reports"
                  onClick={handleOnClick("EditReports")}
                />
              ) : null}
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
          {user == "Pathology" ? (
            <RouteButton
              Icon={RiAdminLine}
              selected={selectedRoute === "Admin"}
              title="Admin"
              onClick={() => toggleDropdown("admin")}
            />
          ) : null}

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
          {user == "Pathology" ? (
            <RouteButton
              Icon={LuUsers}
              selected={selectedRoute === "Pharmacy"}
              title="Pharmacy"
              onClick={handleOnClick("Pharmacy")}
            />
          ) : null}
        </div>
        <div className="LogOutButton">
          <Button
            variant="transparent"
            color="gray"
            style={{}}
            onClick={() => {
              const cookies = document.cookie.split("; ");
              for (const cookie of cookies) {
                const eqPos = cookie.indexOf("=");
                const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
                document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
              }
              if (cookies[1].split("=")[1] == "Pathology") {
                navigate("/pathology-login");
              } else {
                navigate("/pharmacy-login");
              }
            }}
          >
            LogOut
          </Button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
