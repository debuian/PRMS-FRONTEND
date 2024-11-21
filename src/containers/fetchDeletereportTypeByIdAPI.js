import toast from "react-hot-toast";
import fetchAPIHelper from "../utlis/fetchAPIHelper";

async function fetchDeleteReportTypeByIdAPI(reportTypeId) {
  const url = `http://localhost:3000/removeReportType?reportTypeId=${reportTypeId}`;
  const method = "DELETE";
  const result = await fetchAPIHelper(url, method);
  if (result.success) {
    toast.success(result.data.message);
  } else {
    toast.error(result.data.message);
  }
}

export default fetchDeleteReportTypeByIdAPI;
