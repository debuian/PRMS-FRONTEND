import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Table, Loader, Text, Button, Modal, TextInput } from "@mantine/core";
import fetchReportExaminationDetailsByPatientReportId from "../../../../../containers/fetchReportExaminationDetailsByPatientReportId";
import EditPatientReportResultFrom from "./EditPatientReportResultFrom";
import fetchUpdateReportResultAPI from "../../../../../containers/fetchUpdateReportResultAPI";

const DisplayPatientReportExaminationDetails = ({ patientReportId }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedExamination, setSelectedExamination] = useState(null);

  const fetch = async () => {
    setLoading(true);
    try {
      const result = await fetchReportExaminationDetailsByPatientReportId(
        patientReportId
      );
      console.log(result);

      setData(result.result.report_examinations);
    } catch (error) {
      setError("Failed to fetch examination details.");
    } finally {
      setLoading(false);
    }
  };
  const handleInputChange = (id, value) => {
    setData((prevData) =>
      prevData.map((examination) =>
        examination.id === id
          ? {
              ...examination,
              examination: {
                ...examination.examination,
                result: {
                  ...examination.examination.result,
                  report_result: value,
                },
              },
            }
          : examination
      )
    );
  };

  useEffect(() => {
    fetch();
  }, [patientReportId]);

  if (loading) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Text color="red">{error}</Text>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}
      >
        <Text>No examination details available.</Text>
      </div>
    );
  }
  const handleUpdateResultOnClick = (examination) => {
    setSelectedExamination(examination);
    open();
  };

  const handleSetReportOnClick = async () => {
    try {
      await Promise.all(
        data.map((examination) =>
          fetchUpdateReportResultAPI(
            examination.examination.result.id,
            examination.examination.result.report_result
          )
        )
      );
      alert("Results updated successfully");
    } catch (error) {
      console.error("Error updating report results:", error);
      alert("Failed to update results");
    }
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Update Report Result"
        top={20}
      >
        <EditPatientReportResultFrom
          selectedExamination={selectedExamination}
          setSelectedExamination={setSelectedExamination}
          setData={setData}
          onClose={close}
        />
      </Modal>
      <Table>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Examination Name</Table.Th>
            <Table.Th>Normal Range</Table.Th>
            <Table.Th>Unit</Table.Th>
            <Table.Th>Result</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((examination) => (
            <Table.Tr key={examination.id}>
              <Table.Td>{examination.examination.examination_name}</Table.Td>
              <Table.Td>
                {examination.examination.normal_range_min}
                {" -"}
                {examination.examination.normal_range_max}
              </Table.Td>
              <Table.Td>{examination.examination.unit}</Table.Td>
              <TextInput
                value={examination.examination.result.report_result}
                onChange={(e) =>
                  handleInputChange(examination.id, e.target.value)
                }
              />
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
      <Button size="xs" onClick={handleSetReportOnClick}>
        Set Result
      </Button>
    </>
  );
};

export default DisplayPatientReportExaminationDetails;
