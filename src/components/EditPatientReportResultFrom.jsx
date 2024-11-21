import { Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import fetchUpdateReportResultAPI from "../containers/fetchUpdateReportResultAPI";

const EditPatientReportResultFrom = ({
  selectedExamination,
  setSelectedExamination,
  setData,
  onClose,
}) => {
  const [resultValue, setResultValue] = useState(
    selectedExamination.examination.result.report_result
  );

  const handleResultChange = (event) => {
    const newResultValue = event.target.value;
    setResultValue(newResultValue);
    setSelectedExamination((prevState) => {
      const updatedExamination = {
        ...prevState,
        examination: {
          ...prevState.examination,
          result: {
            ...prevState.examination.result,
            report_result: newResultValue,
          },
        },
      };
      return updatedExamination;
    });
  };

  const handleSetResultOnClick = async () => {
    const result = await fetchUpdateReportResultAPI(
      selectedExamination.id,
      resultValue
    );
    console.log(result);

    setData((prevData) => {
      const updatedData = prevData.map((item) =>
        item.id === selectedExamination.id
          ? {
              ...item,
              examination: {
                ...item.examination,
                result: {
                  ...item.examination.result,
                  report_result: resultValue,
                },
              },
            }
          : item
      );
      return updatedData;
    });

    onClose();
  };

  return (
    <>
      <TextInput
        label={selectedExamination.examination.examination_name}
        placeholder="Enter result value"
        value={resultValue}
        onChange={handleResultChange}
      />
      <Button onClick={handleSetResultOnClick}>Set Result</Button>
    </>
  );
};

export default EditPatientReportResultFrom;
