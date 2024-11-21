import toast from "react-hot-toast";
import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchUpdateExaminationAPI = async (payload) => {
  const { exam_id, ...details } = payload;
  console.log(exam_id, details);

  const url = `http://localhost:3000/editExaminationDetails?examinationId=${exam_id}`;
  const method = "PUT";
  const result = await fetchAPIHelper(url, method, details);
  if (result.success) {
    toast.success(result.data.message);
  } else {
    toast.error(result.data.message);
  }

  return result;
};

export default fetchUpdateExaminationAPI;
