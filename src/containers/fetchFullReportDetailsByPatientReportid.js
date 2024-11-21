import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchFullReportDetailsByPatientReportid = async (id) => {
  try {
    const url = ` http://localhost:3000/FullReportDetailsByPatientReportId?report_id=${id}`;
    const method = "GET";
    const result = await fetchAPIHelper(url, method);
    return result.data;
  } catch (error) {
    console.log(error);
  }
};

export default fetchFullReportDetailsByPatientReportid;
