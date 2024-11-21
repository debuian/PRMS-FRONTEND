import { Button, Container } from "@mantine/core";
import usePatientData from "../hooks/PatientDataStore";
import DisplaySelectReportType from "../components/DisplaySelectReportType";
import AddPatientReportForm from "../components/AddPatinetReportForm";
import FetchAddPatientReportDeatilsAPI from "../containers/FetchAddPatientReportDeatilsAPI";
import toast from "react-hot-toast";

const CreateReportPatientPage = () => {
  const { patientData, setPatientData, setExaminationIds } = usePatientData();

  const handleButtonClick = async (event) => {
    console.log("Button clicked");
    const payload = patientData;
    const result = await FetchAddPatientReportDeatilsAPI(payload);
    if (result.success) {
      toast.success(result.data.message);
      setPatientData({
        first_name: "",
        middle_name: "",
        last_name: "",
        gender: "Male",
        age: 0,
        examination_id: [],
      });
    } else {
      toast.error(result.data.message);
    }
  };

  return (
    <Container>
      <h1>Create Report</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        <AddPatientReportForm
          patientData={patientData}
          setPatientData={setPatientData}
        />
        <DisplaySelectReportType setExaminationIds={setExaminationIds} />
        <Button onClick={(e) => handleButtonClick(e)}>Submit Report</Button>
      </div>
    </Container>
  );
};

export default CreateReportPatientPage;
