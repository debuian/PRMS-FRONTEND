import { useState } from "react";
import { Button, Container } from "@mantine/core";
import addExaminationAPI from "../containers/addExaminationAPI";
import ExaminationForm from "../components/ExaminationForm";

const AddExaminaitonsPage = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [normalRangeMin, setNormalRangeMin] = useState(0);
  const [normalRangeMax, setNormalRangeMax] = useState(1);
  const [unit, setUnit] = useState("");
  const [reportTypes, setreportTypes] = useState([]);
  const [selectedReportTypeId, setSelectedReportTypeId] = useState();
  const [selectedReportTypeName, setSelectedReportTypeName] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      name,
      report_type_id: selectedReportTypeId,
      category,
      normal_range_min: normalRangeMin,
      normal_range_max: normalRangeMax,
      unit,
    };

    const result = await addExaminationAPI(payload);
  };
  return (
    <>
      <Container>
        <h1>Add Reports</h1>
        <ExaminationForm
          name={name}
          setName={setName}
          category={category}
          setCategory={setCategory}
          normalRangeMin={normalRangeMin}
          setNormalRangeMin={setNormalRangeMin}
          normalRangeMax={normalRangeMax}
          setNormalRangeMax={setNormalRangeMax}
          unit={unit}
          setUnit={setUnit}
          reportTypes={reportTypes}
          setreportTypes={setreportTypes}
          selectedReportTypeId={selectedReportTypeId}
          setSelectedReportTypeId={setSelectedReportTypeId}
          selectedReportTypeName={selectedReportTypeName}
          setSelectedReportTypeName={setSelectedReportTypeName}
        />
        <Button onClick={handleSubmit}>Add Examination</Button>
      </Container>
    </>
  );
};

export default AddExaminaitonsPage;
