import React from "react";
import { Button } from "@mantine/core";

const RouteButton = ({ Icon, title, selected, onClick }) => {
  return (
    <Button
      variant="transparent"
      color="gray"
      onClick={onClick}
      className={`sidebar-button ${selected ? "selected" : ""}`}
    >
      <Icon className="icon" />
      <span>{title}</span>
    </Button>
  );
};

export default RouteButton;
