import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchExaminationsByReportId = async (id) => {
  const url = ` http://localhost:3000/getExaminationsByReportId?report_Id=${id}`;
  const method = "GET";
  const result = await fetchAPIHelper(url, method);
  return result.data;
};

export default fetchExaminationsByReportId;
