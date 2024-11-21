import React, { useEffect, useState } from "react";
import useDisplayExamination from "../hooks/useDisplayExaminations";
import {
  Group,
  Button,
  MantineProvider,
  createTheme,
  Notification,
  Modal,
} from "@mantine/core";
import classes from "../styles/Demo.module.css";
import deleteExaminationAPI from "../containers/handleExaminationDeletion";
import { useDisclosure } from "@mantine/hooks";
import UpdateExamnation from "../components/UpdateExaminationsPage";

const DisplayExaminationsDetails = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [examinationData, setExaminationData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await useDisplayExamination();
        setData(result ? result.result : []);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const theme = createTheme({
    components: {
      Button: Button.extend({
        classNames: classes,
      }),
    },
  });
  const handleDelete = async (id) => {
    try {
      const result = await deleteExaminationAPI(id);
      setNotification({
        title: "Examination Deleted",
        message: "The examination was successfully deleted.",
        color: "green",
      });
      setData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting examination:", err);
      setNotification({
        title: "Error",
        message: "There was an issue deleting the examination.",
        color: "red",
      });
    }
  };
  const handleUpdateClick = (data) => {
    setExaminationData(data);
    open();
  };
  return (
    <>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Modal
          opened={opened}
          onClose={close}
          centered
          title="Update Examination Details"
        >
          <UpdateExamnation
            data={examinationData}
            onClose={close}
            setData={setData}
          />
        </Modal>
        {notification && (
          <Notification
            title={notification.title}
            color={notification.color}
            onClose={() => setNotification(null)}
          >
            {notification.message}
          </Notification>
        )}
        {data?.map((item) => (
          <div
            key={item.id}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "1rem",
              border: "1px solid #ccc",
              padding: "1rem",
            }}
          >
            <div>
              <strong>Name:</strong> {item.name}
            </div>
            <div>Report Type Name:{item.report_type_name}</div>
            <div>unit:{item.unit}</div>
            <div>category:{item.category}</div>
            <div>
              Normal Range:{item.normal_range_min} - {item.normal_range_max}
            </div>
            <MantineProvider theme={theme}>
              <Group>
                <Button
                  variant="primary"
                  onClick={() => handleUpdateClick(item)}
                >
                  Update
                </Button>
                <Button variant="danger" onClick={() => handleDelete(item.id)}>
                  Delete
                </Button>
              </Group>
            </MantineProvider>
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplayExaminationsDetails;
