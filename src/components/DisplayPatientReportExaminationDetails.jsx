import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Table, Loader, Text, Button, Modal } from "@mantine/core";
import fetchReportExaminationDetailsByPatientReportId from "../containers/fetchReportExaminationDetailsByPatientReportId";
import EditPatientReportResultFrom from "./EditPatientReportResultFrom";

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
      setData(result.result.report_examinations);
    } catch (error) {
      setError("Failed to fetch examination details.");
    } finally {
      setLoading(false);
    }
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
  return (
    <>
      <Modal
        opened={opened}
        onClose={close}
        title="Update Report Result"
        centered
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
            <Table.Th>Result</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {data.map((examination) => (
            <Table.Tr key={examination.id}>
              <Table.Td>{examination.examination.examination_name}</Table.Td>
              <Table.Td>
                {examination.examination.result.report_result}
              </Table.Td>
              <Table.Td>
                <Button onClick={() => handleUpdateResultOnClick(examination)}>
                  Update Result
                </Button>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </>
  );
};

export default DisplayPatientReportExaminationDetails;
