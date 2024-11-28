import fetchAPIHelper from "../utlis/fetchAPIHelper";

const fetchPharmacySignUpAPI = async (payload) => {
  const url = `  http://localhost:3000/pharmacySignUp`;
  const method = "POST";
  const result = await fetchAPIHelper(url, method, payload);
  return result;
};

export default fetchPharmacySignUpAPI;
