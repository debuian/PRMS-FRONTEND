import { useEffect, useState } from "react";
import {
  Button,
  Table,
  Loader,
  Text,
  Input,
  Container,
  Pagination,
} from "@mantine/core";
import fetchReportDetailsAPI from "../containers/fetchReportDetailsAPI";
import useRouteStore from "../hooks/useRouteStore";
import useReportStore from "../hooks/useReportStore";
import { mergeSort, comparator } from "../utlis/Algorithm/mergeSort";
import binarySearch from "../utlis/Algorithm/binarySearch";
import { BsSortAlphaDown } from "react-icons/bs";
import { FaRegFilePdf } from "react-icons/fa6";
import { BsSend } from "react-icons/bs";
import sendMailbyReportId from "../containers/sendMailbyReportId";
import toast from "react-hot-toast";
import generatePdfByreportId from "../containers/generatePdfByreportId";

const DisplayPatientReport = () => {
  const { setSelectedRoute } = useRouteStore();
  const [dataLength, setDataLength] = useState(0);
  const { setReport } = useReportStore();
  const [patientReports, setPatientReports] = useState([]);
  const [originalReports, setOriginalReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [soretd, setSorted] = useState(false);

  const justFetchData = async (page) => {
    try {
      const result = await fetchReportDetailsAPI(page);
      const reports = result.patientsReport;
      setDataLength(Number(result.pagination.total));
      setTotalPages(Math.ceil(result.pagination.total / 5));
      return reports;
    } catch (error) {
      setError("Failed to fetch patient reports line 39.");
    }
  };
  const fetch = async (page) => {
    setLoading(true);
    try {
      const report = await justFetchData(page);

      setOriginalReports(report);
      setPatientReports(report);
      if (soretd) {
        const sortedReport = mergeSort(report, comparator);
        setPatientReports(sortedReport);
      } else {
        setPatientReports(report);
      }
    } catch (err) {
      setError("Failed to fetch patient reports. 56");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch(currentPage);
  }, [currentPage]);

  const handleOnClick = (report) => {
    setReport(report);
    setSelectedRoute("EditReports");
  };

  const sendMail = async (report_id) => {
    const result = await sendMailbyReportId(report_id);
    if (result.success) {
      toast.success(result.data.message);
    } else {
      toast.error(result.data.message);
    }
  };
  const generatePdf = async (report_id) => {
    const result = await generatePdfByreportId(report_id);
    if (result.success) {
      toast.success(result.data.message);
      const link = document.createElement("a");
      link.href = result.data.pdfLink.trim(); // Ensure there are no leading/trailing spaces
      link.target = "_blank"; // Open the PDF in a new tab
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      toast.error(result.data.message);
    }
  };
  const rows = patientReports.map((report) => (
    <Table.Tr key={report.reportDetails.report_id}>
      <Table.Td>{report.reportDetails.report_id}</Table.Td>
      <Table.Td>
        {report.patientDetails.first_name} {report.patientDetails.middle_name}{" "}
        {report.patientDetails.last_name}
      </Table.Td>
      <Table.Td>{report.patientDetails.age}</Table.Td>
      <Table.Td>{report.patientDetails.gender}</Table.Td>
      <Table.Td>{report.reportDetails.status}</Table.Td>
      <Table.Td>
        <Button onClick={() => handleOnClick(report)}>View Details</Button>
        <FaRegFilePdf
          onClick={() => generatePdf(report.reportDetails.report_id)}
          style={{ marginLeft: "10px" }}
        />
        <BsSend
          onClick={() => sendMail(report.reportDetails.report_id)}
          style={{ marginLeft: "10px" }}
        />
      </Table.Td>
    </Table.Tr>
  ));

  const handleSearch = async () => {
    let found = false;
    for (let page = 1; page <= totalPages; page++) {
      const reports = await justFetchData(page);
      const sortedReport = mergeSort(reports, comparator);
      const result = binarySearch(sortedReport, searchQuery);
      if (result) {
        console.log("Found report:", result);
        setPatientReports([result]);
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("Report not found");
    }
  };

  return (
    <>
      <Container>
        <h1>Reports</h1>
        <Input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => {
            if (e.target.value === "") {
              fetch(currentPage);
            }
            setSearchQuery(e.target.value);
          }}
        />
        <Button
          onClick={handleSearch}
          style={{ marginBottom: "10px", marginTop: "10px" }}
        >
          Search
        </Button>
        <Table.ScrollContainer minWidth={800} type="native">
          <Table withTableBorder>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Report ID</Table.Th>
                <Table.Th>
                  Patient Name
                  <BsSortAlphaDown
                    style={{ cursor: "pointer", marginLeft: "10px" }}
                    onClick={() => {
                      if (!soretd) {
                        const sortedReport = mergeSort(
                          patientReports,
                          comparator
                        );
                        setPatientReports(sortedReport);
                        setSorted(true);
                      } else {
                        setPatientReports(originalReports);
                        setSorted(false);
                      }
                    }}
                  />
                </Table.Th>
                <Table.Th>Age</Table.Th>
                <Table.Th>Gender</Table.Th>
                <Table.Th>Status</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{rows}</Table.Tbody>
          </Table>
        </Table.ScrollContainer>
        {loading && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Loader />
          </div>
        )}
        {error && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <Text color="red">{error}</Text>
          </div>
        )}
        <Pagination
          total={totalPages}
          size="sm"
          style={{ marginTop: "10px" }}
          onChange={(e) => setCurrentPage(e)}
        />
      </Container>
    </>
  );
};

export default DisplayPatientReport;
