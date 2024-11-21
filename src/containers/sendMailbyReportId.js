import fetchAPIHelper from "../utlis/fetchAPIHelper";

const sendMailbyReportId = async (id) => {
  const url = ` http://localhost:3000/sendEmail?report_id=${id}`;
  const method = "GET";
  const result = await fetchAPIHelper(url, method);
  return result;
};

export default sendMailbyReportId;
