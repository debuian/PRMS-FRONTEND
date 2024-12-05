import fetchAPIHelper from "../../../utlis/fetchAPIHelper";

const updateIsVerified = async (id, isverified) => {
  const url = ` http://localhost:3000/updatePharmacyIsVerified`;
  const method = "PATCH";
  const payload = { id, isverified };

  const result = await fetchAPIHelper(url, method, payload);
  console.log(result);
};

export default updateIsVerified;
