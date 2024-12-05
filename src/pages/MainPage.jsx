import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "../styles/mainPage.css";
import renderContent from "../containers/renderContentToMainPanel";
import useRouteStore from "../hooks/useRouteStore";
import { useNavigate } from "react-router-dom";
import getCookieValue from "../utlis/Cookies.js/getCookieValue";

const MainPage = () => {
  const { selectedRoute, setSelectedRoute } = useRouteStore();
  const navigate = useNavigate();

  useEffect(() => {
    const cookieName = "loginDetails";
    const cookieValue = getCookieValue(cookieName);
    if (!cookieValue) {
      navigate("/pathology-login");
    }
  }, []);

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
