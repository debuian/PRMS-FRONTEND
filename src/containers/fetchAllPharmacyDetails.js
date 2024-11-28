import { useLayoutEffect } from "react";
import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchAllPharmacyDetails = async () => {
  const url = ` http://localhost:3000/getPharmacyDetails`;
  const method = "GET";
  const result = await fetchAPIHelper(url, method);
  return result;
};

export default fetchAllPharmacyDetails;
