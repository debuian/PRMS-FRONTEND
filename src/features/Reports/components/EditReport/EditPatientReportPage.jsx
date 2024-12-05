import { TextInput, Button, NumberInput } from "@mantine/core";
import useReportStore from "../../../../hooks/useReportStore";
import DisplayPatientReportExaminationDetails from "./component/DisplayPatientReportExaminationDetails";
import fetchEditReportAPI from "../../utils/fetchEditReportAPI";
import useRouteStore from "../../../../hooks/useRouteStore";

const EditPatientReportPage = () => {
  const { report, setPatientDetails } = useReportStore();
  const { selectedRoute, setSelectedRoute } = useRouteStore();

  const handleChange = (field, value) => {
    setPatientDetails({ [field]: value });
  };
  const setUpateReport = async () => {
    await fetchEditReportAPI(report.report_id);
    setSelectedRoute("ViewReports");
  };

  return (
    <div>
      <h2>Edit Report Page</h2>
      <h3>Report Id: {report.report_id}</h3>
      <div>
        <h4>Report Status: {report.status}</h4>
      </div>

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
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <h3>Report Examination</h3>
        <DisplayPatientReportExaminationDetails
          patientReportId={report.report_id}
        />
        <Button onClick={() => setUpateReport()}>Update Report</Button>
      </div>
    </div>
  );
};

export default EditPatientReportPage;
