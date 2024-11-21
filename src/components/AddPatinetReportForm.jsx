import { NativeSelect, NumberInput, TextInput } from "@mantine/core";

const AddPatientReportForm = ({ patientData, setPatientData }) => {
  const handleInputChange = (field, value) => {
    setPatientData({ [field]: value });
  };

  return (
    <>
      <form>
        <TextInput
          label="Patient First Name:"
          placeholder="Enter patient first name"
          value={patientData.first_name ? patientData.first_name : ""}
          onChange={(e) => handleInputChange("first_name", e.target.value)}
        />
        <TextInput
          label="Patient Middle Name:"
          placeholder="Enter patient middle name"
          value={patientData.middle_name}
          onChange={(e) => handleInputChange("middle_name", e.target.value)}
        />
        <TextInput
          label="Patient Last Name:"
          placeholder="Enter patient last name"
          value={patientData.last_name}
          onChange={(e) => handleInputChange("last_name", e.target.value)}
        />
        <NativeSelect
          label="Gender:"
          data={["Male", "Female", "Others"]}
          value={patientData.gender}
          onChange={(e) => handleInputChange("gender", e.target.value)}
        />
        <NumberInput
          label="Age:"
          value={patientData.age}
          onChange={(value) => handleInputChange("age", value)}
        />
      </form>
    </>
  );
};

export default AddPatientReportForm;
