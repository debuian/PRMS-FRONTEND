import fetchAPIHelper from "../../../utlis/fetchAPIHelper";

const fetchpatinentReportDeatilsByDate = async (date) => {
  const url = new URL("http://localhost:3000/patinentReportDeatilsByDate");
  url.searchParams.set("date", date);
  const method = "GET";
  const result = await fetchAPIHelper(url, method);
  return result;
};

export default fetchpatinentReportDeatilsByDate;
