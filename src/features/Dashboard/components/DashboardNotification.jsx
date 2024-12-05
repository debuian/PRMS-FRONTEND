import { Notification } from "@mantine/core";
import React, { useState } from "react";

const DashboardNotification = () => {
  const [notifications, setNotifications] = useState([]);

  return (
    <>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <Notification
            key={index}
            withCloseButton={false}
            withBorder
            title="Report Notification"
          >
            {notification}
          </Notification>
        ))
      ) : (
        <Notification withBorder title="Report Notification">
          User has requested for Serology Report
        </Notification>
      )}
    </>
  );
};

export default DashboardNotification;
