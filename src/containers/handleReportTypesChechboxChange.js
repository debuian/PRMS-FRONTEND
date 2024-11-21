export const handleReportTypesCheckboxchange = async (
  event,
  reportId,
  setExaminations,
  setExaminationIds
) => {
  if (event.target.checked) {
    try {
      const response = await fetch(
        `http://localhost:3000/getExaminationsByReportId?report_Id=${reportId}`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setExaminations((prevExaminations) => [
        ...prevExaminations,
        ...data.result,
      ]);
      setExaminationIds((preExaminationIds) => [
        ...preExaminationIds,
        ...data.result.map((exam) => exam.id),
      ]);
    } catch (error) {
      console.error("Error fetching examinations:", error);
    }
  } else {
    setExaminations((prevExaminations) =>
      prevExaminations.filter((exam) => exam.report_type_id !== reportId)
    );
  }
};
