import React, { useEffect, useState } from "react";
import useDisplayReportTypes from "../hooks/useDisplayReportTypes";
import {
  Group,
  Button,
  MantineProvider,
  createTheme,
  Modal,
} from "@mantine/core";
import classes from "../styles/Demo.module.css";
import { useDisclosure } from "@mantine/hooks";
import fetchDeletereportTypeByIdAPI from "../containers/fetchDeletereportTypeByIdAPI";
import UpdateReportTypePage from "../components/UpdateReportTypePage";

const DisplayReportTypes = () => {
  const [data, setData] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedReportTypeData, setSelectedReportTypeData] = useState(null);

  const theme = createTheme({
    components: {
      Button: Button.extend({
        classNames: classes,
      }),
    },
  });

  const fetchData = async () => {
    try {
      const result = await useDisplayReportTypes();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateClick = (data) => {
    setSelectedReportTypeData(data);
    open();
  };
  const handleUpdateSuccess = () => {
    fetchData();
    close();
  };
  const handleDelete = async (reportTypeId) => {
    const result = await fetchDeletereportTypeByIdAPI(reportTypeId);
    fetchData();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Update report type"
        centered
      >
        <UpdateReportTypePage
          data={selectedReportTypeData}
          onUpdateSuccess={handleUpdateSuccess}
        />
      </Modal>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        {data?.result?.map((item) => (
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
            <MantineProvider theme={theme}>
              <Group>
                <Button
                  variant="primary"
                  onClick={() =>
                    handleUpdateClick({
                      reportTypeId: item.id,
                      name: item.name,
                    })
                  }
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

export default DisplayReportTypes;
