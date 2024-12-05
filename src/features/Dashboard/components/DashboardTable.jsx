import { Table } from "@mantine/core";
import React, { useEffect, useState } from "react";
import fetchReportDetailsAPI from "../../Reports/utils/fetchReportDetailsAPI";

const DashboardTable = () => {
  let rows;

  const [reportDetails, setReportDetails] = useState([]);

  useEffect(() => {
    const fetchAndSetData = async () => {
      try {
        const result = await fetchReportDetailsAPI(1);

        const reports = result.patientsReport;

        setReportDetails(reports);
      } catch (error) {
        console.error("Failed to fetch report details:", error);
      }
    };

    fetchAndSetData();
  }, []);

  if (reportDetails && reportDetails.length > 0) {
    rows = reportDetails.map((report) => (
      <Table.Tr key={report.report_id}>
        <Table.Td>{report.report_id}</Table.Td>
        <Table.Td>{report.reportCreatorDetails.profile.name}</Table.Td>
        <Table.Td>
          {report.patientDetails.first_name} {report.patientDetails.middle_name}{" "}
          {report.patientDetails.last_name}
        </Table.Td>
        <Table.Td>{report.patientDetails.age}</Table.Td>
        <Table.Td>{report.patientDetails.gender}</Table.Td>
        <Table.Td>{report.status}</Table.Td>
      </Table.Tr>
    ));
  }

  return (
    <Table withRowBorders>
      <Table.Thead>
        <Table.Tr>
          <Table.Th>Report ID</Table.Th>
          <Table.Th>Report from</Table.Th>

          <Table.Th>Patient Name</Table.Th>
          <Table.Th>Age</Table.Th>
          <Table.Th>Gender</Table.Th>
          <Table.Th>Status</Table.Th>
        </Table.Tr>
      </Table.Thead>

      {reportDetails.length > 0 ? (
        <Table.Tbody>{rows}</Table.Tbody>
      ) : (
        <Table.Tbody>
          <Table.Tr key="1">
            <Table.Td>1</Table.Td>
            <Table.Td>Samrajya Pratap Rana</Table.Td>
            <Table.Td>22</Table.Td>
            <Table.Td>Male</Table.Td>
            <Table.Td>Pending</Table.Td>
          </Table.Tr>
        </Table.Tbody>
      )}
    </Table>
  );
};

export default DashboardTable;
