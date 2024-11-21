import { TextInput, Button, NumberInput } from "@mantine/core";
import useReportStore from "../hooks/useReportStore";
import DisplayPatientReportExaminationDetails from "./DisplayPatientReportExaminationDetails";
import fetchEditReportAPI from "../containers/fetchEditReportAPI";
import useRouteStore from "../hooks/useRouteStore";

const EditPatientReportPage = () => {
  const { report, setPatientDetails } = useReportStore();
  const { selectedRoute, setSelectedRoute } = useRouteStore();

  const handleChange = (field, value) => {
    setPatientDetails({ [field]: value });
  };
  const setUpateReport = async () => {
    await fetchEditReportAPI(report.reportDetails.report_id);
    setSelectedRoute("ViewReports");
  };

  return (
    <div>
      <h3>Edit Report: {report.reportDetails.report_id}</h3>
      <h4>Report Status: {report.reportDetails.status}</h4>
      <form>
        <TextInput
          label="First Name"
          value={report.patientDetails.first_name}
          onChange={(e) => handleChange("first_name", e.target.value)}
        />
        <TextInput
          label="Middle Name"
          value={report.patientDetails.middle_name}
          onChange={(e) => handleChange("middle_name", e.target.value)}
        />
        <TextInput
          label="Last Name"
          value={report.patientDetails.last_name}
          onChange={(e) => handleChange("last_name", e.target.value)}
        />
        <TextInput
          label="Gender"
          value={report.patientDetails.gender}
          onChange={(e) => handleChange("gender", e.target.value)}
        />
        <NumberInput
          label="Age"
          value={report.patientDetails.age}
          onChange={(value) => handleChange("age", value)}
        />
      </form>
      <h3>Report Examination</h3>
      <DisplayPatientReportExaminationDetails
        patientReportId={report.reportDetails.report_id}
      />
      <Button onClick={() => setUpateReport()}>Update Report</Button>
    </div>
  );
};

export default EditPatientReportPage;
