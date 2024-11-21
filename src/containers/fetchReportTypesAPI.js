import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchReportTypeAPI = async () => {
  const url = "http://localhost:3000/getReportTypes";
  const method = "GET";
  const result = await fetchAPIHelper(url, method);
  return result.data.result;
};
export default fetchReportTypeAPI;
