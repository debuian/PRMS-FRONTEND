import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchPharmacyLoginAPI = async (payload) => {
  const url = ` http://localhost:3000/pharmacyLogin`;
  const method = "POST";
  const result = await fetchAPIHelper(url, method, payload);
  return result;
};

export default fetchPharmacyLoginAPI;
