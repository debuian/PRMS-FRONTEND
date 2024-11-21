import { Button, Container, TextInput } from "@mantine/core";
import { useState } from "react";
import addReportTypeCall from "../containers/addReportTypesCall";

const AddReportTypes = () => {
  const [reportType, setReportType] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { name: reportType };
    await addReportTypeCall(payload);
    setReportType("");
  };

  return (
    <>
      <Container>
        <form onSubmit={handleSubmit}>
          <TextInput
            label="Enter the name of report type"
            placeholder="Report type name"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          />
          <Button type="submit">Add</Button>
        </form>
      </Container>
    </>
  );
};

export default AddReportTypes;
