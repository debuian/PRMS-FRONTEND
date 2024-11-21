import React from "react";
import fetchAPIHelper from "../utlis/fetchAPIHelper";
import toast from "react-hot-toast";

const fetchUpdateReportTypeAPI = async (data) => {
  const payload = {
    name: data.name,
  };
  const url = ` http://localhost:3000/editReportTypeDetails?reportTypeId=${data.id}`;
  const method = "PUT";
  const result = await fetchAPIHelper(url, method, payload);
  if (result.success) {
    toast.success(result.data.message);
  } else {
    toast.error(result.data.message);
  }
  return result;
};

export default fetchUpdateReportTypeAPI;
