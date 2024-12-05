import fetchAPIHelper from "../../../utlis/fetchAPIHelper";

const generatePdfByreportId = async (id) => {
  const url = ` http://localhost:3000/GenerateReportPdfByReportId?report_id=${id}`;
  const method = "GET";
  const result = await fetchAPIHelper(url, method);
  return result;
};

export default generatePdfByreportId;
