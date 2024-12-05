import React from "react";
import defaultAvatar from "../../assets/avatar-default-svgrepo-com.svg";
import "../../styles/Dashboard/dashboardHeader.css";

const Header = () => {
  const displayGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <header className="dashboard-header">
      <h1>{displayGreeting()}</h1>
      <div className="imgContainer">
        <img src={defaultAvatar} alt="default Avatar" />
      </div>
    </header>
  );
};

export default Header;
