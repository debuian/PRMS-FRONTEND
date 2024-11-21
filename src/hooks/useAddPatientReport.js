import { useState } from "react";

const useAddPatientReport = () => {
  const [first_name, setFirst_name] = useState("");
  const [middle_name, setMiddle_name] = useState("");
  const [last_name, setLast_name] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(patientData);
  };
  return {
    first_name,
    setFirst_name,
    middle_name,
    setMiddle_name,
    last_name,
    setLast_name,
    gender,
    setGender,
    age,
    setAge,
    handleSubmit,
  };
};
export default useAddPatientReport;
