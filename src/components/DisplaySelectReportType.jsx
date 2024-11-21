import React, { useEffect, useState } from "react";
import useDisplayReportTypes from "../hooks/useDisplayReportTypes";
import { Button, Checkbox } from "@mantine/core";
import fetchExaminationsByReportId from "../containers/fetchExaminationsByReportId";

const DisplaySelectReportType = ({ setExaminationIds }) => {
  const [data, setData] = useState([]);
  const [selectedReportType, setSelectedReportType] = useState([]);
  const [examinations, setExaminations] = useState([]);
  const [selectedExaminationsId, setSelectedExaminationsId] = useState([]);

  const fetchData = async () => {
    try {
      const result = await useDisplayReportTypes();
      setData(result.result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchExaminations = async (ids) => {
    try {
      const requests = ids.map((id) =>
        fetchExaminationsByReportId(id).then((response) => response.result)
      );
      const results = await Promise.all(requests);
      const flattenedResults = results.flat();
      setExaminations(flattenedResults);

      const examinationIds = flattenedResults.map((exam) => exam.id);
      setSelectedExaminationsId(examinationIds);
      setExaminationIds(examinationIds);
    } catch (error) {
      console.error("Error fetching examinations:", error);
    }
  };

  const handleExaminationOnChange = (id, checked) => {
    let updatedExaminationIds;
    if (checked) {
      updatedExaminationIds = [...selectedExaminationsId, id];
    } else {
      updatedExaminationIds = selectedExaminationsId.filter(
        (itemId) => itemId !== id
      );
    }
    setSelectedExaminationsId(updatedExaminationIds);
    setExaminationIds(updatedExaminationIds);
  };

  const handleOnChange = (id, checked) => {
    if (checked) {
      setSelectedReportType((prevState) => [...prevState, id]);
    } else {
      setSelectedReportType((prevState) =>
        prevState.filter((itemId) => itemId !== id)
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (selectedReportType.length > 0) {
      fetchExaminations(selectedReportType);
    } else {
      setExaminations([]);
      setSelectedExaminationsId([]);
      setExaminationIds([]); // Clear the examination_id in patientData
    }
  }, [selectedReportType]);

  return (
    <>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {data?.map((item) => (
          <div key={item.id} style={{ margin: "10px" }}>
            <Checkbox
              onChange={(e) => handleOnChange(item.id, e.target.checked)}
              label={item.name}
            />
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
        {examinations.map((item) => (
          <div key={item.id} style={{ margin: "10px" }}>
            <Checkbox
              defaultChecked={selectedExaminationsId.includes(item.id)}
              onChange={(e) =>
                handleExaminationOnChange(item.id, e.target.checked)
              }
              label={item.name}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DisplaySelectReportType;
