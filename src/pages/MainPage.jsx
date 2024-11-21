import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/mainPage.css";
import renderContent from "../containers/renderContentToMainPanel";
import useRouteStore from "../hooks/useRouteStore";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const { selectedRoute, setSelectedRoute } = useRouteStore();
  const navigate = useNavigate();

  const getCookie = (name) => {
    const match = document.cookie.match(
      new RegExp("(^| )" + name + "=([^;]+)")
    );
    return match ? match[2] : null;
  };

  useEffect(() => {
    const cookieName = "loginDetails";
    const cookieValue = getCookie(cookieName);
    if (!cookieValue) {
      navigate("/pathology-login");
    }
  }, [navigate]);

  return (
    <div className="Main">
      <div className="SidebarPannel">
        <Sidebar
          selectedRoute={selectedRoute}
          setSelectedRoute={setSelectedRoute}
        />
      </div>
      <div className="MainPanel">{renderContent(selectedRoute)}</div>
    </div>
  );
};

export default MainPage;
