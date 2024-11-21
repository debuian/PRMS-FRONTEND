import toast from "react-hot-toast";
import fetchAPIHelper from "../utlis/fetchAPIHelper";

const addExaminationAPI = async (payload) => {
  const url = "http://localhost:3000/addExamination";
  const method = "POST";
  const result = await fetchAPIHelper(url, method, payload);
  if (result.success) {
    toast.success(result.data.message);
  } else {
    toast.error(result.data.message);
  }
  return result;
};
export default addExaminationAPI;
