import toast from "react-hot-toast";
import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchEditReportAPI = async (id) => {
  const url = ` http://localhost:3000/editPatientReportDetails?PatientReportDetailId=${id}`;
  const method = "PUT";
  const result = await fetchAPIHelper(url, method);
  console.log(result);
  if (result.success) {
    toast.success(result.data.message);
  } else {
    toast.error(result.data.message);
  }

  return result;
};

export default fetchEditReportAPI;
