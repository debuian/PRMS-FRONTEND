import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchUpdateReportResultAPI = async (examination_id, reportvalue) => {
  const url = ` http://localhost:3000/editPatientReportResults?examination_id=${examination_id}`;
  const method = "PUT";
  const payload = { report_result: reportvalue };
  const result = await fetchAPIHelper(url, method, payload);
  return result;
};

export default fetchUpdateReportResultAPI;
