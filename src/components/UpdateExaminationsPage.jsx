import React, { useState } from "react";
import ExaminationForm from "./ExaminationForm";
import { Button } from "@mantine/core";
import fetchUpdateExaminationAPI from "../containers/fetchUpdateExaminationAPI";

const UpdateExamnation = ({ data, onClose, setData }) => {
  const [name, setName] = useState(data.name);
  const [category, setCategory] = useState(data.category);
  const [normalRangeMin, setNormalRangeMin] = useState(data.normal_range_min);
  const [normalRangeMax, setNormalRangeMax] = useState(data.normal_range_max);
  const [unit, setUnit] = useState(data.unit);
  const [reportTypes, setreportTypes] = useState([]);
  const [selectedReportTypeId, setSelectedReportTypeId] = useState(
    data.report_type_id
  );
  const [selectedReportTypeName, setSelectedReportTypeName] = useState("");
  const handleSubmit = async () => {
    const payload = {
      exam_id: data.id,
      name,
      category,
      report_type_id: selectedReportTypeId,
      normal_range_min: normalRangeMin,
      normal_range_max: normalRangeMax,
      unit,
    };
    const result = await fetchUpdateExaminationAPI(payload);
    const updatedExamination = result.data.result;

    setData((prevData) =>
      prevData.map((item) =>  
        item.id === updatedExamination.id ? updatedExamination : item
      )
    );
    onClose();
  };

  return (
    <>
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
      <Button onClick={handleSubmit}>Update Examination</Button>
    </>
  );
};

export default UpdateExamnation;
