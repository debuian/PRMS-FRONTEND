import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchReportDetailsAPI = async (page) => {
  const url = `http://localhost:3000/getPatientReportDetails?page=${page}&limit=5`;
  const method = "GET";
  const result = await fetchAPIHelper(url, method);
  return result.data;
};
export default fetchReportDetailsAPI;
