import React, { useState } from "react";
import { Button, Container, TextInput } from "@mantine/core";
import fetchUpdateReportTypeAPI from "./utils/fetchUpdateReportTypeAPI";

const UpdateReportTypePage = ({ data, onUpdateSuccess }) => {
  const [reportType, setReportType] = useState(data.name);

  const handleSubmit = async () => {
    const payload = {
      id: data.reportTypeId,
      name: reportType,
    };
    await fetchUpdateReportTypeAPI(payload);
    onUpdateSuccess();
  };

  return (
    <>
      <Container>
        <TextInput
          label="Enter the name of report Type"
          placeholder="Report type name"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        />
        <Button onClick={handleSubmit}>Update</Button>
      </Container>
    </>
  );
};

export default UpdateReportTypePage;
