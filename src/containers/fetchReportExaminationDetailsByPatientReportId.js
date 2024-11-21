import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchReportExaminationDetailsByPatientReportId = async (
  patientReportId
) => {
  const url = ` http://localhost:3000/getReportExaminationDetailsByPatientReportId?report_id=${patientReportId}`;
  const method = "GET";
  const result = await fetchAPIHelper(url, method);
  return result.data;
};

export default fetchReportExaminationDetailsByPatientReportId;
